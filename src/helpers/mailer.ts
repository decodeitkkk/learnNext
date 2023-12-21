import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailtype, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailtype === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 360000,
            });
        } else if (emailtype === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 360000,
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "59b9b8c743df28",
                pass: "df8a60c6771594",
            },
        });
        const mailOption = {
            from: "narutoeighttailbeast@gmail.com",
            to: email,
            subject:
                emailtype === "VERIFY"
                    ? "Verify Your Email Address"
                    : "Reset Your Password",
            html: `<p> Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}"> here </a> to ${
                emailtype === "VERIFY"
                    ? "Verify Your Email Address"
                    : "Reset Your Password"
            } </p>`,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};
