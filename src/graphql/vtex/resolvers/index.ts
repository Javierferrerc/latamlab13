// Nota: el objeto `product` (root) que recibe el field resolver de StoreProduct
// en esta versión no expone el id con un nombre estable (`productId`/`productID`/
// `id` vienen undefined), por eso no se usa un guard por id. En una implementación
// real se usaría el identificador del producto para consultar la fuente autorizada
// (Catalog, Master Data, VBase o una API server-side). Para la guía se devuelven
// valores fijos de ejemplo para mostrar el patrón.
const resolvers = {
  StoreProduct: {
    commercialTags: async () => {
      return ["Nuevo", "Destacado"]
    },
    productGroups: async () => {
      return [
        { id: "100", name: "Temporada" },
        { id: "200", name: "Promoción" },
      ]
    },
  },
}

export default resolvers
