import { Fragment } from "react";
import { useTypeSelector } from "../hooks/use-type-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
const CellList:React.FC =  () => {

    const cells = useTypeSelector(({ cells:{ order, data }}) => {

        return order.map((id)=>{
            return data[id];
        });

    });

    const renderedCells = cells.map(cell=> (
        <Fragment key={cell.id}>
            <CellListItem  cell={cell} />
            <AddCell previousCellId={cell.id} />
            
        </Fragment>
    ));

    return <div>
         <div className={cells.length ===0 ? 'force-visible':''}>
            <AddCell previousCellId={null} />
        </div>
        {renderedCells}
        
        </div>;

};

export default CellList;