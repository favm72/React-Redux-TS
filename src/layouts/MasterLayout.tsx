import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { useAppDispatch } from '../hooks/hooks';
import Alert from '../components/Alert';
import MenuItem from '../components/MenuItem';
import { accountActions } from '../redux/account-slice';
import Button from '../components/Button';

const MasterLayout = (props : any) => {
    const dispatch = useAppDispatch();
    const history = useHistory()
    const [showSideBar, setShowSideBar] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token)
            dispatch(accountActions.autoLogin())
        else {
            history.replace(`/login`)
        }
    }, [history, dispatch])

    const toggleSidebar = () => {
        setShowSideBar(show => !show)
    }

    return (
        <div>
        <Container>
            <header>
                <span>REAL PLAZA</span>
                <div className="hambutton">
                    <Button onClick={toggleSidebar}>
                        <i className="fa fa-hamburger"></i>
                    </Button>
                </div>
            </header>
            <aside className={`${showSideBar ? "active" : ""}`}>
                <MenuItem link="/home" label="Home" icon="fas fa-home" />
                <MenuItem link="/products" label="Productos" icon="fa fa-book" />
                <MenuItem link="/stores" label="Tiendas" icon="fa fa-store" />
            </aside>
            <main>
                {props.children}
            </main>
            <footer>Todos los derechos reservados.</footer>
        </Container>
        <Alert />
        </div>
    );
}
export default MasterLayout

const Container = styled.div`
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-areas: "head head" "side body" "side footer";
    grid-template-columns: 180px 1fr;
    grid-template-rows: 60px 1fr 60px;
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: var(--primary);
        color: white;
        font-weight: bold;
        grid-area: head;
    }
    aside {
        background-color: var(--primary-dark);
        color: white;
        grid-area: side;
    }
    main {
        grid-area: body;
    }
    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #333;
        color: white;
        grid-area: footer;
    }
    .hambutton {
        display: none;
    }
    @media (max-width: 470px) {
        display: flex;
        flex-direction: column;
        .hambutton {
            display: flex;
        }
        aside {
            display: none;
            &.active {
                display: flex;
                flex-direction: column;
            }
        }
    }
`
