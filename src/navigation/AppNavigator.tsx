import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MainNavigator } from './MainNavigator';

interface AppNavigatorProps {
  isLoading?: boolean;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <MainNavigator />;
};

export default AppNavigator;
