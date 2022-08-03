import controller from '../controllers/discountController'

export default (app) => {
    app.post('/discount/destroy', controller.destroy),
    app.get('/discount', controller.get),
    app.get('/discount/:id', controller.get),
    app.post('/discount', controller.persist),
    app.post('/discount/:id', controller.persist)
}