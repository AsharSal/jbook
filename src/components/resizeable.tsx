import './resizeable.css';
import { useEffect, useState } from 'react';
import { ResizableBox,ResizableBoxProps } from 'react-resizable';

interface ResizeableProps {

    direction: 'horizontal'| 'vertical';
    children:any

}

const Resizeable:React.FC<ResizeableProps> = ({ direction, children }) => {

    let resizeProps:ResizableBoxProps;

    const [innerHeight,setInnerHeight] = useState(window.innerHeight);
    const [innerWidth,setInnerWidth] = useState(window.innerWidth);
    const [width,setWidth] = useState(window.innerWidth*0.50);

    useEffect(()=>{

        let timer:any;

        const listener = () =>{

            if(timer){

                clearTimeout(timer);
            }

            timer =  setTimeout(()=>{

                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if(window.innerWidth*0.75 < width){
                    setWidth(window.innerWidth * 0.75);
                }

            },100);

        };

        window.addEventListener('resize',listener);

        return () =>{
            window.removeEventListener('resize',listener);
        };

    },[width]);

    if(direction==='horizontal'){

        resizeProps = {

            className:'resize-horizontal',
            minConstraints:[innerWidth*0.25,Infinity],
            maxConstraints:[innerWidth*0.75,Infinity],
            height:Infinity, 
            width:width,
            resizeHandles:['e'],
            onResizeStop:(event,data) => {

                setWidth(data.size.width);

            }
        };

    }
    else {

        resizeProps = {

            minConstraints:[Infinity,24],
            maxConstraints:[Infinity,innerHeight*0.9],
            height:300, 
            width:Infinity,
            resizeHandles:['s'],
        };
    }

    return <ResizableBox {...resizeProps}>
                {children}
        </ResizableBox>;

};

export default Resizeable;