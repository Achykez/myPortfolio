import styled from "styled-components"


export const ShowCaseParticleContainer = styled.div`
  position: relative;
  height: 420px;
  width: 318px;

  @media(max-width: ${({theme}) => theme.breakpoints.mobile}){
        display: none;
    }
    @media(max-width: ${({theme}) => theme.breakpoints.tablet}){
        margin-left: 3rem;
    }
`;


// export const ShowCaseParticleContainer = styled.div`
//     position: relative;

//     @media(max-width: ${({theme}) => theme.breakpoints.mobile}){
//         display: none;
//     }
//     @media(max-width: ${({theme}) => theme.breakpoints.tablet}){
//         margin-left: 3rem;
//     }
// `;

export const ShowImageCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.text2};
  width: 318px;
  height: 420px;
  /* padding-top: calc((450px - 440px) / 2); */

  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  object-fit: cover;
`;

export const Particle = styled.img`
    position: absolute;
    top: ${({top}) => top};
    left: ${({left}) => left};
    right: ${({right}) => right};
    bottom: ${({bottom}) => bottom};
    transform: rotate(${({rotate}) => rotate});
`