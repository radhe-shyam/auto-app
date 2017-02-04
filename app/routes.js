const user = require('./models/User');
const util = require('./utilities');
const mongodb = require('mongodb');
var express = require('express');
var routes = express.Router();


	let authentication = (req, res, next) => {
		var token = req.header('Authorization');
		if (util.isVoid(token)) {
			res.status(401).send("Not Authorized");
		} else {
			token = token.split(' ');
			if (util.isVoid(token[0]) || !mongodb.ObjectID.isValid(token[1])) {
				res.status(401).send("Not Authorized");
			} else {
				user.findOne({
					_id: mongodb.ObjectID(token[1]),
					authenticationKey: {$elemMatch: {code: token[0]}}
				})
					.then((result) => {
						if (!util.isVoid(result)) {
							req.user_id = token[1];
							next();
						} else {
							res.status(401).send("Not Authorized");
						}
					})
					.catch((err) => {
						util.catchTheCatch(res, err);
					});
			}
		}
	}

	routes.get('/', (req, res) => {
		res.redirect('http://oracle32.in');
	});
	routes.post('/user/register', require('./api/users/userRegister'))
	routes.post('/user/login', require('./api/users/userLogin'))
	routes.get('/user/info', require('./api/users/userInfo'));
	routes.get('/user/all', require('./api/users/userAll'));

	routes.post('/post/create', authentication, require('./api/post/postCreate'));
	routes.get('/post/details', authentication, require('./api/post/postDetails'));
	routes.get('/post/all', authentication, require('./api/post/postAll'));
	// routes.post('/post/like', authentication, require('./api/post/likePost'));
	routes.post('/post/createComment', authentication, require('./api/post/createComment'));

module.exports = routes;