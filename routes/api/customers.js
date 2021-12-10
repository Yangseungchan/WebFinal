// const router = require('express').Router();
import { Router } from 'express';
const router = Router();

var customers = [];

router.post('/customers/save', function (req, res) {
  console.log('Post a Customer: ' + JSON.stringify(req.body));
  var customer = {};
  customer.firstname = req.body.firstname;
  customer.lastname = req.body.lastname;
  customers.push(customer);
  return res.send(customer);
});

router.get('/customers/all', function (req, res) {
  console.log('Get All Customers');
  return res.send(customers);
});

module.exports = router;
