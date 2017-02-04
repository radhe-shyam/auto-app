const Promise = require('bluebird');
const mongodb = require('mongodb');
const Post = require('./Post')
const cName = 'comment';

module.exports = class {
	constructor(commentObject) {
		this.postId = mongodb.ObjectID(commentObject.postId);
		this.description = commentObject.description;
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
		let commentDetails = null;
		return app.db.collection(cName).insert(this)
			.then(_ => {
				commentDetails = _;
				return Post.update({
					_id: mongodb.ObjectID(this.postId)
				},{
					$push: {
						comment: mongodb.ObjectID(_.ops[0]['_id'])
					}
				});
			})
			.then( _0 => {
				return Promise.resolve(commentDetails);
			});
	}

	static findAllForPostId(postId) {
		return app.db.collection(cName).find({postId}).toArray();
	}

};