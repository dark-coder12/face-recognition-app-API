const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '7e4e7a4d5bf543e3b909e9549fa297bc'
});


const handleApiCall = (req, res) => {
 app.models
 	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
 	.then(data => {
 		res.json(data);
 	})
 	.catch(err => res.status(400).json('unable to work with API'))
}

const imageHandle = (req, res, db) => {

	const { id } = req.body;
	
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('404 - Not Found'));

});

app.listen(3001, () => {

	console.log('App is running on Port 3001');
}

module.exports = {

	handleImage: handleImage;
	handleApiCall: handleApiCall;
}