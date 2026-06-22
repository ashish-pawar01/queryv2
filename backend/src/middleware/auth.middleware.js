import User from "../modules/users/user.model.js";
import { verifyToken } from "../utils/jwt.js";

const protect = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required"
      });
    }

    const decoded =
      verifyToken(token);

    const user =
      await User.findById(
        decoded.id
      )
        .populate({
          path: "role",
          populate: {
            path: "permissions"
          }
        });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User not found"
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

export default protect;