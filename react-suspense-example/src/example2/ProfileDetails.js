import React from "react";
const ProfileDetails = ({ resource }) => {
	const user = resource.user.read();
	return (
		<div>
			<h2>{user.name}</h2>
			<p>Email: {user.email}</p>
			<p>Phone: {user.phone}</p>
			<p>Website: {user.website}</p>
		</div>
	);
};
export default ProfileDetails;
