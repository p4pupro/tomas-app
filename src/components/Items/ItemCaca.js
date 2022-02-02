import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion"
import '../Table/table.css';

export const ItemCaca = (props) => {

    const iconDelete = <FontAwesomeIcon icon={faTrash} />
    
    const { date, time, type, id } = props.caca
    const { handleDelete, total, average } = props

    return (
        <>
            <thead>
                <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Total Diario</th>
                    <th scope="col">Promedio</th>
                    <th scope="col">Borrar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Fecha">{ date }</td>
                    <td data-label="Hora">{ time }</td>
                    <td data-label="Tipo">{ type }</td>
                    <td data-label="Total Diario">{ total }</td>
                    <td data-label="Promedio">{ average }</td>
                    <td data-label="Borrar">
                        <motion.button
                            onClick={ () => handleDelete(id) }
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >   
                            { iconDelete }
                        </motion.button>
                    </td>
                </tr>
            </tbody>
        </>
       )
}