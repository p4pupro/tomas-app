import { Outlet } from "react-router-dom";

export const Layout = () => { 
    return (
        <div className="row">
            <div className="col-12 col-s-12">
                <div className="aside">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};
