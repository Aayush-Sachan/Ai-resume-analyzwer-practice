import React, { useState, type FormEvent } from 'react'
import Navbar from '~/components/navbar'
import Fileuploader from '~/components/fileuploader'
export const meta=()=>{
    return [
        {title:"upload"},
        {name:"description",content:"upload your resume here"},
    ]
}
const upload = () => {

    const [isprocessing,setisprocessign]=useState(false);
    const handlesubmit = (e:FormEvent<HTMLFormElement>)=>{

    }
  return (
    <main className="bg-[url('./images/bg-main.svg')] bg-cover">
        <Navbar/>
        <section className="main-section ">
            <div className="page-heading">
                <h1>Smart feedback for your dream job </h1>
                {(isprocessing)?(
                    <img src="/images/resume-scan.gif" alt="" className='w-full' />
                ):(<h2>Drop your resume for an ATS score and improvement tips</h2>)}
                {!isprocessing && 
                    <form onSubmit={handlesubmit} id='upload-form' className='flex flex-col gap-4 m-3'>
                        <div className='form-div' >
                            <label htmlFor="company_name">Company Name</label>
                            <input type="text" name="company_name" id="company_name" placeholder='Company Name'/>
                        </div>
                        <div className='form-div' >
                            <label htmlFor="Job_title">Job title</label>
                            <input type="text" name="Job_title" id="Job_title" placeholder='Job title'/>
                        </div>
                        <div className='form-div' >
                            <label htmlFor="job_description">Job description</label>
                            <textarea rows={4} name="job_description" id="job_description" placeholder='job description'/>
                        </div>
                        <div className='form-div' >
                            <label htmlFor="Document">Upload document</label>
                            <Fileuploader/>
                            
                        </div>
                        <button className='primary-button' type='submit'>
                            start analyzing
                        </button>

                    </form>
                }
            </div>
        </section>
    </main>
  )
}

export default upload