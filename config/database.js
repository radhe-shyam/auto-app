let mongodb = require("mongodb");

module.exports = () => {

	let dbURI = 'mongodb://autoAdminRadhe:radheAdminAuto@ds137729.mlab.com:37729/automob';

	if(process.env.dbMode === 'offline') {
		dbURI = 'mongodb://127.0.0.1:27017/automob';
	}

	return mongodb.MongoClient.connect(dbURI);
};
