
import React from 'react'
import type { Route } from "./+types/home";
import { usePuterStore } from '~/lib/puter';
import { useLocation,useNavigate } from 'react-router';
import { useEffect } from 'react';
export const meta =()=>{[
    {title:'Resumind | Auth'},
    {name:'description',content:'log into your account'},
]}

const auth = () => {
    const {isLoading,auth}= usePuterStore();
    const navigate= useNavigate();
    const next = useLocation().search.split('next=')[1];
    useEffect(()=>{
        if(auth.isAuthenticated)navigate(next);
    },[auth.isAuthenticated,next]);
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className='gradient-border shadow-lg'>
            <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                <div className='flex flex-col item-center text-center'>
                    <h1>Welcome</h1>
                    <h2>Log in to continue your careeer</h2>
                </div>
                <div className='flex flex-col item-center text-center'>
                    {isLoading?(<button className='auth-button animate-pulse'>Loading </button>):(
                        <>
                            {auth.isAuthenticated?(<button className='auth-button' onClick={auth.signOut}>Sign Out</button>):(<button className='auth-button' onClick={auth.signIn}>Sign In</button>)}
                        </>
                    )}
                </div>
            </section>
        </div>
    </main>
  )
}

export default auth