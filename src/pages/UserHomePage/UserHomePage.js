import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import shortly from "../../assets/images/shortly.png";
import ShortenUrl from "../../components/ShortenUrl";
import UserUrls from "../../components/UsersUrls";
import URL from "../../constants/url";
import { useAuth } from "../../provider/auth";

function UserHomePage() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useAuth();
  const [user, setUser] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (userLogin !== undefined) {
      axios
        .get(`${URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.log(error.response.data));
    }
  }, [userLogin, update]);

  function signOut() {
    localStorage.removeItem("userShortly");
    setUserLogin(undefined);
    navigate("/");
  }

  if (user === undefined) {
    return (
      <>
        <p>Carregando...</p>
      </>
    );
  }

  return (
    <>
      <NavBar>
        <div>
          <WelcomeMessage>
            Seja bem-vindo(a), {user.name.split(" ")[0]}
          </WelcomeMessage>
        </div>
        <div>
          <Link to="/home">
            <Home>Home</Home>
          </Link>
          <Link to="/ranking">
            <Ranking>Ranking</Ranking>
          </Link>
          <SignOut onClick={signOut}>Sair</SignOut>
        </div>
      </NavBar>
      <Logo>
        <h1>Shortly</h1>
        <img src={shortly} alt="shortly" />
      </Logo>
      <ShortenUrl update={update} setUpdate={setUpdate} />
      <UserUrls user={user} update={update} setUpdate={setUpdate} />
    </>
  );
}

export default UserHomePage;

const NavBar = styled.div`
  width: 90vw;
  height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
  div {
    display: flex;
    align-items: center;
  }
`;

const WelcomeMessage = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #5d9040;
  margin-right: 22px;
`;

const Home = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #5d9040;
  margin-right: 22px;
`;

const Ranking = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c;
  margin-right: 22px;
`;

const SignOut = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c;
  cursor: pointer;
`;

const Logo = styled.div`
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 17px;
  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 200;
    font-size: 64px;
    color: #000000;
    margin-right: 10px;
  }
  img {
    width: 102px;
    height: 102px;
  }
`;
