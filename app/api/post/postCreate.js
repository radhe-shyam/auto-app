const Post = require('../../models/Post');
const util = require('../../utilities');
module.exports = (req, res) => {

	let validation = util.validateReq(req.body, []);
	if( validation ){
		util.sendWrongInputError(res, validation);
	} else {
		req.body.userId = req.user_id;
		let newPost = new Post(req.body);

		newPost.createNewPost()
			.then( (_) => {
				util.sendData(res, _.ops[0]);
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};

/**
 @api {POST} /post/create To create post
 @apiName /post/create
 @apiGroup Post

 @apiParamExample {json} Example
 {
  "description": "Hello this is it",
  "pictures": [
    "https://pbs.twimg.com/profile_images/451489167659524096/5eHq-FXQ.jpeg"
  ]
}

 @apiSuccessExample Success-Response:
 {
  "status": true,
  "data": {
    "description": "Hello this is it",
    "pictures": [
      "https://pbs.twimg.com/profile_images/451489167659524096/5eHq-FXQ.jpeg"
    ],
    "owner": "5890bd886d27764039d7d389",
    "likes": [],
    "comment": [],
    "timestamp": 1485965384091,
    "_id": "589208482a755305e1f7257d"
  }
}
 */