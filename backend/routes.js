// REQUIRE IN EXPRESS
const express = require('express');

// CREATE AN INSTANCE OF EXPRESS ROUTER
const router = express.Router();

// REQUIRE IN MODELS
const People = require('./models').People;
const Cities = require('./models').Cities;
const models = require('./models');

  router.route('/')
   .get((req, res) => {
      return People.findAll({
        include: [Cities]
      })
      .then((data) => {
        res.send(data)
      })
      .catch((err)=> {
        console.log(err)
      })
    })

    .post((req, res) => {
    	return Cities.findOrCreate({
    		where: {
    			city: req.body.favoriteCity
    		}
    	})
    	.then((data) => {
    		console.log('data: ', data[0].dataValues.id)
    		return People.findOrCreate({
    			where: {
    				name: req.body.name,
    				favoriteCity: data[0].dataValues.id
    			},
    			include: [Cities]
    		})
    	})
    	.then((data) => {
    		res.send(data);
    	})
    	.catch((err) => {
    		console.log(err);
    	})
    })




  router.route('/')
   .put((req,res) => {
      Cities.findAll({
        where: {
          name: req.body.name
        },
        include: []
      })
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })

  .delete((req, res) => {
      People.findById({
        where: {
          id: req.params.id
        }
      })
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })

  router.route('/:id')
    .delete((req, res) => {
      People.findById({
          where: {
            id: req.params.id
          }
        })
        .then(function(data) {
          data.destroy()
        })
        .then((data) => {
          console.log('Deleted!')
          res.send(data)
        })
        .catch((err) => {
          res.send(err)
        })
      })

module.exports = router;
