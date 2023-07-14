import React, {useEffect} from "react";
import classes from './Modal.module.css';
import Auxillary from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) =>{

    useEffect(() => {
        console.log('[Modal.js] willUpdate()');
        return () => {
            console.log("[Modal.js] this code when comp unmounts")
        }
    }, [props.show]);

    return(
        <Auxillary>
            <Backdrop show={props.show} clicked ={props.modalClosed}/>
            <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children};
            </div>
        </Auxillary>
    )
}

export default React.memo(
    Modal,(prevProps, nextProps) => {
    return (prevProps.show === nextProps.show && nextProps.children === prevProps.children)
});