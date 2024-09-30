import React from "react";

type Props = {
  label?: string;
  onLoginSuccess?: (code: string) => void;
  onLoginError?: (message: string) => void;
};

const LoginWithAccount = (props: Props) => {
  const { label = "Login with Account", onLoginSuccess, onLoginError } = props;
  const onSubmit = () => {
    const popupWidth = 500;
    const popupHeight = 600;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;

    const loginPopup = window.open(
      `http://localhost:3001/?origin=${window.location.host}&redirectUrl=${window.location.origin}`,
      "Login",
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`,
    );

    window.addEventListener(
      "message",
      (event) => {
        if (event.data.type === "OAUTH_SUCCESS") {
          onLoginSuccess?.(event.data.token);
        }
        if (event.data.type === "OAUTH_FAILED") {
          onLoginError?.(event.data.message);
        }
      },
      false,
    );
  };

  return (
    <button
      onClick={onSubmit}
      style={{
        width: "100%",
        background: "white",
        color: "black",
        padding: "10px 20px",
        borderRadius: 10,
      }}
    >
      {label}
    </button>
  );
};

export default LoginWithAccount;
