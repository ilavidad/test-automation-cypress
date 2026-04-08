const { products } = require("./products.data");

const comparisonSets = {
  camerasCanonVsNikon: {
    category: {
      name: "Cameras",
      path: "33",
    },
    products: [products.canonEos5d, products.nikonD300],
  },
};

module.exports = { comparisonSets };
