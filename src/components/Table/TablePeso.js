import { ItemPeso } from '../Items/ItemPeso';
import './table.css';


export const TablePeso = (props) => {

  const { peso, handleDelete } = props
  
  return (
    <div className="wrap-table">
      <table>
        <caption>Historial</caption>
          {
            peso ? peso.map((pes, index) => {
              return (
                <ItemPeso
                  key={index} 
                  pes={pes}
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
