/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require(`path`)

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      // Querying to a SQLite database
      resolve: `gatsby-source-sql`,
      options: {
        typeName: 'Vibes',
        fieldName: 'chanook',
        dbEngine: {
          client: 'sqlite3',
          connection: {
            filename: '../moms.sqlite',
          }
        },
        useNullAsDefault: true,
        queryChain: function(x) {
          return x.select("title", "vibe").from("vibes")
        }
      }
    },
    {
      // Querying to a SQLite database
      resolve: `gatsby-source-sql`,
      options: {
        typeName: 'Ideas',
        fieldName: 'chanook',
        dbEngine: {
          client: 'sqlite3',
          connection: {
            filename: '../moms.sqlite',
          }
        },
        useNullAsDefault: true,
        queryChain: function(x) {
          return x.select("title", "idea").from("ideas")
        }
      }
    }
  ]
}
