import type { Request, Response } from "express";
import { createUser } from "../services/user.service.ts";


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