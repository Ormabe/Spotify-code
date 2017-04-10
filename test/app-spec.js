process.env.NODE_ENV = 'test'

var Sequelize = require('sequelize');
var request = require("supertest");
var expect = require('chai').expect;
var cheerio = require('cheerio');
var rewire = require('rewire');
var app = rewire('../backend/server');

var sinon = require('sinon');


describe("Spotify App", function () {

    beforeEach(function(){
        this.console = {
          log: sinon.spy()
        };
        app.__set__("console", this.console);
    });

    describe("Testing Connection", function() {

      it("should load the home page", function(done) {
          request(app).get("/").expect(200).end(function(err, res){
              var $ = cheerio.load(res.text);
              var pageHeading = $("head>title").text();
              expect(pageHeading).to.equal("Rabiya's Spotify App")
              done();
          });
      });
    });


    describe("Spotify API – ", function () {

        var db = require('../backend/models').Entry
        before(function(done){
          db.sync({force: true})
            .then(function(){
              done();
            });
        });

        describe("Testing GET request", function() {
          it("should GET all users from api/people", function(done) {
            request(app)
              .get("/api/people")
              .set("Content-Type", "/json/")
              .expect(200)
              .expect([])
              .end(function(err, res) {
                if (err) return done(err);
                done();
              });
          });
        });

        describe("Testing POST request", function(){
          it("should POST a new users to api/people", function(done) {
            request(app)
              .post("/api/people" )
              .type("form")
              .send({
                  name: "One",
                  favoriteCity: "User One City"
                })
                .expect(200)
                .end(function(err, res) {
                  if (err) return done(err);
                  done();
                });
            });
        });

        describe("Testing GET the last request", function() {
          it("should GET the last user from api/people", function(done) {
            request(app)
              .get("/api/people")
              .set("Content-Type", "/json/")
              .expect(200)
              .end(function(err, res) {
                if (err) return done(err);
                done();
              });
          });
        });

        describe("Testing PUT request", function(){
          it("should use PUT to change favoriteCity to newFavoriteCity", function(done){
            request(app)
              .get("/api/people")
              .query({favoriteCity: "User One City"})
              .set("Content-Type", "/json/")
              .expect(200)
              .end(function(err, res){
                request(app)
                  .put("/api/people")
                  .type('form')
                  .send({favoriteCity: "NEW User One City"})
                  .expect(200)
                  .end(function(err, res) {
                    if (err) return done(err);
                    done();
                  });
              });
          });
        });

        describe("Testing GET the last request", function() {
          it("should GET the last user from api/people", function(done) {
            request(app)
              .get("/api/people/1")
              .set("Content-Type", "/json/")
              .expect(200)
              .end(function(err, res) {
                if (err) return done(err);
                done();
              });
          });
        });

        describe("Testing DELETE request", function(){
          it("should DELETE user 1 from api/people", function(done) {
            request(app)
               .del("/api/people/1")
               .expect(200)
               .end(function(err, res) {
                 if (err) return done(err);
                 done();
               });
            });
        });

        describe("Testing GET request", function() {
          it("should GET all users from api/people", function(done) {
            request(app)
              .get("/api/people")
              .set("Content-Type", "/json/")
              .expect(200)
              .expect([])
              .end(function(err, res) {
                if (err) return done(err);
                done();
              });
          });
        });
    });
});
