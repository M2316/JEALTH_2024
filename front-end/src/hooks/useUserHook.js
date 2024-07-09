import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUserLogin = async(email,password) => {
    return await api.post("/api/v1/login", {
            email: email,
            password: password,
        })
}

export const useUserLoginQuery = ({email,password}) => {
    return useQuery({
        enabled:false,
        queryKey: ["user-login"],
        queryFn: ()=>fetchUserLogin(email,password),
        retry : 0,
        select:(res)=>res.headers.authorization
    });
};


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