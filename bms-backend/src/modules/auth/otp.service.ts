import crypto from "crypto";
import { config } from "../../config/config";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// Generate OTP
export const generateOTP = (): number => {
  return crypto.randomInt(1000, 10000);
};

// Hash OTP
export const hashOTP = (data: string): string => {
  if (!config.hashingSecret) {
    throw new Error("Hashing secret is not defined");
  }

  return crypto
    .createHmac("sha256", config.hashingSecret)
    .update(data)
    .digest("hex");
};

// Verify OTP
export const verifyOTP = (
  hashedOTP: string,
  data: string
): boolean => {
  const newHashedOTP = hashOTP(data);
  return newHashedOTP === hashedOTP;
};

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailUsername,
    pass: config.emailPassword,
  },
});

// Email template
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "bookMyScreen",
    link: "https://amitr.raj.vercel.app",
    logo: "https://res.cloudinary.com/amritrajamourya/image/upload/v1751475322/zu4fnmh2j1jzbttey77ah.png",
  },
});

// Send OTP to user via email
export const sendOTPToEmail = async (
  email: string,
  otp: number
): Promise<string> => {
  const emailTemplate = {
    body: {
      name: "User",
      intro: "Welcome to bookMyScreen! We're excited to have you on board.",
      action: {
        instructions: "To verify your account, please use the following OTP:",
        button: {
          color: "#323232",
          text: String(otp),
          link: "https://amitr.raj.vercel.app",
        },
      },
      outro:
        "This OTP expires in 2 minutes. If you did not request it, please ignore this email.",
    },
  };

  const html = mailGenerator.generate(emailTemplate);

  const message = {
    from: config.emailUsername,
    to: email,
    subject: "Your OTP for bookMyScreen",
    html,
  };

  const info = await transporter.sendMail(message);

  // Debug email delivery
  console.log("Email accepted:", info.accepted);
  console.log("Email rejected:", info.rejected);
  console.log("Message ID:", info.messageId);

  return info.messageId;
};