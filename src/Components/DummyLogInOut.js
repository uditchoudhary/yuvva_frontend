import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import LogInOut from "../Store/Actions/Actions";

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  border: 2px solid white;
`;

const DummyLogInOut = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
  const handleLogOutOnclick = () => {
    dispatch(LogInOut(false));
  };

  const handleLogInOnclick = () => {
    dispatch(LogInOut(true));
  };

  return (
    <>
      {isLoggedIn ? (
        <Button onClick={handleLogOutOnclick}>Log out</Button>
      ) : (
        <Button onClick={handleLogInOnclick}>Log in</Button>
      )}
    </>
  );
};

export default DummyLogInOut;
