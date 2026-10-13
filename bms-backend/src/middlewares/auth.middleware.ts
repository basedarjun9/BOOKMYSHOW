import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import * as TokenService from "../modules/auth/token.service";
import * as UserService from "../modules/user/user.service";
import { JwtPayload } from "jsonwebtoken";





// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface TokenPayload extends JwtPayload {
  id: string;
}

export const isVerifiedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    console.log("Request URL:", req.originalUrl);
    console.log("Cookie header:", req.headers.cookie);
    console.log("Parsed cookies:", req.cookies);   
    // 1. Get access token from cookies
    const { accessToken } = req.cookies || {};

    if (!accessToken) {
      return next(
        createHttpError(401, "Access token is missing")
      );
    }

    // 2. Verify and decode the token
    const decodedToken = (await TokenService.verifyAccessToken(
      accessToken
    )) as TokenPayload;

    console.log("Decoded token:", decodedToken);
    console.log("User ID:", decodedToken.id);

    // 3. Find user using the ID from the token
    const user = await UserService.getUserById(decodedToken.id);

    if (!user) {
      return next(
        createHttpError(404, "User not found")
      );
    }

    // 4. Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return next(
      createHttpError(401, "Invalid or expired token")
    );
  }
};