const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const User = require('../models/user');

// アドミン ユーザー一覧
router.get('/users', (req, res, next) => {
  User.findAll({
      order: [['"updatedAt"', 'ASC']]
  }).then((users) => {
    res.render('admin/userlist', {
      users: users
    });    
  });
});

module.exports = router;
