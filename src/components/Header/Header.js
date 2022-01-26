import './header.css';
import { Link } from "react-router-dom";

export const Header = () => {

    return (
        <div className="header">
            <h1 className="header-title">Baby Dan</h1>
            <div className="header-buttons-container">
                <div className="header-button">
                    <Link to="tomas-app/" className="link-text">Tomas</Link>
                </div>
                <div className="header-button">
                    <Link to="tomas-app/cacas" className="link-text">Cacas</Link>
                </div>
                <div className="header-button">
                    <Link to="tomas-app/pis" className="link-text">Pis</Link>
                </div>
                <div className="header-button">
                    <Link to="tomas-app/peso" className="link-text">Peso</Link>
                </div>
                <div className="header-button">
                    <Link to="tomas-app/altura" className="link-text">Altura</Link>
                </div>
            </div>
        </div>
    )
}