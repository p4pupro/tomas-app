import { ItemPeso } from '../Items/ItemPeso';
import { motion } from "framer-motion";
import './table.css';


export const TablePeso = (props) => {

  const { peso, handleDelete } = props

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
      </motion.table>
    </div>
  )
}
