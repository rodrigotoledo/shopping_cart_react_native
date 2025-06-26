module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    'nativewind/babel',
  ],
  plugins: [
    'react-native-paper/babel',
    ['module:react-native-dotenv'],
    'react-native-reanimated/plugin'
  ],
};
