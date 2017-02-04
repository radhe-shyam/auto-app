let express = require("express"),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	promise = require('bluebird'),
	config = require('./config/database'),
	routes = require('./app/routes');


global.Promise = promise;
global.app = app;
app.disable('x-powered-by');

app.use(morgan('combined'));

app.use(bodyParser.json());

app.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

// require('./app/routes');
app.use('/', routes);


app.use('/api/doc', express.static(__dirname+'/app'));

app.use( (req, res, next) => {
	res.send('You\'re lost.');
});

app.use(require('./app/errorHandler'));

app.start = () => {
	config()
		.then(database => {
			console.log("DB connection successful.");
			app.db = database;

			let server = app.listen(process.env.PORT || 5000, () => {
				let port = server.address().port;
				console.log("Server is running on:", port);
			});
		})
		.catch(err => {
			console.log(err);
			console.log('DB Connection Failed.');
			process.exit(1);
		});
};

app.start();
