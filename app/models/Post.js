const Promise = require('bluebird');
const mongodb = require('mongodb');
const cName = 'post';

module.exports = class {
	constructor(postObject) {
		this.description = postObject.description;
		this.pictures = postObject.pictures || [];
		this.owner = mongodb.ObjectID(postObject.userId);
		this.likes = [];
		this.comment = [];
		this.timestamp = new Date().valueOf();
	}

	static findOne(query, projection) {
		return app.db.collection(cName).findOne(query, projection);
	}

	static findMultiple(query, projection) {
		return app.db.collection(cName).find(query, projection).toArray();
	}


	static update(query, update) {
		return app.db.collection(cName).update(query, update);
	}

	createNewPost() {
		return app.db.collection(cName).insert(this);
	}

	static createComment(comment, postId) {
		return app.db.collection(cName).insert({

		});
	}

	static findWithUserDetails(query) {
		return app.db.collection(cName).aggregate(query);
	}

};