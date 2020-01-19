import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import Header from "../components/header"
export default ({ data }) => {
  const duval = data.duvals
  return (
    <Container>
      <Header headerText="Wisdom!"/>
      <div>
        <h2>{duval.title}</h2>
        {duval.wisdom.split("\n").map((item, i) => <p key={i}>{item}</p>)}
      </div>
    </Container>
  )
}
export const query = graphql`
  query($slug: String!) {
    duvals(fields: { slug: { eq: $slug } }) {
      title,
      wisdom
    }
  }
`