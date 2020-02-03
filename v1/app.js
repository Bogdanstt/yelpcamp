//jshint esversion: 8
const port = 3000;
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const campgrounds = [
  {name:"Salmon Creek", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRqV9A7CCffjsyGnqI8lqo2IaMy0abofUAza_PyYsoluNtBQk5&s"},
  {name:"Lacul Rosu", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9FVMx3IU8JwuuthJ2qQzsGxFMLMwEDSVmYwe_vXd2FtmGABXag&s"},
  {name:"Padurea Neagra", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWUMDdZ8rT-Vr8Pt7SC9aMqKXruPuO3sb1YpTPYH66CGz74EO-cw&s"},
  {name:"Salmon Creek", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRqV9A7CCffjsyGnqI8lqo2IaMy0abofUAza_PyYsoluNtBQk5&s"},
  {name:"Lacul Rosu", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9FVMx3IU8JwuuthJ2qQzsGxFMLMwEDSVmYwe_vXd2FtmGABXag&s"},
  {name:"Padurea Neagra", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWUMDdZ8rT-Vr8Pt7SC9aMqKXruPuO3sb1YpTPYH66CGz74EO-cw&s"}
];


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("landing");
});

app.get('/campgrounds', (req, res) => {

  res.render("campgrounds", {campgrounds:campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
  res.render("new.ejs");
});

app.post('/campgrounds', (req, res) => {
 let name = req.body.name;
 let image = req.body.image;
 let newCampground = {name: name, image: image};

 campgrounds.push(newCampground);
res.redirect('/campgrounds');
});









app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
