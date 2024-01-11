import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const LogedInLayout = () => {
	return (
		<div>
			<SideBar />
			<Outlet />
		</div>
	);
};

export default LogedInLayout;
