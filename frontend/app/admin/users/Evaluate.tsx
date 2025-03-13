'use client';
import React from 'react'
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import StarIcon from '@heroicons/react/24/solid/StarIcon';

export default function Evaluate() {
    return (
        <div>
            <div className='flex flex-row gap-5 font-black'>
                <span>danh gia</span>
                <span>115 review</span>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
                <div className='flex flex-row gap-4'>
                    <Button>
                        <div className="flex flex-row gap-2">
                            <span className='text-xl'>5</span>
                            <StarIcon className="w-5 h-5 mt-1" />
                        </div>
                    </Button>
                    <Progress className='mt-3' value={80} />
                    <span className='mt-1'>(109)</span>
                </div>
                <div className='flex flex-row gap-4'>
                    <Button>
                        <div className='flex flex-row gap-2'>
                            <span className='text-xl'>4</span>
                            <StarIcon className="w-5 h-5 mt-1" />
                        </div>
                    </Button>
                    <Progress className='mt-3' value={20} />
                    <span className='mt-1'>(5)</span>
                </div>
                <div className='flex flex-row gap-4'>
                    <Button>
                        <div className="flex flex-row gap-2">
                            <span className='text-xl'>3</span>
                            <StarIcon className="w-5 h-5 mt-1" />
                        </div>
                    </Button>
                    <Progress className='mt-3' value={1} />
                    <span className='mt-1'>(1)</span>
                </div>
                <div className='flex flex-row gap-4 opacity-50'>
                    <Button>
                        <div className="flex flex-row gap-2">
                            <span className='text-xl'>2</span>
                            <StarIcon className="w-5 h-5 mt-1" />
                        </div>
                    </Button>
                    <Progress className='mt-3' value={0} />
                    <span className='mt-1'>(0)</span>
                </div>
                <div className='flex flex-row gap-4 opacity-50'>
                    <Button>
                        <div className="flex flex-row gap-2">
                            <span className='text-xl'>1</span>
                            <StarIcon className="w-5 h-5 mt-1" />
                        </div>
                    </Button>
                    <Progress className='mt-3' value={0} />
                    <span className='mt-1'>(0)</span>
                </div>
            </div>
        </div>
    )
}
