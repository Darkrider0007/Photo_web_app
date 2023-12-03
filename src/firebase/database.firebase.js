/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	getMetadata,
	getStorage,
	listAll,
	ref,
	uploadBytes,
	uploadString,
} from "firebase/storage";
import conf from "../conf/config";

export class DatabaseService {
	firebaseConfig = {
		apiKey: conf.apiKey,
		authDomain: conf.authDomain,
		databaseURL: conf.databaseURL,
		projectId: conf.projectId,
		storageBucket: conf.storageBucket,
		messagingSenderId: conf.messagingSenderId,
		appId: conf.appId,
		measurementId: conf.measurementId,
	};
	analytics;
	storage;
	db;

	constructor() {
		const app = initializeApp(this.firebaseConfig);
		this.analytics = getAnalytics(app);
		this.storage = getStorage(app);
		this.db = getFirestore(app);
	}

	async uploadFile(uid, title, file) {
		try {
			const currentDateTime = new Date();
			const storageRef = ref(
				this.storage,
				`storage/${uid}/${file.name}`
			);
			const metadata = {
				contentType: 'image/jpeg',
				customMetadata: {
					title: title,
					time: currentDateTime.toLocaleString(),
				},
			};

			const uploadPromises = uploadBytes(storageRef, file, metadata)

			const results = await Promise.all(uploadPromises);

			const allUploadsSuccessful = results.every((result) => !!result);

			if (allUploadsSuccessful) {
				// console.log("All uploads successful!");
				return true;
			} else {
				console.log("Some uploads failed.");
				return false;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async listFiles(uid) {
		try {
			const storageRef = ref(this.storage, `storage/${uid}`);
			const listFiles = await listAll(storageRef);
			return listFiles;
		} catch (error) {
			throw error;
		}
	}

	async downloadUrl(item) {
		try {
			// console.log(item);
			const image = await getDownloadURL(item);
			// console.log(typeof image);
			return image;
		} catch (error) {
			throw error;
		}
	}

	async downloadUrlFromName(uid, name) {
		try {
			const storageRef = ref(this.storage, `storage/${uid}/${name}`);
			const image = await getDownloadURL(storageRef);
			return image;
		} catch (error) {
			throw error;
		}
	}
	async metadata(uid, item) {
		try {
			const metadataRef = ref(this.storage, `storage/${uid}/${item}`);
			return getMetadata(metadataRef).then((metadata) => {
				// console.log(metadata); 
				return metadata;
			}).catch((error) => {
				console.log(error);
				throw error; 
			});
		} catch (error) {
			throw error;
		}
	}
	

	async deleteItem(uid,filename) {
		try {
			// const filename = item._location.path_.split("/").pop();
			// console.log(filename);
			const storageRef = ref(this.storage, `storage/${uid}/${filename}`);
			await deleteObject(storageRef);
			return true;
		} catch (error) {
			throw error;
		}
	}
}

const databaseService = new DatabaseService();

export default databaseService;
