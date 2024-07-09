import { css } from "@emotion/react";
import React, { useState } from "react";
import Input from "../../common/components/input/Input";
import Button from "../../common/components/button/Button";
import { Modal } from "@mui/material";

//모달 스타일
const contentBoxCss = css({
  background: "#191a1f",
  width: "100%",
  height: "80%",
  position: "absolute",
  bottom: "0",
  borderRadius: "20px 20px 0px 0px",
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const titleCss = css({
  ["h2"]: {
    marginTop: "15px",
    marginBottom: "5px",
  },
});

const inputGroupCss = css({
  width: "90%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",

  ["&>div"]: {
    display: "flex",
    justifyContent: "space-between",
  },
});
const FindingPwPageForm = ({ isOpen, onClose }) => {
  const [formState, setaFormState] = useState({
    userId: "",
    userNickname: "",
    authentication: "",
    userPw: "",
    userPwcheck: "",
  });

  const [changePasswordFlag, setChangePasswordFlag] = useState(false);

  //input change 이벤트 관리
  const userInfoUpdateHandler = (e) => {
    const inputName = e.target.name;
    setaFormState({
      ...formState,
      [inputName]: e.target.value,
    });

    return;
  };

  //input 초기화 이벤트 관리
  const userInfoClearHandler = (e) => {
    let inputName = "";

    if (e.target.tagName === "path") {
      inputName =
        e.target.parentElement.parentElement.querySelector("input").name;
    } else {
      inputName = e.target.parentElement.querySelector("input").name;
    }

    setaFormState({
      ...formState,
      [inputName]: "",
    });
    return;
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div css={contentBoxCss}>
        <div css={titleCss}>
          <h2>비밀번호 찾기</h2>
        </div>
        <div css={inputGroupCss}>
          {!changePasswordFlag ? (
            <>
              <Input
              inputIcon="user"
              valueType="email"
              inputChangeHandler={userInfoUpdateHandler}
              inputClearHandler={userInfoClearHandler}
              inputState={formState.userId}
              placeholder="이메일(example@example.com)"
              name="userId"
              ></Input>
              <div>
                <Input
                  inputIcon="info"
                  valueType="text"
                  inputChangeHandler={userInfoUpdateHandler}
                  inputClearHandler={userInfoClearHandler}
                  inputState={formState.userNickname}
                  placeholder="닉네임"
                  addStyle={`width:60%; margin-right:10px;`}
                  name="userNickname"
                ></Input>
                <Button
                  btnTheme="middle-size"
                  addStyle={`width: 40%, fontSize: 15px;`}
                >
                  인증번호 발송
                </Button>
              </div>
              <Input
                inputIcon="lock"
                valueType="text"
                inputChangeHandler={userInfoUpdateHandler}
                inputClearHandler={userInfoClearHandler}
                inputState={formState.authentication}
                placeholder="인증번호"
                name="authentication"
              ></Input>
              <Button
                btnTheme="authenticationCheck"
                addStyle={`position: absolute; bottom: 15px; `}
              >
                인증 확인
              </Button>
            </>
          ):(
            <>
              <Input
                inputIcon="lock"
                valueType="password"
                inputChangeHandler={userInfoUpdateHandler}
                inputClearHandler={userInfoClearHandler}
                inputState={formState.userPw}
                placeholder="비밀번호"
                name="userPw"
              ></Input>
              <Input
                inputIcon="check"
                valueType="password"
                inputChangeHandler={userInfoUpdateHandler}
                inputClearHandler={userInfoClearHandler}
                inputState={formState.userPwcheck}
                placeholder="비밀번호 확인"
                name="userPwcheck"
              ></Input>
              <Button
                btnTheme="passwordChange"
                addStyle={`position: absolute; bottom: 15px`}
              >
                비밀번호 변경
              </Button>
            </>
          )}

          
        </div>
        
      </div>
    </Modal>
  );
};

export default FindingPwPageForm;
