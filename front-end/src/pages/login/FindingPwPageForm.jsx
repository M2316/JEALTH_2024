import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Input from "../../common/components/input/Input";
import Button from "../../common/components/button/Button";
import { Modal } from "@mui/material";
import {
    useAuthCodeCheck,
    useEmailAuthCodeSend,
    usePasswordChange,
} from "../../hooks/useUserHook";
import LoadingPage from "../../common/components/loadingPage/LoadingPage";

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

const inputGroupCss = css`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    & > div {
        display: flex;
        justify-content: space-between;
    }

    button:disabled {
        background-color: #545454;
        cursor: auto;
    }
    input:disabled {
        color: #6b6b6b;
    }
`;

css({
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
    const [changePasswordFlag, setChangePasswordFlag] = useState(false);

    const [formState, setaFormState] = useState({
        email: "",
        authCode: "",
        password: "",
        passwordOk: "",
    });


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
                e.target.parentElement.parentElement.querySelector(
                    "input"
                ).name;
        } else {
            inputName = e.target.parentElement.querySelector("input").name;
        }

        setaFormState({
            ...formState,
            [inputName]: "",
        });
        return;
    };

    const {
        data: sendData,
        isLoading: sendIsLoading,
        isFetching: sendIsFetching,
        isError: sendIsError,
        error: sendError,
        refetch: sendRefetch,
    } = useEmailAuthCodeSend(formState);
    const {
        data: checkData,
        isLoading: checkIsLoading,
        isError: checkIsError,
        error: checkError,
        refetch: checkRefetch,
    } = useAuthCodeCheck(formState);
    const {
        data: pwChangeData,
        isLoading: pwChangeIsLoading,
        isError: pwChangeIsError,
        error: pwChangeError,
        refetch: pwChangeRefetch,
    } = usePasswordChange(formState);

    //인증 코드 발송 이벤트
    const authCodeSendHandler = () => {
        if (!formState.email) {
            alert("이메일을 입력해 주세요.");
            return;
        }

        sendRefetch();
    };

  

    //인증 코드 검증 이벤트
    const authCodeChackHandler = () => {
        if (!formState.authCode) {
            alert("인증코드를 입력해 주세요.");
        }
        checkRefetch().then(() => {
            setChangePasswordFlag(true);
            alert("인증 완료");
        });
    };

    useEffect(() => {
        if (checkIsError) {
            setChangePasswordFlag(false);
            alert(checkError.response.data);
        }
    }, [checkIsError]);

    //비밀번호 변경 이벤트
    const changePasswordHandler = () => {
        if (formState.password !== formState.passwordOk) {
            alert("패스워드가 일치하지 않습니다.");
            return;
        }

        pwChangeRefetch().then(() => {
            setaFormState("");
            setChangePasswordFlag(false);
            alert("패스워드 변경 완료.");
            onClose();
        });
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => {
                setaFormState("");
                setChangePasswordFlag(false);
                onClose();
            }}
        >
            <div css={contentBoxCss}>
                {sendIsFetching && (
                    <LoadingPage></LoadingPage>
                )}
                <div css={titleCss}>
                    <h2>비밀번호 찾기</h2>
                </div>
                <div css={inputGroupCss}>
                    <>
                        <div
                            css={css`
                                width: 100%;
                            `}
                        >
                            <Input
                                inputIcon="user"
                                valueType="email"
                                inputChangeHandler={userInfoUpdateHandler}
                                inputClearHandler={userInfoClearHandler}
                                inputState={formState.email}
                                readOnly={changePasswordFlag && "true"}
                                placeholder="가입시 입력한 이메일"
                                addStyle={`margin-right:10px;`}
                                name="email"
                            ></Input>
                            <Button
                                btnTheme="middle-size"
                                addStyle="width: 50px; fontSize: 15px;"
                                readOnly={changePasswordFlag && "true"}
                                onClick={authCodeSendHandler}
                            >
                                인증번호 발송
                            </Button>
                        </div>
                        <Input
                            inputIcon="lock"
                            valueType="text"
                            inputChangeHandler={userInfoUpdateHandler}
                            inputClearHandler={userInfoClearHandler}
                            inputState={formState.authCode}
                            readOnly={changePasswordFlag && "true"}
                            placeholder="인증번호"
                            name="authCode"
                        ></Input>
                        <Button
                            btnTheme="authenticationCheck"
                            addStyle={`position: absolute; bottom: 15px; `}
                            readOnly={changePasswordFlag && "true"}
                            onClick={authCodeChackHandler}
                        >
                            인증 확인
                        </Button>
                    </>
                    {changePasswordFlag && (
                        <div
                            css={css`
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                margin-top: 20px;
                            `}
                        >
                            <h2>비밀번호 변경</h2>
                            <Input
                                inputIcon="lock"
                                valueType="password"
                                inputChangeHandler={userInfoUpdateHandler}
                                inputClearHandler={userInfoClearHandler}
                                inputState={formState.password}
                                placeholder="비밀번호"
                                name="password"
                            ></Input>
                            <Input
                                inputIcon="check"
                                valueType="password"
                                inputChangeHandler={userInfoUpdateHandler}
                                inputClearHandler={userInfoClearHandler}
                                inputState={formState.passwordOk}
                                placeholder="비밀번호 확인"
                                name="passwordOk"
                            ></Input>
                            <Button
                                btnTheme="passwordChange"
                                addStyle={`position: absolute; bottom: 15px`}
                                onClick={changePasswordHandler}
                            >
                                비밀번호 변경
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default FindingPwPageForm;
