import React, { useEffect, useState } from "react";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

const PrivateRoute = ({ component }) => {
    const {state} = useLocation();
    const [email, setEmail] = useState("");

    //BACK END 임시 해제
    // const navigate = useNavigate();

    // const authenticate = localStorage.getItem("userInfo");
    // useEffect(() => {
    //     const logoutFlag = state;
    //     if ( authenticate) {
    //         const tokenDecoded = jwtDecode(authenticate);
    //         if(new Date().getTime() > (tokenDecoded.exp*1000)){ // 토큰 만료시간 체크
    //             localStorage.removeItem("userInfo") // 만료 토큰으로 요청하면 localStorage에서 제거
    //             navigate("/login");
    //         }else{
    //             setEmail(tokenDecoded.email); // 이메일 셋
    //         }
    //     } else {
    //         localStorage.removeItem("userInfo") // 만료 토큰으로 요청하면 localStorage에서 제거
    //         navigate("/login");
    //     }
    // }, [state]); 


    
    return component;
};

export default PrivateRoute;
