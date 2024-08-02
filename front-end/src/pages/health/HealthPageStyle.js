import { css } from "@emotion/react";



export const healthPageBodyStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 60px;
    padding-bottom: 50px;

    h1,
    h2,
    h3 {
        margin: 0;
    }

    ul {
        padding: 0;
        margin: 0;
    }
    li {
        list-style: none;
        list-style-type: none;
    }
`;





export const healthCardTitleStyle = css`
    width: 100%;
    display: flex;
    padding: 15px;
    box-sizing: border-box;

    

`;

export const healthCardContentStyle = css`
    width: 100%;
    display: flex;
    flex-direction: column;


    & li{
        margin-left: 80px;
        padding-left: 10px;
        width: calc(100% - 110px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 3px solid #282828;
        height: 35px;
        
    }
    & li:last-of-type{
        border-bottom: 3px solid #282828;
        margin-bottom:15px;
    }

    & img{
        width: 25px;
        height: 25px;
    }
`;

export const workoutSetInfoStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-right:10px;
    & div{
        width: 100%;  
        display: flex;
        
    }
    & div:first-of-type{
        width: 100px;
    }
`;

export const checkBoxStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const healthCardIconStyle = css`

    border-radius: 50px;
    background-color: #282828;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    margin-right: 15px;


    & img{
        width: 40px;
    }

`;

export const healthCardTitleBoxStyle = css`
display: flex;
flex-direction: column;
justify-content: space-evenly;
width: calc(100% - 75px);
`;

export const titleStyle = css`
font-size: 1.5em;
width: 100%;

`;

export const subTitleStyle = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    & span{
        color: #4F56FF;
    }

    & button{
        background-color: #282828;
        outline: none;
        border: none;
        border-radius: 10px;
        color: #C6DEE2;
        font-size: 1.3em;
        font-weight: 900;
        padding: 0px 10px;
    }
`;


export const modalContentStyle = css`
    padding-top: 15px;

    & button{
        border: none;
        width: 140px;
        height: 50px;
        font-size: 25px;
        font-weight: 700;
        color: #fff;
        background-color: #5BB2C0;
        border-radius: 10px;
        box-shadow: 4px 4px 4px #323232;
        
    }
`;


export const numberPickerStyle = css`
    outline: none;
    position: absolute;
    top: calc(50vh - 20px);
    left : calc(50vw - 150px);
    background-color: #8f8f8f;
    width: 300px;
    height: 330px;
    border-radius: 15px;
    &>div{
        outline: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;