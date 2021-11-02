import React from 'react'
import styled from "styled-components";
import { useInputValidation } from "../hooks/useInputValidation"

interface EditTextProps {
    label?: string,
    required?: boolean,
    change?: (v: string) => void,
    value?: string,
    rules?: [{ valid: (v: string) => boolean, message: string }],
    reset?: boolean,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    type?: string,
}

const EditText = (props: EditTextProps) => {
    const [valid, message, setTouched] = useInputValidation(props)

    const handleChange = (e: any) => {
        setTouched(true)
        if (props.change) {
            props.change(e.target.value)
        }
    }

    return <Campo>
        <label>{props.label}{props.required ? "(*)" : null}</label>
        <input
            className={`${valid ? '' : 'danger'}`}
            onInput={handleChange}
            onKeyDown={props.onKeyDown}
            type={props.type ?? 'text'}
            value={props.value}
            onBlur={e => setTouched(true)} />
        {props.rules && !valid && <Danger>{message}</Danger>}
    </Campo>
}

const Campo = styled.article`
    display: flex;
    flex-direction: column;
    label {
        text-align: start;
        padding-bottom: 5px;
    }
    input {
        border-radius: 8px;
        border: none;
        padding: 8px 16px;
        background-color: #eee;
    }
    input.danger, input.danger:focus {
        border-color: #aa1122;
        background-color: #ffdede;
        color: red;
    }
`
const Danger = styled.article`
    display: block;
    color: #aa1122;
    font-size: 0.8rem;
    font-style: italic;
`
export default EditText