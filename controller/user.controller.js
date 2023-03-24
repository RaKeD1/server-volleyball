const db = require('../db');
const UserService = require('../service/user-service.js');

class UserController {
  async createUser(req, res) {
    try {
      const createdUser = await UserService.createUser(req.body);
      res.status(200).json(createdUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOneUser(req, res) {
    try {
      const getUser = await UserService.getOneUser(req.params.id);
      res.status(200).json(getUser.rows[0]);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getUsers(req, res) {
    try {
      const getUsers = await UserService.getUsers();
      res.status(200).json(getUsers.rows);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.body, req.params.id);
      res.status(200).json(updatedUser.rows[0]);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query(`DELETE FROM users WHERE id_user = $1`, [id]);
      res.status(200).json(user.rows[0]);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new UserController();
