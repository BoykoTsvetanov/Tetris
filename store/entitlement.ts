import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { solve } from '../entitleHelper/entittlment'
import { BaseEntitlement } from '~/types/globa'
import { checkStringNew, checkStringOld } from '../entitleHelper/checkStrings'
import _ from 'lodash'

export const state = () => ({
  entitlement: [] as BaseEntitlement[],
  oldEntitlements: [] as BaseEntitlement[],
  newEntitlements: [] as BaseEntitlement[],
})
export type RootState = ReturnType<typeof state>
export const mutations: MutationTree<RootState> = {
  showEntittlement(state, entitlement): void {
    state.entitlement = entitlement
  },
  pushOldEntitlements(state) {
    state.oldEntitlements = [
      {
        productCode: 'first',
        startDate: '15.04.2020',
        endDate: '17.04.2021',
        modelType: '',
        quantity: 5,
        packageName: 'Fourth',
      } as BaseEntitlement,
      {
        productCode: '',
        startDate: '11.03.2020',
        endDate: '17.05.2021',
        modelType: 'second',
        quantity: 5,
        packageName: 'Fourth',
      } as BaseEntitlement,
      {
        productCode: 'third',
        startDate: '05.02.2020',
        endDate: '15.03.2020',
        modelType: '',
        quantity: 5,
        packageName: 'Fourth',
        expansions: [
          {
            quantity: 333,
            packageName: 'Wish',
          },
        ],
      } as BaseEntitlement,
    ]
  },
  pushNewEntitlements(state, entitlement: BaseEntitlement): void {
    state.newEntitlements.push(entitlement)
  },
}
export const getters: GetterTree<RootState, RootState> = {
  entitle(state) {
    //if(!state.newEntitlements.length || state.oldEntitlements.length) return [];
    const oldEntitlements = _.cloneDeep(state.oldEntitlements).map((e) => ({
      ...e,
      productCode: checkStringOld(e['productCode'], (e as any)['modelType']),
    }))
    const newEntitlements = _.cloneDeep(state.newEntitlements).map((e) => ({
      ...e,
      productCode: checkStringNew(e['productCode'], (e as any)['modelType']),
    }))
    const difference: any = []
    const isExpansion = false
    solve(oldEntitlements, newEntitlements, difference, isExpansion)
    return difference
  },
}
export const actions: ActionTree<RootState, RootState> = {
  entitlement({ commit }, payload: BaseEntitlement) {
    commit('pushOldEntitlements')
    commit('pushNewEntitlements', payload)
  },
}
