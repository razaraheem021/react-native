import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import darkTheme from './Theme/darkTheme';
import lightTheme from './Theme/lightTheme';

function AppPro(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = getTheme();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  function getTheme() {
    return isDarkMode ? darkTheme : lightTheme;
  }
  return (
    <SafeAreaView style={[styles.container, theme.container]}>
      <Text style={[styles.text, theme.text]}>App works!</Text>
      {/* other components */}

      <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
        <Text style={(styles.toggleButtonText, theme.text)}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#ccc',
    padding: 10,
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // other common styles...
});

export default AppPro;
