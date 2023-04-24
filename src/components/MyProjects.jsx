import { PaddingContainer, Heading, BlueText } from "../styles/Global.styled";
import { projectDetails } from "../utils/Data";
import Project from "./layouts/Project";
export const MyProjects = () => {
  return (
    <PaddingContainer
        id="Projects"
        top="5%"
        bottom="5%"
    >
      <Heading as="h4" size="h4">
        MY PROJECTS
      </Heading>

      <Heading as="h2" size="h2">
        What <BlueText>I Have Built</BlueText>
      </Heading>
      {projectDetails.map((project) =>(
        <PaddingContainer
            top="5rem"
            bottom="5rem"
        >
            <Project />
        </PaddingContainer>
      ))}
    </PaddingContainer>
  );
};
