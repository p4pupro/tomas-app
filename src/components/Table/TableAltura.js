import { ItemAltura } from '../Items/ItemAltura';
import { motion } from "framer-motion";
import './table.css';


export const TableAltura = (props) => {

  const { alturas, handleDelete } = props

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
  }
  
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
        </motion.table>
    </div>
  )
}
