import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FeatureItem = ({ item, onUpvote }) => {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureText}>{item.text}</Text>
      <View style={styles.voteBox}>
        <TouchableOpacity
          style={styles.upvoteButton}
          onPress={() => onUpvote(item.id)}
        >
          <Text style={styles.upvoteText}>▲</Text>
        </TouchableOpacity>
        <Text style={styles.voteCount}>{item.votes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Vertically centers the content in the row
    backgroundColor: '#2b2b2b',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  featureText: {
    fontSize: 18,
    color: '#e0e0e0',
    fontWeight: '600',
    flex: 1,
    marginRight: 20,
  },
  voteBox: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    // Fixed size to ensure consistency
    height: 70,
    width: 60,
    justifyContent: 'center',
  },
  upvoteButton: {
    padding: 0,
    borderRadius: 8,
  },
  upvoteText: {
    fontSize: 24,
    color: '#00aaff',
  },
  voteCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aaff',
    marginTop: 4,
  },
});

export default FeatureItem;