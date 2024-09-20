import axios from 'axios';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const api  = axios.create({
    baseURL:`${BACKEND_BASE_URL}/`,
    withCredentials: true,
    headers:{
        Accept: 'application/json',
    }
})


// 요청 인터셉터 추가하기
api.interceptors.request.use(async function (config) {
    // 요청이 전달되기 전에 작업 수행
    const accessToken = localStorage.getItem('authorization');


    if (accessToken) {//accessToken이 있을 때

      config.headers['authorization'] = `${accessToken}`;  
      return config;
      
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
    console.log(response);
    return response;
  },async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    const flag = error.response.data;
    switch(flag){
      case 'access token expired':
        const reissueFetch = await api.post("/api/v1/reissue",null, {
          withCredentials: true,  // 쿠키를 포함하여 요청을 보냄
          headers: {
            Authorization: `${error.config.headers['authorization']}`,  // Authorization 헤더에 토큰 추가
            "Content-Type":"application/json"
          }
        })
        .catch((e)=>{
          // window.location.href = '/login';
          console.log(e)
        });

        const refetchToken = reissueFetch.headers['authorization'];

        localStorage.setItem("authorization",refetchToken);
        error.config.headers.authorization = refetchToken;

        return axios.request(error.config);
    }

    return Promise.reject(error);
  });

export default api;