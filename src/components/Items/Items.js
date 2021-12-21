import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import './item.css';

export const Item = (props) => {

    const iconDelete = <FontAwesomeIcon icon={faTrash} />

    const { date, time, tit, action, id } = props.toma
    const { handleDelete } = props
    return (
        <>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Teta</th>
                    <th>Acción</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{ date }</td>
                    <td>{ time }</td>
                    <td>{ tit }</td>
                    <td>{ action }</td>
                    <td><button onClick={ () => handleDelete(id) }>{ iconDelete }</button></td>
                </tr>
            </tbody>
        </>
       )
}


