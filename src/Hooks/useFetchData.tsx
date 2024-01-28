//jshint esversion:9
import { useState, useEffect } from "react";
import instance from "../API";

interface usefetchreturn {
	data: any;
	loading: boolean;
	error: any;
}

const useFetchData = (url: string): usefetchreturn => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await instance.get(url);
				if (response.data) {
					setData(response.data);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
};

export default useFetchData;
