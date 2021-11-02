import React from 'react'
import styled from 'styled-components'

const Button = (props: {
    onClick: () => void,
    color?: string,
    children: React.ReactNode
}) => {
    return <StyledButton type="button" onClick={props.onClick} className={`${props.color ?? "primary"}`}>
        {props.children}
    </StyledButton>
}

export default Button

const StyledButton = styled.button`
    border-radius: 0.25rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    &.primary {
        background-color: var(--primary);
        color: #fff;
    }
    &.secondary {
        background-color: var(--secondary);
        color: #fff;
    }
    &:hover {
        background-color: var(--primary-light);
    }
`