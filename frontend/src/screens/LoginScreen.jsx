import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
        <FormContainer>
            <h1>Sign In</h1>
        </FormContainer>>
        )
};

export default LoginScreen;
