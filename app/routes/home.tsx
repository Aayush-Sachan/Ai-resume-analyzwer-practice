import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
import {resumes} from "../../constants/index";
import ResumeCard from "~/components/resumeCard";
import { useEffect } from "react";
import { data, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumemind" },
    { name: "description", content: "Website for your resume" },
  ];
}

export default function Home() {
   const {auth,isLoading}= usePuterStore();
   
   const navigate = useNavigate();
   useEffect(()=>{
    if(!auth.isAuthenticated)navigate('/auth?next=/');
   },[auth.isAuthenticated])
  return <main className="bg-[url('./images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading">
        <h1>Tract your application and resume rating </h1>
        <h2>Review your submission and check AI powered feedback</h2>
      </div >
      {resumes.length!=0 && <div className="resumes-section">{resumes.map((resume)=>{
      return <ResumeCard key={resume.id} resume={resume}/>
    })
    }</div>}
    </section>
    
    
  </main>
}
