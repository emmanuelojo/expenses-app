import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: 401,
      error: "Authorization token required",
      message: "Fail",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT);

    req.user = await User.findOne({ _id }).select("_id");
    // console.log("user: ", req.user);

    next();
  } catch (error) {
    // next(error)
    return res.status(401).json({
      status: 401,
      error: "Request is not authorized",
      message: "Fail",
    });
  }
};

// module.exports = requireAuth
// export default = requireAuth
