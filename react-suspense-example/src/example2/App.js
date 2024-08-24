import React, { Suspense, useState, useTransition } from "react";
import { fetchProfileData } from "./api";
import ProfileDetails from "./ProfileDetails";
import ProfilePosts from "./ProfilePosts";

const App = () => {
	// Initialize state for the current user ID
	const [userId, setUserId] = useState(1);

	// Use the useTransition hook to manage pending state updates
	// isPending: boolean indicating if a transition is in progress
	// startTransition: function to wrap state updates that may cause a transition
	const [isPending, startTransition] = useTransition();

	// Initialize the resource state with data for the initial user
	// useState with a function argument ensures this only runs once on mount
	const [resource, setResource] = useState(() => fetchProfileData(userId));

	// Handler function for changing the current user
	const handleUserChange = (newUserId) => {
		// Wrap the state updates in startTransition
		// This tells React these updates are not urgent and can be interrupted
		startTransition(() => {
			setUserId(newUserId);
			setResource(fetchProfileData(newUserId));
		});
	};
	return (
		<div className="App">
			<h1>User Profile</h1>
			{/* Show a loading indicator when a transition is in progress */}
			{isPending && <div>Loading...</div>}

			{/* Suspense boundary for ProfileDetails */}
			{/* The fallback UI is shown while the component is loading */}
			<Suspense fallback={<h2>Loading user details...</h2>}>
				<ProfileDetails resource={resource} />
			</Suspense>

			{/* Separate Suspense boundary for ProfilePosts */}
			{/* This allows for independent loading of posts */}
			<Suspense fallback={<h2>Loading posts...</h2>}>
				<ProfilePosts resource={resource} />
			</Suspense>

			<div>
				<button onClick={() => handleUserChange(1)}>User 1</button>
				<button onClick={() => handleUserChange(2)}>User 2</button>
				<button onClick={() => handleUserChange(3)}>User 3</button>
			</div>
		</div>
	);
};
export default App;
