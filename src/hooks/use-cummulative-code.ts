import { useTypeSelector } from "./use-type-selector";

export const useCummulativeCode = (Cellid:string) =>{

    return useTypeSelector((state)=> {

        const { data,order} = state.cells;
        const orderedCells = order.map(id => data[id]);
    
        const showFunc =       `

        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value)=>{
    
          const root = document.querySelector('#root');
    
          if(typeof value ==='object'){
    
            if(value.$$typeof && value.props){
              //react element or jsx element
              _ReactDOM.render(value,root);
            }
            else {
              root.innerHTML = JSON.stringify(value);
            }
           
          }
          else {
            root.innerHTML = value;
          }
         
        };
      `;
    
      const showFuncNoOperation = `var show = () => {}`;
        const cummulativeCode = [];
        for(let c of orderedCells){
          //pick all code from previous cells
          if(c.type==='code'){
            if(c.id === Cellid){
              cummulativeCode.push(showFunc);
            }
            else {
              cummulativeCode.push(showFuncNoOperation);
            }
            cummulativeCode.push(c.content);
          }
    
          if(c.id === Cellid){
            break;
          }
        }
        return cummulativeCode;
    
      }).join('\n');

};