import controller from '../controllers/addressController';
import Authenticate from '../utils/Authenticate';

export default (app) => {
    app.post('/address/destroy', Authenticate, controller.destroy),
    app.get('/address', Authenticate, controller.get),
    app.get('/address/:id', Authenticate, controller.get),
    app.post('/address', Authenticate, controller.persist),
    app.post('/address/:id', Authenticate, controller.persist)
}
