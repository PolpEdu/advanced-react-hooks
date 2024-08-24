import React, { useState } from "react";
const ProfilePosts = ({ resource }) => {
	const posts = resource.posts.read();
	const [searchTerm, setSearchTerm] = useState("");
	const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
	return (
		<div>
			<h3>User Posts</h3>
			<input type="text" placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			<ul>
				{filteredPosts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	);
};
export default ProfilePosts;
