import {
  PaddingContainer,
  Heading,
  BlueText,
  FlexContainer,
  Buttons,
} from "../styles/Global.styled";
import { notification } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";
import Axios from "axios";

import { fadeInBottomVariant } from "../utils/Variants";

// Import footer styles
import { ContactForm, FormInput, FormLabel } from "../styles/Footer.styled";

const Footer = () => {
  const url = "https://handsome-worm-stole.cyclic.app/mail";
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    // console.log(newdata);
  };
  
  const submit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.post(url, {
        name: data.name,
        email: data.email,
        message: data.message,
      });
  
      // Handle success response
      // console.log(response);
      // Reset form inputs
      setData({ name: "", email: "", message: "" });
      notification.success({
        message: "Email sent successfully",
      });
    } catch (error) {
      // Handle error response
      console.error("Failed to send email", error);
      notification.error({
        message: "Failed to send email",
      });
    }
  };
  
  return (
    <PaddingContainer id="Contact" top="5%" bottom="10%">
      <Heading
        as={motion.h4}
        variants={fadeInBottomVariant}
        initial="hidden"
        whileInView="visible"
        size="h4"
        align="center">
        My CONTACT
      </Heading>
      <Heading
        as={motion.h2}
        variants={fadeInBottomVariant}
        initial="hidden"
        whileInView="visible"
        size="h2"
        align="center"
        top="0.5rem">
        Contact <BlueText>Me Here</BlueText>
      </Heading>

      <PaddingContainer top="3rem">
        <FlexContainer justify="center">
          <ContactForm
            as={motion.form}
            variants={fadeInBottomVariant}
            initial="hidden"
            onSubmit={(e) => submit(e)}
            whileInView="visible">
            <PaddingContainer bottom="2rem">
              <FormLabel>Name:</FormLabel>
              <FormInput
                value={data.name}
                id="name"
                onChange={(e) => handle(e)}
                type="text"
                placeholder="Enter your name"
                required
              />
            </PaddingContainer>
            <PaddingContainer bottom="2rem">
              <FormLabel>Email:</FormLabel>
              <FormInput
                value={data.email}
                id="email"
                onChange={(e) => handle(e)}
                type="email"
                required
                placeholder="Enter your email"
              />
            </PaddingContainer>
            <PaddingContainer bottom="2rem">
              <FormLabel>Message:</FormLabel>
              <FormInput
                value={data.message}
                id="message"
                onChange={(e) => handle(e)}
                as="textarea"
                placeholder="Enter your message"
                required
              />
            </PaddingContainer>
            <FlexContainer responsiveFlex justify="center">
              <Buttons type="submit">Send Message</Buttons>
            </FlexContainer>
          </ContactForm>
        </FlexContainer>
      </PaddingContainer>
    </PaddingContainer>
  );
};

export default Footer;
