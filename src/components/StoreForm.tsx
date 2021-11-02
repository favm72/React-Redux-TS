import React, { useEffect, useState } from "react"
import styled from "styled-components"
import EditText from "./EditText"
import Modal from "./Modal"
import Button from "./Button"
import { nullOrEmpty } from "../helpers/validations"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { notifActions } from "../redux/notif-slice"
import { MyStoreModel, mystoreState, selectMystore } from "../redux/store-slice"

const StoreForm = (props: {
    show: boolean,
    close: () => void,
    save: (store: MyStoreModel) => void,
}) => {
    const dispatch = useAppDispatch()
    const mystore = useAppSelector<mystoreState>(selectMystore)
    const [form, setForm] = useState({} as MyStoreModel)
    const updateForm = (key: string, value: any) => setForm({...form, [key]: value})

    useEffect(() => {
        setForm(mystore.currentStore ?? {} as MyStoreModel)
    }, [mystore.currentStore])

    const handleClick = () => {
        try {
            if (nullOrEmpty(form.name)) throw new Error("Ingresar un nombre para la tienda")
            if (nullOrEmpty(form.address)) throw new Error("Ingresar una dirección")
            if (nullOrEmpty(form.image)) throw new Error("Ingresar una imagen")

            props.save(form)

        } catch (error: any) {
            dispatch(notifActions.notify({ message: error.message }))
        }
    }

    return <Modal
        title={mystore.currentStore ? "Editar tienda" : "Nueva tienda"}
        show={props.show}
        close={props.close}
        maxw="500px"
        minw="500px">
        <FormContainer>
            <EditText label="Nombre" change={v => updateForm("name", v)} value={form.name ?? ""} />
            <EditText label="Dirección" change={v => updateForm("address", v)} value={form.address ?? ""} />
            <EditText label="Imagen" change={v => updateForm("image", v)} value={form.image ?? ""} />
            <Button onClick={handleClick}>Guardar</Button>
        </FormContainer>
    </Modal>
}

export default StoreForm

const FormContainer = styled.div`
    > * {
        padding-bottom: 10px;
    }
`