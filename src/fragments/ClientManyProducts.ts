import { gql } from '@generated'

// Extiende la query de búsqueda que FastStore ya ejecuta (shelves, PLP) para
// exponer productGroups por producto. Es la fuente de las cucardas de colección.
// (En esta tienda StoreProduct se extiende con productGroups {id name} vía
// src/graphql/vtex; cumple el mismo rol que clusterHighlights de la guía.)
export const fragment = gql(`
  fragment ClientManyProducts on Query {
    search(
      first: $first
      after: $after
      sort: $sort
      term: $term
      selectedFacets: $selectedFacets
      sponsoredCount: $sponsoredCount
    ) {
      products {
        pageInfo {
          totalCount
        }
        edges {
          node {
            productGroups {
              id
              name
            }
          }
        }
      }
    }
  }
`)
