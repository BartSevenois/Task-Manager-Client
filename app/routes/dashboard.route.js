module.exports = function(app) {

    var dashboardController = require('../controllers/dashboard.controller');

    app.get('/dashboard', isLoggedIn, dashboardController.renderDashboard);

    app.get('/createTask', isLoggedIn, dashboardController.renderCreateTask);

    app.get('/myTasks', isLoggedIn, dashboardController.myTasks);

    app.get('/tasks/:id', isLoggedIn, dashboardController.taskDetail)


    app.post('/createTask', dashboardController.createTask);
    app.post('/updateTask/:id', dashboardController.updateTask);



	function isLoggedIn(req, res, next){
        if (req.session.auth == undefined) {
            res.redirect('/');
        } else if (req.session.auth.auth == true) {
            return next();
        }
    }
}