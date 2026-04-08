function normalizeAutHref($element, targetRoute) {
  $element.attr("href", targetRoute);
}

module.exports = { normalizeAutHref };
