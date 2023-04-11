<template>
  <div>
    <h1 class="title">Products</h1>
    <div class="catalog-container">
      <catalog-card
        v-for="product in products"
        :product="product"
        :key="product.id"
      ></catalog-card>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";
import CatalogCard from "./components/CatalogCard.vue";

export default {
  components: {
    CatalogCard,
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
  },
  methods: {
    ...mapActions(["fetchAllProducts"]),
  },
  mounted() {
    this.fetchAllProducts();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
.catalog-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
}
</style>
