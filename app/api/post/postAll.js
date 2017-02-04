const Post = require('../../models/Post');
const util = require('../../utilities');
module.exports = (req, res) => {

	Post.findWithUserDetails(
		[
			{
				$lookup:{
					from:"users",
					localField:"owner",
					foreignField:"_id",
					as:"owner"
				}
			},
			{
				$project:{
					location:1,
					titlePicture:1,
					"owner._id":1,
					"owner.name":1,
					"owner.email":1,
					"owner.profilePictureUrl":1,
				}
			}
		])
		.then((result) => {
			if (result) {
				util.sendData(res, result);
			} else {
				util.sendWrongInputError(res, 'Stories not found.');
			}
		})
		.catch((err) => {
			util.catchTheCatch(res, err);
		});

};