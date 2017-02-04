const Promise = require('bluebird');
const cName = 'users';

module.exports = class {
	constructor(userObject){
		this.name = userObject.name;
		this.age = userObject.age;
		this.gender = userObject.gender;
		this.username = userObject.username;
		this.email = userObject.email;
		this.password = userObject.password;
		this.profilePictureUrl = userObject.profilePictureUrl;
		this.authenticationKey = [];
		this.timestamp = new Date().valueOf();
	}
	
	static findOne(query, projection){
		return app.db.collection(cName).findOne(query, projection);
	}

	static findMultiple(query, projection){
			return app.db.collection(cName).find(query, projection).toArray();
	}


	static login(usernameOrEmail, password){
		return this.findOne(
			{$and:
				[
					{$or:
						[
							{email: usernameOrEmail},
							{username: usernameOrEmail}
						]
					},
					{password: password}
				]},
			{
				authenticationKey: 0,
				password: 0,
				timestamp: 0
			});
	}

	static update(query, update){
			return app.db.collection(cName).update(query, update);
	}

	saveToDB(){
		console.log('thisssss===>>',this);
		return this.constructor.findOne({username:this.username}, {_id:1})
			.then( (res) => {
				if(res)
					return Promise.reject('Username Already Exists.');
				return this.constructor.findOne({email:this.email}, {_id:1});
			})
			.then( (res) => {
				if(res)
					return Promise.reject('Email-id Already Exists.');
				return app.db.collection('users').insert(this);
			});
	}

};


var sample = {
	name:"radhe",
	age:20,
	gender:"Male",
	username:"radheShyam",
	email:"radhe@gmail.com",
	password:"radaf",
	authenticationKey:[],
	profilePictureUrl: "",
	timestamp: ""
}