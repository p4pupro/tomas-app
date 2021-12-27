import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
// import './item.css';
import '../Table/table.css';

export const Items = (props) => {

    const iconDelete = <FontAwesomeIcon icon={faTrash} />

    const { date, time, tit, action, id } = props.toma
    const { handleDelete } = props
    return (
        <>
            <thead>
                <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Teta</th>
                    <th scope="col">Acción</th>
                    <th scope="col">Borrar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Fecha">{ date }</td>
                    <td data-label="Hora">{ time }</td>
                    <td data-label="Teta">{ tit }</td>
                    <td data-label="Acción">{ action }</td>
                    <td data-label="Borrar"><button onClick={ () => handleDelete(id) }>{ iconDelete }</button></td>
                </tr>
            </tbody>
        </>
       )
}


