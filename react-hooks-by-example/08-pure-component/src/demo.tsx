import React from "react";

interface Props {
  name: string;
  lastname?: string;
}

// react memo is a higher order component that will prevent the component from rerendering if the props are the same
// its very optimized for performance and should be used when you have a component that is rerendering too much
export const DisplayUsername = React.memo((props: Props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  //i have no props.lastname in both but in the react Memo when i change the lastname it will not rerender!!! (nothing changed)
  return <h3>{props.name} </h3>;
});


// change last name in this component and see the difference, it will rerender every time you change the lastname 
/* export const DisplayUsername = ((props: Props) => {
  console.log(
    "Compare with me:\nHey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name} </h3>;
});
 */

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe",
  });

  return (
    <>
      <DisplayUsername name={userInfo.name} />
      <input
        value={userInfo.name}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            name: e.target.value,
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            lastname: e.target.value,
          })
        }
      />
    </>
  );
};
