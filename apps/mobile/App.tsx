import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';

import { tokenCache } from './src/services/auth';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { AgentChatScreen } from './src/screens/AgentChatScreen';
import { ProjectStatusScreen } from './src/screens/ProjectStatusScreen';

const Stack = createNativeStackNavigator();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AgentChat"
            component={AgentChatScreen}
            options={{ title: 'AI Agents' }}
          />
          <Stack.Screen
            name="ProjectStatus"
            component={ProjectStatusScreen}
            options={{ title: 'Project Status' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}
