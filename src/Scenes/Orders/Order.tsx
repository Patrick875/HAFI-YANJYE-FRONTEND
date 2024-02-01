import { Outlet, useOutletContext, useParams } from "react-router-dom";
import useFetchData from "../../Hooks/useFetchData";

function Order() {
	const { userRole: role } = useOutletContext();
	const { orderId } = useParams();
	const { data: order, loading } = useFetchData(`/orders/${orderId}`);

	return (
		<div>
			{loading && <p className="mt-12 text-xs text-center "></p>}
			{order && <Outlet context={{ role, order }} />}
		</div>
	);
}

export default Order;
