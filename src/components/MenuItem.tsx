import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MenuItem = (props: { link: string, icon: string, label: string}) => {
    return (
        <Item>
            <NavLink
                className="menu-link"
                to={props.link}
                activeClassName="active"
            >
                <span className="menu-icon">
                    <span className={props.icon}></span>
                </span>
                <span className="menu-title">{props.label}</span>
            </NavLink>
        </Item>
    );
};

const Item = styled.div`
	.menu-icon {
		color: white;
        padding-right: 10px;
	}
    > .menu-link {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0.5rem 1rem;
        color: white;
        text-decoration: none;
        border: none;
        border-radius: 0.25rem;
        background-color: var(--primary-dark);
        margin: 0.2rem;
        &:hover {
            background-color: var(--primary);
        }
        &.active {
            background-color: var(--primary);
        }
    }
`;
export default MenuItem;
