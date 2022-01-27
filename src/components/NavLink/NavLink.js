import { NavLink as NavLinkReactRouter } from "react-router-dom";
import './NavLink.css';

export const NavLink = ({ to, children, ...props }) => {   
    return (
        <NavLinkReactRouter 
            {...props}
            className={ ({isActive}) => { return isActive ? 'is-active' : 'link-text' } }
            to={to}
        >
            {children}
        </NavLinkReactRouter>
    )
}