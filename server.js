var express = require('express'),
    request = require('request-promise'),
    bodyParser = require('body-parser'),
    path = require('path'),
    session = require('express-session');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app/public'));
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));

// Routes
require('./app/routes/auth.route.js')(app);
require('./app/routes/dashboard.route.js')(app);

app.set('views', path.join(__dirname, '/app/views/'));
app.set('view engine', 'ejs');

app.get('/getAPIResponse', (req, res) => {
    const options = {
        method: 'POST',
        uri: 'http://localhost:8080/api/auth/signup',
        body: {
            "name": "OK",
            "username": "OK",
            "email": "ok@gmail.com",
            "roles": ["user", "admin", "pm"],
            "password": "test"
        },
        json: true
    }

    request(options)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err)
        })
});


var port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`))