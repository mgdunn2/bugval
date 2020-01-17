import React from "react"
import Container from "../components/container"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => {
  console.log(data.allDuvals)
  return(
    <Container style={{ color: `purple` }}>
      <Img fixed={data.file.childImageSharp.fixed} />
      <h1>Hello Bugval</h1>
      {data.allDuvals.edges.map(({ node }) => 
        (<div key={node.id}>
          <Link to={node.fields.slug}>{node.title}</Link>
        </div>)
      )}
    </Container>
  )
}

export const query = graphql`
    query {
      allDuvals {
        edges {
          node {
            title,
            wisdom
            fields {
              slug
            }
          }
        }
      }
      file(relativePath: { eq: "static/barf_bugval.png" }) {
        childImageSharp {
          fixed(width: 134, height: 195) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `