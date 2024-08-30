import { css } from "@emotion/react";
import backgroundImg from "@img/login-back-ground.jpg";
import kakaoLogin from "@img/kakao-login-btn.png";

export const backgroundCss = css`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: url(${backgroundImg});
    background-size: cover;
    background-position-y: bottom;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    // //탭 세로 사이즈
    // [mq[1]]:{
    //     // justifyContent:"left",
    //     alignItems:"center"
    // },
    // //모니터 사이즈
    // [mq[2]]:{backgroundPositionY:"75%"},
`;

export const welcomeLogoBox = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "38%",

    ["img"]: {
        width: "60%",
    },
});

export const loginBox = css`
    width: 300px;
    background: #191a1fcc;
    height: 62%;
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 30px;

    // //탭 세로 사이즈
    // [mq[1]]:{
    //     // marginLeft:"400px",
    //     width:"390px",
    //     height:"700px",
    // },
    // //모니터 사이즈
    // [mq[2]]:{
    //     backgroundPositionY:"75%"
    // }
`;

export const inputGroup = css`
    width: 90%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const divisionCss = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 28px;
    align-items: center;
    margin-bottom: 10px;
    & div {
        border-top: 1px solid #b6b6b6;
        width: 42%;
    }
    & p {
        color: #b6b6b6;
        font-size: 14px;
    }
`;

export const otherJoinGroupCss = css`
    width: 100%;


    &>a{
        text-decoration: none;
    }

    &>a:nth-of-type(1){
        color: #191919;
    }

    &>a:nth-of-type(2){
        color: #191919;
    }

    &>a:nth-of-type(3){
        color: #FFF;
    }


`;
export const oauthLoginBtnStyle = css`

    margin: 5px 10px;
    height: 45px;
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    
    
    & div:first-of-type{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        

        & img{
            width: 30px;
        }
    }

    & div:last-of-type{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-weight: 600;
        width: calc(100% - 50px);
        
        & span{
            margin-right: 40px;
        }
        
        
    }
    

`;