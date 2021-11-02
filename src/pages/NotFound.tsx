import React from 'react';
import styled from 'styled-components';

const NotFound = (props: any) => {
    return (
        <Container>
            <Title>404</Title>
            <SubTitle>Recurso no encontrado</SubTitle>
        </Container>
    );
}

export default NotFound

const Container = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--bs-gray-900);
`
const Title = styled.div`
    font-size: 10rem;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: var(--bs-active-primary);
`
const SubTitle = styled.div`
    font-size: 2rem;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: var(--bs-active-primary);
`