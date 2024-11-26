module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // 최신 JavaScript 변환
    "@babel/preset-react", // React 지원
    "@babel/preset-typescript", // TypeScript 지원 (필요한 경우)
  ],
};
