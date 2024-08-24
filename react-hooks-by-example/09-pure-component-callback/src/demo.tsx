import React from "react";

interface Props {
  onReset: () => void;
}

// has react memo heres
const ResetValue: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rendered the first time you click the reset Button, check React.memo + callback"
  );

  return <button onClick={props.onReset}>Reset value</button>;
});

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");

  // useCallback will return a memoized version of the callback
  // that only changes if one of the dependencies has changed

  // ELI5: it will return the same function if the dependencies are the same
  const resetNameCallback = React.useCallback(() => setUsername(""), []);

  // useCallback will return a memoized version of the callback.
  // if we didn't use useCallback here, the function would be recreated
  // every time the component re-renders

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <ResetValue onReset={resetNameCallback}>Reset name</ResetValue>
    </>
  );
};
