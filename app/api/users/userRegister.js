const user = require('../../models/User');
const util = require('../../utilities');
module.exports = (req, res) => {
	/
	request:


		/
	var r = {
		'name': 'radhe',
		'age': '24',
		'gender': 'male',
		'username': 'radhe.shyam',
		'email': 'radhe@gmail.com',
		'password': 'password',
		'profilePictureUrl': 'https://pbs.twimg.com/profile_images/451489167659524096/5eHq-FXQ.jpeg'
	};
	let validation = util.validateReq(req.body, [
		'name',
		'age',
		'gender',
		'username',
		'email',
		'password',
		'profilePictureUrl'
	]);
	if (validation) {
		util.sendWrongInputError(res, validation);
	} else {
		let newUser = new user(req.body);

		newUser.saveToDB()
			.then(() => {
				util.sendData(res, null);
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};

/**
 @api {POST} /user/register To Register New User
 @apiName /user/register
 @apiGroup User

 @apiParamExample {json} Example
 {
	"name":"radhe",
	"age":"24",
	"gender":"male",
	"username":"radhe.shyam",
	"email":"radhe@gmail.com",
	"password":"password",
	"profilePictureUrl": "https://pbs.twimg.com/profile_images/451489167659524096/5eHq-FXQ.jpeg"
}

 @apiSuccessExample Success-Response:
 {
 "status": true
 }
 */