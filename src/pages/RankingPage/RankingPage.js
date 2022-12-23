import styled from "styled-components";
import shortly from "../../assets/images/shortly.png";
import { FaTrophy } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../constants/url";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/auth";

function RankingPage() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useAuth();
  const [user, setUser] = useState();
  const [ranking, setRanking] = useState();

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
  }, [userLogin]);

  useEffect(() => {
    axios
      .get(`${URL}/ranking`)
      .then((response) => {
        setRanking(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }, []);

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
      <RankingContainer>
        <Title>
          <TrophyIcon>
            <FaTrophy />
          </TrophyIcon>
          <h2>Ranking</h2>
        </Title>
        <RankingBoard>
          {!ranking ? (
            <UpdatingRanking>Atualizando...</UpdatingRanking>
          ) : ranking.length === 0 ? (
            <UpdatingRanking>Sem registros no momento!</UpdatingRanking>
          ) : (
            ranking.map((user, id) => {
              return (
                <UserRanking key={id}>
                  {id + 1}. {user.name} - {user.linksCount} links -{" "}
                  {user.visitCount} visualizações
                </UserRanking>
              );
            })
          )}
        </RankingBoard>
      </RankingContainer>
      <Footer>
        <p>Crie sua conta para usar nosso serviço!</p>
      </Footer>
    </>
  );
}

export default RankingPage;

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

const RankingContainer = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 76px;
  h2 {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 700;
    font-size: 36px;
    color: #000000;
  }
`;

const TrophyIcon = styled.p`
  font-size: 50px;
  color: #ffd233;
  margin-right: 10px;
`;

const RankingBoard = styled.div`
  width: 80vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  margin-top: 57px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  border-radius: 24px 24px 0px 0px;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome */
  }
`;

const UpdatingRanking = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 36px;
  color: #000000;
`;

const UserRanking = styled.div`
  width: 90%;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 500;
  font-size: 22px;
  color: #000000;
  margin: 6px 0;
`;

const Footer = styled.div`
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 82px;
  p {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 700;
    font-size: 36px;
    color: #000000;
    text-align: center;
  }
`;
