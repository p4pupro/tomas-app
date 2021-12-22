import { Item } from '../Items/Items';
import './table.css';

export const Table = (props) => {

    const { tomas, handleDelete } = props

    return (
        <div className="wrap-table">
          <table>
            <caption>Historial</caption>
            {
              tomas ? tomas.map((toma, index) => {
                return (
                  <Item 
                    key={index} 
                    toma={toma} 
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
