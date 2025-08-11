
import express from "express"
import { checkAuth, logout, signin, signup } from "../controllers/auth.controllers.js"
import { protectRoute } from "../middleware/middleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/logout", logout)
router.get("/check", protectRoute, checkAuth)
export default router;