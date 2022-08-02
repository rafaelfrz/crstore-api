import usersRoute from "./usersRoute";
import productsRoute from "./productsRoute";
import categoriesRoute from "./categoriesRoute";

function Routes(app) {
	usersRoute(app);
	productsRoute(app);
	categoriesRoute(app);
}

export default Routes;