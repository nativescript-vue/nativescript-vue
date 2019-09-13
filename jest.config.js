const { readFileSync } = require("fs")
const babelConfig = JSON.parse(readFileSync("./.babelrc", "utf8"))

require("@babel/register")(babelConfig)
require("@babel/polyfill")

const { join } = require("path")
const ROOT = process.cwd()
const TESTS = join(ROOT, "tests")

module.exports = {
  verbose: true,
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  modulePaths: [
    "<rootDir>/platform/nativescript",
    "<rootDir>/node_modules/vue/src",
    "<rootDir>/node_modules/vue/src/platforms"
  ],
  collectCoverageFrom: [
    "platform/**/*.js",
    "!**/node_modules/**"
  ],
  moduleDirectories: [
    "node_modules"
  ],
  moduleNameMapper: {
    "^compiler/(.*)": "<rootDir>/node_modules/vue/src/compiler/$1",
    "^core/(.*)": "<rootDir>/node_modules/vue/src/core/$1"
  },
  modulePathIgnorePatterns: [
    "<rootDir>/samples"
  ],
  collectCoverage: true,
  testURL: "http://localhost",
  testMatch: [
    "**/tests/**/*.spec.(js|jsx|ts)"
  ],
  transform: {
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(vue)/)"
  ],
  setupFiles: [
    join(TESTS, "jest-setup.js")
  ],
}