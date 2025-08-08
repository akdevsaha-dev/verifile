import { prisma } from "@repo/db";
import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/index.utils.js";
import { z } from "zod"
export const signup = async (req: Request, res: Response) => {
    const signupSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    const parsed = signupSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const { email, password } = parsed.data;
    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!userExists) {
            console.log(process.env.SALT_ROUNDS)
            const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    isAnonymous: false
                }
            })
            generateToken(user.id, res)
            res.status(201).json({
                id: user.id,
                email: user.email,
                isAnonymous: user.isAnonymous
            })
            return;
        }
        res.status(400).json({
            message: "user already exists!"
        })
        return
    } catch (error) {
        console.error("signup error", error)
        res.status(400).json({
            message: "something went wrong"
        })
    }
}

export const signin = async (req: Request, res: Response) => {
    const signinSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    const parsed = signinSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const { email, password } = parsed.data;
    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!userExists) {
            res.status(400).json({
                message: "Account doesnot exist. Please create one"
            })
            return;
        }
        if (!userExists?.password) {
            res.json({
                message: "Please enter credentials"
            })
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, userExists.password)
        if (!isPasswordValid) {
            res.status(400).json({
                message: "Incorrect password"
            })
            return;
        }
        generateToken(userExists.id, res)
        res.status(201).json({
            id: userExists.id,
            email: userExists.email,
            isAnonymous: userExists.isAnonymous
        })
        return;
    } catch (error) {
        console.error("signin error", error)
        res.status(400).json({
            message: "Something went wrong"
        })
        return;
    }
}

export const logout = (req: Request, res: Response) => {
    res.cookie("jwt", "", {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "lax",
    })
    res.status(200).json({
        message: "logged out successfully"
    })
}