import controller from '../controllers/productsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/products/destroy', controller.destroy)
	app.get('/products', controller.get)
	app.get('/products/:id', controller.get)
	app.post('/products/persist', controller.persist)
	app.post('/products/persist/:id', controller.persist)
}