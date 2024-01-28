import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Scenes/AuthPages";
import ResetPassword from "./Scenes/AuthPages/ResetPassword";
import Signup from "./Scenes/AuthPages/Signup";
import Login from "./Scenes/AuthPages/Login";
import { AnimatePresence } from "framer-motion";
import LogedInLayout from "./Scenes/LogedInShared/LogedInLayout";
import AdminDashboard from "./Scenes/AdminDashboard";
import Products from "./Scenes/Products";
import Categories from "./Scenes/Categories";
import Orders from "./Scenes/Orders";
import Discounts from "./Scenes/Discounts";
import Agents from "./Scenes/Agents";
import Suppliers from "./Scenes/Suppliers";
import Locations from "./Scenes/Locations";
import Analytics from "./Scenes/Analytics";
import AllProducts from "./Scenes/Products/AllProducts";
import CreateProduct from "./Scenes/Products/CreateProduct";
import BulkCreateProducts from "./Scenes/Products/BulkCreateProducts";
import AllCategories from "./Scenes/Categories/AllCategories";
import CreateCategory from "./Scenes/Categories/CreateCategory";
import Page404 from "./Scenes/ErrorPages/Page404";
import { PrivateRoutes } from "./shared/PrivateRoutes";
import AllDiscounts from "./Scenes/Discounts/AllDiscounts";
import DiscCoupLayout from "./Scenes/Discounts/DiscCoupLayout";
import AllCoupons from "./Scenes/Discounts/AllCoupons";
import CreateDiscount from "./Scenes/Discounts/CreateDiscount";
import DiscountDetails from "./Scenes/Discounts/DiscountDetails";
import CreateCoupon from "./Scenes/Discounts/CreateCoupon";
import CouponDetails from "./Scenes/Discounts/CouponDetails";
import AllOrders from "./Scenes/Orders/AllOrders";
import ViewOrder from "./Scenes/Orders/ViewOrder";

function App() {
	return (
		<>
			<AnimatePresence>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route index element={<Login />} />
						<Route path="register" element={<Signup />} />
						<Route path="reset-password" element={<ResetPassword />} />
					</Route>
					<Route
						path="/admin"
						element={<PrivateRoutes element={<LogedInLayout />} />}>
						<Route index element={<AdminDashboard />} />
						<Route path="products" element={<Products />}>
							<Route index element={<AllProducts />} />
							<Route path="create" element={<CreateProduct />} />
							<Route path="bulk-create" element={<BulkCreateProducts />} />
						</Route>
						<Route path="categories" element={<Categories />}>
							<Route index element={<AllCategories />} />
							<Route path="create" element={<CreateCategory />} />
						</Route>
						<Route path="orders" element={<Orders />}>
							<Route index element={<AllOrders />} />
							<Route path=":orderID" element={<ViewOrder />} />
						</Route>
						<Route path="discounts" element={<DiscCoupLayout />}>
							<Route index element={<AllDiscounts />} />
							<Route path="create" element={<CreateDiscount />} />
							<Route path=":id" element={<DiscountDetails />} />
							<Route path="coupons" element={<AllCoupons />}>
								<Route path="create" element={<CreateCoupon />} />
								<Route path=":id" element={<CouponDetails />} />
							</Route>
						</Route>
						<Route path="agents" element={<Agents />} />
						<Route path="suppliers" element={<Suppliers />} />
						<Route path="locations" element={<Locations />} />
						<Route path="analytics" element={<Analytics />} />
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
