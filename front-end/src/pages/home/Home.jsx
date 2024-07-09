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

const Home = () => {
    const navigate = useNavigate();

    const healthCardClickHandler = (e) => {
        navigate("/app/health");
    };


    return (
        <div css={homePageBodyStyle}>
            <Navbar />

            <Card
                addStyle={`width:90%; height:200px;`}
                type="chartCard"
                item={{
                    title: "Workout Statistics for 2024",
                    label: "2024년 운동 통계",
                    content: [],
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
