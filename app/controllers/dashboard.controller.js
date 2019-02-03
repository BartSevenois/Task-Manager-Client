var exports = module.exports = {}
var request = require('request-promise');

// GET
exports.renderDashboard = function (req, res) {
    res.render('dashboard/dashboard', {
        'page_title': 'Sign in',
        'user': {
            'firstname': req.session.user.firstname,
            'lastname': req.session.user.lastname
        },
        'tasks': ''
    });
}

exports.renderCreateTask = (req, res) => {
    res.render('dashboard/tasks/create_task', {
        page_title: 'Create task',
        'user': {
            'firstname': req.session.user.firstname,
            'lastname': req.session.user.lastname
        }
    })
}

exports.myTasks = (req, res) => {
    console.log(req.session.user);
    const createTask = {
        method: 'GET',
        uri: 'http://localhost:8080/api/tasks/user/' + req.session.user.id,
        headers: {
            "x-access-token": req.session.auth.accessToken,
        },
        json: true
    }

    request(createTask)
        .then(function (response) {
            console.log(response)
            res.render('dashboard/tasks/my_tasks', {
                user: req.session.user,
                tasks: response,
                page_title: 'My tasks'
            });

        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/dashboard');
        })
}

exports.taskDetail = (req, res) => {
    console.log(req.session.user);
    const createTask = {
        method: 'GET',
        uri: 'http://localhost:8080/api/task/' + req.params.id,
        headers: {
            "x-access-token": req.session.auth.accessToken,
        },
        body: {
            userId: req.session.user.id
        },
        json: true
    }

    request(createTask)
        .then(function (response) {
            console.log(response.title)
            res.render('dashboard/tasks/task_detail', {
                user: req.session.user,
                task: response[0],
                page_title: 'My tasks'
            });

        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/dashboard');
        })
  
}

// POST
exports.createTask = (req, res) => {

    const createTask = {
        method: 'POST',
        uri: 'http://localhost:8080/api/task/create',
        headers: {
            "x-access-token": req.session.auth.accessToken,
        },
        body: {
            title: req.body.title,
            description: req.body.description,
            deadlineDate: req.body.deadlineDate,
            deadlineTime: req.body.deadlineTime,
            status: req.body.status,
            userId: req.session.user.id
        },
        json: true
    }

    request(createTask)
        .then(function (response) {
            res.redirect('/myTasks');

        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/signup');
        })
}