import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SignedIn, UserButton } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

export function DashboardScreen() {
  const navigation = useNavigation();

  const menuItems = [
    {
      title: '🤖 AI Agents',
      description: 'Chat with AI agents to build your app',
      screen: 'AgentChat',
      color: '#8b5cf6',
    },
    {
      title: '📊 Project Status',
      description: 'Monitor your builds and deployments',
      screen: 'ProjectStatus',
      color: '#10b981',
    },
    {
      title: '📝 Code Editor',
      description: 'Edit code across platforms',
      screen: 'CodeEditor',
      color: '#f59e0b',
    },
    {
      title: '🚀 Deploy',
      description: 'Deploy to production',
      screen: 'Deploy',
      color: '#ef4444',
    },
  ];

  return (
    <SignedIn>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>AstraForge</Text>
          <UserButton />
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.welcome}>Welcome to your AI factory!</Text>
          <Text style={styles.subtitle}>
            Describe what you want to build and let AI handle the rest.
          </Text>

          <View style={styles.grid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { borderLeftColor: item.color }]}
                onPress={() => navigation.navigate(item.screen as never)}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SignedIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0aec0',
    marginBottom: 30,
    lineHeight: 24,
  },
  grid: {
    gap: 15,
  },
  card: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
});
