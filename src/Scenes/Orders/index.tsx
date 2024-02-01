import { Outlet, useOutletContext } from "react-router-dom";

function Orders() {
	const { userRole } = useOutletContext();

	return (
		<div>
			<Outlet context={{ userRole }} />
		</div>
	);
}

export default Orders;
