"user client";
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import React from 'react'

export default function Rating() {
    return (
        <div className='mt-12 flex flex-col'>
            <div>
                <span className='font-black'>Rating Breakedown</span>
            </div>
            <div className='flex gap-28'>
                <span className='opacity-50'>Seller communication level</span>
                <div className='flex flex-row gap-2'>
                    <span>5</span>
                    <StarIcon className='h-6 w-6' />
                </div>
            </div>
            <div className='flex gap-32'>
                <span className='opacity-50'>Recommend to a friend</span>
                <div className='flex flex-row gap-2'>
                    <span>4.9</span>
                    <StarIcon className='h-6 w-6' />
                </div>
            </div>
            <div className='flex gap-40'>
                <span className='opacity-50'>Service as described</span>
                <div className='flex flex-row gap-2'>
                    <span>5</span>
                    <StarIcon className='h-6 w-6' />
                </div>
            </div>
        </div>
    )
}
