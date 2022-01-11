import _ from 'lodash'
import { BaseEntitlement } from 'types/globa'
import { expansion } from './expansion'
//var dynamic: any = [];

function solve(
  oldEntitlement: BaseEntitlement[],
  newEntitlement: BaseEntitlement[],
  difference: any[],
  isExpansion: boolean
) {
  if (newEntitlement === [] || oldEntitlement === []) return
  //const diff:any = [];
  newEntitlement.forEach((newEnt: BaseEntitlement) => {
    let found = false
    oldEntitlement.forEach((oldEnt: BaseEntitlement) => {
      if (newEnt['productCode'] === oldEnt['productCode']) {
        found = true
        Object.entries(newEnt).forEach(([key, value]) => {
          const _key = key as keyof BaseEntitlement
          if (
            /* eslint-disable-next-line */
            oldEnt.hasOwnProperty(_key) &&
            key !== 'productCode' &&
            key !== 'modelType' &&
            oldEnt[_key] !== newEnt[_key]
          ) {
            // newEnt[key as keyof BaseEntitlement]
            // (newEnt as Record<string, unknown>)[key]
            // (key as keyof BaseEntitlement) = 'asdf'
            // key  as 'productCode' | 'startDate' | 'endDate'
            if (oldEnt[_key] !== newEnt[_key] && key !== 'expansions') {
              difference.push({
                text: value
                  ? `Entitlement ${newEnt['productCode']} has a new ${
                      isExpansion ? `expansion ${key}` : key
                    } ${value}`
                  : `Entitlement ${newEnt['productCode']} ${key} was removed`,
              })
            }
            if (key === 'expansions') {
              isExpansion = true
              const oldExpansionValue = oldEnt[
                _key
              ] as unknown as BaseEntitlement[]
              const _value = value as unknown as BaseEntitlement[]
              const expansionNew = expansion(newEnt.productCode, _value)
              const expansionOld = expansion(
                oldEnt.productCode,
                oldExpansionValue
              )
              solve(expansionOld, expansionNew, difference, isExpansion)
            }
          }
        })
      }
    })
    if (!found) {
      if (newEnt.productCode == '') {
        return
      }
      difference.push({
        text: `Product Code ${newEnt.productCode} was added.`,
        addedData: true,
      })
    }
  })
  oldEntitlement.forEach((oldEnt) => {
    let found = true

    newEntitlement.forEach((newEnt) => {
      if (oldEnt['productCode'] === newEnt['productCode']) {
        found = false
      }
    })
    if (found) {
      difference.push({
        text: `Product Code ${oldEnt['productCode']} was removed`,
        removedData: true,
      })
    }
  })
  // dynamic.unshift(diff)
  // console.log(dynamic)
  return difference
}
export { solve }
