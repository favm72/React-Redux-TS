import React, { useEffect, useState } from "react"
import styled from "styled-components"
import EditText from "./EditText"
import Modal from "./Modal"
import { ProductModel, productState, selectProduct } from "../redux/product-slice"
import Button from "./Button"
import { nullOrEmpty, nullOrZero } from "../helpers/validations"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { notifActions, notifState } from "../redux/notif-slice"
import EditDrop from "./EditDrop"

const ProductForm = (props: {
    show: boolean,
    close: () => void,
    save: (product: ProductModel) => void,
}) => {
    const dispatch = useAppDispatch()
    const product = useAppSelector<productState>(selectProduct)
    const [form, setForm] = useState({} as ProductModel)
    const updateForm = (key: string, value: any) => setForm({...form, [key]: value})

    useEffect(() => {
        setForm(product.currentProduct ?? {} as ProductModel)
    }, [product.currentProduct])

    const handleClick = () => {
        try {
            if (nullOrEmpty(form.name)) throw new Error("Ingresar un nombre para el producto")
            if (nullOrEmpty(form.description)) throw new Error("Ingresar una descripción")
            if (nullOrZero(form.price)) throw new Error("Ingresar un precio")
            if (nullOrEmpty(form.image)) throw new Error("Ingresar una imagen")
            if (nullOrEmpty(form.category)) throw new Error("Ingresar una categoría")

            props.save(form)

        } catch (error: any) {
            dispatch(notifActions.notify({ message: error.message } as notifState))
        }
    }

    const categories = [
        { value: "Electrónica", label: "Electrónica" },
        { value: "Hogar", label: "Hogar" },
        { value: "Mascotas", label: "Mascotas" },
        { value: "Libros", label: "Libros" },
        { value: "Juguetes", label: "Juguetes" },
        { value: "Deportes", label: "Deportes" },
    ]

    return <Modal
        title={product.currentProduct ? "Editar producto" : "Nuevo producto"}
        show={props.show}
        close={props.close}
        maxw="500px"
        minw="500px">
        <FormContainer>
            <EditText label="Nombre" change={v => updateForm("name", v)} value={form.name ?? ""} />
            <EditText label="Descripción" change={v => updateForm("description", v)} value={form.description ?? ""} />
            <EditText label="Precio" type="number" change={v => updateForm("price", +v)} value={`${form.price ?? 0}`} />
            <EditText label="Imagen" change={v => updateForm("image", v)} value={form.image ?? ""} />
            <EditDrop label="Categoría" value={form.category ?? ""} change={v => updateForm("category", v)} options={categories} />
            <Button onClick={handleClick}>Guardar</Button>
        </FormContainer>
    </Modal>
}

export default ProductForm

const FormContainer = styled.div`
    > * {
        padding-bottom: 10px;
    }
`