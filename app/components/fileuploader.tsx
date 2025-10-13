
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
interface prop{
  onuploadfile:(file:File|null)=>void;
}
export default function Fileuploader({onuploadfile}:prop) {
  const[file,setfile]=useState<File|null>(null);
  
    const onDrop = useCallback((acceptedFiles:File[]) => {
      const newfile =  acceptedFiles[0]||null;
      setfile(newfile)
      if(newfile!=null)console.log(newfile.name)
      onuploadfile(newfile);
    }, [onuploadfile]);
  const {getRootProps, getInputProps, isDragActive,isFocused,acceptedFiles} = useDropzone({onDrop,multiple:false,maxSize:20*1024*1024});
  
  
  
  return (
    <div className={`gradient-border w-full cursor-pointer `}>
        <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        (file==null) ?
          (<div>
            {isDragActive?<p>drop your files</p>:<p>Click or drag to upload file</p>}
          </div>) :
          (<div>
            <img src="../public/images/pdf.png" alt="" className='size-10' />
            <p>{`File name:${file.name} File size:${file.size}`}</p>
            <button onClick={(e)=>{
              e.stopPropagation();
              onuploadfile(null);
              setfile(null);
            }} className='back-button'>remove</button>
          </div>)
      }
    </div>
    </div>
  )
}

