import controller from '../controllers/addressController'

export default (app) => {
    app.post('/address/destroy', controller.destroy),
    app.get('/address', controller.get),
    app.get('/address/:id', controller.get),
    app.post('/address', controller.persist),
    app.post('/address/:id', controller.persist)
}