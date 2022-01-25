import { ItemCaca } from '../Items/ItemCaca';
import './table.css';


export const TableCaca = (props) => {

  const { cacas, total, average, handleDelete } = props
  
  return (
    <div className="wrap-table">
      <table>
        <caption>Historial</caption>
          {
            cacas ? cacas.map((caca, index) => {
              return (
                <ItemCaca
                  key={index} 
                  caca={caca}
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
