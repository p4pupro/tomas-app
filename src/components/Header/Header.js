import './header.css';
import { NavLink } from "react-router-dom";

export const Header = () => {

    return (
        <div className="header">
            <h1 className="header-title">Baby Dan</h1>
            <div className="header-buttons-container">
                <div className="header-button">
                    <NavLink to="tomas-app/" className={ ({isActive}) => { return isActive ? 'is-active link-text' : 'link-text' }}>Tomas</NavLink>
                </div>
                <div className="header-button">
                    <NavLink to="tomas-app/cacas" className={ ({isActive}) => isActive ? 'is-active link-text' : 'link-text'}>Cacas</NavLink>
                </div>
                <div className="header-button">
                    <NavLink to="tomas-app/pis" className={ ({isActive}) => isActive ? 'is-active link-text' : 'link-text'}>Pis</NavLink>
                </div>
                <div className="header-button">
                    <NavLink to="tomas-app/peso" className={ ({isActive}) => isActive ? 'is-active link-text' : 'link-text'}>Peso</NavLink>
                </div>
                <div className="header-button">
                    <NavLink to="tomas-app/altura" className={ ({isActive}) => isActive ? 'is-active link-text' : 'link-text'}>Altura</NavLink>
                </div>
            </div>
        </div>
    )
}