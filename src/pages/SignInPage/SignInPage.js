import axios from "axios";
import shortly from "../../assets/images/shortly.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../provider/auth";
import URL from "../../constants/url";

function SignInPage() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useAuth();
  const [disabledButton, setDisabledButton] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (userLogin !== undefined) {
      navigate("/home");
    }
  }, [userLogin]);

  function handleForm(event) {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  }

  function login(event) {
    event.preventDefault();
    setDisabledButton(true);

    const body = loginForm;

    axios
      .post(`${URL}/signin`, body)
      .then((response) => {
        setUserLogin(response.data);
        localStorage.setItem("userShortly", JSON.stringify(response.data));
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response.data);
        setDisabledButton(false);
      });
  }

  return (
    <>
      <NavBar>
        <Link to="/sign-in">
          <SignIn>Entrar</SignIn>
        </Link>
        <Link to="/sign-up">
          <SignUp>Cadastrar-se</SignUp>
        </Link>
      </NavBar>
      <Logo>
        <h1>Shortly</h1>
        <img src={shortly} alt="shortly" />
      </Logo>
      <SignInForm onSubmit={login}>
        <Input
          name="email"
          value={loginForm.email}
          onChange={handleForm}
          type="email"
          placeholder="E-mail"
          disabled={disabledButton}
          required
        ></Input>
        <Input
          name="password"
          value={loginForm.password}
          onChange={handleForm}
          type="password"
          placeholder="Senha"
          minLength="5"
          disabled={disabledButton}
          required
        ></Input>
        {disabledButton ? (
          <Button disabled={disabledButton}>Carregando...</Button>
        ) : (
          <Button type="submit" disabled={disabledButton}>
            Entrar
          </Button>
        )}
      </SignInForm>
    </>
  );
}

export default SignInPage;

const NavBar = styled.div`
  width: 90vw;
  height: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 60px;
`;

const SignIn = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #5d9040;
  margin-right: 22px;
`;

const SignUp = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c;
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

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 128px;
`;

const Input = styled.input`
  width: 80vw;
  height: 60px;
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
  margin-top: 60px;
  border-radius: 5px;
  border: none;
  background-color: #5d9040;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  cursor: ${(props) => (props.disabled ? "cursor" : "pointer")};
`;
