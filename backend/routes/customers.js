const express = require("express");

const Customer = require("../models/customer");

const router = express.Router();

router.post("",
  (req, res, next) => {
  const customer = new Customer({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    city: req.body.city,
    phone: req.body.phone,
    status: req.body.status
  });
  customer.save().then(createdCustomer => {
    res.status(201).json({
      message: "Customer added successfully",
      customerId: createdCustomer._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const customer = new Customer({
    _id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    city: req.body.city,
    phone: req.body.phone,
    status: req.body.status
  });
  Customer.updateOne({ _id: req.params.id }, customer).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const customerQuery = Customer.find();
  let fetchedCustomers;
  if(pageSize && currentPage) {
    customerQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  customerQuery
  .then(documents => {
    fetchedCustomers = documents;
    return Customer.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Customers fetched successfully!",
        customers: fetchedCustomers,
        maxCustomers: count
    });
  });
});

router.get("/:id", (req, res, next) => {
  Customer.findById(req.params.id).then(customer => {
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Customer deleted!" });
  });
});

module.exports = router;
