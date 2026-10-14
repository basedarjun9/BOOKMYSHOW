import { Request, Response, NextFunction } from "express";
import * as OtpService from "./otp.service";
import * as UserService from "../user/user.service";
import * as TokenService from "../auth/token.service";
import createHttpError from "http-errors";
import { isValidEmail } from "../../utils";
import { JwtPayload } from "jsonwebtoken";

// Send OTP
export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new createHttpError.BadRequest("Email is required"));
    }

    if (!isValidEmail(email)) {
      return next(new createHttpError.BadRequest("Invalid email format"));
    }

    // 1. Create OTP
    const otp = OtpService.generateOTP();

    // 2. Hash OTP with email
    const ttl = 1000 * 60 * 2; // 2 minutes
    const expires = Date.now() + ttl;
    const data = `${email}.${otp}.${expires}`;
    const hashedOTP = OtpService.hashOTP(data);

    // 3. Send OTP to user's email
    try {
      await OtpService.sendOTPToEmail(email, otp);
    } catch (error) {
      return next(
        new createHttpError.InternalServerError("Error sending OTP to email")
      );
    }

    // 4. Respond to the client
    res.json({
      hash: `${hashedOTP}.${expires}`,
      email,
      msg: "OTP sent to email successfully ✅",
    });
  } catch (error) {
    next(error);
  }
};

// Verify OTP
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, hash } = req.body;

    if (!email || !otp || !hash) {
      return next(
        new createHttpError.BadRequest("All fields are required")
      );
    }

    // 1. OTP Verification
    const [hashedOTP, expires] = hash.split(".");

    if (Date.now() > Number(expires)) {
      return next(new createHttpError.Gone("OTP Expired"));
    }

    const data = `${email}.${otp}.${expires}`;
    const isValid = OtpService.verifyOTP(hashedOTP, data);

    if (!isValid) {
      return next(new createHttpError.Unauthorized("Invalid OTP"));
    }

    // 2. Find or Create a New User
    let user = await UserService.getUserByEmail(email);

    if (!user) {
      // FIX: Pass a user object instead of the email string
      user = await UserService.createUser({
        name: email.split("@")[0],
        email,
        role: "user",
      });
    }

    if (!user._id) {
      return next(
        new createHttpError.InternalServerError("User ID is missing")
      );
    }

    // 3. Generate JWT
    const { accessToken, refreshToken } = TokenService.generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // 4. Store refresh token in DB
    await TokenService.storeRefreshToken(
      user._id.toString(),
      refreshToken
    );

    // 5. Send tokens in cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    // 6. Send response
    res.json({
      auth: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await TokenService.deleteRefreshToken(refreshToken);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      msg: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get refresh token from cookie
    const { refreshToken: refreshTokenFromCookies } = req.cookies;

    if (!refreshTokenFromCookies) {
      return next(
        new createHttpError.Unauthorized(
          "Refresh token not found, please login again"
        )
      );
    }

    // 2. Verify refresh token
    let decodedToken: JwtPayload;

    try {
      decodedToken = TokenService.verifyRefreshToken(
        refreshTokenFromCookies
      ) as JwtPayload;
    } catch {
      return next(
        new createHttpError.Unauthorized(
          "Invalid refresh token, please login again"
        )
      );
    }

    // 3. Validate user ID from the token
    if (!decodedToken.id) {
      return next(
        new createHttpError.Unauthorized("Invalid refresh token payload")
      );
    }

    const userId = decodedToken.id as string;

    // 4. Check if refresh token exists in the database
    const token = await TokenService.findRefreshToken(
      userId,
      refreshTokenFromCookies
    );

    if (!token) {
      return next(
        new createHttpError.Unauthorized(
          "Refresh token not found in database, please login again"
        )
      );
    }

    // 5. Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      TokenService.generateToken({
        id: userId,
        email: decodedToken.email,
        role: decodedToken.role,
      });

    // 6. Update refresh token in the database
    await TokenService.updateRefreshToken(userId, newRefreshToken);

    // 7. Send new tokens in cookies
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none" as const,
      secure: true,
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    // 8. Send response
    res.status(200).json({
      success: true,
      message: "Tokens refreshed successfully",
    });
  } catch (error) {
    next(error);
  }
};