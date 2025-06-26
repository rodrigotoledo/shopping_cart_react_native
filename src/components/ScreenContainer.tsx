import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, className = '', ...props }) => {
  return (
    <SafeAreaView className={`flex-1 bg-gray-700 ${className}`} {...props}>
      <View className="flex-1 container mx-auto px-4 pt-4">
        {children}
      </View>
    </SafeAreaView>
  );
};