
import { prisma } from "@repo/db";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

interface myJwtPayLoad extends JwtPayload {
    id: string
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized"
            })
            return;
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as myJwtPayLoad;
        if (!decoded) {
            res.status(401).json({
                message: "unauthorized- Invalid token",
            });
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
                isAnonymous: true

            }
        })
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "middleware error",
        });
        return;
    }
}