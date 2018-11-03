const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const User = require('../models/user');
const Strength = require('../models/strength');

// ユーザー一覧
router.get('/', (req, res, next) => {
  const title = 'ユーザー一覧';
  res.render('users/list', {
    title: title
  });
});

router.get('/list', (req, res, next) => {
  User.findAll({
      order: [['"updatedAt"', 'ASC']]
  }).then((users) => {
    Strength.findAll({}).then((strength) => {
      const response = [];
      users.forEach((u) => {
        const user = {
          userId: u.userId,
          nickname: u.nickname,
          strength: []
        };
        strength.forEach((s) => {
          if (u.userId === s.userId) {
            const strength = {
              strengthId: s.strengthId,
              strengthName: s.strengthName
            };
            user.strength.push(strength);
          }
        });
        response.push(user);
      });
      res.json(response);
    });
  });
});

// ユーザー登録
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
  User.create(params).then((user) => {
    const strengthNames = req.body.strength.trim().split(/,\s?/);
    const strength = strengthNames.map((s) => { return {
      strengthName: s.trim(),
      userId: user.userId
    };});
    Strength.bulkCreate(strength).then(() => {
      res.redirect('/');
    });
  });;
});

module.exports = router;
