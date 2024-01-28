import CryptoJS from "crypto-js";
export const serverUrl: string = "https://hafi-yanjye-api.onrender.com/";
export const testingUrl: string = "https://dummyjson.com/";
const mySecret: string = "hafi-yanjye-secret";

export const fileToDataURL = (file): string => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(file);
	});
};

export const encryptTokenAndStoreToLocalStorage = (data: string): void => {
	const encrypted = CryptoJS.AES.encrypt(data, mySecret).toString();
	localStorage.setItem("token", encrypted);
};

export const decryptAndRetrieveToken = (): string => {
	const encrypted = localStorage.getItem("token");
	const decrypted = CryptoJS.AES.decrypt(encrypted, mySecret).toString(
		CryptoJS.enc.Utf8
	);
	return decrypted;
};
