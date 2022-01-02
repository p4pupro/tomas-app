import { Items } from '../Items/Items';
import './table.css';

export const Table = (props) => {

    const { tomas, average, handleDelete } = props

    return (
        <div className="wrap-table">
          <table>
            <caption>Historial</caption>
            {
              tomas ? tomas.map((toma, index) => {
                return (
                  <Items
                    key={index} 
                    toma={toma}
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
