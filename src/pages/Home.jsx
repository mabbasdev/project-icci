import React from 'react'
import Achievements from '@/components/Achievements'
import Departments from '@/components/Departments'
import HeroCarousel from '@/components/HeroCarousel'
import GlobalNetworkCTA from '@/components/JoinNetwork'
import Leadership from '@/components/Leadership'
import ServicesGrid from '@/components/ServicesGrid'
import TradeSupport from '@/components/TradeSupport'

const Home = () => {
    return (
        <>
            <HeroCarousel />
            <ServicesGrid />
            <Leadership />
            <Achievements />
            <TradeSupport />
            <Departments />
            <GlobalNetworkCTA />
        </>
    )
}

export default Home
