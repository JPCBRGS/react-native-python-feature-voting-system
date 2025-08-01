import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  StatusBar
} from 'react-native';
import FeatureItem from '../components/FeatureItem';
import FeatureInput from '../components/FeatureInput';

const API_BASE_URL = 'http://192.168.0.3:8080';

const Page = () => {
  const [features, setFeatures] = useState([]);
  
  const fetchFeatures = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/features`);
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error("Failed to fetch features:", error);
      Alert.alert('Error', 'Could not fetch features from the backend.');
    }
  };

  const addFeature = async (text) => {
    if (!text.trim()) {
      Alert.alert('Validation Error', 'Please enter a feature idea.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/features`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.status === 201) {
        fetchFeatures();
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to add feature: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to add feature:", error);
      Alert.alert('Error', 'Could not connect to the backend.');
    }
  };

  const upvoteFeature = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/features/${id}/upvote`, {
        method: 'POST',
      });

      if (response.status === 200) {
        fetchFeatures();
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to upvote: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to upvote feature:", error);
      Alert.alert('Error', 'Could not connect to the backend.');
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Feature Voting</Text>
      <FeatureInput onAddFeature={addFeature} />
      <FlatList
        data={features}
        renderItem={({ item }) => <FeatureItem item={item} onUpvote={upvoteFeature} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  list: {
    paddingVertical: 12,
  },
});

export default Page;