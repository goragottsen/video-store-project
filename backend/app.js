const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const videoRoutes = require("./routes/videos");
const adminRoutes = require("./routes/admin");
const customerRoutes = require("./routes/customers");

const app = express();

mongoose.connect("mongodb://admin:Rfrltkf520@ds163226.mlab.com:63226/video_store", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Forwarding and allowing requests to access images folder
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*"); // no matter which domain used, it's allowed to access the resources
  res.setHeader('Access-Control-Allow-Headers',
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // meaning incoming requests MAY have these headers
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, HEAD, PUT, PATCH, DELETE, OPTIONS"); // which http verbs may be used to send requests (options is sent implicitly, has to be stated)
  next();
});

app.use("/api/videos", videoRoutes); // Methods from videos.js, filter to only urls starting with /api/videos
app.use("/api/admin", adminRoutes);
app.use("/api/customers", customerRoutes);

module.exports = app;
