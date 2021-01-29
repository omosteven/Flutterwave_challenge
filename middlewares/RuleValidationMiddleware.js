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
        if (typeof checkData === "object") { // check if checkData is an object

            if (Array.isArray(checkData)) { // check if checkData is an Array
                return checkData.includes(field); // check if array checkData has the field value
            } else {

                if (checkData[field] === undefined) { // check if Object checkData has the key field or not
                    return false;
                } else {
                    return true
                }
            }
        } else if (typeof checkData === "string") { // check if checkData is string
            if (field === checkData) { // check if the field is string checkData
                return true
            } else {
                return false
            }
        } else {
            return false
        }

    }

    static _isJSONValid(checker, dataObject) {
        var count = 0;

        for (const key in dataObject) {
            if (checker.includes(key)) {
                count += 1;
            }
        }
        // console.log(count, Object.keys(check).length)
        if ((count === Object.keys(checker).length) & (count !== 0)) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = RuleValidator;
