import React from 'react';
import {Alert, Button, SafeAreaView, Text, View} from 'react-native';

function App() {
  const handlePress = () => {
    Alert.alert('Button Pressed!');
  };
  return (
    <SafeAreaView>
      <View>
        <Text>ASD</Text>
        <Button title="Press Me" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
}

export default App;
