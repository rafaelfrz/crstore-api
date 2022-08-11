import controller from '../controllers/usersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/users/register', controller.register)
	app.post('/users/login', controller.login)
	app.get('/users/', Authenticate, controller.get)
	app.get('/users/:id', Authenticate ,controller.get)
	app.get('/users/validate-token', controller.validateToken)
}
