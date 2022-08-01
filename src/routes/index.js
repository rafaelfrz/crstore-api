import usersRoute from "./usersRoute";
import productsRoute from "./productsRoute";

function Routes(app) {
	usersRoute(app);
	productsRoute(app);
}

export default Routes;