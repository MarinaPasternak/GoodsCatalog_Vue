<template>
  <div>
    <div v-for="(option, key) in options" :key="key">
      <h4>{{ option.label }}</h4>
      <ul>
        <li v-for="value in option.values" :key="value.id">
          <input
            type="checkbox"
            :id="value.id"
            :value="value.value"
            v-model="selectedValues[key]"
            @change="onFilterSelected"
          />
          <label :for="value.id">{{ value.label }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedValues: {},
    };
  },
  methods: {
    onFilterSelected() {
      this.$emit("selected", this.selectedValues);
    },
  },
};
</script>

<style lang="scss" scoped></style>
