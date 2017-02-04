const Promise = require('bluebird');
const mongodb = require('mongodb');
const Post = require('./Post')
const cName = 'like';

module.exports = class {
	constructor(commentObject) {
		this.postId = mongodb.ObjectID(commentObject.postId);
		this.userId = mongodb.ObjectID(commentObject.userId);
		this.timestamp = new Date().valueOf();
	}

	static findOne(query, projection) {
		return app.db.collection(cName).findOne(query, projection);
	}

	static findMultiple(query, projection) {
		return app.db.collection(cName).find(query, projection).toArray();
	}


	static update(query, update) {
		return app.db.collection(cname).update(query, update);
	}

	createNew() {
		let likeDetails = null;
		return app.db.collection(cName).insert(this)
			.then(_ => {
				likeDetails = _;
				return Post.update({
					_id: mongodb.ObjectID(this.postId)
				},{
					$pull: {
						like: mongodb.ObjectID(_.ops[0]['_id'])
					}
				});
			})
			.then( _0 => {
				return Promise.resolve(likeDetails);
			});
	}

	static findAllForPostId(postId) {
		return app.db.collection(cName).find({postId}).toArray();
	}

};