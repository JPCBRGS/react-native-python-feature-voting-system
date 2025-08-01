import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FeatureInput = ({ onAddFeature }) => {
  const [newFeatureText, setNewFeatureText] = useState('');

  const handleAdd = () => {
    onAddFeature(newFeatureText);
    setNewFeatureText('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new feature idea..."
        placeholderTextColor="#999"
        value={newFeatureText}
        onChangeText={setNewFeatureText}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24, // Added horizontal padding
  },
  input: {
    flex: 1, // Let the input take up the remaining space
    borderWidth: 1,
    borderColor: '#444444',
    backgroundColor: '#333333',
    color: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    fontSize: 16,
    height: 50, // Fixed height for consistency
  },
  addButton: {
    backgroundColor: '#00aaff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#00aaff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    height: 50, // Match the input height
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FeatureInput;