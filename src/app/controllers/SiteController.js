const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mogoose");

const fs = require("fs");
const exec = require("exec");

class SiteController {
  // [GET] /
  index(req, res, next) {
    fs.readFile("./model/Ans_query.json", (err, data) => {
      if (err) throw err;
      var frame = JSON.parse(data);
      Course.find({})
        .then((courses) => {
          var courses_order = [];
          for (let i = 0; i < frame.length; i++){
            for (let j = 0; j < courses.length; j++){
              if (frame[i] == courses[j].keyframe) {
                courses_order.push(courses[j])
              }
            }
          }
          
          res.render("home",{ 
            courses: mutipleMongooseToObject(courses_order),
          });
        })
        .catch(next);
    });
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }

  // [POST] / or /search
  getData(req, res, next) {
    var query = req.body;
    var data = JSON.stringify(query);
    fs.writeFileSync('./model/Query.json', data);
    res.redirect('/')
  }

  // [GET] /Detail/:slug
  showDetail(req, res, next) {
    Course.findOne({ keyframe: req.params.idframe })
        .then((course) => {

            var frame_position = course.frame_position
            var frame_positions = []
            for (let i = 0; i < 25; i++){
              frame_positions.push(frame_position - 12 + i)
            }
            Course.find({ video: course.video, frame_position: frame_positions}).sort( { frame_position: 1 } )
              .then((courses) => {
                res.render('detail', {
                  courses: mutipleMongooseToObject(courses),
                });
              })
              .catch(next);
        })
        .catch(next);
  }

  // [GET] /KNN/:slug
  showKNN(req, res, next) {
    Course.findOne({ keyframe: req.params.idframe })
        .then((course) => {

            var frame_position = course.frame_position
            var frame_positions = []
            for (let i = 0; i < 25; i++){
              frame_positions.push(frame_position - 12 + i)
            }
            Course.find({ video: course.video, frame_position: frame_positions}).sort( { frame_position: 1 } )
              .then((courses) => {
                res.render('detail', {
                  courses: mutipleMongooseToObject(courses),
                });
              })
              .catch(next);
        })
        .catch(next);
  }

}

module.exports = new SiteController();
