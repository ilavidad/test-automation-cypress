function isKnownDemoSiteException(error) {
  return error.message.includes("pagespeed is not defined");
}

module.exports = { isKnownDemoSiteException };
