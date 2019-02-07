var request = require('request-promise');
exports.getMyTasks = (token, userId, callback) => {
    const createTask = {
        method: 'GET',
        uri: 'http://localhost:8080/api/tasks/user/' + userId,
        headers: {
            "x-access-token": token,
        },
        json: true
    }

    request(createTask)
        .then(function (response) {
            callback(response)

        })
        .catch(function (err) {

        })
}

exports.getTask = (token, taskId, userId, callback) => {
    const createTask = {
        method: 'GET',
        uri: 'http://localhost:8080/api/task/' + taskId,
        headers: {
            "x-access-token": token,
        },
        body: {
            userId: userId
        },
        json: true
    }

    request(createTask)
        .then(function (response) {
            callback(response)

        })
        .catch(function (err) {

        })
}

exports.createTask = (token, title, description, deadlineDate, deadlineTime, status, userId, callback) => {
    const createTask = {
        method: 'POST',
        uri: 'http://localhost:8080/api/task/create',
        headers: {
            "x-access-token": token,
        },
        body: {
            title: title,
            description: description,
            deadlineDate: deadlineDate,
            deadlineTime: deadlineTime,
            status: status,
            userId: userId
        },
        json: true
    }

    request(createTask)
        .then(function (response) {
            callback(true)

        })
        .catch(function (err) {})
}

exports.updateTask = (token, title, description, deadlineDate, deadlineTime, status, taskId, callback) => {

    const updateTask = {
        method: 'POST',
        uri: 'http://localhost:8080/api/task/update/' + taskId,
        headers: {
            "x-access-token": token,
        },
        body: {
            title: title,
            description: description,
            deadlineDate: deadlineDate,
            deadlineTime: deadlineTime,
            status: status
        },
        json: true
    }

    request(updateTask)
        .then(function (response) {
            callback(true)

        })
        .catch(function (err) {

        })
}