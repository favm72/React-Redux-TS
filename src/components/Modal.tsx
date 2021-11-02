import React, { useEffect, useState } from "react"
import styled from "styled-components"

const Modal = (props: {
    show: boolean,
    maxw: string,
    minw: string,
    title: string,
    close: () => void,
    children: any
}) => {
    const { show, maxw, minw, title, close } = props
    const [isOpen, setIsOpen] = useState(show)
    useEffect(() => {
        setTimeout(() => {
            setIsOpen(show)
        }, 100)
    }, [show])
    if (!show)
        return null
    return <ModalContainer show={isOpen} className={`${isOpen ? 'show' : ''}`}>
        <ModalSize maxw={maxw} minw={minw}>
            <div className="modal-content">
                <ModalTitle>
                    <div>{title}</div>
                    <ModalClose onClick={close}>x</ModalClose>
                </ModalTitle>
                <ModalBody>
                    {props.children}
                </ModalBody>
            </div>
        </ModalSize>
    </ModalContainer>
}

export default Modal

const ModalContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed; /* Stay in place */
    z-index: 99; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100vh; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    visibility: ${(props: { show: boolean }) => props.show ? 'visible' : 'hidden'};
    padding: 5px;
    @media (min-width: 600px) {
        padding: 30px;
    }
`
const ModalTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: var(--primary-light);
    color: white;
    font-family: 'Roboto', sans-serif;
    border-radius: 8px 8px 0 0;
`
const ModalClose = styled.div`
    cursor: pointer;
    font-size: 1.3rem;
    &:hover {
        color: var(--primary-dark);
    }
`
const ModalBody = styled.section`
    padding: 20px;
    overflow: auto;
`
const ModalSize = styled.div`
    background-color: #fefefe;
    border-radius: 8px;
    margin: auto;
    min-width: min(${(props: { minw: string, maxw: string }) => props.minw ?? '700px'}, 100%);
    max-width: ${(props : { minw: string, maxw: string }) => props.maxw ?? 'min-content'};
    @media (max-width: 500px) {
        min-width: 100%;
    }
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;

    @-webkit-keyframes animatetop {
        from {
            top:-300px;
            opacity:0
        }
        to {
            top:0;
            opacity:1
        }
    }

    @keyframes animatetop {
        from {
            top:-300px;
            opacity:0
        }
        to {
            top:0;
            opacity:1
        }
    }
`