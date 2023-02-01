//manage Routing
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectId;
const monk = require('monk')

// Connection URL
const url = 'localhost:27017/ProjectXML';
const db = monk(url);

var brand = ""

/* GET home page. */
router.get('/', function(req, res, next) {

  let products = db.get('Products')
  products.find({}, function(err, docs) {
    res.render('index', { title: 'LongKidDoo', callData: docs });
  });
});

router.get('/products/:brand', function(req, res, next) {
  //query from db              
  let collection = db.get("Products")
  brand = req.params.brand
  collection.find({Brand: req.params.brand}, function(err,docs){
    res.render('products', { title: 'LongKidDoo', callData:docs});
  });
});

router.get('/detail/:id', function (req, res) {
  let collection = db.get('Products');
  collection.find({ _id: req.params.id }, function (err, docs) {
    res.render('detail', {title: 'LongKidDoo', link:"products/" + brand, callData: docs });
  })
});

module.exports = router;
