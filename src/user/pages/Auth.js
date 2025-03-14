import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [isLoginMode, setIsLoginMode] = useState(true);

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to backend later.
    auth.login();
  };

  const switchLoginModeHandler = () => {
    if(isLoginMode) {
      setFormData({
          ...formState.inputs,
          name: {
            value: "",
            isValid: false
          },
        },
        false
      );
    } else {
      setFormData({
        ...formState.inputs,
        name: undefined
      },
      formState.inputs.email.isValid && formState.inputs.password.isValid
    );
    }
    setIsLoginMode(prevMode => !prevMode);
  }

  return (
    <Card className="authentication">
      <h2 className="authentication__header">Login Required</h2>
      <hr />
      <form className="authentication form" onSubmit={authSubmitHandler}>
        {
          !isLoginMode &&
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        }
        <Input
          id="email"
          element="input"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password (atleast 5 characters)"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode?"LOGIN":"SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchLoginModeHandler}>
        SWITCH TO {isLoginMode?"SIGNUP":"LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
