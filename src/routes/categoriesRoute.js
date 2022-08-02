import controller from '../controllers/categoriesController'

export default (app) => {
    app.post('/categories/destroy', controller.destroy),
    app.get('/categories', controller.get),
    app.get('/categories/:id', controller.get),
    app.post('/categories', controller.persist),
    app.post('/categories/:id', controller.persist)
}