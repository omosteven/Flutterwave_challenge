class RuleValidator {

    static isJSON(checkData) {
        if (typeof checkData === "object") {
            if (Array.isArray(checkData)) {
                return false
            } else {
                return true
            }
        } else {
            return false;
        }

    }

    static isJSONArrayOrString(checkData) {
        if (typeof checkData === "object") {
            return true
        } else if (typeof checkData === "string") {
            return true
        } else {
            return false
        }

    }

    static isFieldInData(field, checkData) {
       
        if (checkData[field] !== undefined) {
            return checkData[field];
        } else {
            return false;
        }

    }

    static validateRule(field_value, condition, condition_value) {

        if (condition === "eq" && field_value === condition_value) {

            return true;
        } else if ((condition === "neq" && field_value !== condition_value)) {

            return true;
        } else if (condition === "gt" && field_value > condition_value) {

            return true;
        } else if (condition === "gte" && field_value >= condition_value) {

            return true;
        } else if (condition === "contains" && condition_value.includes(field_value)) {

            return true;
        } else {

            return false;
        }
    }

    static _isJSONValid(checker, dataObject) {
        var count = 0;

        for (const key in dataObject) {
            if (checker.includes(key)) {
                count += 1;
            }
        }

        if ((count === Object.keys(checker).length) & (count !== 0)) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = RuleValidator;
