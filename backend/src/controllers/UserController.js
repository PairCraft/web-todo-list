const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/UserService");
const { UserRepositoryFactory } = require("../models/RepositoryFactory");

class UserController {
  static userService = new UserService(
    UserRepositoryFactory.createRepository()
  );

  static register = async (req, res, next) => {
    try {
      const user = await UserController.userService.register(req.body);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  };

  static checkUsername = async (req, res, next) => {
    try {
      const isAvailable = await UserController.userService.isUsernameAvailable(
        req.body.username
      );
      res.json({ isAvailable });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await UserController.userService.login(username, password);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
      });

      delete result.token;

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  static getProfile = async (req, res, next) => {
    try {
      const user = await UserController.userService.getProfile(
        req.user.id,
        req.params.id
      );
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  static updateProfile = async (req, res, next) => {
    try {
      const user = await UserController.userService.updateProfile(
        req.user.id,
        req.body
      );
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req, res, next) => {
    try {
      await UserController.userService.logout(req.user.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };

  static deleteProfile = async (req, res, next) => {
    try {
      await UserController.userService.deleteProfile(req.user.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
