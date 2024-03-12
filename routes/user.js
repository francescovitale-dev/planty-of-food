const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail
} = require('../controllers/user');

router.route('/').post(createUser).get(getAllUsers);

router.route('/:email')
  .get(getUserByEmail)
  .put(updateUserByEmail)
  .delete(deleteUserByEmail)

module.exports = router;
