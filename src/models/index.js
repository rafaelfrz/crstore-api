import User from "./User";
import Product from "./Product";
import Address from "./Address";
import Order from "./Order";
import Payment from "./Payment";
import Discount from "./Discount";
import Category from "./Category";
import OrderProducts from "./OrderProduct";
import Status from "./Status"

(async () => {
    await User.sync({ force: true })
    await Payment.sync({ force: true })
    await Discount.sync({ force: true })
    await Category.sync({ force: true })
    await Address.sync({ force: true })
    await Status.sync({ force: true })
    await Product.sync({ force: true })
    await Order.sync({ force: true })
    await OrderProducts.sync({ force: true })
})();