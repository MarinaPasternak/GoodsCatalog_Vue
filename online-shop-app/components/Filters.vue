<template>
  <div class="filters">
    <div class="categories-filter">
      <div class="filters-header">
        <h4 class="title">Filters</h4>
        <button
          @click="clearFilters"
          :disabled="isFiltersApplied"
          class="primary-button"
        >
          Clear
        </button>
      </div>
      <h5>By Category</h5>
      <b-form-checkbox
        v-for="option in updatedCategories"
        :key="option"
        :id="option"
        :value="option"
        v-model="selectedCategories"
      >
        {{ option }}
      </b-form-checkbox>
      <div class="price-filter">
        <h5>By Price</h5>
        <div class="input-container">
          <b-form-input
            v-model="minPrice"
            type="number"
            placeholder="Min"
            :max="priceRange.max"
            :min="priceRange.min"
          ></b-form-input>
          <b-form-input
            v-model="maxPrice"
            type="number"
            placeholder="Max"
            :max="priceRange.max"
            :min="priceRange.min"
          ></b-form-input>
        </div>
      </div>
      <button class="primary-button" @click="applyFilters">
        Apply Filters
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["priceRange", "categoriesParametrs", "pricePrametrs"],
  data() {
    return {
      selectedCategories: [],
      minPrice: null,
      maxPrice: null,
      isFiltersApplied: true,
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
    updatedCategories() {
      return this.categories.map((category) => category.replace("-", " "));
    },
  },
  methods: {
    ...mapActions(["fetchAllCategories"]),
    applyFilters() {
      if (
        this.minPrice > 0 ||
        this.maxPrice > 0 ||
        this.selectedCategories.length > 0
      ) {
      }
      this.pushFiltersParamToRout();
      this.isFiltersApplied = false;
      this.$emit("apply-filters", {
        categories: this.selectedCategories,
        minPrice: this.minPrice || this.priceRange.min,
        maxPrice: this.maxPrice || this.priceRange.max,
      });
    },
    pushFiltersParamToRout() {
      let query = {};

      if (this.selectedCategories.length > 0) {
        query.categories = this.selectedCategories.join(",");
      }

      if (this.minPrice || this.maxPrice) {
        query.minPrice = this.minPrice || this.priceRange.min;
        query.maxPrice = this.maxPrice || this.priceRange.max;
      }

      if (query) {
        this.$router.push({ path: "/", query });
      }
    },
    clearFilters() {
      this.$router.push({ path: "/" });
      this.isFiltersApplied = true;
      this.selectedCategories = [];
      this.priceFilter = null;
      this.$emit("clear-filters");
    },
  },
  created() {
    this.fetchAllCategories();

    if (this.categoriesParametrs.length > 0) {
      this.isFiltersApplied = false;
      const updatedCategoriesParametrs = this.categoriesParametrs.map(
        (category) => category.replace("-", " ")
      );
      this.selectedCategories = updatedCategoriesParametrs;
    }

    if (this.pricePrametrs) {
      if (this.pricePrametrs.max > 0) {
        this.isFiltersApplied = false;
        this.minPrice = this.pricePrametrs.min;
      }
      if (this.pricePrametrs.min > 0) {
        this.isFiltersApplied = false;
        this.maxPrice = this.pricePrametrs.max;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.filters {
  margin-right: 2rem;
  width: 20%;
  padding: 0 1.2rem;
  border-radius: 10px;
  background-color: $white-color;

  h4 {
    margin-bottom: 15px;
  }

  h5 {
    margin-top: 15px;
  }

  .primary-button {
    margin-top: 2rem;
    padding: 0.3rem;
    width: 100%;
  }

  .filters-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;

    h4 {
      margin: 0;
    }

    .primary-button {
      padding: 0.3rem;
      width: fit-content;
      height: fit-content;
      font-size: 0.8rem;
      color: $red-color;
      border: none;
      transition: all 0.3s ease;
    }

    .primary-button:disabled {
      color: $secondary-color;
      background-color: $white-color;
    }

    .primary-button:hover {
      background-color: $white-color;
    }

    .primary-button:not(:disabled):hover {
      font-size: 1.1rem;
    }
  }
}

.categories-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.price-filter {
  text-align: left;

  .input-container {
    display: flex;
    gap: 10px;

    input {
      width: 50%;
    }
  }
}

::v-deep .custom-control input {
  margin-right: 5px;
}
</style>
