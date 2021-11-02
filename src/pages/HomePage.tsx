import React from 'react';
import styled from 'styled-components';

const HomePage = (props: any) => {
    return <Container>
        <Title>Bienvenido</Title>
        <Image alt="welcome" src="/welcome.jpg"></Image>
    </Container>
}

export default HomePage

const Container = styled.section`
    padding: 20px;
`
const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-dark);
    margin-top: 0;
`
const Image = styled.img`
    width: 100%;
`
