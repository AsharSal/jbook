import React, { useEffect } from 'react';
import CodeEditor from './code-editor';

import Preview from './preview';
import Resizeable from './resizeable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

import { useTypeSelector } from '../hooks/use-type-selector';

import { useCummulativeCode } from '../hooks/use-cummulative-code';

interface CodeCellProps {
  cell:Cell
}

const CodeCell:React.FC<CodeCellProps> = ({ cell })=> {


  const { updateCell,createBundle } = useActions();
  const bundle = useTypeSelector((state)=> state.bundles[cell.id]);

  const cummulativeCode = useCummulativeCode(cell.id);


  useEffect(()=>{

    if(!bundle){
      createBundle(cell.id,cummulativeCode);
      return;
    }

    const timer = setTimeout(async ()=>{

      createBundle(cell.id,cummulativeCode);
        
    },750);

    //called automatically when useEffect called again

    return () => {

        clearTimeout(timer);

    }

  },[cummulativeCode,cell.id,createBundle]);


  return (
    <Resizeable direction='vertical'>
        <div style={{ height:'100%',display:'flex',flexDirection:'row' } }>

        <CodeEditor 
            initialValue = {cell.content}
            onInputChange={ (value) => updateCell(cell.id,value) }

            />
      
          {!bundle  ?  (

                <progress className="progress is-small is-primary" max="100">
                  Loading
                </progress>

          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        

        </div>
    </Resizeable>
    
  );
};

export default CodeCell;
