import {
  PaddingContainer,
  Heading,
  BlueText,
  FlexContainer,
  Buttons,
} from "../styles/Global.styled";
import { Spin, notification } from "antd";
import { useState, useEffect} from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Axios from "axios";


import { fadeInBottomVariant } from "../utils/Variants";

// Import footer styles
import { ContactForm, FormInput, FormLabel } from "../styles/Footer.styled";

const Footer = () => {
  const url = "https://handsome-worm-stole.cyclic.app/mail";
  const [currency, setCurrency] = useState('');
  const [loading , setLoading] = useState('');
  const getCurrencyFromLocale = async (locale) => {
    try {
      const currency = await fetch(`https://app.exchangerate-api.com/activate/f98a5de2aca0ce505c72537c43/latest/${locale}`);
      const currencyData = await currency.json();
      return currencyData?.rates?.[locale]?.symbol || 'USD';
    } catch (error) {
      console.error('Error fetching currency:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      const locale = navigator?.language || navigator?.userLanguage;
      const currency = await getCurrencyFromLocale(locale);
      setCurrency(currency);
    };

    fetchCurrency();
  }, []);


  const [data, setData] = useState({
    name: "",
    email: "",
    projectDescription: "",
    budget: 0,
    message: "",
  });

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  };

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true); // Set loading state to true
  
      const response = await Axios.post(url, {
        name: data.name,
        email: data.email,
        projectDescription: data.projectDescription,
        budget: data.budget,
        message: data.message,
      });
  
      // Handle success response
      console.log(response.status);
      // Reset form inputs
      setData({
        name: "",
        email: "",
        message: "",
        budget: 0,
        projectDescription: "",
      });
      notification.success({
        message: "Email sent successfully",
      });
    } catch (error) {
      // Handle error response
      console.error("Failed to send email", error);
      notification.error({
        message: "Failed to send email",
      });
    } finally {
      setLoading(false); // Reset loading state to false
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
              <FormLabel>Budget:</FormLabel>
              <FormInput
                value={data.budget}
                id="budget"
                onChange={(e) => handle(e)}
                type="text"
                required
                placeholder={`Enter your budget in ${currency}`}
              />
            </PaddingContainer>
            <PaddingContainer bottom="2rem">
              <FormLabel>Project Description:</FormLabel>
              <FormSelect
                value={data.projectDescription}
                id="projectDescription"
                onChange={(e) => handle(e)}
                placeholder="Select an Option"
                required>
                {/* <option value="">Select an option</option> */}
                <option value="Existing project">Existing project</option>
                <option value="New project">New project</option>
              </FormSelect>
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
              <Buttons type="submit">
                { loading ?
                    <span style={{marginRight:"10px"}}><Spin size="small" tip="loading" /></span>
                    : null} 
                {loading ? "Sending Message" : "Send Message" }</Buttons>
            </FlexContainer>
          </ContactForm>
        </FlexContainer>
      </PaddingContainer>
    </PaddingContainer>
  );
};

export const FormSelect = styled.select`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary_light};
  border: 1px solid ${({ theme }) => theme.colors.para_text_color};
  color: ${({ theme }) => theme.colors.paranormal};
  border-radius: 5px;
  padding: 15px;
  outline: none;

  &:hover {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.paranormal};
  }

  option {
    background-color: ${({ theme }) => theme.colors.primary_light};
    color: ${({ theme }) => theme.colors.paranormal};
  }
`;

export default Footer;
