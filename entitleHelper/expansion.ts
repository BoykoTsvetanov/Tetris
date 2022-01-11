import { BaseEntitlement, ExpansionPack } from '../types/globa'

function expansion(
  productCode: string,
  expansionIn: BaseEntitlement[]
): BaseEntitlement[] {
  const obj = {} as ExpansionPack
  const expansions = [] as BaseEntitlement[]
  // : {productCode: string, quantity: Number, packageName: string}
  expansionIn.forEach((expans) => {
    Object.entries(expans).forEach(([key, value]) => {
      const _key = key as keyof ExpansionPack
      if (_key === 'quantity') {
        obj.quantity = Number(value)
      }
      else {
        obj.packageName = value
      }
    })
    obj.productCode = productCode
  })
  expansions.push(obj)
  return expansions
}
export { expansion }
