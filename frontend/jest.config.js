// jest.config.js
module.exports = {
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/mocks/fileMock.js"
    }
  };
  