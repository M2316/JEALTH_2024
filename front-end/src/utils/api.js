import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const api  = axios.create({
    baseURL:"/",
    headers:{
        Accept: 'application/json',
    }
})


// 요청 인터셉터 추가하기
api.interceptors.request.use(async function (config) {
    // 요청이 전달되기 전에 작업 수행
    const accessToken = localStorage.getItem('access-token');


    if (accessToken) {//accessToken이 있을 때

      const tokenDecoded = jwtDecode(accessToken);

      if(new Date().getTime() > (tokenDecoded.exp*1000-60000)){ // 토큰 만료시간 체크 (만료시간 -1분 이면 토큰 재발행요청)

        


        const reissueFetch = await axios.post("/api/v1/reissue")
        .catch((e)=>{
          console.log(e)
        });
        config.headers['access-token'] = reissueFetch.headers['access-token'];
        localStorage.setItem('access-token',config.headers['access-token']);
        return config;
        
      }else{
        config.headers['access-token'] = `${accessToken}`;  
        return config;
      }
      
    }else{
      return config;

    }
    


  }, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  });

// 응답 인터셉터 추가하기
api.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  }, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  });

export default api;