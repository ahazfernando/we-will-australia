import {
    Body,
    Container,
    Head,
    Html,
    Preview,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface RecruitmentEmailProps {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    linkedin?: string;
    message: string;
    jobTitle: string;
  }
  
  export const RecruitmentEmail = ({  firstName,  lastName,  email,  phone,  linkedin,  message,  jobTitle,}: RecruitmentEmailProps) => (
    <Html>
      <Head />
      <Preview>New Application for {jobTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>New Application for {jobTitle}</Text>
          <Text style={paragraph}><strong>From:</strong> {firstName} {lastName}</Text>
          <Text style={paragraph}><strong>Email:</strong> {email}</Text>
          {phone && <Text style={paragraph}><strong>Phone:</strong> {phone}</Text>}
          {linkedin && <Text style={paragraph}><strong>LinkedIn:</strong> <a href={linkedin}>{linkedin}</a></Text>}
          <Text style={heading}>Message:</Text>
          <Text style={paragraph}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
  
  // Styles
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
  };
  
  const heading = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginTop: '48px',
  };
  
  const paragraph = {
    fontSize: '18px',
    lineHeight: '1.4',
  };