import { ItemCaca } from '../Items/ItemCaca';
import { motion } from "framer-motion";
import './table.css';


export const TableCaca = (props) => {

  const { cacas, total, average, handleDelete } = props

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
      </motion.table>
    </div>
  )
}
