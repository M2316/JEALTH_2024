import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { homePageBodyStyle } from "./HomeStyle";
import Card from "./components/HomeCard";
import Navbar from "../../common/components/navbar/Navbar";

import healthIcon from "@img/sports/health-white.png";
import runningIcon from "@img/sports/running-white.png";
import boulderingIcon from "@img/sports/bouldering-white.png";
import crossfitIcon from "@img/sports/crossfit-white.png";
import rankingIcon from "@img/sports/ranking-white.png";
import chatIcon from "@img/sports/chat-white.png";
const data = [
    {
        id: "2023",
        color: "hsl(284, 70%, 50%)",
        data: [
            {
                x: "1월",
                y: 1,
            },
            {
                x: "2월",
                y: 3,
            },
            {
                x: "3월",
                y: 4,
            },
            {
                x: "4월",
                y: 1,
            },
            {
                x: "5월",
                y: 4,
            },
            {
                x: "6월",
                y: 6,
            },
            {
                x: "7월",
                y: 10,
            },
            {
                x: "8월",
                y: 12,
            },
            {
                x: "9월",
                y: 13,
            },
            {
                x: "10월",
                y: 15,
            },
            {
                x: "11월",
                y: 17,
            },
            {
                x: "12월",
                y: 21,
            },
        ],
    },
    {
        id: "2024",
        color: "hsl(284, 70%, 50%)",
        data: [
            {
                x: "1월",
                y: 11,
            },
            {
                x: "2월",
                y: 13,
            },
            {
                x: "3월",
                y: 14,
            },
            {
                x: "4월",
                y: 11,
            },
            {
                x: "5월",
                y: 14,
            },
            {
                x: "6월",
                y: 12,
            },
            {
                x: "7월",
                y: 13,
            },
            {
                x: "8월",
                y: 16,
            },
            {
                x: "9월",
                y: 18,
            },
            {
                x: "10월",
                y: 20,
            },
            {
                x: "11월",
                y: 13,
            },
            {
                x: "12월",
                y: 16,
            },
        ],
    },
];
const Home = () => {
    const navigate = useNavigate();

    const healthCardClickHandler = (e) => {
        navigate("/app/health");
    };

    return (
        <div css={homePageBodyStyle}>
            <Navbar />

            <Card
                addStyle={`width:90%; height:300px; div:last-of-type{height:80%;}`}
                type="chartCard"
                item={{
                    title: "Workout Statistics for 2024",
                    label: "2024년 운동 통계",
                    content: [],
                    chartData:data
                }}
                // onClick={healthCardClickHandler}
            />
            <Card
                addStyle={`width:90%; height:80px;`}
                type="titleCard"
                item={{
                    title: "Health",
                    label: "헬스 기록하기",
                    icon: healthIcon,
                }}
                onClick={healthCardClickHandler}
            />
            <Card
                addStyle={`width:90%; height:80px;`}
                type="titleCard"
                item={{
                    title: "Running",
                    label: "달리기 기록하기",
                    icon: runningIcon,
                }}
                // onClick={healthCardClickHandler}
            />
            <Card
                addStyle={`width:90%; height:80px;`}
                type="titleCard"
                item={{
                    title: "Bouldering",
                    label: "클라이밍(볼더링) 기록하기",
                    icon: boulderingIcon,
                }}
                // onClick={healthCardClickHandler}
            />
            <Card
                addStyle={`width:90%; height:80px;`}
                type="titleCard"
                item={{
                    title: "Workout Of the Day",
                    label: "크로스핏 기록하기",
                    icon: crossfitIcon,
                }}
                // onClick={healthCardClickHandler}
            />
            <Card
                addStyle={`width:90%; height:80px;`}
                type="titleCard"
                item={{
                    title: "Ranking",
                    label: "순위 보기",
                    icon: rankingIcon,
                }}
                // onClick={healthCardClickHandler}
            />
            <Card
                addStyle={`width:90%; height:80px;`}
                type="titleCard"
                item={{
                    title: "Lobby Chat",
                    label: "로비 대화방",
                    icon: chatIcon,
                }}
                // onClick={healthCardClickHandler}
            />
        </div>
    );
};

export default Home;
