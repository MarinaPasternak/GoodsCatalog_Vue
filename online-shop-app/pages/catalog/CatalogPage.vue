<template>
  <div>
    <h1 class="title">Products</h1>
    <template v-if="products">
      <div class="products-block">
        <filters @apply-filters="applyFilters"></filters>
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
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CatalogCard from "./components/CatalogCard.vue";
import Filters from "./components/Filters.vue";

export default {
  components: {
    CatalogCard,
    Filters,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 6,
      totalRows: 0,
      selectedCategories: null,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products.products,
    }),
    filteredProducts() {
      let filteredProducts = this.products;
      this.getAllProductsCount(filteredProducts);

      if (this.selectedCategories) {
        filteredProducts = filteredProducts.filter((product) => {
          return this.selectedCategories.includes(product.category);
        });

        this.getAllProductsCount(filteredProducts);
      }

      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;

      return filteredProducts.slice(startIndex, endIndex);
    },
  },
  methods: {
    ...mapActions(["fetchAllProducts"]),
    getAllProductsCount(products) {
      this.totalRows = products.length;
    },
    applyFilters(categories) {
      const updatedCategories = categories.categories.map((category) =>
        category.replace(" ", "-")
      );

      this.selectedCategories = updatedCategories;
      this.currentPage = 1;
    },
  },
  created() {
    this.fetchAllProducts();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.products-block {
  display: flex;
}

.catalog-container {
  width: 80%;
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
