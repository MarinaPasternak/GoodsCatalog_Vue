<template>
  <div>
    <template v-if="products">
      <div class="products-block">
        <filters
          class="aside-filters"
          @apply-filters="applyFilters"
          @clear-filters="clearFilters"
          :priceRange="minMaxPrices"
          :categoriesParametrs="selectedCategories"
          :pricePrametrs="priceFilter"
        ></filters>
        <b-sidebar id="filterSideBar" shadow>
          <filters
            @apply-filters="applyFilters"
            @clear-filters="clearFilters"
            :priceRange="minMaxPrices"
            :categoriesParametrs="selectedCategories"
            :pricePrametrs="priceFilter"
          ></filters>
        </b-sidebar>
        <div class="catalog-container">
          <template v-if="filteredProducts.length > 0">
            <div class="catalog-header">
              <b-pagination
                class="custom-pagination"
                :total-rows="totalRows"
                :per-page="perPage"
                v-model="currentPage"
                @input="fetchAllProducts"
              ></b-pagination>
              <b-button
                v-b-toggle.filterSideBar
                class="show-filter-button primary-button"
                >Add Filters</b-button
              >
            </div>
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
          </template>
          <template v-else>
            <nothing-found></nothing-found>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CatalogCard from "../components/CatalogCard.vue";
import Filters from "../components/Filters.vue";
import NothingFound from "../components/NothingFound.vue";

export default {
  components: {
    CatalogCard,
    Filters,
    NothingFound,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 6,
      totalRows: 0,
      selectedCategories: [],
      priceFilter: {},
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products.products,
    }),
    filteredProducts() {
      let filteredProducts = this.products;
      this.getAllProductsCount(filteredProducts);

      if (this.selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          return this.selectedCategories.includes(product.category);
        });

        this.getAllProductsCount(filteredProducts);
      }

      if (
        this.priceFilter &&
        (this.priceFilter.min > 0 || this.priceFilter.max > 0)
      ) {
        filteredProducts = filteredProducts.filter((product) => {
          const priceWithDiscount =
            product.price - (product.discountPercentage * product.price) / 100;

          return (
            priceWithDiscount >= this.priceFilter.min &&
            priceWithDiscount <= this.priceFilter.max
          );
        });

        this.getAllProductsCount(filteredProducts);
      }

      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;

      return filteredProducts.slice(startIndex, endIndex);
    },
    minMaxPrices() {
      let minPrice =
        this.products[0].price -
        (this.products[0].discountPercentage * this.products[0].price) / 100;
      let maxPrice =
        this.products[0].price -
        (this.products[0].discountPercentage * this.products[0].price) / 100;

      this.products.forEach((product) => {
        const priceWithDiscount =
          product.price - (product.discountPercentage * product.price) / 100;

        if (priceWithDiscount < minPrice) {
          minPrice = product.price;
        }
        if (priceWithDiscount > maxPrice) {
          maxPrice = product.price;
        }
      });

      return { min: minPrice, max: maxPrice };
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
      this.priceFilter = {
        min: Number(categories.minPrice),
        max: Number(categories.maxPrice),
      };
      this.currentPage = 1;
    },
    getFilterParamsFromRoute() {
      const { categories, minPrice, maxPrice } = this.$route.query;

      if (categories) {
        this.selectedCategories = categories.split(",");

        this.selectedCategories = this.selectedCategories.map((category) => {
          return category.replace(" ", "-");
        });
      }

      if (minPrice) {
        this.priceFilter.min = Number(minPrice);
      }

      if (maxPrice) {
        this.priceFilter.max = Number(maxPrice);
      }
    },
    clearFilters() {
      this.currentPage = 1;
      this.selectedCategories = [];
      this.priceFilter = null;
    },
  },
  created() {
    this.getFilterParamsFromRoute();
    this.fetchAllProducts();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

h1 {
  text-align: center;
}
.products-block {
  display: flex;
  margin: 2rem;
}

.catalog-container {
  width: 80%;
  padding: 2rem;
  border-radius: 10px;
  background-color: $white-color;

  .catalog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .primary-button {
      padding: 0.3rem;
      width: fit-content;
      color: $font-color;
    }
  }
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

#filterSideBar {
  .filters {
    width: 100%;
  }
  .primary-button {
    width: 100%;
  }
}

::v-deep #filterSideBar .close {
  border: none;
  background-color: transparent;
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

::v-deep .b-sidebar-header {
  padding-bottom: 0;
  background-color: $white-color;
}

::v-deep .b-sidebar-body {
  background-color: $white-color;
}

@media (min-width: 992px) {
  .show-filter-button {
    display: none;
  }

  .aside-filters {
    display: block;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .show-filter-button {
    display: block;
  }

  .aside-filters {
    display: none;
  }

  .catalog-container {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .show-filter-button {
    display: block;
  }

  .aside-filters {
    display: none;
  }

  .catalog-container {
    width: 100%;
  }
}
</style>
