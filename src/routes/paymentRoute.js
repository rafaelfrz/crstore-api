import controller from '../controllers/paymentController'

export default (app) => {
    app.post('/payment/destroy', controller.destroy),
    app.get('/payment', controller.get),
    app.get('/payment/:id', controller.get),
    app.post('/payment', controller.persist),
    app.post('/payment/:id', controller.persist)
}