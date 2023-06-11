import { useEffect, useRef } from "react";
import './preview.css';
interface PreviewProps {
    code:string;
    err:any;

}

const html = `
<html><head>
 <style>html { background-color:white; }</style>
</head>
<body>
 <div id="root"></div>
 <script>

    const handlerError = (err)=>{
        const root = document.querySelector('#root');
        root.innerHTML =  '<div style="color:red"><h4>Runtime Error</h4>'+ err +'</div>';
        console.error(err);
    };

    window.addEventListener('error',(event)=>{

        event.preventDefault();
        handlerError(event.error);
       
    });
     window.addEventListener('message',(event)=>{

       try{
         eval(event.data);
       }
       catch(err){
        handlerError(err);
       }
      
     },false);
 </script>
</body>
</html>

`;

const Preview: React.FC<PreviewProps> = ({ code,err }) =>{

    const iframe = useRef<any>();

    useEffect(()=>{

        iframe.current.srcDoc = html;

        setTimeout(async ()=>{

            iframe.current.contentWindow.postMessage(code,'*');

        },50);
    
        
    },[code]);

    return <div className="preview-wrapper">
        <iframe  title='Preview' ref={iframe} sandbox="allow-scripts" srcDoc={html}></iframe>
        { err && <div className="preview-error">{err}</div>}
    </div>;

};

export default Preview;