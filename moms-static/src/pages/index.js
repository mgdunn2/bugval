import React from "react"
import Container from "../components/container"
import Header from "../components/header"
import { Link, graphql } from "gatsby"

export default ({ data }) => {
  return(
    <Container style={{ color: `purple` }}>
      <Header headerText="Moms and Sons is not a Bar"/>
      <header><h3>Vibes</h3></header> 
      {data.allVibes.edges.map(({ node }) => 
        (<div key={node.id}>
          <Link to={node.fields.slug}>{node.title}</Link>
        </div>)
      )}
      <header><h3>Ideas</h3></header> 
      {data.allIdeas.edges.map(({ node }) => 
        (<div key={node.id}>
          <Link to={node.fields.slug}>{node.title}</Link>
        </div>)
      )}
    </Container>
  )
}

export const query = graphql`
    query {
      allIdeas {
        edges {
          node {
            title,
            idea
            fields {
              slug
            }
          }
        }
      },
      allVibes {
        edges {
          node {
            title,
            vibe
            fields {
              slug
            }
          }
        }
      }
    }
  `