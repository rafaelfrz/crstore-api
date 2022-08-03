import controller from '../controllers/statusController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/status/destroy', controller.destroy)
	app.get('/status', controller.get)
	app.get('/status/:id', controller.get)
	app.post('/status/', controller.persist)
	app.post('/status/:id', controller.persist)
}