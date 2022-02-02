import './header.css';
import { NavLink } from '../NavLink/NavLink';
import { motion } from "framer-motion";

export const Header = () => {

    return (
        <div className="header">
            <h1 className="header-title">Baby Dan</h1>
            <div className="header-buttons-container">
                <motion.div
                    className="header-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                > 
                    <NavLink to="tomas-app/">Tomas</NavLink>
                </motion.div> 
                <motion.div
                    className="header-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                > 
                    <NavLink to="tomas-app/cacas">Cacas</NavLink>
                </motion.div>
                <motion.div
                    className="header-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                > 
                    <NavLink to="tomas-app/pis">Pis</NavLink>
                </motion.div>
                <motion.div
                    className="header-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >  
                    <NavLink to="tomas-app/peso">Peso</NavLink>
                </motion.div>
                <motion.div
                    className="header-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >  
                    <NavLink to="tomas-app/altura">Altura</NavLink>
                </motion.div>
            </div>
        </div>
    )
}