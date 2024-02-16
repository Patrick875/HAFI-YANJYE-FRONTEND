import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../store";
import { useSelector } from "react-redux";

interface privateRoutesProps {
	allowedPositions?: string[];
	element: ReactElement;
}
export const PrivateRoutes = ({ element }: privateRoutesProps) => {
	const user = useSelector(getUser);
	const localHostUser = localStorage.getItem("user");
	const token = localStorage.getItem("token");
	if (!user && !token && !localHostUser) {
		return <Navigate to="/" />;
	} else {
		<Navigate to={`/admin`} />;
	}

	return element;
};
