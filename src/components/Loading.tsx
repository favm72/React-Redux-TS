import React from 'react'
import styled from "styled-components";

const Loading = (props: any) => {
    if (props.full) {
        return <LoadingDiv>
            <svg className="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                <circle fill="none" stroke="#ccc" strokeWidth="4" cx="50" cy="50" r="44" />
                <circle fill="#fff" stroke="#e74c3c" strokeWidth="3" cx="8" cy="54" r="6" >
                    <animateTransform
                        attributeName="transform"
                        dur="2s"
                        type="rotate"
                        from="0 50 48"
                        to="360 50 52"
                        repeatCount="indefinite" />
                </circle>
            </svg>
        </LoadingDiv>
    } else {
        return <PartialLoading>
            <img alt="loading" src="/svg/bars.svg"></img>
        </PartialLoading>
    }

}
const PartialLoading = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        max-width: 50px
    }
`
const LoadingDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
	z-index: 999;
	height: 100vh;
	width: 100%;
	overflow: visible;
	margin: 0px;
    opacity: 0.7;
    background-color: #fff;
    .svg {
        width: 200px;
        opacity: 1;
    }
`

export default Loading