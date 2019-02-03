module.exports = function(app) {

    var authController = require('../controllers/auth.controller');

    app.get('/', authController.renderSignin);
    app.get('/signup', authController.renderSignup);
    app.get('/logout', (req, res) => {
        req.session.auth = undefined;
        res.redirect('/')
    })

    app.post('/signin', authController.signin);
    app.post('/signup', authController.signup);

}