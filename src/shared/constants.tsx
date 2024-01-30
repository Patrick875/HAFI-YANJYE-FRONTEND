import CryptoJS from "crypto-js";
// export const serverUrl: string = "https://hafiyanjyev1-1hbfokff.b4a.run/";
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

export function formatDate(customDateString: string): string {
	const date = new Date(customDateString);

	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString();
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${day}/${month}/${year} ${hours}:${minutes}`;
}
