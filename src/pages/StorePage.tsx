import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import StoreCard from '../components/StoreCard';
import StoreForm from '../components/StoreForm';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useLoading } from '../hooks/usePeticion';
import { notifActions } from '../redux/notif-slice';
import { mystoreActions, MyStoreModel, mystoreState, mystoreThunks, selectMystore } from '../redux/store-slice';

const StorePage = (props: any) => {

    const dispatch = useAppDispatch();
    const [loadingStores, asyncStores] = useLoading()
    const mystore = useAppSelector<mystoreState>(selectMystore)
    const [showForm, setShowForm] = useState(false)
    const [loadingSave, asyncSave] = useLoading()
    const [refreshStores, setRefreshStores] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        asyncStores(async () => {
            await dispatch(mystoreThunks.getAll()).unwrap();
        })
    }, [dispatch, asyncStores, refreshStores])

    const handleEditClick = (s: MyStoreModel) => {
        dispatch(mystoreActions.setCurrent(s))
        setShowForm(true)
    }

    const handleClickAdd = () => {
        dispatch(mystoreActions.setCurrent(null))
        setShowForm(true)
    }

    const handleClickSave = (s: MyStoreModel) => {
        asyncSave(async () => {
            if (!mystore.currentStore) {
                await dispatch(mystoreThunks.insert(s)).unwrap();
                setShowForm(false)
                dispatch(notifActions.notify({ message: 'Tienda guardado correctamente' }));
                setRefreshStores(!refreshStores)
            } else {
                await dispatch(mystoreThunks.update(s)).unwrap();
                setShowForm(false)
                dispatch(notifActions.notify({ message: 'Tienda actualizado correctamente' }));
                setRefreshStores(!refreshStores)
            }
        })
    }

    const handleClickDelete = () => {
        if (mystore.currentStore) {
            asyncSave(async () => {
                await dispatch(mystoreThunks.remove(mystore.currentStore?.id ?? 0)).unwrap();
                setShowDelete(false)
                dispatch(notifActions.notify({ message: 'Tienda eliminada correctamente' }));
                setRefreshStores(!refreshStores)
            })
        }
    }

    return <Container>
        <Top>
            <Title>Tiendas</Title>
            <Button onClick={handleClickAdd}>
                <i className="fas fa-plus"></i>&nbsp;Agregar
            </Button>
        </Top>
        {loadingStores || loadingSave ? <Loading full /> :
        <StoreContainer>
            {mystore.stores.map((s: MyStoreModel) => {
                return <StoreCard
                    key={s.id}
                    store={s}
                    onEdit={() => handleEditClick(s)}
                    onRemove={() => setShowDelete(true)}
                />
            })}
        </StoreContainer>}
        <StoreForm show={showForm} close={() => setShowForm(false)} save={handleClickSave} />
        <Modal
            show={showDelete}
            maxw="400px"
            minw="400px"
            title="Eliminar producto"
            close={() => setShowDelete(false)}>
            <div>¿Está seguro de eliminar la tienda?</div>
            <Actions>
                <Button color="secondary" onClick={() => setShowDelete(false)}>Cancelar</Button>
                <Button onClick={handleClickDelete}>Eliminar</Button>
            </Actions>
        </Modal>
    </Container>
}

export default StorePage

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
const StoreContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, min(250px, 100%));
    grid-gap: 20px;
`
const Actions = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`
