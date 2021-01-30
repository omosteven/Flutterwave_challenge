const {
    isJSON,
    isJSONArrayOrString,
    isFieldInData,
    _isJSONValid,
    validateRule
} = require("../middlewares/RuleValidationMiddleware");

class RuleValidationController {


    static base(req, res) {

        res.status(200).send({
            message: "My Rule-Validation API",
            status: "success",
            data: {
                name: "Steven Omole-Adebomi",
                github: "@omosteven",
                email: "omosteven123@gmail.com",
                mobile: "09056409882",
                twitter: "@omolesteven"
            }
        })
    }


    static validateRule(req, res) {

        const {rule, data} = req.body;

        if (rule != undefined && data != undefined) {

            // validate if both rule and data are contained in the request

            // Check  If a field is of the wrong type

            // e/ If a field is of the wrong type, your endpoint should return with a response (HTTP 400 status code) that is similar to the below:

            // c/ The data field can be any of:
            // c1/ A valid JSON object
            // c2/ A valid array
            // c3/ A string
            
            if (!isJSON(rule) && isJSONArrayOrString(data)) { // if rule is not JSON but data is json, string or array
                res.status(400).send({"message": "rule should be an object.", "status": "error", "data": null})

            } else if (!isJSONArrayOrString(data) && isJSON(rule)) { // if rule is JSON but data is neither json, string nor array

                res.status(400).send({"message": "data should be a|an object, string or array.", "status": "error", "data": null})

            } else if (!isJSON(rule) && !isJSONArrayOrString(data)) { // if rule is not JSON and data is neither json, string nor array

                res.status(200).send({"message": "rule should be an object. data should be a|an object, string or array.", "status": "error", "data": null})

            } else { // f/ If an invalid JSON payload is passed to your API, your endpoint response (HTTP 400 status code) should be:
                if (_isJSONValid([
                    "field", "condition", "condition_value"
                ], rule)) { // check if the rule field contains the required fields.

                    const isFieldMissing = isFieldInData(rule["field"], data);
                    // throw field value if not missing otherwise false

                    // g/ If the field specified in the rule object is missing from the data passed, your endpoint response (HTTP 400 status code) should be:
                    if (isFieldInData(rule["field"], data)) {

                        const validatedField = rule["field"];

                        const isRuleValid = validateRule(isFieldMissing, rule["condition"], rule["condition_value"]);
                        // h/ If the rule is successfully validated, your endpoint response (HTTP 200 status code) should be:
                       
                        if (isRuleValid) {
                       
                            res.status(200).send({
                                message: `field ${validatedField} successfully validated.`,
                                status: "success",
                                data: {
                                    validation: {
                                        error: false,
                                        field: validatedField,
                                        field_value: data[validatedField],
                                        condition: rule["condition"],
                                        condition_value: rule["condition_value"]
                                    }
                                }
                            })
                        } else {
                            res.status(400).send({
                                message: `field ${validatedField} failed validation.`,
                                status: "error",
                                data: {
                                    validation: {
                                        error: true,
                                        field: validatedField,
                                        field_value: data[validatedField],
                                        condition: rule["condition"],
                                        condition_value: rule["condition_value"]
                                    }
                                }
                            })
                        }

                    } else { // assign the missing field to a variable
                        const missingField = rule["field"];

                        res.status(400).send({"message": `field ${missingField} is missing from data.`, "status": "error", "data": null})

                    }

                } else { // check If an invalid JSON payload is passed to your API (f).

                    res.status(400).send({message: "Invalid JSON payload passed.", status: "error", data: null})

                }
            }


        } else {
            // check If a required field isn't passed.

            // d/ If a required field isn't passed. Your endpoint should return with a response (HTTP 400 status code) that is similar to the below:
            if (rule === undefined && data != undefined) { // check if it was rule that was missing or not

                res.status(400).send({message: "rule is required.", status: "error", data: null})

            } else if (rule != undefined && data === undefined) { // check if it was data field is missing.

                res.status(400).send({message: "data is required.", status: "error", data: null})

            } else { // f/ If an invalid JSON payload is passed to your API, your endpoint response (HTTP 400 status code) should be:
                res.status(400).send({message: "Invalid JSON payload passed.", status: "error", data: null})

            }
        }
    }


};

module.exports = RuleValidationController;
