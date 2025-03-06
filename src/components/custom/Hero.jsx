import React from 'react'
import { Button } from '../ui/button'

function Hero() {
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1
                className='font-extrabold text-[50px] text-center mt-16'
            >
                <span className='text-[#7326d8]'>
                    Unlock the Best Destinations with Smart Travel Planning!
                </span>
            </h1>
            <p className='text-xl text-gray-500 text-center'>Your personal AI travel assistant, crafting custom
                itineraries based on your preferences, budget, and schedule.</p>
            <Button>Get Started</Button>
        </div>
    )
}

export default Hero
