const user = require('../../models/User');
const util = require('../../utilities');
module.exports = (req, res) => {

	let validation = util.validateReq(req.query, [
		'username'
	]);
	if (validation) {
		util.sendWrongInputError(res, validation);
	} else {

		user.findOne(
			{
				$or: [
					{email: req.query.username},
					{username: req.query.username}
				]
			}, {
				_id: 1,
				name: 1,
				age: 1,
				gender: 1,
				username: 1,
				email: 1,
				profilePictureUrl:1
			})
			.then((result) => {
				if(result){
					util.sendData(res, result);
				}else{
					util.sendWrongInputError(res, 'User not found.');
				}
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};

/**
 @api {GET} /user/info To get userinfo
 @apiName /user/info
 @apiGroup User

 @apiParam username string Username of user

 @apiParamExample {String} Example
 /user/info?username=radhe.shyam

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
    "profilePictureUrl": "https://pbs.twimg.com/profile_images/451489167659524096/5eHq-FXQ.jpeg"
  }
}
 */