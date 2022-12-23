import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import URL from "../constants/url";
import { useAuth } from "../provider/auth";
import { FaTrashAlt } from "react-icons/fa";

function UserUrls({ user, update, setUpdate }) {
  const { userLogin } = useAuth();
  const [disabledButton, setDisabledButton] = useState(false);
  const shortenedUrls = user.shortenedUrls;

  function deleteUrl(id) {
    setDisabledButton(true);
    const confirm = window.confirm("Dejesa excluir a url?");
    if (confirm) {
      axios
        .delete(`${URL}/urls/${id}`, {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
          },
        })
        .then(() => {
          setUpdate(!update);
          setDisabledButton(false);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setDisabledButton(false);
        });
    } else {
      setDisabledButton(false);
    }
  }

  function redirectUrl(shortUrl) {
    console.log("cliquei");
    window.open(`${URL}/urls/open/${shortUrl}`, "_blank");
  }

  return (
    <UrlsContainer>
      {shortenedUrls.map((u) => {
        return (
          <UrlBox key={u.id}>
            <UrlInfos>
              <UrlBase>{u.url}</UrlBase>
              <ShortUrl onClick={() => redirectUrl(u.shortUrl)}>
                {u.shortUrl}
              </ShortUrl>
              <CountViews>Quantidade de visitantes: {u.visitCount}</CountViews>
            </UrlInfos>
            {disabledButton ? (
              <Button disabled={disabledButton}>Carregando...</Button>
            ) : (
              <Button disabled={disabledButton} onClick={() => deleteUrl(u.id)}>
                <FaTrashAlt />
              </Button>
            )}
          </UrlBox>
        );
      })}
    </UrlsContainer>
  );
}

export default UserUrls;

const UrlsContainer = styled.div`
  max-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 59px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome */
  }
`;

const UrlBox = styled.div`
  width: 80vw;
  height: 60px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const UrlInfos = styled.div`
  width: calc(100% - 130px);
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #80cc74;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  border-radius: 12px 0px 0px 12px;
  p {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
  }
`;

const UrlBase = styled.p`
  min-width: 400px;
  margin-left: 20px;
`;

const ShortUrl = styled.p`
  min-width: 100px;
  margin: 0 20px;
  cursor: pointer;
`;

const CountViews = styled.p`
  min-width: 300px;
`;

const Button = styled.button`
  width: 130px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  border-radius: 0px 12px 12px 0px;
  background-color: #ffffff;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #ea4f4f;
  cursor: ${(props) => (props.disabled ? "cursor" : "pointer")};
`;
