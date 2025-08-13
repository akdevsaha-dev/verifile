import { Response } from "express";
import jwt from "jsonwebtoken"

export const generateToken = async (userId: string, res: Response) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development",
        path: "/",
    })
    return token;
}