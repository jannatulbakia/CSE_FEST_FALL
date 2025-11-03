import React from 'react';
import HeroSection from '../HomeSections/HeroSection';
import HealthTips from '../HomeSections/HealthTips';
import Features from '../HomeSections/Features';
import Experts from '../HomeSections/Experts';
import HealthOfTheWeek from '../HomeSections/HealthOfTheWeek';
import WellnessIdeas from '../HomeSections/WellnessIdeas';
import CallToAction from '../HomeSections/CallToAction';

const Home = () => {
    return (
        <div className='bg-gray-50'>
            <HeroSection></HeroSection>
            <HealthTips></HealthTips>
            <Features></Features>
            <Experts></Experts>
            <HealthOfTheWeek></HealthOfTheWeek>
            <WellnessIdeas></WellnessIdeas>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;