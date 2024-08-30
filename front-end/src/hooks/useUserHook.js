import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";


//access token 재발급 API 요청
const fetchUserReissue = async() =>{
    return await api.post("/api/v1/reissue",{},{
    }).then(res=>{
        console.log(res.headers['access-token'])
        localStorage.setItem('access-token',res.headers['access-token'])
    })
}

export const useUserReissue = () =>{
    return useQuery({
        enabled:false,
        queryKey: ["user-reissue"],
        queryFn: ()=>fetchUserReissue(),
        retry: 0
    })
}


//로그인 API 요청
const fetchUserLogin = async(email,password) => {
    return await api.post("/api/v1/login", {
            email: email,
            password: password,
        },{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              }
        }).then((res)=>{
            localStorage.setItem("access-token", res.headers["access-token"]);   
            return res;         
        })
}

export const useUserLoginQuery = ({email,password}) => {
    return useQuery({
        enabled:false,
        queryKey: ["user-login"],
        queryFn: ()=>fetchUserLogin(email,password),
        retry : 0,
    });
};


//회원가입 API 요청
const fetchUserSignup = ({email,password,nickname})=>{
    return api.post("/api/v1/signup",{
        email,
        password,
        nickname
    })
}

export const useUserSignupQuery = ({email,password,nickname})=>{
    return useQuery({
        enabled:false,
        queryKey:["user-Signup"],
        queryFn: ()=>fetchUserSignup({email,password,nickname}),
        retry : 0,
    })

}



//로그아웃 API 요청
const fetchUserLogout = ()=>{
    return api.post("/api/v1/logout")
    .then(()=>{
        localStorage.removeItem("access-token")
    })
}

export const useLogoutQuery = ()=>{
    return useQuery({
        enabled:false,
        queryKey:["user-logout"],
        queryFn: ()=> fetchUserLogout(),
        retry : 0,
    })
}


//비밀번호 찾기 - 인증번호 발송 API 요청
const fetchEmailAuthCodeSend = ({email})=>{
    return api.post("/api/v1/emailAuthCodeSend",{
        email,
    })
}

export const useEmailAuthCodeSend = ({email})=>{
    return useQuery({
        enabled:false,
        queryKey:["user-auth-code-send"],
        queryFn: ()=> fetchEmailAuthCodeSend({email}),
        retry : 0,
    })
}

//비밀번호 찾기 - 인증번호 체크 API 요청
const fetchAuthCodeCheck = ({email,authCode})=>{
    return api.post("/api/v1/autoCodeCheck",{email,authCode})
}

export const useAuthCodeCheck = ({email,authCode})=>{
    return useQuery({
        enabled:false,
        queryKey:["user-auth-code-check"],
        queryFn: ()=> fetchAuthCodeCheck({email,authCode}),
        retry : 0,
    })
}


//비밀번호 찾기 - 비밀번호 업데이트 API 요청
const fetchPasswordChange = ({email,password,authCode})=>{
    return api.post("/api/v1/passwordChange",{email,password,authCode})
}

export const usePasswordChange = ({email,password,authCode})=>{
    return useQuery({
        enabled:false,
        queryKey:["user-password-change"],
        queryFn: ()=> fetchPasswordChange({email,password,authCode}),
        retry : 0,
    })
}