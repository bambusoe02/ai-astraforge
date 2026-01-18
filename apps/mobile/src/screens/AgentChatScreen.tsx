import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Bot, User, Send } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  agent?: string;
  timestamp: Date;
}

export function AgentChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const agents = ['architect', 'coder', 'tester', 'deployer', 'monitor'];

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate agent responses
    setTimeout(() => {
      const agentResponses = [
        '🏗️ Designing system architecture...',
        '💻 Generating code across platforms...',
        '🧪 Running comprehensive tests...',
        '🚀 Deploying to production...',
        '📊 Monitoring system health...',
      ];

      agents.forEach((agent, index) => {
        setTimeout(() => {
          const agentMessage: Message = {
            id: `${Date.now()}-${agent}`,
            text: agentResponses[index],
            isUser: false,
            agent,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, agentMessage]);
        }, (index + 1) * 1000);
      });

      setIsLoading(false);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.agentMessage
    ]}>
      {!item.isUser && (
        <View style={styles.agentIcon}>
          <Bot size={16} color="#8b5cf6" />
        </View>
      )}
      <View style={styles.messageContent}>
        {item.agent && (
          <Text style={styles.agentLabel}>
            {item.agent.charAt(0).toUpperCase() + item.agent.slice(1)}
          </Text>
        )}
        <Text style={[
          styles.messageText,
          item.isUser ? styles.userText : styles.agentText
        ]}>
          {item.text}
        </Text>
      </View>
      {item.isUser && (
        <View style={styles.userIcon}>
          <User size={16} color="#8b5cf6" />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Describe what you want to build..."
          placeholderTextColor="#718096"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Send size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  agentMessage: {
    justifyContent: 'flex-start',
  },
  agentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  messageContent: {
    flex: 1,
    maxWidth: '80%',
  },
  agentLabel: {
    fontSize: 12,
    color: '#8b5cf6',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
    backgroundColor: '#8b5cf6',
    padding: 12,
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  agentText: {
    color: '#e2e8f0',
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  loadingContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8b5cf6',
    marginHorizontal: 4,
  },
  dot2: {
    animationDelay: '0.2s',
  },
  dot3: {
    animationDelay: '0.4s',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
    marginRight: 12,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
