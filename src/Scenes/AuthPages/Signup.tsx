import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
import AuthTitle from "./AuthTitle";
import { error } from "../../shared/types";
import instance from "../../API";

const Signup = () => {
	const { register, handleSubmit, watch, reset } = useForm();
	const password = watch("password") || "";
	const confirmPassword = watch("comfirmPassword") || "";
	const [success, setSuccess] = useState<boolean | null>(false);
	const [error, setError] = useState<boolean | null>(null);
	const [message, setMessage] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const handleOnFocus = () => {
		setSuccess(null);
		setError(null);
		setMessage([]);
	};
	const signup = async (data) => {
		console.log("data", data);

		setLoading(true);
		await instance
			.post("/auth/register", { ...data })
			.then((res) => {
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
				setMessage(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
				reset();
			});
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -50, transition: { duration: 0.5 } }}
			animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
			className="basis-5/6">
			<AuthTitle />

			<form onSubmit={handleSubmit(signup)} className="w-4/5 mx-auto mt-8">
				<p className="w-full text-sm font-medium text-center">Create Account</p>
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Fullname"
					{...register("fullName")}
					onFocus={handleOnFocus}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Telephone"
					{...register("telphone")}
					onFocus={handleOnFocus}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="email"
					placeholder="Email"
					{...register("email")}
					onFocus={handleOnFocus}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Password"
					{...register("password")}
					onFocus={handleOnFocus}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Confirm Password"
					{...register("comfirmPassword")}
					onFocus={handleOnFocus}
				/>
				<button
					type="submit"
					disabled={loading || confirmPassword !== password}
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
			{success && (
				<p className="w-full py-4 font-bold text-center text-teal-900 bg-teal-100">
					User signup success
				</p>
			)}
			{password != confirmPassword && (
				<p className="w-full text-xs text-center text-pink-900">
					Passwords don't match
				</p>
			)}
			{error &&
				message.map((mes) => (
					<div className="flex items-center justify-center w-4/5 p-2 mx-auto mt-2 bg-pink-100 border border-pink-700 ">
						<p className="text-xs font-medium text-center text-pink-800 capitalize align-middle ">
							{mes}
						</p>
					</div>
				))}
		</motion.div>
	);
};

export default Signup;
