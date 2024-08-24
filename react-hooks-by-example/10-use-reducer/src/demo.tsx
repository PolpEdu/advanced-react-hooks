import React from "react";

// Define the shape of our user state
interface UserState {
  name: string;
  lastname: string;
}

// Define the shape of our actions
interface Action {
  type: string;
  payload: any;
}

// Define action type constants to avoid typos
const actionIds = {
  setName: "setname",
  setLastname: "setlastname",
};

// Reducer function to handle state updates
const userInfoReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case actionIds.setName:
      return {
        ...state,
        name: action.payload,
      };
    case actionIds.setLastname:
      return {
        ...state,
        lastname: action.payload,
      };
    default:
      return state;
  }
};

// Props interface for the EditUsername component
interface Props {
  name: string;
  dispatch: React.Dispatch<Action>;
}

// EditUsername component, memoized to prevent unnecessary re-renders
const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
      onChange={(e) =>
        props.dispatch({ type: actionIds.setName, payload: e.target.value })
      }
    />
  );
});

// Main component
export const MyComponent = () => {
  // Use useReducer to manage state
  const [userInfo, dispatch] = React.useReducer(userInfoReducer, {
    name: "John",
    lastname: "Doe",
  });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      {/* EditUsername component for editing the name */}
      <EditUsername name={userInfo.name} dispatch={dispatch} />
      {/* Input for editing the lastname */}
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          dispatch({ type: actionIds.setLastname, payload: e.target.value })
        }
      />
    </>
  );
};