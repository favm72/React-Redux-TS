import React from 'react'
import styled from "styled-components";

const EditDrop = (props: {
    label?: string,
    required?: boolean,
    change: (v: string) => void,
    options: { value: string, label: string }[],
    value: string
}) => {
    return <Campo className="">
        <label>{props.label}{props.required ? "(*)" : null}</label>
        <select
            value={props.value}
            onChange={(e) => props.change(e.target.value)}>
            <option value="">[Seleccione]</option>
            {props.options?.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}
        </select>
    </Campo>
}

const Campo = styled.article`
    display: flex;
    flex-direction: column;
    label {
        text-align: start;
        padding-bottom: 5px;
    }
    select {
        border-radius: 8px;
        border: none;
        padding: 8px 16px;
        background-color: #eee;
    }
`
export default EditDrop