import React from "react";
import Auxillary from "../../hoc/Auxillary";
import classes from './Layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = (props) =>{
    return(
        <Auxillary>
            <Toolbar />
            <main className = {classes.Content}>
                {props.children}
            </main>
        </Auxillary>
    )
}

export default Layout;