import React from 'react'
import {Link} from 'react-router'
export default function Navbar(){
    return(
        <nav className="navbar">
            <Link to="/" className='text-2xl font-bold text-gradient'>
                ResumeMind
            </Link>
            <Link to="/" className='primary-button w-fit'>
                Upload
            </Link>
        </nav>
    )
}