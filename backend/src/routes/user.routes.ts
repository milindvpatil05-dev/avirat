import { Router } from "express";
import {
  login,
  refreshToken,
  remove,
  signup,
  update,
} from "../controllers/user.controller.ts";
import { authenticate } from "../middleware/auth.middleware.ts";


const router = Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);


export default router;