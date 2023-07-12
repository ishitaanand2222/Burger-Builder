import React, { useState } from "react";
import Auxillary from "../../hoc/Auxillary";
import classes from './Layout.module.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) =>{
    const[showSideDrawer, setShowSideDrawer] = useState(true);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    return(
        <Auxillary>
            <Toolbar />
            <SideDrawer 
            open={showSideDrawer} 
            closed={sideDrawerClosedHandler}/>
            <main className = {classes.Content}>
                {props.children}
            </main>
        </Auxillary>
    )
}

export default Layout;