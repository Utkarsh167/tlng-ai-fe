import { toTitleCase } from "./messages";
import { PATTERN } from "./patterns";

export const PATTERN_ERRORS = (pattern, key) => {
    if (pattern == PATTERN.email) {
        return `Please enter a valid ${key.toLowerCase()}`
    }
    if (pattern == PATTERN.password) {
        return `${toTitleCase(key)} can not contain blank spaces`
    }
    if (pattern == PATTERN.name) {
        return `${toTitleCase(key)} can not be blank`
    }
    if (pattern == PATTERN.phone) {
        return `${toTitleCase(key)} must contain only numbers and can not start with 0`
    }
    if (pattern == PATTERN.onlyNumber) {
        return `Only digits are allowed`
    }
    if (pattern == PATTERN.price) {
        return `${toTitleCase(key)} must be numeric`
    }
    if (pattern == PATTERN.alphaNumeric) {
        return `${toTitleCase(key)} can contain only characters and numbers`
    }
    if (pattern == PATTERN.alphaNumericWithSpace) {
        return `${toTitleCase(key)} can contain only characters and numbers`
    }
    if (pattern == PATTERN.alphabetsWithSpace) {
        return `${toTitleCase(key)} can contain only characters and space`
    }
    if (pattern == PATTERN.noSpace) {
        return `${toTitleCase(key)} can't contain space`
    }
}