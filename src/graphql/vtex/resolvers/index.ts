type ProductSource = {
  id?: string
  productID?: string
}

const getProductId = (product: ProductSource) => {
  return product.productID ?? product.id ?? ""
}

const resolvers = {
  StoreProduct: {
    commercialTags: async (product: ProductSource) => {
      const productId = getProductId(product)

      if (!productId) {
        return []
      }

      // Consultar aquí la fuente real de datos (Catalog, Master Data, VBase o
      // una API server-side). Por ahora se devuelven valores fijos de ejemplo.
      return ["Nuevo", "Destacado"]
    },
    productGroups: async (product: ProductSource) => {
      const productId = getProductId(product)

      if (!productId) {
        return []
      }

      // Consultar aquí la fuente real de datos.
      return [
        { id: "100", name: "Temporada" },
        { id: "200", name: "Promoción" },
      ]
    },
  },
}

export default resolvers
