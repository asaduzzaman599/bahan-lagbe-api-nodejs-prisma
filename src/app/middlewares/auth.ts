import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../errors/api-error";
import { JwtHelpers } from "../../helpers/jwt-helpers";
import { IValidateUser } from "../modules/auth/auth.interface";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid token!");
      }

      let token = authorization as string;
      let user: JwtPayload | null = null;
      try {
        user = JwtHelpers.verifyToken(token) as unknown as IValidateUser;
      } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
      }
      
      if (!user) throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");

      (req as any).user = user;

      if (roles?.length) {
        if (!user.role || !roles.includes(user.role)) {
          throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
