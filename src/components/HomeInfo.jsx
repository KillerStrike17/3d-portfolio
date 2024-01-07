import React from 'react'
import { Link } from 'react-router-dom'
import {arrow} from '../assets/icons'

const InfoBox = ({text, link, btnText}) =>(
    <div className='info-box'>
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={arrow} className="w-4 h-4 object-contain"/>
        </Link>
    </div>
)

const renderContent = {
    1:(
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hello World, I am <span className="font-semibold">Shubham Agnihotri</span> 👋
            <br/>
            AI Engineer from India
        </h1>
    ),
    2:(
        <InfoBox text={"Worked with many companies and communities and learnied my skills along the way."} link={"/about"} btnText={"Learn more"}/>
    ),
    3:(
        <InfoBox text={"Led multiple projects to success over the years. Curious about the impacts?"} link={"/projects"} btnText={"Visit my Portfolio"}/>
    ),
    4:(
        <InfoBox text={"Want to connect, I am just a few keystrokes away."} link={"/contact"} btnText={"Let's connect"}/>
    ),
}



const HomeInfo = ({currentStage}) => {
  return (
    renderContent[currentStage] || null
  )
}

export default HomeInfo