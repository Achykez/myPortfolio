import { FaGithub } from "react-icons/fa"
import { PaddingContainer, Heading, FlexContainer, ParaText, IconContainer } from "../../styles/Global.styled"

const Project = () => {

  return (
    <FlexContainer fullWidthchild>
        <div>
        <FlexContainer align="center" gap="1rem">
            <Heading as="h3" size="h3" bottom="1rem">
                Project Name
            </Heading>
            <IconContainer color="blue" size="2rem">
                <FaGithub />
            </IconContainer>
            </FlexContainer>    
        </div>
        <div>

        </div>
        <div>

        </div>
    </FlexContainer>
  )
}
export default Project