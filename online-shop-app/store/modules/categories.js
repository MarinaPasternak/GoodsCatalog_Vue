export const state = () => ({
    categories: []
})
  
export const mutations = {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    }
}
  
export const actions = {
    async fetchAllCategories({ commit }) {
      const response = await fetch('https://dummyjson.com/products/categories');
      const categories = await response.json();
      commit('SET_CATEGORIES', categories)
    }
}
