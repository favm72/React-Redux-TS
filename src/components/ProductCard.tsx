import React from 'react'
import styled from 'styled-components'
import { ProductModel } from '../redux/product-slice'
import Button from './Button'

const ProductCard = (props: {
    onEdit: () => void,
    onRemove: () => void,
    product: ProductModel
}) => {
    return <Card>
        <Image alt="product" src={props.product.image} />
        <Title>{props.product.name}</Title>
        <Description>{props.product.description}</Description>
        <Price>S/. {props.product.price.toFixed(2)}</Price>
        <Actions>
            <Button onClick={props.onEdit}>
                <i className="fas fa-pencil"></i>&nbsp;Editar
            </Button>
            <Button onClick={props.onRemove}>
                <i className="fas fa-trash"></i>&nbsp;
            </Button>
        </Actions>
    </Card>
}

export default ProductCard

const Card = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.3rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    > * {
        margin: 0.5rem 0;
    }
    &:hover {
        background-color: black;
        color: white;
        opacity: 0.8;
    }
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
`
const Image = styled.img`
    width: 100%;
    border-radius: 0.3rem;
    max-height: 220px;
`
const Title = styled.h3`
    font-size: 1.2rem;
    margin: 0;
`
const Price = styled.h4`
    font-size: 1.2rem;
`
const Description = styled.p`
    font-size: 1rem;
    font-weight: 300;
    overflow-wrap: break-word;
`
const Actions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`