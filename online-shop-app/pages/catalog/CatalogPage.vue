<template>
  <div>
    <h1 class="title">Products</h1>
    <div class="catalog-container">
      <div class="shop-card" v-for="product in products" :key="product.id">
        <img :src="product.images[0]" :alt="product.title" />
        <div class="cost-container">
          <p>${{ product.price }}</p>
        </div>
        <h3>{{ product.title }}</h3>
        <div class="rating-container"></div>
        <div class="description-container">
          {{ product.description }}
        </div>
        <button class="primary-button">Details</button>
      </div>
    </div>
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

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
.catalog-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;

  .shop-card {
    width: 400px;
    height: 450px;
    margin: 1rem;
    position: relative;
    padding: 1rem;
    padding-bottom: 70px;
    border: 1px solid $secondary-color;
    border-radius: 10px;

    .cost-container p {
      margin: 0;
    }

    h3,
    p {
      text-align: left;
    }

    img {
      max-width: 300px;
      max-height: 200px;
      margin-bottom: 1rem;
    }

    .description-container {
      height: 50px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .primary-button {
      position: absolute;
      margin-bottom: 1rem;
      bottom: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
