import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface Project {
  name: string;
  platform: string;
  status: 'success' | 'building' | 'failed';
  lastBuild: string;
  tests: number;
}

const projects: Project[] = [
  {
    name: 'Web Dashboard',
    platform: 'Next.js',
    status: 'success',
    lastBuild: '2 minutes ago',
    tests: 95,
  },
  {
    name: 'API Backend',
    platform: 'FastAPI',
    status: 'building',
    lastBuild: 'Building...',
    tests: 92,
  },
  {
    name: 'Mobile App',
    platform: 'React Native',
    status: 'success',
    lastBuild: '1 minute ago',
    tests: 96,
  },
  {
    name: 'Chrome Extension',
    platform: 'Chrome',
    status: 'success',
    lastBuild: '30 seconds ago',
    tests: 94,
  },
];

export function ProjectStatusScreen() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#10b981';
      case 'building': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Project Status</Text>
        <Text style={styles.subtitle}>Monitor your builds and deployments</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Successful</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Building</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Failed</Text>
        </View>
      </View>

      <View style={styles.projects}>
        {projects.map((project, index) => (
          <View key={index} style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectName}>{project.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                <Text style={styles.statusText}>{project.status}</Text>
              </View>
            </View>
            <Text style={styles.projectPlatform}>{project.platform}</Text>
            <View style={styles.projectStats}>
              <Text style={styles.projectStat}>Tests: {project.tests}%</Text>
              <Text style={styles.projectTime}>{project.lastBuild}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0aec0',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  projects: {
    padding: 20,
  },
  projectCard: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  projectPlatform: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectStat: {
    fontSize: 14,
    color: '#10b981',
  },
  projectTime: {
    fontSize: 14,
    color: '#718096',
  },
});
