import { useState } from "react";
import { error } from "../shared/types";
import instance from "../API";

const usePostData = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<error | null>(null);
	const postData = async <T,>(url: string, data: T) => {
		setIsLoading(true);
		await instance
			.post(`${url}`, data)
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
				setError({ status: true, message: "error !!!" });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return { postData, isLoading, error };
};

export default usePostData;
