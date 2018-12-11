module.exports = (app) => {
    //User Route
    app.get('/', (req, res) => {
        db.user.find({}).then(data => res.json(data))
    });
};