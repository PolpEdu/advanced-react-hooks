const wrapPromise = (promise) => {
	let status = "pending";
	let result;
	let suspender = promise.then(
		(r) => {
			status = "success";
			result = r;
		},
		(e) => {
			status = "error";
			result = e;
		}
	);
	return {
		read() {
			if (status === "pending") {
				throw suspender;
			} else if (status === "error") {
				throw result;
			} else if (status === "success") {
				return result;
			}
		},
	};
};
export const fetchProfileData = (userId) => {
	const userPromise = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json());
	const postsPromise = fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then((res) => res.json());
	return {
		user: wrapPromise(userPromise),
		posts: wrapPromise(postsPromise),
	};
};
