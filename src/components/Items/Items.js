import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion"
import '../Table/table.css';

export const Items = (props) => {

    const iconDelete = <FontAwesomeIcon icon={faTrash} />
    
    const { dateStart, dateEnd, timeStart, timeEnd, tit, id } = props.toma
    const { handleDelete, average } = props

    return (
        <>
            <thead>
                <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Pecho</th>
                    <th scope="col">Promedio</th>
                    <th scope="col">Borrar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Fecha">{dateStart === dateEnd ? dateEnd : `${dateStart} - ${dateEnd}`}</td>
                    <td data-label="Hora">{ `${timeStart} - ${timeEnd}`}</td>
                    <td data-label="Pecho">{ tit }</td>
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


