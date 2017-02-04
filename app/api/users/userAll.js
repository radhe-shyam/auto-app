const user = require('../../models/User');
const util = require('../../utilities');
module.exports = (req, res) => {

	user.findMultiple(
		{}, {
			_id: 0,
			name: 1,
			age: 1,
			gender: 1,
			username: 1,
			email: 1,
			profilePictureUrl:1
		})
		.then((result) => {
			if (result) {
				util.sendData(res, result);
			} else {
				util.sendWrongInputError(res, 'Users not found.');
			}
		})
		.catch((err) => {
			util.catchTheCatch(res, err);
		});

};

/**
 @api {GET} /user/all To fetch all Users
 @apiName /user/all
 @apiGroup User


 @apiSuccessExample Success-Response:
 {
   "status": true,
   "data": [
	 {
	   "name": "radhe",
	   "age": "24",
	   "gender": "male",
	   "username": "radhe.shyam",
	   "email": "radhe@gmail.com",
	   "profilePictureUrl": "https://pbs.twimg.com/profile_images/451489167659524096/5eHq-FXQ.jpeg"
	 }
   ]
 }
 */