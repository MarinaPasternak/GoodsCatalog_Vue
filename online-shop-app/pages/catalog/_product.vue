<template>
  <div>
    <div v-if="product" class="container">
      <div>
        <div class="image-container">
          <img :src="product.images[0]" />
        </div>
      </div>
      <div class="description-container">
        <h2>{{ product.title }}</h2>
        <div class="rating-container">
          <div class="stars">
            <b-icon
              v-for="index in maxStarsForRating"
              :key="index"
              :icon="getStarClass(index)"
            ></b-icon>
          </div>
          <p>{{ this.product.rating }}</p>
        </div>
        <div class="cost-container">
          <template v-if="product.discountPercentage > 0">
            <p class="old-price">${{ product.price }}</p>
            <p class="new-price">
              ${{
                (
                  product.price -
                  (product.discountPercentage * product.price) / 100
                ).toFixed(2)
              }}
            </p>
          </template>
          <template v-else>
            <p>${{ product.price }}</p>
          </template>
        </div>
        <div class="description-container">
          {{ product.description }}
        </div>
        <nuxt-link :to="'/'">
          <button class="primary-button">Go to All</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      maxStarsForRating: 5,
      sliding: null,
    };
  },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
    }),
    fullRatingStars() {
      return Math.floor(this.product.rating);
    },
    hasHalfRatingStar() {
      return this.product.rating % 1 >= 0.5;
    },
  },
  methods: {
    ...mapActions(["fetchProductByID"]),
    getStarClass(index) {
      if (index <= this.fullRatingStars) {
        return "star-fill";
      } else if (this.hasHalfRatingStar && index === this.fullRatingStars + 1) {
        return "star-half";
      } else {
        return "star";
      }
    },
  },
  created() {
    const productID = this.$route.params.product;

    this.fetchProductByID(productID);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
.container {
  width: fit-content;
  display: flex;
  margin: 2rem auto;
  padding: 1rem;
  position: relative;
  background-color: $white-color;
  border-radius: 10px;

  .image-container {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 4rem;
  }

  .description-container {
    margin-top: 15px;

    .primary-button {
      position: relative;
      margin-top: 3rem;
      margin-bottom: 1rem;
      bottom: 0;
    }
  }
}

.cost-container {
  p {
    margin: 0;
  }

  .old-price {
    font-size: 0.8rem;
    text-decoration: line-through;
  }

  .new-price {
    color: $red-color;
    font-weight: 600;
  }
}

.rating-container {
  display: flex;
  margin-bottom: 1rem;

  p {
    margin: 0;
    margin-left: 5px;
  }
}
</style>
