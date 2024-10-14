import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(401)
      .json(
        new ApiError(
          401,
          "Something went wrong while generating refresh and access token"
        )
      );
  }
};

async function handleUserSignup(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      console.log("User already existed");
      return res
        .status(401)
        .json(new ApiError(401, "Users with email or username already exist."));
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const createdUSer = await User.findById(user?._id).select(
      "-password -refreshToken"
    );
    if (!createdUSer) {
      return res
        .status(500)
        .json(
          new ApiError(500, "Something went wrong while registering the user")
        );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUSer, "User registered succesfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error, please try again later"));
  }
}

async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;

    if (!(password || email)) {
      // return new ApiError(400, "username or email is required");
      return res.status(400).json({
        status: 400,
        message: "Email and password are required",
      });
    }

    // Do one checkup for the availaibility of User
    const user = await User.findOne({ email: email });

    if (!user) {
      // return new ApiError(404, "User does not exist");
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User does not exist",
        });
      }
    }

    // User will not work here, as it only has mongoose properties
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json(new ApiError(401, "Invalid user credentials"));
    }

    // Access Token or Refresh Token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    // console.log("accessToken", accessToken);

    // Call the db only when it is not that costly or not a necessary to .
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true, // The cookie will not be accessible via JavaScript
      sameSite: "None", // Allow cross-origin requests if required
      secure: true,
      maxAge: 3600000, // Cookie will expire in 1 hour (same as token)
    };
    res.cookie("accessToken", accessToken, options);

    // send to cookie
    // const options = {
    //   httpOnly: true,
    //   secure: true,
    // };

    return res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      user: loggedInUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Server error, please try again later",
    });
  }
}

function handleIsLoggedIn(req, res) {
  if (req.user) {
    // User is authenticated
    return res.status(200).json({ isLoggedIn: true, user: req.user });
  } else {
    // User is not authenticated
    return res.status(200).json({ isLoggedIn: false });
  }
}

async function handleUserLogout(req, res) {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // After searching i found, unset removes  ield from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
}

export {
  handleUserSignup,
  handleUserSignin,
  handleIsLoggedIn,
  handleUserLogout,
};
