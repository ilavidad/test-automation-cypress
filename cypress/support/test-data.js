const routes = {
  account: {
    login: "/index.php?route=account/login",
  },
  checkout: {
    cart: "/index.php?route=checkout/cart",
  },
  product: {
    category: "/index.php?route=product/category",
    compare: "/index.php?route=product/compare",
    detail: "/index.php?route=product/product",
  },
};

const catalog = {
  categories: {
    cameras: {
      name: "Cameras",
      path: "33",
    },
  },
  products: {
    canonEos5d: {
      id: "30",
      name: "Canon EOS 5D",
    },
    nikonD300: {
      name: "Nikon D300",
    },
  },
};

const cartItems = {
  configuredCanonEos5d: {
    product: catalog.products.canonEos5d,
    configuration: {
      option: "Blue",
      quantity: "4",
      summary: "Select: Blue",
    },
  },
};

const users = {
  valid: {
    envKey: "validUser",
  },
};

module.exports = {
  cartItems,
  catalog,
  routes,
  users,
};
