import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useLoading } from '../hooks/usePeticion';
import { notifActions } from '../redux/notif-slice';
import { productActions, ProductModel, productState, productThunks, selectProduct } from '../redux/product-slice';

const ProductPage = (props: any) => {

    const dispatch = useAppDispatch();
    const [loadingProducts, asyncProducts] = useLoading()
    const product = useAppSelector<productState>(selectProduct)
    const [showForm, setShowForm] = useState(false)
    const [loadingSave, asyncSave] = useLoading()
    const [refreshProducts, setRefreshProducts] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        asyncProducts(async () => {
            await dispatch(productThunks.getAll()).unwrap();
        })
    }, [dispatch, asyncProducts, refreshProducts])

    const handleEditClick = (p: ProductModel) => {
        dispatch(productActions.setCurrent(p))
        setShowForm(true)
    }

    const handleClickAdd = () => {
        dispatch(productActions.setCurrent(null))
        setShowForm(true)
    }

    const handleClickSave = (p: ProductModel) => {
        asyncSave(async () => {
            if (!product.currentProduct) {
                await dispatch(productThunks.insert(p)).unwrap();
                setShowForm(false)
                dispatch(notifActions.notify({ message: 'Producto guardado correctamente' }));
                setRefreshProducts(!refreshProducts)
            } else {
                await dispatch(productThunks.update(p)).unwrap();
                setShowForm(false)
                dispatch(notifActions.notify({ message: 'Producto actualizado correctamente' }));
                setRefreshProducts(!refreshProducts)
            }
        })
    }

    const handleClickDelete = () => {
        if (product.currentProduct) {
            asyncSave(async () => {
                await dispatch(productThunks.remove(product.currentProduct?.id ?? 0)).unwrap();
                setShowDelete(false)
                dispatch(notifActions.notify({ message: 'Producto eliminado correctamente' }));
                setRefreshProducts(!refreshProducts)
            })
        }
    }

    return <Container>
        <Top>
            <Title>Productos</Title>
            <Button onClick={handleClickAdd}>
                <i className="fas fa-plus"></i>&nbsp;Agregar
            </Button>
        </Top>
        {loadingProducts || loadingSave ? <Loading full /> :
        <ProductContainer>
            {product.products.map((p: ProductModel) => {
                return <ProductCard
                    key={p.id}
                    product={p}
                    onEdit={() => handleEditClick(p)}
                    onRemove={() => setShowDelete(true)}
                />
            })}
        </ProductContainer>}
        <ProductForm show={showForm} close={() => setShowForm(false)} save={handleClickSave} />
        <Modal
            show={showDelete}
            maxw="400px"
            minw="400px"
            title="Eliminar producto"
            close={() => setShowDelete(false)}>
            <div>¿Está seguro de eliminar el producto?</div>
            <Actions>
                <Button color="secondary" onClick={() => setShowDelete(false)}>Cancelar</Button>
                <Button onClick={handleClickDelete}>Eliminar</Button>
            </Actions>
        </Modal>
    </Container>
}

export default ProductPage

const Container = styled.section`
    padding: 20px;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-dark);
    margin-top: 0;
`
const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, min(250px, 100%));
    grid-gap: 20px;
`
const Actions = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`
