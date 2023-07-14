    import { useState } from 'react';

    import "./Modal.css"

    // import Modal from './Modal'; 복사해서 쓰기

    
    export const Modal = ({ isOpen, toggleModal, children }) => {

        // const [isOpen, setIsOpen] = useState(false);
    
        // const toggleModal = () => {
        //     setIsOpen(!isOpen);
        // }; 복사해서 쓰기

            const ModalBackdrop = ({ onClick, children }) => {
                return (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }} onClick={onClick}>
                    {children}
                </div>
                );
            }
            
            const ModalView = ({ onClick, children }) => {
                return (
                <div style={{
                    position: 'relative',
                    backgroundColor: 'transparent',
                    borderRadius: '10px',
                    maxWidth: '500px',
                    width: '80%',
                }} onClick={onClick}>
                    {children}
                </div>
                );
            }
    
        return (
            <>
                {isOpen && (
                    <ModalBackdrop onClick={toggleModal}>
                        <ModalView onClick={event => event.stopPropagation()}>
                            <img id='modalx' src='/modalclose.png' alt='' onClick={toggleModal}></img>
                            {children}
                        </ModalView>
                    </ModalBackdrop>
                )}
            </>
        );
    };


    export default Modal;