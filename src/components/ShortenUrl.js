import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import URL from "../constants/url";
import { useAuth } from "../provider/auth";

function ShortenUrl({ update, setUpdate }) {
  const { userLogin } = useAuth();
  const [disabledButton, setDisabledButton] = useState(false);
  const [urlForm, setUrlForm] = useState({
    url: "",
  });

  useEffect(() => {
    setDisabledButton(false);
    setUrlForm({
      url: "",
    });
  }, [update]);

  function handleForm(event) {
    const { name, value } = event.target;
    setUrlForm({ ...urlForm, [name]: value });
  }

  function signUp(event) {
    event.preventDefault();
    setDisabledButton(true);
    const body = {
      url: urlForm.url,
    };

    axios
      .post(`${URL}/urls/shorten`, body, {
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
        },
      })
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.log(error.response.data);
        setDisabledButton(false);
      });
  }

  return (
    <>
      <UrlForm onSubmit={signUp}>
        <Input
          name="url"
          value={urlForm.url}
          onChange={handleForm}
          type="url"
          placeholder="URL"
          disabled={disabledButton}
          required
        ></Input>
        {disabledButton ? (
          <Button disabled={disabledButton}>Carregando...</Button>
        ) : (
          <Button type="submit" disabled={disabledButton}>
            Encurtar link
          </Button>
        )}
      </UrlForm>
    </>
  );
}

export default ShortenUrl;

const UrlForm = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 128px;
`;

const Input = styled.input`
  width: 60vw;
  height: 58px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  border-radius: 12px;
  background-color: #ffffff;
  margin-bottom: 13px;
  padding: 15px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #000000 !important;
  }
`;

const Button = styled.button`
  width: 182px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
  border-radius: 5px;
  border: none;
  background-color: #5d9040;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  cursor: ${(props) => (props.disabled ? "cursor" : "pointer")};
`;
