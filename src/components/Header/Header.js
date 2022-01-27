import './header.css';
import { NavLink } from '../NavLink/NavLink';

export const Header = () => {

    return (
        <div className="header">
            <h1 className="header-title">Baby Dan</h1>
            <div className="header-buttons-container">
                <div className="header-button">
                    <NavLink to="tomas-app/">Tomas</NavLink>
                </div>
                <div className="header-button">
                    <NavLink to="tomas-app/cacas">Cacas</NavLink>
                </div>
                <div className="header-button">
                    <NavLink to="tomas-app/pis">Pis</NavLink>
                </div>
                <div className="header-button">
                    <NavLink to="tomas-app/peso">Peso</NavLink>
                </div>
                <div className="header-button">
                    <NavLink to="tomas-app/altura">Altura</NavLink>
                </div>
            </div>
        </div>
    )
}