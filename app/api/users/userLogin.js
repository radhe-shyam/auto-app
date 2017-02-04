const user = require('../../models/User');
const util = require('../../utilities');
const Promise = require('bluebird');
const crypto = require('crypto');
module.exports = (req, res) => {

	let validation = util.validateReq(req.body, [
		'username',
		'password'
	]);
	if( validation ){
		util.sendWrongInputError(res, validation);
	} else {
		let userData;
		user.login(req.body.username, req.body.password)
			.then( (result) => {
				if(!result){
					return Promise.reject('Wrong Username/Password');
				}
				let token = crypto.randomBytes(48).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
				userData = result;
				userData.token = token;
				return user.update(
					{$or:
						[
							{email: req.body.username},
							{username: req.body.username}
						]
					},{
						$push: {
							authenticationKey: {
								$each: [{code: token, timestamp: new Date().valueOf()}],
								$slice: -1
							}
						}
					});
			})
			.then( () => {
				util.sendData(res,userData);
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};

/**
 @api {POST} /user/login To login User
 @apiName /user/login
 @apiGroup User

 @apiParamExample {json} Example
 {
	"username":"radhe.shyam",
	"password":"password"
}

 @apiSuccessExample Success-Response:
 {
  "status": true,
  "data": {
    "_id": "5890bd886d27764039d7d389",
    "name": "radhe",
    "age": "24",
    "gender": "male",
    "username": "radhe.shyam",
    "email": "radhe@gmail.com",
    "profilePictureUrl": "https://pbs.twimg.com/profile_images/451489167659524096/5eHq-FXQ.jpeg",
    "token": "BaO-6SKEM6pKPNBFAhyy-CRIStEgyULkLCqfscJxLyXeQGqP1yI2KZT-rsuTc33_"
  }
}
 */