const express = require("express");
const Video = require('../models/video'); // Capital by convention
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");  // Path is relative to server.js file
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
}); // Defines where multer should store files

// Adding a new video
router.post("", multer({storage: storage}).single('image'),
(req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const video = new Video({
    title: req.body.title,
    runningTime: req.body.runningTime,
    genre: req.body.genre,
    rating: req.body.rating,
    director: req.body.director,
    status: req.body.status,
    imagePath: url + '/images/' + req.file.filename,
    customerName: ''
  });
  video.save().then(createdVideo => {
    res.status(201).json({  // status: everything is ok, a new resource was created
      message: 'Video added successfully',
      video: {
        ...createdVideo,
        id: createdVideo._id
      }
    });
  });
});

// Updating a video
router.put(
  "/:id",
  multer({storage: storage}).single('image'),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
    }
    const video = new Video({
      _id: req.body.id,
      title: req.body.title,
      runningTime: req.body.runningTime,
      genre: req.body.genre,
      rating: req.body.rating,
      director: req.body.director,
      status: req.body.status,
      imagePath: imagePath,
      customerName: req.body.customerName
  });
  Video.updateOne({_id: req.params.id }, video).then(
    result => {
      res.status(200).json({message: 'Update successful!' });
    }
  );
})

// Fetching videos from db
router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const videoQuery = Video.find();
  let fetchedVideos;
  if (pageSize && currentPage) {
    videoQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  videoQuery
    .then(documents => {
      fetchedVideos = documents;
      return Video.countDocuments();
      })
    .then(count => {
      res.status(200).json({
        message: 'Videos fetched successfully!',
        videos: fetchedVideos,
        maxVideos: count
    });
  });
});

// Check if the video is in db
router.get("/:id", (req, res, next) => {
  Video.findById(req.params.id).then(video => {
    if (video) {
      res.status(200).json(video);
    } else {
      res.status(404).json({message: 'Video not found!'});
    }
  });
});

// Delete route
router.delete("/:id", (req, res, next) => {
  Video.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({ message: 'Video deleted!'});
});

module.exports = router;
