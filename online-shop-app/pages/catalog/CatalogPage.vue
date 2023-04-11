<template>
  <div>
    <h1 class="title">Products</h1>
    <template v-if="products">
      <div class="catalog-container">
        <b-pagination
          class="custom-pagination"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          @input="fetchAllProducts"
        ></b-pagination>
        <div class="goods-list-container">
          <catalog-card
            v-for="product in filteredProducts"
            :product="product"
            :key="product.id"
          ></catalog-card>
        </div>
        <b-pagination
          class="custom-pagination"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          @input="fetchAllProducts"
        ></b-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CatalogCard from "./components/CatalogCard.vue";

export default {
  components: {
    CatalogCard,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 6,
      totalRows: 0,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    filteredProducts() {
      this.getAllProductsCount();

      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;

      return this.products.slice(startIndex, endIndex);
    },
  },
  methods: {
    ...mapActions(["fetchAllProducts"]),
    getAllProductsCount() {
      this.totalRows = this.products.length;
    },
  },
  mounted() {
    this.fetchAllProducts();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.catalog-container {
  padding: 2rem;
  border-radius: 10px;
  background-color: $white-color;
}

.goods-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
}

.custom-pagination {
  margin-left: 1rem;
}

.custom-pagination:last-child {
  margin-top: 1rem;
}

::v-deep .custom-pagination .page-link {
  background: $white-color;
  color: $font-color;
  border: $secondary-color 1px solid;
}
::v-deep .custom-pagination .active button {
  background: $font-color;
  color: $white-color;
}
</style>
