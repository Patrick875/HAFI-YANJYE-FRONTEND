import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { navitem } from "../../shared/types";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaSitemapSolid } from "react-icons/lia";
import { PiNotepadThin } from "react-icons/pi";
import { CiDiscount1, CiMap } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoAnalytics } from "react-icons/io5";
import TopBar from "./TopBar";
import { getUser } from "../../store";
import { useSelector } from "react-redux";
const navlinks: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <LuLayoutDashboard />,
		location: "admin",
	},
	{
		page: "products",
		link: "products",
		icon: <TfiShoppingCartFull />,
		location: "products",
	},
	{
		page: "Categories",
		link: "categories",
		icon: <LiaSitemapSolid />,
		location: "categories",
	},
	{
		page: "Orders",
		link: "orders",
		icon: <PiNotepadThin />,
		location: "orders",
	},
	{
		page: "Discounts",
		link: "discounts",
		icon: <CiDiscount1 />,
		location: "discounts",
	},
	{
		page: "Agents",
		link: "agents",
		icon: <CiDeliveryTruck />,
		location: "agents",
	},
	{
		page: "Suppliers",
		link: "suppliers",
		icon: <CiUser />,
		location: "suppliers",
	},
	{
		page: "Collecation locations",
		link: "locations",
		icon: <CiMap />,
		location: "locations",
	},
	{
		page: "Analytics",
		link: "analytics",
		icon: <IoAnalytics />,
		location: "analytics",
	},
];

const LogedInLayout = () => {
	const user = useSelector(getUser);
	const role: string = "ADMIN";
	const navs: navitem[] =
		role === "ADMIN"
			? navlinks
			: navlinks.filter((el) => el.link === "orders" || el.link === "");

	if (user) {
		return (
			<div className="grid w-full grid-cols-8 bg-primary-backg">
				<SideBar navlinks={navs} backgroundColor="bg-sidebar-bg" />
				<div className="col-span-6 ">
					<TopBar />
					<div className="px-6 py-1">
						<Outlet context={{ userRole: role }} />
					</div>
				</div>
			</div>
		);
	} else {
		return <Navigate to="/" />;
	}
};

export default LogedInLayout;
