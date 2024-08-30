import { css } from "@emotion/react";

export const modalBodyStyle = css`
    outline: none;
    background-color: #191A1F;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    width: calc(100% - 100px);
    position: absolute;
    top: 45px;
    right: 0px;
    padding: 20px;
    box-sizing: border-box;

    & ul{
        list-style: none;
        padding: 0px;
        margin: 10px 0px;
        li{

            a{
                color: white;
                text-decoration: none;
                height: 50px;
                border-bottom: 2px solid #282828;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span{
                    font-size: 1.3em;
                    font-weight: 700;
                }

            }
        }
    }


    
`;



export const iconBoxStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0px 10px;
    img{
        width: 30px;
    }
`;

export const bottomBtnBoxStyle = css`

    &>li:first-of-type{
        margin-top: 50px;
        button{
            background-color: #5BB2C0;
        }
    }
    &>li:nth-of-type(2){
        button{
            background-color: #8E8E8E;
        }
    }
    
    li{
        button{
            padding: 8px 8px;
            margin: 10px 0px;
            width: 100%;
            display: flex;
            align-items: center;
            
            border-radius:8px;
            border: none;
            img{
                width: 40px;
                margin-right: 10px;
            }
            span{
                font-size: 1.3em;
                font-weight: 700;
                color: white;
            }
        }
        button:hover{
            cursor: pointer;
        }

    }
    

`;
export const navBottomBtnStyle = css`



`;