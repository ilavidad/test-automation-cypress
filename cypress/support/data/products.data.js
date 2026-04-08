const products = {
  canonEos5d: {
    id: "30",
    name: "Canon EOS 5D",
  },
  nikonD300: {
    name: "Nikon D300",
  },
};

const productConfigurations = {
  canonEos5dBlueQuantity4: {
    product: products.canonEos5d,
    option: "Blue",
    quantity: "4",
    cartSummary: "Select: Blue",
  },
};

module.exports = {
  productConfigurations,
  products,
};
