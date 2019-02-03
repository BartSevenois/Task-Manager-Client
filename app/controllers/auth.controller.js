var exports = module.exports = {}
var request = require('request-promise')
exports.renderSignin = function (req, res) {
    res.render('auth/signin', {
        'page_title': 'Sign in'
    });
}

exports.renderSignup = (req, res) => {
    res.render('auth/signup')
}

exports.signin = (req, res) => {
    const signin = {
        method: 'POST',
        uri: 'http://localhost:8080/api/auth/signin',
        body: {
            "email": req.body.email,
            "password": req.body.password
        },
        json: true
    }

    request(signin)
        .then(function (response) {
            req.session.auth = response;
            console.log(req.session.auth);
            const user = {
                method: 'GET',
                uri: 'http://localhost:8080/api/test/user',
                headers: {
                    "x-access-token": req.session.auth.accessToken,
                },
                json: true
            }
            request(user)
                .then(function (user) {
                    console.log(user);
                    req.session.user = {
                        firstname: user.user.first_name,
                        lastname: user.user.last_name,
                        id: user.user.id
                    }
                    res.redirect('/dashboard');
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
        .catch(function (err) {
            console.log(err)
        })
}
exports.signup = (req, res) => {
    const signup = {
        method: 'POST',
        uri: 'http://localhost:8080/api/auth/signup',
        body: {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            roles: ["user"],
            password: req.body.password,
        },
        json: true
    }

    request(signup)
        .then(function (response) {
            req.session.auth = response;
            res.redirect('/');
            
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/signup');
        })
}