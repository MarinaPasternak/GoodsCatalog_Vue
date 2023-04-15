export const state = () => ({
  products: [],
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
}

export const actions = {
  async fetchAllProducts({ commit }) {
   
      const response = await fetch('https://dummyjson.com/products?limit=0');
      const products = await response.json();
      commit('SET_PRODUCTS', products);
  }
}
