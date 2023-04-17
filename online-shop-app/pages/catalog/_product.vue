<template>
  <div>
    <h1>Item</h1>
    <h2>{{ product.title }}</h2>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      product: (state) => state.product.product,
    }),
  },
  methods: {
    ...mapActions(["fetchProductByID"]),
  },
  created() {
    const productID = this.$route.params.product;

    this.fetchProductByID(productID);
    console.log(this.product);
  },
};
</script>

<style scoped></style>
