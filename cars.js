var mongoose = require('mongoose');
var winston = require('winston');
var redis = require("redis");

// connect
mongoose.connect('mongodb://localhost/cars');

// schema object
var Schema = mongoose.Schema; 

// redis connect
var client = redis.createClient({host: '127.0.0.1', port : 27017});

// handler for disconnect
client.on("error", function (err) {
	winston.error("redis error " + err);
});

// Car
var CarSchema = new Schema({  
    model: { type: String, required: true, unique: true },  
    capacity: { type: String, required: true },      
    manufactureYear: Number
});

// the car model
var Car = mongoose.model('Car', CarSchema);

/**
Car API
*/

module.exports = exports = CarAPI = function(){
	// List all the cars
	this.list = function(req, res){
		// stats collection
		client.hincrby("stats", "list-calls-ok", 1, redis.print);

		return Car.find(function(err, cars){
			if(err){
				// stats collection
				client.hincrby("stats", "list-calls-ok",1, redis.print);
				winston.error(err);
				return res.send({status:500, msg : "Could not complete request"});
			}
			else{
				winston.info('Found % cars', JSON.stringify(cars));
				return res.send(cars);
			}
		});



	},
	// Find Car by Name
	this.findByName = function(req, res){
		// stats collection
		client.hincrby("stats", "find-calls",1, redis.print);

		// query
		return Car.find({name : req.params.name.toLowerCase()}, function(err, car){
			if(!err){
				// stats collection
				client.hincrby("stats", "find-calls-ok",1, redis.print);
				// send
				winston.info('Found %s', JSON.stringify(car));
				return res.send(car);
			}
			else{
				winston.warn('Not Found %s', err);
				return res.send(err);
			}
		});

	}
	// Create a new Car




	// Update a Car





	// Delete a Car
}
