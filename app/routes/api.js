var User = require('../models/user');
var jsonwebtoken = require('jsonwebtoken');

var config = require('../../config');

var secretKey = config.secretKey;

function createToken(user){

	return jsonwebtoken.sign({

		_id: user._id,
		name: user.name,
		username: user.username

	}, secretKey, {
		expiresInMinute: 1440
	});
}

module.exports = function(app, express){

	var api = express.Router();

	api.post('/signup', function(req, res){

		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		var token = createToken(user);

		user.save(function(err){

			if(err){
				res.send(err);
				return;
			}
			
			res.json({
				success: true,
				message: 'User has been created!',
				token: token
			});
		});
	});

	api.get('/users', function(req, res){

		User.find({}, function(err, users){
			if(err){
				res.send(err);
				return;
			}

			res.json(users);
		});
	});

	api.post('/login', function(req, res){

		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user){

			if(err) throw err;

			if(!user){
				res.send({message: "User doesnot exist"});
			}
			else if(user){

				var validPass = user.comparePassword(req.body.password);
				if(!validPass){
					res.send({message: "Incorrect password"});
				}
				else{
					// token
					var token = createToken(user);

					res.json({
						success: true,
						message: "Successfully logged in",
						token: token
					});
				}
			}


		});
	});

	api.use(function(req, res, next){

		var token = req.body.token || req.param("token") || req.headers["x-access-token"];

		if(token){
			
			jsonwebtoken.verify(token, secretKey, function(err, decoded){

				if(err){
					res.status(403).send({success: false, message: "Failed to authenticate User"});
				}
				else{
					req.decoded = decoded;
					next();
				}
			});
		}
		else{
			res.status(403).send({success: false, message: "No Token Provided"});
		}
	});

	api.get('/me', function(req, res){

		res.json(req.decoded);
	});

	return api;
};