import { css } from "@emotion/react";

export const modalBodyStyle = css`
    outline: none;
    background-color: #191A1F;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    width: calc(100% - 100px);
    position: absolute;
    top: 100px;
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