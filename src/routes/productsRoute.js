import controller from '../controllers/productsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/items', Authenticate, controller.get)
	app.post('/items/persist', Authenticate, controller.persist)
	app.post('/items/destroy', Authenticate, controller.destroy)
}