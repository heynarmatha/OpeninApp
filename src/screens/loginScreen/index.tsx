import { useState } from "react";
import { APPLE_ICON, GOOGLE_ICON } from "../../assets/Images";
import CustomButton from "../../components/Button/button";
import styles from "./style.module.scss";
import InputField from "../../components/TextInput/textInput";
import { INPUT_DATA_VALIDATION } from "../../Utility/validation";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTE_URL } from "../../routes/variable";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleOnChangeForEmail = (e: any) => {
    const valueForEmail = e.target.value;
    setEmailError(undefined);
    setEmail(valueForEmail);
  };

  const handleOnChangeForPassword = (e: any) => {
    const valueForPassword = e.target.value;
    setPasswordError("");
    setPassword(valueForPassword);
  };

  const onValidate = () => {
    if (email === "") {
      setEmailError("Please enter the email");
      return false;
    }
    setEmailError("");
    if (password === "") {
      setPasswordError("Please enter the  password");
      return false;
    }
    setPasswordError("");
    if (!INPUT_DATA_VALIDATION.emailValidation(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    if (!INPUT_DATA_VALIDATION.passwordValidation(password)) {
      setPasswordError("Please enter the valid password");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const onNavigateForgotPasswordScreen = () => {
    console.log("navigate to forgot password");
  };

  const onHandleForSignIn = () => {
    if (onValidate()) {
      localStorage.setItem("email", email);
      localStorage.setItem(
        "isAuth",
        JSON.stringify({
          islogin: true,
        })
      );
      navigate(PRIVATE_ROUTE_URL.upload);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.textContainerForSignIn}>
        <h5 className={styles.signInText}>Sign In</h5>
        <h5 className={styles.signInToYourAccount}>Sign in to your account</h5>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton
          icon={GOOGLE_ICON}
          text={"Sign in with Google"}
          iconStyle={styles.iconStyle}
          btnContainerStyle={styles.btnContainerStyle}
          btnStyle={styles.styleForIconButton}
        />
        <CustomButton
          icon={APPLE_ICON}
          text={"Sign in with Apple"}
          iconStyle={styles.iconStyle}
          btnContainerStyle={styles.btnContainerStyle}
          btnStyle={styles.styleForIconButton}
        />
      </div>
      <div className={styles.formContainer}>
        <InputField
          label="Email address"
          type="text"
          placeholder="Enter Email address"
          value={email}
          onChange={handleOnChangeForEmail}
          error={emailError}
        />
        <div style={{ marginTop: "20px" }}>
          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handleOnChangeForPassword}
            error={passwordError}
          />
        </div>

        <div
          onClick={() => onNavigateForgotPasswordScreen()}
          style={{ cursor: "pointer" }}
        >
          <h5 className={styles.forgotPasswordText}>Forgot password?</h5>
        </div>
        <div>
          <CustomButton
            text={"Sign In"}
            btnContainerStyle={styles.btnSignButtonContainer}
            btnStyle={styles.signInButtonText}
            onclickForBtn={onHandleForSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
