import MDEditor from "@uiw/react-md-editor";
import { useState,useEffect, useRef } from "react";
import './text-editor.css';
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface Textprops {
  cell:Cell
}

const TextEditor: React.FC<Textprops> = ({ cell }) => {

  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement|null>(null);
  const { updateCell } = useActions();

  useEffect(()=>{

    const listner = (event:MouseEvent) => {

        if(ref.current && event.target && ref.current.contains(event.target as Node)){
            return;
        }

        setEditing(false);

    };

    document.addEventListener('click',listner,{capture:true});

    //cleanup
    return () => {
        document.removeEventListener('click',listner,{capture:true});
    }

  },[]);

  if(editing){
    return (
        <div ref={ref}>
            <MDEditor className="text-editor"

            value={cell.content}
            onChange={(v)=> updateCell(cell.id, v || '')}
            
            />
        </div>
    )
  }

  return (
    <div className="text-editor" onClick={()=> setEditing(true)}>
        <div className="card-content">
            <MDEditor.Markdown source={cell.content || 'Click to edit'} />
        </div>
     
    </div>
  );
};

export default TextEditor;