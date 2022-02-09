import { ItemPis } from '../Items/ItemPis';
import { motion } from "framer-motion";
import './table.css';


export const TablePis = (props) => {

  const { pis, total, average, handleDelete } = props

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
      </motion.table>
    </div>
  )
}
