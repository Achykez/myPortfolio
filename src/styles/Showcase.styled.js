import styled from "styled-components"


export const ShowCaseParticleContainer = styled.div`
    position: relative;
`

export const ShowImageCard = styled.div`
    border: 1px solid ${({theme}) => theme.colors.text2};
    width: max-content;
    padding-bottom: 0rem;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    
`
export const Particle = styled.img`
    position: absolute;
    top: ${({top}) => top};
    left: ${({left}) => left};
    right: ${({right}) => right};
    bottom: ${({bottom}) => bottom};
    transform: rotate(${({rotate}) => rotate});
`