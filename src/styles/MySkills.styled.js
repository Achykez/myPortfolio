import styled from "styled-components";

export const SkillsCardContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 2rem;
    padding: 0 5%;

    @media(max-width: ${({theme}) => theme.breakpoints.mobile}){
        display: block;
        padding: 0;
    }
` 

export const SkillCard  = styled.div`
    width: 230px;
    border: 1px solid #fff;
    padding: 3rem 0;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({theme}) => theme.colors.primary_light};    

    @media(max-width: ${({theme}) => theme.breakpoints.mobile}){
        width: 80%;
        margin-top: 2rem;
        margin-left: 2rem;
        border-radius: 12px;
    }
`