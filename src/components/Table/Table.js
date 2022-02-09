import { Items } from '../Items/Items';
import { motion } from "framer-motion";
import './table.css';


const Table = (props) => {

  const { tomas, average, handleDelete,  } = props

  const cardVariants = {
    offscreen: {
      y: 100
    },
    onscreen: {
      y: 5,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.9
      }
    }
  };
  
  return (
    <div className="wrap-table">
      <motion.table
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={cardVariants}
      >
        <caption className="table-title">Historial</caption>
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
          </motion.table>
    </div>
  )
}

export default Table;
