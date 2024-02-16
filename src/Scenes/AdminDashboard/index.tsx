import { useSelector } from "react-redux";
import { getUser } from "../../store";

const AdminDashboard = () => {
	const user = useSelector(getUser);

	return (
		<div>
			{user && (
				<div>
					{user.role === "ADMIN" ? (
						<p>Admin Dashboard</p>
					) : user.role === "AGENT" ? (
						<p>Agent Dashboard</p>
					) : user.role === "CUSTOMER" ? (
						<p>Customer Dashboard</p>
					) : (
						<p>User type not registered</p>
					)}
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
