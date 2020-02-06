//jshint esversion: 8
const port = 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
let Campground = new mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Lacul Rosu",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9FVMx3IU8JwuuthJ2qQzsGxFMLMwEDSVmYwe_vXd2FtmGABXag&s",
//     description: "This is a beautiful lake, its green not red, so they say."
//   },
//   (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly created campground site");
//       console.log(campground);
//     }
//   }
// );

let campgrounds = [{
    name: "Salmon Creek",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRqV9A7CCffjsyGnqI8lqo2IaMy0abofUAza_PyYsoluNtBQk5&s"
  },
  {
    name: "Lacul Rosu",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9FVMx3IU8JwuuthJ2qQzsGxFMLMwEDSVmYwe_vXd2FtmGABXag&s"
  },
  {
    name: "Padurea Neagra",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWUMDdZ8rT-Vr8Pt7SC9aMqKXruPuO3sb1YpTPYH66CGz74EO-cw&s"
  }
];

app.get('/', (req, res) => {
  res.render("landing");
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        campgrounds: allCampgrounds
      });
    }
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render("new.ejs");
});

app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});

app.post('/campgrounds', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = {
    name: name,
    image: image,
    description: desc
  };
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});









app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
