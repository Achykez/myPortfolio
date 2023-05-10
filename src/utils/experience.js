import styled from "styled-components";
import { Clock } from "../components/Clock";


const dateString = "2022-03-15";
const howLongAgo = (genie) => {
  const today = new Date();
  const targetDate = new Date(genie);

  const yearsDiff = today.getFullYear() - targetDate.getFullYear();
  const monthsDiff = today.getMonth() - targetDate.getMonth();

  let totalMonths = yearsDiff * 12 + monthsDiff;

  if (today.getDate() < targetDate.getDate()) {
    totalMonths -= 1;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months };
};
export const genesys = howLongAgo(dateString);

export const experienceText = () => {
  if (genesys.years > 0) {
    const engProper = genesys.years === 1 ? 'A' : `${genesys.years}`;
    const yearsStr = genesys.years === 1 ? "year" : "years";
    const monthsStr = genesys.months === 1 ? "month" : "months";
    return (
      <>
        {`With over `}
        <StyledSpan>{engProper} {yearsStr}  </StyledSpan> and {''}
        <StyledSpan>{genesys.months} {monthsStr} </StyledSpan> {''}
        {`of experience, I have honed my abilities in creating captivating websites and web applications that are intuitive and user-friendly. Throughout my journey, I have continuously expanded my knowledge and skillset to ensure that I deliver the best possible results to my clients. I am passionate about what I do and I look forward to utilizing my expertise to tackle new and exciting challenges in the future.. My experience has grown since `}
        <StyledSpan>
          <Clock />
        </StyledSpan>
      </>
    );
  } else {
    const monthsStr = genesys.months === 1 ? "month" : "months";
    return (
      <>
        {`Hello there, my name is Achike Chude and I'm a FrontEnd Developer with `}
        <StyledSpan>{genesys.months} {monthsStr} </StyledSpan>
        {`of experience in creating user-friendly websites and web applications. My experience has grown since `}
        <StyledSpan>
          <Clock />
        </StyledSpan>
      </>
    );
  }
};

const StyledSpan = styled.span`
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
  background-color: ${({theme}) => theme.colors.text1};
  color: ${({theme}) => theme.colors.secondary};
  font-weight: bold;
`;