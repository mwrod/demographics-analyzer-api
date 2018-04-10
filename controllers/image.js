const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI_KEY
});

const handleApiCall = (req, res) => {
    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}

const handleSubmitImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if(entries.length){
                res.json(entries[0])
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('unable to get count'));
}

module.exports = { 
    handleSubmitImage,
    handleApiCall
};