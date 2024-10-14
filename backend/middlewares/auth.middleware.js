import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "")[1];

    if (!token) {
      throw new ApiError(404, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // Next_Video : Discuss about frontend
      throw new ApiError(401, "Invalid Access Token");
    }
    // console.log("User: ", user) ;

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
};

async function checkForAuthenticationCookie(cookieName) {
  // console.log(counter) ;
  return async (req, res, next) => {
    // console.log(counter++);
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      console.log("!tokenCookieValue");
      return next();
    }

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "")[1];

    if (!token) {
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (user) {
      req.user = user;
      return next();
    }
  };
}

export { verifyJWT, checkForAuthenticationCookie };
