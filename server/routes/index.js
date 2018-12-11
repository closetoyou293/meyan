module.exports =  (app) => {
    //Index Route
    app.get('/', (req, res) => {
        res.send('Index Page')
    })
};
