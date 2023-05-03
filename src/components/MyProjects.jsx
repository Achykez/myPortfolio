import { motion } from "framer-motion";
import { fadeInTopVariant } from "../utils/Variants";
import { PaddingContainer, Heading, BlueText } from "../styles/Global.styled";
import { projectDetails } from "../utils/Data";
import Project from "./layouts/Project";
export const MyProjects = () => {
  return (
    <PaddingContainer
        id="Projects"
        top="5%"
        bottom="5%"
        responsiveTop="20%"
        responsiveLeft="1rem"
        responsiveRight="1rem"
    >
      <Heading 
        as={motion.h4}
        variants={fadeInTopVariant}
        initial="hidden"
        whileInView="visible"      
        size="h4">
        MY PROJECTS
      </Heading>

      <Heading 
        as={motion.h2}
        variants={fadeInTopVariant}
        initial="hidden"
        whileInView="visible"      
        size="h2">
        What <BlueText>I Have Built</BlueText>
      </Heading>
      {projectDetails.map((project) =>(
        <PaddingContainer
            top="5rem"
            bottom="5rem"
            key={project.id}
        >
            <Project data={project} />
        </PaddingContainer>
      ))}
    </PaddingContainer>
  );
};
