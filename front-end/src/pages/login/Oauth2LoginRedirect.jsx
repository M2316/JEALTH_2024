import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../common/components/loadingPage/LoadingPage';
import { useUserReissue } from '../../hooks/useUserHook';


const Oauth2LoginRedirect = () => {

  const { data, isLoading, isError, error, refetch } = useUserReissue({});

  const navigate = useNavigate();


  
  
  useEffect(()=>{

    const promise = new Promise((resolve, reject) => {
      refetch()
    });
    
    promise.then(
      setTimeout(()=>{
        navigate("/")
      },1000)
    );
    
    
  },[])
  return (
    <div>
      <LoadingPage></LoadingPage>
    </div>
    
  )
}

export default Oauth2LoginRedirect