// En FastStore 4.3 `usePDP` vive en el PageProvider del core (no se exporta desde
// "@faststore/core"), accesible vía el alias `src/*`.
import { usePDP } from "src/sdk/overrides/PageProvider"

import styles from "./product-extra-info.module.scss"

type ProductGroup = {
  id?: string
  name?: string
}

type ExtendedProduct = {
  commercialTags?: string[]
  productGroups?: ProductGroup[]
}

const ProductExtraInfo = () => {
  const context = usePDP()
  const product = context?.data?.product as ExtendedProduct | undefined

  const tags = product?.commercialTags ?? []
  const groups = product?.productGroups ?? []

  if (tags.length === 0 && groups.length === 0) {
    return null
  }

  return (
    <section className={styles.wrapper}>
      {tags.length > 0 && (
        <div className={styles.block}>
          <h2>Etiquetas del producto</h2>
          <ul>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      )}

      {groups.length > 0 && (
        <div className={styles.block}>
          <h2>Agrupadores</h2>
          <ul>
            {groups.map((group) => (
              <li key={group.id ?? group.name}>{group.name}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default ProductExtraInfo
