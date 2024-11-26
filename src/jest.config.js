module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest"],
  },
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  testTimeout: 10000,
};
