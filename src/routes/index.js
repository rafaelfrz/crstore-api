import usersRoute from "./usersRoute";
import productsRoute from "./productsRoute";
import categoriesRoute from "./categoriesRoute";
import addressRoute from "./addressRoute"
import discountRoute from "./discountRoute";
import paymentRoute from "./paymentRoute";
import orderRoute from "./orderRoute"
import statusRoute from "./statusRoute";

function Routes(app) {
	usersRoute(app);
	productsRoute(app);
	categoriesRoute(app);
	addressRoute(app);
	discountRoute(app);
	paymentRoute(app);
	orderRoute(app);
	statusRoute(app);
}

export default Routes;