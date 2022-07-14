import React, {Component} from "react"
import { Overlay, ModalEl } from "./Modal.styled"

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === "Escape") {
            this.props.onClose(this.props.largeImg);
        }
    }

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose(this.props.largeImg);            
        }
    }

    render() {
    return <Overlay onClick ={this.handleBackdropClick}>
                <ModalEl>
                    <img src={this.props.largeImg} alt={this.props.alt} />
                </ModalEl>
            </Overlay>
    }

}
