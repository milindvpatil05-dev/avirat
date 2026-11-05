import type { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../services/user.service.ts";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens.ts";


export const signup = async (
  req: Request,
  res: Response
) => {

  try {

    const user = await createUser(req.body);


    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        userName: user.userName,
      }
    });


  } catch(error:any){

    res.status(400).json({
      success:false,
      message:error.message
    });

  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await loginUser(userName, password);

    res.json({
      success: true,
      data: {
        accessToken: createAccessToken(user.id),
        refreshToken: createRefreshToken(user.id),
        user: {
          id: user.id,
          userName: user.userName,
          emailId: user.emailId,
        },
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      res.status(400).json({ success: false, message: "Refresh token is required" });
      return;
    }

    const { userId } = verifyRefreshToken(token);
    res.json({ success: true, accessToken: createAccessToken(userId) });
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId || req.userId !== userId) {
      res.status(403).json({ success: false, message: "You can only update your own account" });
      return;
    }

    const user = await updateUser(userId, req.body);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "User update failed",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId || req.userId !== userId) {
      res.status(403).json({ success: false, message: "You can only delete your own account" });
      return;
    }

    await deleteUser(userId);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "User deletion failed",
    });
  }
};