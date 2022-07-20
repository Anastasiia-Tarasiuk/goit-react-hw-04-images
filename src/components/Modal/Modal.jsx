import {useEffect} from "react"
import { Overlay, ModalEl } from "./Modal.styled"

export const Modal = ({onClose, largeImg, alt}) => {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        /* eslint-disable */
    }, [])
    

    const handleKeyDown = e => {
        if (e.code === "Escape") {
            onClose(largeImg);
        }
    }

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose(largeImg);            
        }
    }

    return <Overlay onClick ={handleBackdropClick}>
        <ModalEl>
            <img src={largeImg} alt={alt} />
        </ModalEl>
    </Overlay>
    
}


// export class Modal extends Component {

//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown);
//     }

//     componentWillUnmount () {
//         window.removeEventListener('keydown', this.handleKeyDown);
//     }

//     handleKeyDown = e => {
//         if (e.code === "Escape") {
//             this.props.onClose(this.props.largeImg);
//         }
//     }

//     handleBackdropClick = e => {
//         if (e.currentTarget === e.target) {
//             this.props.onClose(this.props.largeImg);            
//         }
//     }

//     render() {
//     return <Overlay onClick ={this.handleBackdropClick}>
//                 <ModalEl>
//                     <img src={this.props.largeImg} alt={this.props.alt} />
//                 </ModalEl>
//             </Overlay>
//     }

// }
