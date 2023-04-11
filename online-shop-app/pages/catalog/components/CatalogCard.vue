<template>
  <div>
    <div class="shop-card">
      <img :src="product.images[0]" :alt="product.title" />
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
      <h3>{{ product.title }}</h3>
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
      <div class="description-container">
        {{ product.description }}
      </div>
      <button class="primary-button">Details</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      maxStarsForRating: 5,
    };
  },
  computed: {
    fullRatingStars() {
      return Math.floor(this.product.rating);
    },
    hasHalfRatingStar() {
      return this.product.rating % 1 >= 0.5;
    },
  },
  methods: {
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
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
.shop-card {
  width: 400px;
  height: 450px;
  margin: 1rem;
  position: relative;
  padding: 1rem;
  padding-bottom: 70px;
  border-radius: 10px;
  background-color: $white-color;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);

  .cost-container p {
    margin: 0;
  }

  h3,
  p {
    text-align: left;
  }

  img {
    max-width: 250px;
    max-height: 150px;
    margin-bottom: 1rem;
  }

  .cost-container {
    .old-price {
      font-size: 0.8rem;
      text-decoration: line-through;
    }

    .new-price {
      color: $red-color;
      font-weight: 600;
    }
  }

  .description-container {
    height: 50px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rating-container {
    display: flex;

    p {
      margin: 0;
      margin-left: 5px;
    }
  }

  .primary-button {
    position: absolute;
    margin-bottom: 1rem;
    bottom: 0;
    transform: translateX(-50%);
  }
}

.shop-card:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}
</style>
