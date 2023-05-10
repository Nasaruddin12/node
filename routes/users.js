
var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/* get method for fetch all todo. */
router.get('/', function (req, res, next) {
  var sql = "SELECT * FROM user WHERE active=1";
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(rows)
  })
});

/*get method for fetch single user*/
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM user WHERE id=${id}`;
  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    if (row.length > 0) {
      res.json(row[0])
    } else {
      res.status(404).send({ error: 'Something failed!', status: 404 })
    }
  })
});

/*post method for create user*/
router.post('/create', function (req, res, next) {
  var user_name = req.body.name;
  var password = req.body.password;
  var sql = `INSERT INTO user (user, password, created_at) VALUES ("${user_name}", "${password}",1, NOW())`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success', id: result.insertId })
  })
});

/*put method for update user*/
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var user_name = req.body.name;
  var password = req.body.password;

  var sql = `UPDATE user SET user_name="${user_name}", password="${password}" WHERE id=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
});

/*delete method for delete user*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM user WHERE id=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
})

module.exports = router;

