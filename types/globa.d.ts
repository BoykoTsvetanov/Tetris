export type Cell = {
  color: string
  isChecked: boolean
}

export type BaseEntitlement = {
  productCode: string
  startDate: string
  endDate: string
}

export type ModelEntitlement = BaseEntitlement & {
  modelType: string
}

export type ExpansionPack = BaseEntitlement & {
  quantity: number
  packageName: string
}

export type AppEntitlement = BaseEntitlement & {
  quantity?: number
  packageName?: string
  expansions: ExpansionPack[]
}
