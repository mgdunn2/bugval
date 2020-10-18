import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import Header from "../components/header"
var unified = require('unified')
var markdown = require('remark-parse')
var html = require('remark-html')

export default ({ data }) => {
  const duval = data.duvals
  var markdownHtml = null;
  unified()
    .use(markdown)
    .use(html, {sanitize: true})
    .process(duval.wisdom, function (err, file) {
      if (err) throw err
      markdownHtml = String(file)
    })
  return (
    <Container>
      <Header headerText="Wisdom!"/>
      <div>
        <h2>{duval.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: markdownHtml }}
        />
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