const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/add', (req, res, next) => {
  const title = '新規ユーザー登録';
  res.render('users/add', {
    title: title
  });
});

router.post('/add', (req, res, next) => {
  const params = {
    userId: uuid.v4(),
    username: req.body.username.slice(0, 255),
    email: req.body.email,
    nickname: req.body.nickname,
    description: req.body.description
  };
  User.create(params).then(() => {
    res.redirect('/');
  });;
});

module.exports = router;
