import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
import AuthTitle from "./AuthTitle";
import { error } from "../../shared/types";

const Signup = () => {
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

			<form className="w-4/5 mx-auto mt-8">
				<p className="w-full text-sm font-medium text-center">Create Account</p>
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Fullname"
					{...register("fullname")}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Telephone"
					{...register("telephone")}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="email"
					placeholder="Email"
					{...register("email")}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Password"
					{...register("password")}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Confirm Password"
					{...register("confirmPassword")}
				/>
				<button
					disabled={loading}
					className={`  w-full py-2 mt-3 text-sm font-semibold text-center rounded-md ${
						!loading
							? " text-white bg-theme-yellow"
							: " text-yellow-700 bg-[#E4F1FE]"
					}`}>
					{!loading ? (
						"Signup"
					) : (
						<HashLoader color="#0C4981" loading={loading} size={15} />
					)}
				</button>
				<Link
					to="/"
					className="block my-2 mt-4 text-xs font-bold text-primary-violet">
					Login
				</Link>
			</form>

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

export default Signup;
