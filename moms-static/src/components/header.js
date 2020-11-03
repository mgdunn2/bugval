import React from "react"
import headerStyles from "./header.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const randomGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default ({headerText}) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {relativeDirectory: {eq: "static"}, name: {regex: "/.*moms.*/"}}) {
        edges {
          node {
            childImageSharp {
              fixed(width: 150, height: 220) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }`)
  const randomPosition = randomGenerator(0, data.allFile.edges.length - 1)
  const randomizedImage = data.allFile.edges[randomPosition].node
  return (
    <div className={headerStyles.header}>
      <div>
        <Img fixed={randomizedImage.childImageSharp.fixed} />
      </div>
      <h1>{headerText}</h1>
    </div>
  )
}
