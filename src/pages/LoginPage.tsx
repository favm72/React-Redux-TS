import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import Loading from '../components/Loading';
import EditText from '../components/EditText';
import Alert from '../components/Alert';
import { notifActions } from '../redux/notif-slice';
import { nullOrEmpty } from '../helpers/validations';
import { accountThunks } from '../redux/account-slice';
import { useAppDispatch } from '../hooks/hooks';
import Button from '../components/Button';

const LoginPage = (props: any) => {

    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            loginClick()
        }
    }

    const loginClick = async () => {
        try {
            if (nullOrEmpty(username)) throw new Error("Ingrese su usuario")
            if (nullOrEmpty(password)) throw new Error("Ingrese su clave")
            setLoading(true)
            await dispatch(accountThunks.login({
                username: username,
                password: password
            })).unwrap()
            history.push("/home")
        } catch (error: any) {
            setLoading(false)
            dispatch(notifActions.notify({ message: error.message }))
        }
    }

    return (
        <Container>
            <FormSection>
                <Form>
                    <h1 className="text-gray-800 mb-5">Iniciar sesion</h1>
                    <EditText label="Usuario" change={v => setUsername(v)} onKeyDown={handleEnterKey} />
                    <EditText label="Contraseña" type="password" change={v => setPassword(v)} onKeyDown={handleEnterKey} />
                    <div className="text-center">
                        <Button onClick={loginClick}>
                            Ingresar
                        </Button>
                    </div>
                </Form>
            </FormSection>
            <Alert />
            {loading && <Loading full />}
        </Container>
    );
}

const Container = styled.section`
    margin: 0px;
    box-sizing: border-box;
    padding: 0px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('/wallpaper.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
`
const Form = styled.div`
    text-align: center;
    padding: 20px;
    width: 350px;
    display: flex;
    background-color: rgba(255, 255, 255, 0.5);
    flex-direction: column;
    > * {
        padding-bottom: 15px;
    }
    @media (max-width: 500px) {
        width: 100%;
    }
`
const FormSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    height: 100vh;
    @media (max-width: 480px) {
        padding: 15px;
        width: 100%;
    }
`
export default LoginPage
