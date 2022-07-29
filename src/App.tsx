import React, { useState } from 'react';
import {ComponentFile} from './ComponentFile';

export const App = ()=> {
  
  const btnReal = React.useRef<any>(null);
  const [boxActive,setboxActive] = useState(false);
  const [files,setFiles] = useState<any[]>([]);

  const onChange = (e:any)=>{
    e.preventDefault();
    for(let i=0;i<e.target.files.length;i++){
      //if (/\.(?=jpg|jpeg)/gi.test(file.name.toLowerCase())) 
        loadComponent(e.target.files[i]);
    }
  }

  const onDragOver = (e:any)=>{
    e.preventDefault();
    e.stopPropagation();
    setboxActive(true);
  }

  const onDrop = (e:any)=>{
    e.preventDefault();
    e.stopPropagation();
    setboxActive(false);
    for(let i=0;i<e.dataTransfer.files.length;i++ )
      loadComponent(e.dataTransfer.files[i]);
  }

  const onDragLeave = (e:any)=>{
    e.preventDefault();
    e.stopPropagation();
    setboxActive(false);
  }

  const loadComponent = (file:any)=>{

    setFiles( (filesOlds:any) => [
      ...filesOlds,
      file
    ]);

  }

  return (
    <div className="uploader" onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragLeave}>
        <input ref={btnReal} type="file" onChange={onChange} name="file1" multiple />
        <label className={ boxActive ? 'boxDragActive' : 'boxDragDisabled'}>
            <div>Total: {files.length}</div>
            <div className="start">
                <i className="fa fa-download" aria-hidden="true"></i>
                <div>Selecciona un archivo a arrastra dentro de la caja</div>
                <span className="btn btn-success" onClick={()=>btnReal.current.click()}>Selecciona un archivo</span>
            </div>
              {
                files.map( (file,index)=> <ComponentFile key={index} file={file}/> )
              }
        </label>
    </div>
  );
}




