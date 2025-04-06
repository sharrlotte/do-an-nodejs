import React from 'react';

import Link from 'next/link';
import Navigation from '@/app/Navigation';
import UserSheet from '@/app/UserSheet';
import { BellIcon } from 'lucide-react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Navbar } from './navbar';
import SearchBar from '@/app/SearchBar';

function Header() {
  return (
    <div className="p-4 bg-card z-40 rounded-lg">
      <div className="flex items-center gap-x-5 sticky w-full top-4 py-2 px-4 rounded-2xl shadow-3xl z-40">
        <Link className="text-3xl whitespace-nowrap font-extrabold text-accent hidden sm:block" href="/">
          Novel Scan
        </Link>
        <Navigation />

        <div className="hidden sm:flex w-full items-center gap-2">
          <div className="absolute w-full flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <SearchBar />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <BellIcon className="w-6 h-6" />
          <EnvelopeIcon className="w-6 h-6" />
          <UserSheet />
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
