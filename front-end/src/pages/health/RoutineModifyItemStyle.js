import {css} from '@emotion/react'

export const RoutineTitleBoxStyle = css`
    display: flex;
    justify-content: space-between;
`;




export const RoutineImgBoxStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    background-color: #a1a1a1;
    border-radius: 15px;
    & > svg {
        width: 40px;
        height: 40px;
    }
`;


export const RoutineInputBoxStyle = css`
    width: calc(100% - 70px);
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;



export const RoutineContentTagBoxStyle = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 5px;
    &>ul{
        margin: 2px 0px;
    }
`;



export const RoutineTagStyle = css`
    padding: 0px;
    margin: 0px;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    & li {
        padding: 2px 5px;
        margin-left: 4px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 700;
        background-color: #556080;
        min-width: 30px;
        text-align: center;
    }

`;