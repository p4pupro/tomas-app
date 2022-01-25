import { ItemPis } from '../Items/ItemPis';
import './table.css';


export const TablePis = (props) => {

  const { pis, total, average, handleDelete } = props
  
  return (
    <div className="wrap-table">
      <table>
        <caption>Historial</caption>
          {
            pis ? pis.map((pi, index) => {
              return (
                <ItemPis
                  key={index} 
                  pi={pi}
                  total={total}
                  average={average}
                  handleDelete={handleDelete} 
                />
              )
            })
          :
            <tbody></tbody>
          }  
      </table>
    </div>
  )
}
