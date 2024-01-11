import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Scenes/AuthPages";
import ResetPassword from "./Scenes/AuthPages/ResetPassword";
import Signup from "./Scenes/AuthPages/Signup";
import Login from "./Scenes/AuthPages/Login";
import { AnimatePresence } from "framer-motion";
import LogedInLayout from "./Scenes/LogedInShared/LogedInLayout";

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
					<Route path="/admin" element={<LogedInLayout />}></Route>
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
