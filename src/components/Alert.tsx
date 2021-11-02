import React from 'react'
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { notifActions, notifState, selectNotif } from '../redux/notif-slice';
import Button from './Button';
import Modal from './Modal';

const Alert = () => {
    const dispatch = useAppDispatch()
    const notif = useAppSelector<notifState>(selectNotif)
    const closeAlert = () => {
        dispatch(notifActions.cerrar())
    }
    return <Modal show={notif.visible} minw="300px" maxw="300px" close={closeAlert} title={notif.title}>
        <ModalBody>
            <AlertIcon className="fa fa-exclamation-circle"></AlertIcon>
            <Message>{notif.message}</Message>
            <Button onClick={closeAlert}>Ok</Button>
        </ModalBody>
    </Modal>

}
export default Alert


const AlertIcon = styled.i`
    color: var(--primary-dark);
    font-size: 3.5rem;
`
const ModalBody = styled.div`
    width: 100%;
    text-align: center;
`
const Message = styled.div`
    font-size: 1.5rem;
    color: var(--primary-dark);
`