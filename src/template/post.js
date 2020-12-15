import React from "react";
import { graphql } from 'gatsby'
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

import PageWrapper from "../components/PageWrapper";
import { Section, Title, Text, Box, Badge } from "../components/Core";

import markdown from 'remark-parse';
import unified from 'unified';
import styled from "styled-components";

var html = require('rehype-stringify')
var remark2rehype = require('remark-rehype')

var processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(html)

const Post = styled(Box)`
  overflow: hidden;
  font-size: 1rem;

  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  pre,
  ul,
  ol {
    margin-bottom: 1.25rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2.25rem;
    margin-bottom: 1.25rem;
    color: ${({ theme }) => theme.colors.heading} !important;
  }
  ol li {
    list-style-type: decimal;
  }

  ul li {
    list-style-type: disc;
  }
  img,
  iframe,
  video {
    max-width: 100%;
    margin-bottom: 2rem;
    display: block;
  }
`;

const BadgePost = ({ children }) => (
  <Badge
    mr={3}
    mb={3}
    bg="#eae9f2"
    color="#696871"
    fontSize="16px"
    px={3}
    py={2}
  >
    {children}
  </Badge>
);

const BlogDetails = ({data}) => {
  return (
    <>
      <PageWrapper footerDark>
        <Section className="pb-0">
          <div className="pt-5"></div>
          <Container>
            <Row className="justify-content-center text-center">
              <Col lg="12">
                <Title variant="hero">{data.airtable.data.title}</Title>
                <Box className="d-flex justify-content-center">
                  <Text mr={3}>
                    <Link to="/">Jan 14, 2020 </Link>
                  </Text>
                  <Text mr={3}>
                    <Link to="/">Technology</Link>
                  </Text>
                  <Text>
                    <Link to="/">David Jones</Link>
                  </Text>
                </Box>
              </Col>
            </Row>
          </Container>
        </Section>
        <Section className="pb-0">
          <Container>
            <Row>
              <div lg="8" className="mb-5">
                
                {/* <!-- Blog section --> */}
    <Post>
      <div>
        <img src={data.airtable.data.image[0].url} alt={data.airtable.data.title} />
      </div>
      <div className="mb-5"
          dangerouslySetInnerHTML={{ 
            __html: processor().processSync(data.airtable.data.PostMarkdown) }}
        >
      </div>
    </Post>
    <Box className="d-flex" mt={4}>
      <BadgePost>Freelance</BadgePost>
      <BadgePost>Design</BadgePost>
      <BadgePost>Earning</BadgePost>
      <BadgePost>Marketing</BadgePost>
      <BadgePost>Work</BadgePost>
    </Box>
              </div>
              
            </Row>
          </Container>
        </Section>
      </PageWrapper>
    </>
  );
};
export default BlogDetails;

export const query = graphql`
query GetRecord($slug: String!){
    airtable(data: { slug: {eq: $slug} }) {
        id
        table
        recordId
        data {
            title
            PostMarkdown
            image {
                url
            }
        }
    }
}`
