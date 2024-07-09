import { css } from "@emotion/react";
import React, { useState } from "react";
import Input from "../../common/components/input/Input";
import Button from "../../common/components/button/Button";
import { Modal } from "@mui/material";
import { contentBoxCss, inputGroupCss, titleCss } from "./UserJoinFormStyle";
import { useUserSignupQuery } from "../../hooks/useUserHook";
import { redirect, useNavigate } from "react-router-dom";

//모달 스타일

const UserJoinForm = ({ isOpen, onClose }) => {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        userPw: "",
        userPwcheck: "",
        userNickname: "",
    });

    const { data, isLoding, isError, error, refetch, isSuccess } =
        useUserSignupQuery({
            email: userInfo["userId"],
            password: userInfo["userPw"],
            nickname: userInfo["userNickname"],
        });

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        await refetch();
        setUserInfo({
            userId: "",
            userPw: "",
            userPwcheck: "",
            userNickname: "",
        });
        onClose();
    };
    if (isError) {
        console.log(error);
    }
    if (isLoding) {
        return <h1>Loding...</h1>;
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div css={contentBoxCss}>
                <div css={titleCss}>
                    <h2>회원가입</h2>
                </div>
                <form css={inputGroupCss} onSubmit={formSubmitHandler}>
                    <Input
                        inputIcon="user"
                        valueType="email"
                        inputChangeHandler={(e) => {
                            setUserInfo({
                                ...userInfo,
                                userId: e.target.value,
                            });
                        }}
                        inputClearHandler={() => {
                            setUserInfo({ ...userInfo, userId: "" });
                        }}
                        inputState={userInfo["userId"]}
                        setInputState={setUserInfo}
                        inputValue={userInfo.userNickname}
                        placeholder="이메일(example@example.com)"
                        name="userId"
                    ></Input>
                    <Input
                        inputIcon="lock"
                        valueType="password"
                        inputChangeHandler={(e) => {
                            setUserInfo({
                                ...userInfo,
                                userPw: e.target.value,
                            });
                        }}
                        inputClearHandler={() => {
                            setUserInfo({ ...userInfo, userPw: "" });
                        }}
                        inputState={userInfo["userPw"]}
                        inputValue={userInfo.userPw}
                        placeholder="비밀번호"
                        name="userPw"
                    ></Input>
                    <Input
                        inputIcon="check"
                        valueType="password"
                        inputChangeHandler={(e) => {
                            setUserInfo({
                                ...userInfo,
                                userPwcheck: e.target.value,
                            });
                        }}
                        inputClearHandler={() => {
                            setUserInfo({ ...userInfo, userPwcheck: "" });
                        }}
                        inputState={userInfo["userPwcheck"]}
                        inputValue={userInfo.userPwcheck}
                        placeholder="비밀번호 확인"
                        name="userPwcheck"
                    ></Input>
                    <Input
                        inputIcon="info"
                        valueType="text"
                        inputChangeHandler={(e) => {
                            setUserInfo({
                                ...userInfo,
                                userNickname: e.target.value,
                            });
                        }}
                        inputClearHandler={() => {
                            setUserInfo({ ...userInfo, userNickname: "" });
                        }}
                        inputState={userInfo["userNickname"]}
                        inputValue={userInfo.userNickname}
                        placeholder="닉네임"
                        name="userNickname"
                    ></Input>
                    <Button type="submit" btnTheme="join">
                        회원가입
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default UserJoinForm;
