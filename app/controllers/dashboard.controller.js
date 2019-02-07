var exports = module.exports = {}
var request = require('request-promise');
var taskAPI = require('../functions/tasksAPI');
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
    // Variables
    var token = req.session.auth.accessToken,
        userId = req.session.user.id;

    taskAPI.getMyTasks(token, userId, function (data) {
        res.render('dashboard/tasks/my_tasks', {
            user: req.session.user,
            tasks: data,
            page_title: 'My tasks'
        });
    })
}

exports.taskDetail = (req, res) => {
    // Variables
    var token = req.session.auth.accessToken,
        userId = req.session.user.id,
        taskId = req.params.id;

    taskAPI.getTask(token, taskId, userId, function (data) {
        res.render('dashboard/tasks/task_detail', {
            user: req.session.user,
            task: data[0],
            page_title: 'My tasks'
        });
    })
}

// POST
exports.createTask = (req, res) => {
    // Variables
    var token = req.session.auth.accessToken,
        title = req.body.title,
        description = req.body.description,
        deadlineDate = req.body.deadlineDate,
        deadlineTime = req.body.deadlineTime,
        status = req.body.status,
        userId = req.session.user.id;

    taskAPI.createTask(token, title, description, deadlineDate, deadlineTime, status, userId, function (data) {
        if (data === true) {
            res.redirect('/myTasks');
        }
    })

}

exports.updateTask = (req, res) => {
    // Variables
    var token = req.session.auth.accessToken,
        title = req.body.title,
        description = req.body.description,
        deadlineDate = req.body.deadlineDate,
        deadlineTime = req.body.deadlineTime,
        status = req.body.status,
        taskId = req.params.id;

    taskAPI.updateTask(token, title, description, deadlineDate, deadlineTime, status, taskId, function (data) {
        if (data === true) {
            res.redirect('/myTasks');
        }
    })
}