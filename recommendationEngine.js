const associationRules = require("./associationRules");

function getRecommendations(cartData) {
  const recommendations = applyAssociationRules(cartData, associationRules);
  return recommendations;
}

function applyAssociationRules(cartData, associationRules) {
  let recommendations = new Set();

  cartData.forEach((item) => {
    console.log(item);
    let filteredRules = associationRules.filter((rule) => {
      return Object.values(rule.antecedants).includes(item);
    });
    console.log(filteredRules);
    filteredRules.forEach((rule) => {
      console.log(rule);
      rule.consequents.forEach((recommendation) => {
        recommendations.add(recommendation);
      });
    });
  });
  recommendations = JSON.stringify({
    recommendations: Array.from(recommendations),
  });
  return recommendations;
}

module.exports = {
  getRecommendations,
};
