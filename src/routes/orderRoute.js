import controller from '../controllers/orderController'

export default (app) => {
    app.post('/order/destroy', controller.destroy),
    app.get('/order', controller.get),
    app.get('/order/:id', controller.get),
    app.post('/order', controller.persist),
    app.post('/order/:id', controller.persist)
}