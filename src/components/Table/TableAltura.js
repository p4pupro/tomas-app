import { ItemAltura } from '../Items/ItemAltura';
import './table.css';


export const TableAltura = (props) => {

  const { alturas, handleDelete } = props
  
  return (
    <div className="wrap-table">
      <table>
        <caption>Historial</caption>
          {
            alturas ? alturas.map((altura, index) => {
              return (
                <ItemAltura
                  key={index} 
                  altura={altura}
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
