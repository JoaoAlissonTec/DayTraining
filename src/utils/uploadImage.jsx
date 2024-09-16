import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const getBlobFromUri = async (uri) => {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
			reject(new TypeError("Network request failed"));
		};
		xhr.responseType = "blob";
		xhr.open("GET", uri, true);
		xhr.send(null);
	});

	return blob;
};

async function uploadImage(uri, imgName, mime = "image/jpeg") {
	try {
		const fileBlob = await getBlobFromUri(uri);
		const storage = getStorage();
		const storageRef = ref(storage, `images/profile/${imgName}.jpg`);

		const metadata = {
			contentType: mime,
		};

		await uploadBytes(storageRef, fileBlob, metadata);
		console.log("Image uploaded successfully");

		const downloadURL = await getDownloadURL(storageRef);
		console.log("Download URL:", downloadURL);

		return downloadURL;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw error;
	}
}

export { uploadImage };
