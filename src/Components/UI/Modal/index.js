import { Fragment } from "react";
import ReactDom from 'react-dom';
import classes from './style.module.css';

// Black overlay
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
}

// Showing primary content of Modal on click of Header Cart Button

const ModalContent = props => {
  return (<div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
  </div>);
}

// Overall element to be rendered on click of Header Cart Button
const Modal = props => {
  const overlay = document.querySelector("#overlay");
return (
  <Fragment>
    {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>,overlay)}
    {ReactDom.createPortal(<ModalContent>{props.children}</ModalContent>,overlay)}
  </Fragment>
);
}

export default Modal;