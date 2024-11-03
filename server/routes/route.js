import express from "express"
import { signupUser,loginUser } from "../controllers/user-controller.js"
import { uploadImage, getImage } from "../controllers/image-controller.js"
import { createItenary, getItenaries, getPost } from "../controllers/itenary-controller.js"
import { authenticateToken } from "../controllers/jwt-controller.js"

import upload from "../utils/upload.js"

const router = express.Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/file/upload",upload.single("file") ,uploadImage)
router.get("/file/:filename", getImage)

router.post("/create", authenticateToken ,createItenary)
router.get("/itenaries", authenticateToken, getItenaries)
router.get("/post/:id", authenticateToken, getPost )

export default router