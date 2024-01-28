import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../store";
import { useSelector } from "react-redux";

interface privateRoutesProps {
	allowedPositions?: string[];
	element: ReactElement;
}
export const PrivateRoutes = ({
	allowedPositions,
	element,
}: privateRoutesProps) => {
	const user = useSelector(getUser);
	console.log("user", user);
	const token = localStorage.getItem("token");
	if (!user && !token) {
		return <Navigate to="/" />;
	} else {
		<Navigate to={`/admin`} />;
	}

	return element;
};
