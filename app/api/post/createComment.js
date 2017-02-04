const Comment = require('../../models/Comment');
const util = require('../../utilities');
module.exports = (req, res) => {

	let validation = util.validateReq(req.body, [
		'postId',
		'comment'
	]);
	if( validation ){
		util.sendWrongInputError(res, validation);
	} else {
		req.body.userId = req.user_id;
		let newComment = new Comment(req.body);

		newComment.createNew()
			.then( (_) => {
				util.sendData(res, _.ops[0]);
			})
			.catch((err) => {
				util.catchTheCatch(res, err);
			});
	}

};

/**
 @api {POST} /post/createComment To create comment on post
 @apiName /post/createComment
 @apiGroup Post

 @apiParamExample {json} Example
 {
   "postId": "589208482a755305e1f7257d",
   "comment":"first comment"
 }


 @apiSuccessExample Success-Response:
 {
  "status": true,
  "data": {
    "postId": "589208482a755305e1f7257d",
    "userId": "5890bd886d27764039d7d389",
    "timestamp": 1485967467101,
    "_id": "5892106b3bb8de0af159053b"
  }
}
 */