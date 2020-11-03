import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import Header from "../components/header"
var unified = require('unified')
var markdown = require('remark-parse')
var html = require('remark-html')

export default ({ data }) => {
  const vibe = data.vibes
  var markdownHtml = null;
  unified()
    .use(markdown)
    .use(html, {sanitize: true})
    .process(vibe.vibe, function (err, file) {
      if (err) throw err
      markdownHtml = String(file)
    })
  return (
    <Container>
      <Header headerText="Vibes!"/>
      <div>
        <h2>{vibe.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: markdownHtml }}
        />
      </div>
    </Container>
  )
}
export const query = graphql`
query($slug: String!) {
  vibes(fields: { slug: { eq: $slug } }) {
    title,
    vibe
  }
}
`