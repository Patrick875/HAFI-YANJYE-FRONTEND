import { motion } from "framer-motion";
import loginArt from "../../assets/images/loginArt2.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import AuthTitle from "./AuthTitle";
import { error } from "../../shared/types";

const Login = () => {
	const { register } = useForm();
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	return (
		<motion.div
			initial={{ opacity: 0, x: -50, transition: { duration: 0.5 } }}
			animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
			className="basis-5/6">
			<AuthTitle />
			<div className="flex justify-center">
				<img src={loginArt} alt="computer login" className="block w-40 h-40" />
			</div>

			<form className="w-4/5 mx-auto ">
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Email/Username"
					{...register("username")}
				/>
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Password"
					{...register("password")}
				/>
				<button
					disabled={loading}
					className={`  w-full py-2 mt-3 text-sm font-semibold text-center rounded-md ${
						!loading
							? " text-white bg-theme-yellow"
							: " text-yellow-700 bg-[#E4F1FE]"
					}`}>
					{!loading ? (
						"Login"
					) : (
						<HashLoader color="#0C4981" loading={loading} size={15} />
					)}
				</button>
			</form>
			<p className="mt-3 text-sm text-center">
				Forgot your password ?{" "}
				<span className="font-medium text-primary-sky">
					<Link to="/reset-password">Reset password</Link>
				</span>
			</p>
			<Link
				to="register"
				className="block my-2 font-bold text-center text-primary-violet">
				Create Account
			</Link>
			{error && error.status && (
				<div className="flex items-center justify-center w-4/5 p-2 mx-auto mt-2 bg-pink-100 border border-pink-700 ">
					<p className="text-xs font-medium text-center text-pink-800 capitalize align-middle ">
						{error.message}
					</p>
				</div>
			)}
		</motion.div>
	);
};

export default Login;
