import React from 'react';

interface Props{
    file : any
}

interface Data{
    percent:number,
    loaded: number,
    total:number
}

export const ComponentFile = ({file} : Props)=>{

    const [load,setLoad] = React.useState<Data>({
        percent:0,
        loaded: 0,
        total:0
    });
    
    console.log('corriendo el componente')

    React.useEffect(() => {
        console.log('corriendo effect')
        let formdata = new FormData();
        formdata.append('file1',file)
        let ajax = new XMLHttpRequest();

        ajax.upload.onprogress = (e)=>{
            let percent = (e.loaded / e.total) * 100;
            percent = Math.round(percent);
            console.log(percent);
            setLoad({
                percent,
                loaded: e.loaded,
                total: e.total
            })
        }

        ajax.onload = ()=>{
            console.log('cargado')
        }

        ajax.onerror = ()=>{
            console.log("Upload Failed");  
        }

        ajax.onabort = ()=>{
            console.log("Upload Aborted"); 
        }

        ajax.open("POST","http://localhost/diversos/apis/Laravel7-vehiculos/public/api/vehiculos/archivo_prueba");
        ajax.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        ajax.responseType = 'json';
        ajax.send(formdata);
    
    }, []);


    const formatBytes = (bytes:number, decimals:number = 2) : string=> {
        if (bytes === 0) 
            return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    
    return(
        <label style={{marginBottom:'10px'}}>
            <div><b>{`${load.percent}% (${formatBytes(load.loaded)} de ${formatBytes(load.total)})`}</b></div>
            <progress value={load.percent} max="100" style={{width:'300px'}}></progress> 
            <div> {file.name}</div>
        </label>
    )


}
