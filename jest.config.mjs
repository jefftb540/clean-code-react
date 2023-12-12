export default {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/main/**/*",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/main.tsx",
    "!**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.svg$": "svg-jest"
  },
  moduleNameMapper: {
    "^uuid$": "uuid",
    "@/(.*)": "<rootDir>/src/$1",
  },
};
