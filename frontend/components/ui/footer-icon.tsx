'use client';

import React from 'react';
import Image from 'next/image';

export default function Footericon() {
	return (
		<main>
			<div className='grid grid-cols-5 px-12 relative mt-20'>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110 hover:border-l-4'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/web-design.png'
								alt='Graphics & Design'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-14'>Graphics & Design</span>
					</li>
				</ul>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/performance.png'
								alt='Degital Marketing'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-14'>Degital Marketing</span>
					</li>
				</ul>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/contract.png'
								alt='Writting & Translation'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-14'>Writting & Translation</span>
					</li>
				</ul>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/video-editing.png'
								alt='Video & Animation'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-14'>Video & Animation</span>
					</li>
				</ul>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/microphone.png'
								alt='Music & Audio'
								height={100}
								width={100}
							/>
						</a>
						<span className='pl-20'>Music & Audio</span>
					</li>
				</ul>
			</div>
			<div className='grid grid-cols-5 px-12 relative mt-40'>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/web-programming.png'
								alt='Program & Tech'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-14'>Program & Tech</span>
					</li>
				</ul>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/handshake.png'
								alt='business'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-24'>business</span>
					</li>
				</ul>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/tea-cup.png'
								alt='Lifestyle'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-24'>Lifestyle</span>
					</li>
				</ul>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/folder.png'
								alt='Data'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-24'>Data</span>
					</li>
				</ul>
				<ul className='list-none transition ease-in-out delay-150 hover:scale-110'>
					<li className='flex flex-col  absolute gap-2'>
						<a
							href=''
							className='pl-20'
						>
							<Image
								src='/image/camera.png'
								alt='Photography'
								height={100}
								width={100}
							/>
						</a>
						<span className=' pl-20'>Photography</span>
					</li>
				</ul>
			</div>
		</main>
	);
}
