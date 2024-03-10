const fs = require("fs");
const path = require("path");

const associationRulesJSON = fs.readFileSync(
  path.join(__dirname, "association_rules.json"),
  "utf8"
);
const associationRules = JSON.parse(associationRulesJSON);
module.exports = associationRules;
