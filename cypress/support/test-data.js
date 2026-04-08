const routes = {
  cart: "/index.php?route=checkout/cart",
  category: "/index.php?route=product/category",
  compare: "/index.php?route=product/compare",
  login: "/index.php?route=account/login",
  product: "/index.php?route=product/product",
};

const categories = {
  cameras: {
    name: "Cameras",
    path: "33",
  },
};

const products = {
  canonEos5d: {
    id: "30",
    name: "Canon EOS 5D",
    configuration: {
      option: "Blue",
      quantity: "4",
      summary: "Select: Blue",
    },
  },
  nikonD300: {
    name: "Nikon D300",
  },
};

module.exports = {
  categories,
  products,
  routes,
};
