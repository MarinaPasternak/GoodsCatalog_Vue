<template>
  <section class="container">
    <div>
      <catalog-page></catalog-page>
    </div>
  </section>
</template>

<script>
import CatalogPage from "./catalog/CatalogPage.vue";
export default {
  components: {
    CatalogPage,
  },
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
