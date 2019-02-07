var exports = module.exports = {}
var request = require('request-promise');
var validation = require('../functions/inputValidation');


exports.renderSignin = function (req, res) {
    res.render('auth/signin', {
        'page_title': 'Sign in',
        'errMail': req.query.errMail || '',
        'errPassword': req.query.errPassword || '',
    });
}

exports.renderSignup = (req, res) => {
    res.render('auth/signup')
}

exports.signin = (req, res) => {
    var email = req.body.email,
        password = req.body.password,
        errMail = '',
        errPassword = '';

    // Check email
    if (validation.isEmpty(email)) {
        errMail = errMail + 'Email is required';
    } else if (!validation.isEmail(email)) {
        errMail = errMail + 'This is not a valid email';
    }

    // Check password
    if (validation.isEmpty(password)) {
        errPassword = errPassword + 'Password is required';
    }

    // If err
    if (!errMail == '' || !errPassword == '') {
        res.redirect('/?errMail=' + errMail + '&errPassword=' + errPassword);
    } else {
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
                var errMail = '',
                    errPassword = '';

                if (err.error.auth == false && err.error.reason == 'User not found') {
                    errMail = 'Email is not found'
                }
                if (err.error.auth == false && err.error.reason == 'Invalid Password!') {
                    errPassword = 'Password is not correct'
                }
                
                res.redirect('/?errMail=' + errMail + '&errPassword=' + errPassword);
            })
    }



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