const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { UserRepositoryFactory } = require("../models/RepositoryFactory");
const { AUTH_ERROR_MESSAGES } = require("../constants/messages");
const constants = require("../constants/constants");

const userRepository = UserRepositoryFactory.createRepository();

const authMiddleware = {
  authenticate: async (req, res, next) => {
    try {
      const token = req.cookies.token;
      console.log("token: ", token);
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.findByUsername(decoded.username);
      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
      }

      req.user = userRepository.formatUser(user);
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: AUTH_ERROR_MESSAGES.EXPIRED_TOKEN });
      }

      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: AUTH_ERROR_MESSAGES.INVALID_TOKEN });
    }
  },

  requireRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: AUTH_ERROR_MESSAGES.UNAUTHORIZED });
      }

      if (!roles.includes(req.user.role)) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: AUTH_ERROR_MESSAGES.FORBIDDEN });
      }

      next();
    };
  },

  requireAdmin: (req, res, next) => {
    if (!req.user || req.user.role !== constants.USER_ROLES.Admin) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: AUTH_ERROR_MESSAGES.FORBIDDEN });
    }
    next();
  },
};

module.exports = authMiddleware;
