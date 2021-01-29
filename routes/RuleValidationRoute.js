const router = require("express");

const baseRouter = router();

const ruleValidationRouter = router();

const RuleValidationController = require("../controllers/RuleValidationController");

ruleValidationRouter.get("/", RuleValidationController.base);

ruleValidationRouter.post("/validate-rule", RuleValidationController.validateRule);

baseRouter.use("/", ruleValidationRouter);

module.exports = baseRouter;
