import React, { useState } from "react";
import ScrollPicker from "../../common/components/scrollPicker/ScrollPicker";
import AppFooter from "../../common/components/appFooter/AppFooter";
import { css } from "@emotion/react";
import { calendarBodyStyle, calendarContentStyle, calendarSubTitleStyle, calendarTitleStyle, healthPageBodyStyle, monthStyle, recordedDayStyle, selectedDayStyle, todayStyle, yearStyle } from "./HealthPageStyle";
import healthIcon from "@img/sports/health-white.png";
import Navbar from "../../common/components/navbar/Navbar";
import HealthCard from "./components/HealthCard";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";


const HealthPage = () => {
    const [pickerValue, setPickerValue] = useState({});
    const [numberPickerOpen, setNumberPickerOpen] = useState(false);

    const numberPickerHandler = () => {
        setNumberPickerOpen(true);
    };

    return (
        <div css={healthPageBodyStyle}>
            <Navbar logo={healthIcon}></Navbar>

            <HealthCard addStyle={`width:90%;height:350px;`}>
                <div css={calendarBodyStyle}>
                    <div css={calendarTitleStyle}>
                        <div css={yearStyle}>
                            <MdArrowBackIos></MdArrowBackIos>
                            <span name="date-year">2024</span>
                            <MdArrowForwardIos></MdArrowForwardIos>
                        </div>
                        <div css={monthStyle}>
                            <h1>
                                12
                            </h1>
                            <h2>.Dec</h2>

                        </div>
                    </div>
                    
                    <ul css={calendarSubTitleStyle}>
                        <li>Mo</li>
                        <li>Tu</li>
                        <li>We</li>
                        <li>Th</li>
                        <li>Fr</li>
                        <li>Sa</li>
                        <li>Su</li>
                    </ul>

                    <ul css={calendarContentStyle}>
                        <li><span>30</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></li>
                        <li><span css={recordedDayStyle}>7</span><span css={recordedDayStyle}>8</span><span css={recordedDayStyle}>9</span><span css={recordedDayStyle}>10</span><span>11</span><span>12</span><span>13</span></li>
                        <li><span>14</span><span css={selectedDayStyle}>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span></li>
                        <li><span>21</span><span>22</span><span>23</span><span css={todayStyle}>24</span><span>25</span><span>26</span><span>27</span></li>
                        <li><span css={recordedDayStyle}>28</span><span>29</span><span css={recordedDayStyle}>30</span><span>31</span><span>1</span><span>2</span><span>3</span></li>
                        <li><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></li>
                    </ul>
                    
                </div>
            </HealthCard>
            <HealthCard addStyle={`width:90%;min-height:200px;`}>
                

            </HealthCard>



            <AppFooter />
        </div>
    );
};

export default HealthPage;
