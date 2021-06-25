import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro com RealmDB</Text>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => navigation.navigate('Form')}>
        <Text style={styles.touchableText}>Navegar para Form</Text>
      </TouchableOpacity>
    </View>
  );
}
