<template>
  <div class="filters">
    <div class="categories-filter">
      <h4>Filters</h4>
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
  props: ["priceRange"],
  data() {
    return {
      selectedCategories: [],
      minPrice: null,
      maxPrice: null,
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
      this.$emit("apply-filters", {
        categories: this.selectedCategories,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      });
    },
  },
  created() {
    this.fetchAllCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.filters {
  margin-right: 2rem;
  width: 20%;
  padding: 1.2rem;
  border-radius: 10px;
  background-color: $white-color;

  h4 {
    margin-bottom: 15px;
  }

  .primary-button {
    margin-top: 2rem;
    padding: 0.3rem;
  }
}

.categories-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.price-filter {
  text-align: left;

  h5 {
    margin-top: 15px;
  }

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
