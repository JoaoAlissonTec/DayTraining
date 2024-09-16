import { child, get, getDatabase, onValue, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";

function writeData(url, body) {
	const db = getDatabase();
	update(ref(db, url), body);
}

function getData(url) {
	const [week, setWeek] = useState();

	useEffect(() => {
		const db = getDatabase();
		const resp = ref(db, url);

		return onValue(resp, (snap)=> {
			let data = snap.val() ?? {}
			let weekItems = {...data}
			setWeek(weekItems);
		})
	}, []);

	return week
}

export { writeData, getData };
