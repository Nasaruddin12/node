
var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/* get method for fetch all todo. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM todo WHERE active=1";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(rows)
  })
});

/*get method for fetch single todo*/
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM todo WHERE id=${id}`;
  db.query(sql, function(err, row, fields) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    if (row.length > 0) {
        res.json(row[0])
    } else {
        res.status(404).send({ error: 'Something failed!', status: 404 })
    }
  })
});

/*post method for create product*/
router.post('/create', function(req, res, next) {
  var todo_name = req.body.name;
  var status = req.body.status;
  var sql = `INSERT INTO todo (todo, status, active, created_at) VALUES ("${todo_name}", "${status}", 1, NOW())`;
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success', id: result.insertId})
  })
});

/*put method for update user*/
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var status = req.body.status;

  var sql = `UPDATE todo SET todo="${name}", status="${status}" WHERE id=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
});

/*delete method for delete user*/
router.delete('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM todo WHERE id=${id}`;
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
})

module.exports = router;

