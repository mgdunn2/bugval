const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Vibes`) {
    const slug = 'vibes/' + encodeURI(node.title.replace(/ /g, "_"))
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === `Ideas`) {
    const slug = 'ideas/' + encodeURI(node.title.replace(/ /g, "_"))
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allVibes {
        edges {
          node {
            title,
            vibe,
            fields {
              slug
            }
          }
        }
      },
      allIdeas {
        edges {
          node {
            title,
            idea,
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allVibes.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/vibes.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
  result.data.allIdeas.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/ideas.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}