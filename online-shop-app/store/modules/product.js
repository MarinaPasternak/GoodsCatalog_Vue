export const state = () => ({
    product: null,
  })
  
  export const mutations = {
    SET_PRODUCT(state, product) {
      state.product = product;
    },
  }
  
  export const actions = {
    async fetchProductByID({ commit }, productID) {
        const response = await fetch(`https://dummyjson.com/products/${productID}`);
        const products = await response.json();
        commit('SET_PRODUCT', products);
    }
  }
