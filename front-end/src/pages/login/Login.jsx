import React, { useEffect, useRef, useState } from "react";

import welcomeLogo from "@img/welcomeLogo.png";
import kakaoLogin from "@img/kakao-login-btn.png";
import naverLogin from "@img/naver-login-btn.png";
import googleLogin from "@img/google-login-btn.png";

import Input from "../../common/components/input/Input";
import Button from "../../common/components/button/Button";
import UserJoinForm from "./UserJoinForm";
import FindingPwPageForm from "./FindingPwPageForm";

import { useUserLoginQuery } from "../../hooks/useUserHook";
import {
    backgroundCss,
    divisionCss,
    inputGroup,
    loginBox,
    otherJoinGroupCss,
    welcomeLogoBox,
} from "./LoginStyle";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../common/components/loadingPage/LoadingPage";

const breakpoints = [480, 768, 1200];
const mq = breakpoints.map((bp, idx) => {
    if (idx === 0) {
        //스마트폰 해상도
        return `@media (max-width: ${bp}px)`;
    } else if (idx === breakpoints.length - 1) {
        //테블릿 해상도
        return `@media (max-width: ${bp}px)`;
    } else {
        //테스크톱 해상도
        return `@media (min-width: ${
            breakpoints[idx - 1] + 1
        }px) and @media (max-width: ${bp}px)`;
    }
});

const Login = () => {
    const [userInfo, setUserInfo] = useState({ userId: "", userPw: "" });
    const navigate = useNavigate();

    const token = localStorage.getItem("userInfo");
    token && navigate("/");

    //회원가입 페이지 모달 플레그
    const [joinPageIsOpen, setJoinPageIsOpen] = useState(false);
    //비밀번호 찾기 페이지 모달 플레그
    const [findingPwPageIsOpen, setFindingPwPageIsOpen] = useState(false);

    const { data, isLoading, isError, error, refetch } = useUserLoginQuery({
        email: userInfo.userId,
        password: userInfo.userPw,
    });

    //로그인 요청 이벤트
    const loginHandler = (e) => {
        e.preventDefault();
        if (userInfo["userId"] && userInfo["userPw"]) {
            refetch();
        }
    };

    //회원가입 페이지 활성화
    const joinPageModalHandler = () => {
        setJoinPageIsOpen(true);
    };
    //비밀번호 찾기 모달 페이지 활성화
    const findingPwModalHandler = () => {
        setFindingPwPageIsOpen(true);
    };

    useEffect(() => {
        if (!!data && data.split("Bearer ")[1]) {
            localStorage.setItem("userInfo", data.split("Bearer ")[1] || "");
            navigate("/");
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            alert("회원 정보가 일치하지 않습니다.");
        }
    }, [isError]);

    return (
        <div css={backgroundCss}>
            {isLoading && <LoadingPage></LoadingPage>}
            <div css={welcomeLogoBox}>
                <img src={welcomeLogo} />
            </div>
            <div css={loginBox}>
                <form css={inputGroup} onSubmit={loginHandler}>
                    <Input
                        inputIcon="user"
                        valueType="email"
                        placeholder="이거바뀌면 성공 "
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
                    />
                    <Input
                        inputIcon="lock"
                        valueType="password"
                        placeholder="비밀번호"
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
                    />
                    <Button type="submit" btnTheme="login">
                        로그인
                    </Button>
                    <Button btnTheme="linkText" onClick={findingPwModalHandler}>
                        비밀번호를 잊으셨나요?
                    </Button>
                    <Button btnTheme="linkText" onClick={joinPageModalHandler}>
                        회원가입
                    </Button>
                    <div css={divisionCss}>
                        <div></div>
                        <p>OR</p>
                        <div></div>
                    </div>
                    <div css={otherJoinGroupCss}>
                        <a href="#">
                            <img src={kakaoLogin} />
                        </a>
                        <a href="#">
                            <img src={naverLogin} />
                        </a>
                        <a href="#">
                            <img src={googleLogin} />
                        </a>
                    </div>
                </form>
            </div>
            <UserJoinForm
                isOpen={joinPageIsOpen}
                onClose={() => {
                    setJoinPageIsOpen(false);
                }}
            />
            <FindingPwPageForm
                isOpen={findingPwPageIsOpen}
                onClose={() => {
                    setFindingPwPageIsOpen(false);
                }}
            />
        </div>
    );
};

export default Login;
