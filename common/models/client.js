module.exports = function(Client) {
	Client.beforeRemote('login', function(ctx, unused, next) {
		var body = ctx.req.body;
		if (!body.email || !body.password) {
			ctx.res.status(401).send('Please fill in the required fields.').end();
		}

		Client.findOne({
			where: {
				email: body.email
			}
		}, function(err, result) {
			if (err) ctx.res.status(500).send('Error accessing database.').end();
			console.log('L14', 'err:', err, 'result:', result)
			if (!result) {
				ctx.res.status(401).send('The information entered is incorrect.').end();
			}
		});

		next();
	});

	Client.observe('before save', function(ctx, next) {
		Client.findOne({
			where: {
				email: ctx.instance.email
			}
		}, function(err, result) {
			if (err) next('Error accessing the database.');

			if (result) {
				next('User already exists.');
			}
			next();
		});
	});
};