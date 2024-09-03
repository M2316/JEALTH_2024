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
    align-items: center;

    

`;

export const healthCardContentStyle = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    
    &>li{
        width:calc(100% - 110px);
        margin-left: 80px;
        padding-left: 10px;
        display: flex;
        border-top: 3px solid #282828;
        height: 35px;
        position: relative;
        overflow-x: hidden;
        align-items: center;
    }
 
    &>li:last-of-type{
        border-bottom: 3px solid #282828;
        margin-bottom:15px;
    }
    
    &>li>div{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    
    & img{
        width: 25px;
        height: 25px;
    } 
    &>img{
        position: absolute;
        left: 15px;
        bottom: 15px;
        width: 50px;
        height: 45px;
    }
    
`;


export const workoutSetBoxStyle = css`

    &>img:first-of-type{
        position: absolute;
        width: 100% !important;
        right: 100%;
        margin-right: 10px;
    }
    &>img:last-of-type{
        position: absolute;
        width: 100% !important;
        left: 100%;
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
    padding-right:10px;
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
font-size: 1.4em;
padding-bottom: 5px;
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
        border-radius: 10px;
        font-weight: 900;
        padding: 0px 10px;
        height: 30px;
    }
`;
export const routineAllDoenBtnStyle = css`
        background-color: #b6b6b6;
        color: #fff;
        outline: none;
        border: none;
        font-size: 1em;
`;
export const routineAllUnfinishedBtnStyle = css`
        background-color: #5cb4ba;
        color: #fff;
        outline: none;
        border: none;
        font-size: 1.3em;
        
`;

export const EmptyCardTitleBoxStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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