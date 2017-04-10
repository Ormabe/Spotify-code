// REQUIRE IN EXPRESS
const express = require('express');

// CREATE AN INSTANCE OF EXPRESS ROUTER
const router = express.Router();

// REQUIRE IN MODELS
const Entry = require('./models').Entry;
const models = require('./models');



router.route('/')
	.post((req,res) => {
		return Entry.create({
		  name: req.body.name,
		  favoriteCity: req.body.favoriteCity
		})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			print('Error:'+ err.message);
		})

	})

	.get((req,res) => {
		Entry.findAll({
			order:[['createdAt', 'DESC']]
		})
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			print('Error:'+ err.message);
		})
	})

	.put((req,res) =>{
		return Entry.findAll({
		    where: {
		      favoriteCity: req.body.favoriteCity
		    }
			})
		.then((city) => {
	  	city.forEach((newCity) => {
	        newCity.update({
	        	favoriteCity: req.body.newFavoriteCity
	        },{
	        	returning: true,
	        	plain: true
	        });
	    });
		})
		.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			print('Error:' + err.message)
		})
	})

router.route('/:id')
	.get((req, res) => {
	  	Entry.findById(req.params.id)
	    .then((data) => {
				res.send(data);
	    })
	    .catch((err) => {
	    	print('Error:'+ err.message);
	    })
	})

	.delete((req, res) => {
		Entry.findById(req.params.id)
		.then((people) => {
			people.destroy()
		})
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			print("Error:" + err.message);
		})
	})

module.exports = router;
