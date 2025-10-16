import type { aI } from 'node_modules/react-router/dist/development/routeModules-D5iJ6JYT';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { usePuterStore } from '~/lib/puter';
import Scorecard from '../components/scorecard'
export const meta =()=>([
    {title:"resume|feedback"},
    {name:"description",content:"feedback page"},
])


const resume = () => {
    const {id}=useParams();
    const [data,setdata]=useState<Feedback  |null>(null);
    const [isloading,setisloading]=useState(true);
    const {kv,auth}=usePuterStore();

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const predata = await kv.get(`resume:${id}`);
                if(!predata)throw new Error("data is empty");
                const finaldatainjson = await JSON.parse(predata);
                console.log(finaldatainjson);
                console.log(finaldatainjson.feedback);
                setdata(finaldatainjson.feedback);
                setisloading(false);

            }
            catch(err:any){
                console.log(`error nikal gaya: ${err.message}`);
            }
            
        }
        fetch();
    },[id])
  return (
  <div>
    {data == null ? (
      <p>It is loading man</p>
    ) : (<>
      <div className='w-screen flex flex-col gap-4 text-center bg-blue-50 '>
        <Scorecard data={data} topic="ATS"/>
        <Scorecard data={data} topic="content"/>
        <Scorecard data={data} topic="skills"/>
        <Scorecard data={data} topic="structure"/>
        <Scorecard data={data} topic="toneAndStyle"/> 
        <div className= {` w-full py-6  text-white text-3xl font-bold ${(data.overallScore>65?"bg-green-500":"bg-red-500")}`} >
          Overallscore: {data.overallScore}
        </div>
      </div>
      

      </>
    )}
  </div>
);

}

export default resume   