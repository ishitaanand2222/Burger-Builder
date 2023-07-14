import React, { useState } from "react";
import Auxillary from "../Auxillary/Auxillary";
import classes from './Layout.module.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) =>{
    const[showSideDrawer, setShowSideDrawer] = useState(true);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return(
        <Auxillary>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
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