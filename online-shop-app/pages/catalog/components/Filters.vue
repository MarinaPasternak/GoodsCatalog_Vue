<template>
  <div class="filters">
    <div class="categories-filter">
      <h4>Filters</h4>
      <h5>By Category</h5>
      <b-form-checkbox
        v-for="option in categories"
        :key="option"
        :id="option"
        :value="option"
      >
        {{ option }}
      </b-form-checkbox>
    </div>
    <button class="primary-button">Apply Filters</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedValues: {},
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },
  methods: {
    ...mapActions(["fetchAllCategories"]),
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
  width: 40%;
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

::v-deep .custom-control input {
  margin-right: 5px;
}
</style>
