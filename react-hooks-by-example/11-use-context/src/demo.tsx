import React, { useContext, useState, useCallback } from "react";

// Define the shape of our UserContext
interface UserContext {
  username: string;
  setUsername: (value: string) => void;
}

// Create a context with a default value
const MyContext = React.createContext<UserContext | undefined>(undefined);

// Custom hook to use the context
const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
}

// Props type for the provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Global context provider component
export const MyContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("John Doe");
  const value = React.useMemo(() => ({ username, setUsername }), [username]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// Component to edit the username
const MyEditComponent: React.FC = () => {
  const { username, setUsername } = useMyContext();
  const [newUsername, setNewUsername] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  }, []);

  const handleSave = useCallback(() => {
    if (newUsername.trim() !== "") {
      setUsername(newUsername);
      setNewUsername("");
    }
  }, [newUsername, setUsername]);

  return (
    <div>
      <input
        placeholder={username}
        value={newUsername}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

// Main component that uses the context
const MyComponent: React.FC = () => {
  const { username } = useMyContext();

  return (
    <>
      <h3>Current username: {username}</h3>
      <MyEditComponent />
    </>
  );
};

// App component that wraps everything with the provider
export const AppProviers: React.FC = () => {
  return (
    <MyContextProvider>
      <MyComponent />
    </MyContextProvider>
  );
};