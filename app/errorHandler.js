let errorHandler = (err, req, res, next) => {
	console.log(err.message, err.stack);
	if (res.headersSent) {
		return next(err);
	}
	res.status(500);
	res.send('My heart is having some obstecles.');
}

module.exports = errorHandler;
