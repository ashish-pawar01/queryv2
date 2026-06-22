import User from "../users/user.model.js";
import { generateToken } from "../../utils/jwt.js";
import { setAuthCookie, clearAuthCookie } from "../../utils/cookies.js";
import Permission from "../rbac/permission.model.js";
import Role from "../rbac/role.model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { setAuthCookies } from "../../utils/cookies.js";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Auth
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const valid = await user.comparePassword(password);

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken({
      id: user._id,
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
    });

    user.refreshToken = refreshToken;

    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    user.lastLogin = new Date();

    await user.save();

    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    res.json({
      success: true,
      message: "Login successful",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const me = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.refreshToken = null;

    await user.save();
  }

  clearAuthCookies(res);

  res.json({
    success: true,
  });
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
      });
    }

    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
      });
    }

    const accessToken = generateAccessToken({
      id: user._id,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
    });
  }
};
