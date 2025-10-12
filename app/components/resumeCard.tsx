import React from 'react'
import {Link} from 'react-router'
import Scorecircle  from './scorecircle';
interface ResumeCardProps {
  resume: Resume;
}

export default function ResumeCard({ resume:{id,jobTitle,companyName,imagePath,feedback}}: {resume:Resume}) {
  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div>
            <h2 className='!text-black font-bold break-words'>{companyName}</h2><h2 className='text-lg break-words text-gray-500'>{jobTitle}</h2>
        </div>
        <div className='flex-shrink-0'><Scorecircle score={feedback.overallScore}/></div>
      </div>
      <div className='gradient-border animate-in fade-in duration-1000 overflow-hidden'>
        <div className='w-full h-full '>
            <img src={imagePath} alt="image" className='w-full h-{350px} max-sm:h-{200px} ' />
        </div>
      </div>
      
    </Link>
  );
}