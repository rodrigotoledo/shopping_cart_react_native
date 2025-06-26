const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(defaultConfig, {
  input: "./global.css",
  projectRoot: __dirname,
});

module.exports = mergeConfig(defaultConfig, nativeWindConfig);
