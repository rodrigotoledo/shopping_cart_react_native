import 'react-native-gesture-handler';
import "./global.css"
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { ShoppingCartProvider } from './src/contexts/ShoppingCartContext';
import { AppDarkTheme, AppLightTheme } from './src/constants/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
interface PaperProviderWrapperProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

export const PaperProviderWrapper: React.FC<PaperProviderWrapperProps> = ({
  children,
  darkMode = false
}) => {
  const theme = darkMode ? AppDarkTheme : AppLightTheme;

  return (
    <PaperProvider theme={theme}>
      {children}
    </PaperProvider>
  );
};

export default function App() {
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{flex:1}}>
        <SafeAreaProvider>
          <PaperProviderWrapper>
            <QueryClientProvider client={queryClient}>
              <ShoppingCartProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </ShoppingCartProvider>
            </QueryClientProvider>
          </PaperProviderWrapper>
        </SafeAreaProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
