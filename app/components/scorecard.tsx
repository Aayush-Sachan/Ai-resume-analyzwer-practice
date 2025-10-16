import React from 'react'
/*

*/
const  stylefor={
    good : "bg-green-100 text-white w-fit h-fit",
    improve : "bg-yellow-100 text-black",
    error : "bg-red-500 text-white"
}
const Scorecard = ({data,topic}:{data:Feedback,topic:string}) => {

  return (
    <div>
          <div className='w-full py-6 bg-blue-500 text-white text-3xl font-bold'>{topic}: {data[topic].score}</div>
          <div className="w-full py-4 bg-blue-200 text-blue-900 text-lg">
            <ul className='list-disc pl-6'>
                <div className='flex flex-col gap-2 items-center'>
                {data[topic].tips.map((tip,index)=><li className={stylefor[tip.type]} key={index}>{tip.tip}</li>)}
                </div>
              </ul>
              
            
          </div>
    </div>
  )
}

export default Scorecard