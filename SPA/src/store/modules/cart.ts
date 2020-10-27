import { iItem } from '@/common/interface/item'
import { RootState } from '@/store'
import { GetterTree, MutationTree } from 'vuex'

export interface State {
  selectedItems: iItem[]
  merchantPaymentId: string
}

const initState = {
  selectedItems: [],
  merchantPaymentId: null,
}

type CartGetter = GetterTree<State, RootState>
type CartMutation = MutationTree<State>

// getters
const getters: CartGetter = {
  cartItems: (state: State) => state.selectedItems,
  hasItemInCart: (state: State) => (id: number) => {
    return !!state.selectedItems.find((item) => item.id === id)
  },
  getSum: (state: State) =>
    state.selectedItems.reduce((acc: number, item: iItem) => {
      acc += item.price
      return acc
    }, 0),
  getMerchantId: (state: State) => state.merchantPaymentId,
}

export const mutations: CartMutation = {
  addToCart(state, newItem) {
    const itemCopy = Object.assign({}, newItem)
    state.selectedItems.push(itemCopy)
  },
  removeFromCart(state, id) {
    const items = state.selectedItems.filter((item) => item.id != id)
    state.selectedItems = [...items]
  },
  updateMerchantId(state, merchantPaymentId) {
    state.merchantPaymentId = merchantPaymentId
  },
}

export default {
  state: initState,
  getters,
  mutations,
  namespaced: true,
}
