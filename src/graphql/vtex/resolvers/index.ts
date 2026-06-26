type ProductSource = {
  id?: string
  productID?: string
  // En la plataforma VTEX el producto que recibe el resolver expone el id como
  // `productId` (d minúscula), no `productID`/`id` como en la guía 4.2.
  productId?: string
}

const getProductId = (product: ProductSource) => {
  return product.productId ?? product.productID ?? product.id ?? ""
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
