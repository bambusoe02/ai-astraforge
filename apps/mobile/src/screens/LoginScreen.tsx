import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SignedOut, SignInButton } from '@clerk/clerk-expo';

export function LoginScreen() {
  return (
    <SignedOut>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>🌌 AstraForge</Text>
          <Text style={styles.subtitle}>
            AI-Powered Monorepo Factory
          </Text>
          <Text style={styles.description}>
            Build full-stack apps across platforms with AI agents
          </Text>

          <SignInButton mode="modal">
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Start Building</Text>
            </TouchableOpacity>
          </SignInButton>
        </View>
      </View>
    </SignedOut>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
