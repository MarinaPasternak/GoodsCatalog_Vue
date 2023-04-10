<template>
  <div>
    <h1>Products</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
  },
  methods: {
    ...mapActions(["fetchAllProducts"]),
  },
  created() {
    this.fetchAllProducts();
  },
});
</script>

<style scoped></style>
