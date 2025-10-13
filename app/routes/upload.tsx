import React, { useState, type FormEvent } from 'react'
import type { Route } from "./+types/home";
import Navbar from '~/components/navbar'
import Fileuploader from '~/components/fileuploader'
import { usePuterStore } from '~/lib/puter'
// import { prepareInstructions } from '~/constants/index'
import { prepareInstructions } from '../../constants/index'
import { AIResponseFormat } from '../../constants/index' // Update the path if 'prepareInstructions' is exported from '~/constants'
import { useNavigate } from 'react-router'
export const meta=()=>{
    return [
        {title:"upload"},
        {name:"description",content:"upload your resume here"},
    ]
}
const upload = () => {
    const {fs,kv,ai}=usePuterStore();
    const [isprocessing,setisprocessing]=useState(false);
    const [statustext,setstatustext]=useState("");
    const navigate=useNavigate();
    const[file,setfile]=useState<File|null>(null);
    function onuploadfile(file:File|null){
        setfile(file);
        if(file!=null)console.log(file.size);
        if(file==null)console.log("undefiend")
    }
    const handleanalyze=async (data:{ [k: string]: FormDataEntryValue})=>{
        if(!file){
            console.log("file nahi update hui")
            return;
        }
        setisprocessing(true);
        setstatustext("uploading your file");
        
        
        const uploadedfile = await fs.upload([file]);
        if(!uploadedfile){
            setstatustext('Error cannot upload');
            return ;
        }
        setstatustext('preparing your data');
        const uuid = crypto.randomUUID();
        const finaldata={
            id:uuid,
            resumepath:uploadedfile.path,
            companyname : data.company_name,
            jobtitle: data.Job_title,
            jobdesc: data.job_description,
            feedback:"",
        }
        kv.set(`resume:${uuid}`,JSON.stringify(finaldata));
        setstatustext("analyzing your data");
        const jobTitle=data.Job_title as string;
        const jobDescription=data.job_description as string;
         const feedback = await ai.feedback(
            uploadedfile.path,
            prepareInstructions({ jobTitle, jobDescription,AIResponseFormat })
        )
        if(!feedback)return;
        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;
        
        finaldata.feedback= JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(finaldata));
        setstatustext('Analysis complete, redirecting...');
        console.log(finaldata.feedback);
        setisprocessing(false);

        setstatustext("");
        navigate(`/resume/${uuid}`);
        


    }
    const handlesubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form=(e.currentTarget.closest('form'));
        if(!form)return;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries());
        
        handleanalyze(data)
    }
    console.log(statustext);
  return (
    <main className="bg-[url('./images/bg-main.svg')] bg-cover">
        <Navbar/>
        <section className="main-section ">
            <div className="page-heading">
                <h1>Smart feedback for your dream job </h1>
                {(isprocessing)?(
                    <div>
                    <img src="../public/images/resume-scan.gif" alt="" className='w-full' />
                    <h2>{statustext}</h2>
                    </div>
                ):(<h2>Drop your resume for an ATS score and improvement tips</h2>)}
                {!isprocessing && 
                    <form onSubmit={handlesubmit} id='upload-form' className='flex flex-col gap-4 m-3'>
                        <div className='form-div' >
                            <label htmlFor="company_name">Company Name</label>
                            <input type="text" name="company_name" id="company_name" placeholder='Company Name' />
                        </div>
                        <div className='form-div' >
                            <label htmlFor="Job_title">Job title</label>
                            <input type="text" name="Job_title" id="Job_title" placeholder='Job title' />
                        </div>
                        <div className='form-div' >
                            <label htmlFor="job_description">Job description</label>
                            <textarea rows={4} name="job_description" id="job_description" placeholder='job description' />
                        </div>
                        <div className='form-div' >
                            <label htmlFor="Document">Upload document</label>
                            <Fileuploader onuploadfile={onuploadfile}/>
                            
                        </div>
                        <button className="primary-button disabled:opacity-50 disabled:cursor-not-allowed" disabled={!file} type="submit" >
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