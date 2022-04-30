import ReactModal from "react-modal";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '20vw',
        bottom: 'auto',
        borderRadius: '20px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

ReactModal.setAppElement("#root");

interface ModalProps {
    isOpen: boolean,
    text: String,
    onRequestClose: () => void
}

function Modal(props: ModalProps) {
    return (
        <ReactModal isOpen={props.isOpen} style={customStyles} onRequestClose={props.onRequestClose}>
            <h1 style={{ "textAlign" : "center"}}>{props.text}</h1>
        </ReactModal>
    );
}

export default Modal;