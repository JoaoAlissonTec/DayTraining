import { child, get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";

function writeData(url, body) {
	const db = getDatabase();
	console.log(body)
	update(ref(db, url), body);
}

function getData(url) {
	const [value, setValue] = useState();

	useEffect(() => {
		const db = getDatabase();
		const resp = ref(db, url);

		return onValue(resp, (snap)=> {
			let data = snap.val() ?? {}
			let valueItems = {...data}
			setValue(valueItems);
		})
	}, []);

	return value
}

function deleteData(url) {
	const db = getDatabase();
	remove(ref(db, url))
}

export { writeData, getData, deleteData };
