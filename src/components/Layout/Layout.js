import React from "react";
import Auxillary from "../../hoc/Auxillary";
import classes from './Layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) =>{
    return(
        <Auxillary>
            <Toolbar />
            <SideDrawer />
            <main className = {classes.Content}>
                {props.children}
            </main>
        </Auxillary>
    )
}

export default Layout;