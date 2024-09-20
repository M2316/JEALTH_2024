import React, { useEffect, useRef, useState } from "react";

import welcomeLogo from "@img/welcomeLogo.png";
import kakaoSymbol from "@img/kakaoSymbol.png";
import googleSymbol from "@img/googleSymbol.png";
import facebookSymbol from "@img/facebookSymbol.png";

import Input from "../../common/components/input/Input";
import Button from "../../common/components/button/Button";
import UserJoinForm from "./UserJoinForm";
import FindingPwPageForm from "./FindingPwPageForm";
import {
    backgroundCss,
    divisionCss,
    inputGroup,
    loginBox,
    oauthLoginBtnStyle,
    otherJoinGroupCss,
    welcomeLogoBox,
} from "./LoginStyle";
import LoadingPage from "../../common/components/loadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import { useUserLoginQuery } from "../../hooks/useUserHook";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Login = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});
    const [joinPageIsOpen, setJoinPageIsOpen] = useState(false);
    const [findingPwPageIsOpen, setFindingPwPageIsOpen] = useState(false);
    
    const { data, isLoading, isError, error, refetch } = useUserLoginQuery({
        email: userInfo.userId,
        password: userInfo.userPw,
    });

    const [emailSendLoading, isEmailSendLoading] = useState(false);

    const loginHandler = (e)=>{
        e.preventDefault();
        if (userInfo["userId"] && userInfo["userPw"]) {
            refetch();
            setTimeout(()=>{
                navigate("/");
            },500)          
        }
    }

    //회원가입 페이지 활성화
    const joinPageModalHandler = () => {
        setJoinPageIsOpen(true);
    };
    //비밀번호 찾기 모달 페이지 활성화
    const findingPwModalHandler = () => {
        setFindingPwPageIsOpen(true);
    };

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
                        placeholder="아이디"
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
                        
                        <a href={`${BACKEND_BASE_URL}/oauth2/authorization/kakao`}>
                            <div css={oauthLoginBtnStyle} style={{background:"#FEE500"}}>
                                <div>
                                    <img src={kakaoSymbol}/>
                                </div>
                                <div>
                                    <span>Kakao 로그인</span>
                                </div>
                            </div>
                        </a>
                        <a href={`${BACKEND_BASE_URL}/oauth2/authorization/google`}>
                            <div css={oauthLoginBtnStyle} style={{background:"#ffffff"}}>
                                <div>
                                    <img src={googleSymbol}/>
                                </div>
                                <div>
                                    <span>Google 로그인</span>
                                </div>
                            </div>
                        </a>
                        <a href={`${BACKEND_BASE_URL}/oauth2/authorization/facebook`}>
                            <div css={oauthLoginBtnStyle} style={{background:"#1877f2"}}>
                                <div>
                                    <img src={facebookSymbol}/>
                                </div>
                                <div>
                                    <span>Facebook 로그인</span>
                                </div>
                            </div>
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
