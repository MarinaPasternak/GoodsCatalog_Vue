import Vuex from 'vuex'
import { 
  state as productsState, 
  mutations as productsMutations,
  actions as productsActions,
} from './modules/products';
import { 
  state as categoryState,
  mutations as categoryMutations,
  actions as categoryActions,
} from './modules/categories';
import { 
  state as productState, 
  mutations as productMutations,
  actions as productActions,
} from './modules/product';

const createStore = () => {
  return new Vuex.Store({
    modules: {
      products: {
        state: productsState,
        mutations: productsMutations,
        actions: productsActions,
      },
      categories: {
        state: categoryState,
        mutations: categoryMutations,
        actions: categoryActions,
      },
      product: {
        state: productState,
        mutations: productMutations,
        actions: productActions,
      },
    }
  })
}

export default createStore
