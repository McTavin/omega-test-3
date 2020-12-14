const path = require(`path`);
exports.createPages = ({ graphql, actions }) => {

  const { createPage } = actions
  return new Promise(async resolve => {

    const result = await graphql(`
        {
        allAirtable {
          edges {
            node {
              table
              recordId
              data {
                title
                slug
                image {
                	url
                }
              }
            }
          }
        }
      }
    `)
    // For each path, create page and choose a template.
    // values in context Object are available in that page's query
    result.data.allAirtable.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.data.slug}`,
        component: path.resolve(`./src/template/post.js`),
        context: {
            slug: node.data.slug,
        },
      })
    });
    resolve()
  })
}