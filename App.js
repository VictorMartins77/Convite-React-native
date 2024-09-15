import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import * as Font from 'expo-font';

const EventInvitation = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [adults, setAdults] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [children, setChildren] = useState(0);

  const eventDate = new Date('2024-09-31T00:00:00');

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'myFont': require('./assets/fonts/DancingScript-Bold.ttf'),
        'mont': require('./assets/fonts/Montserrat-SemiBold.ttf')
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = eventDate - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const totalPeople = adults + seniors + children;

   const handleConfirmPresence = () => {
    setAdults(0);
    setSeniors(0);
    setChildren(0);
  };

  return (
    <View style={styles.container}>
      {fontLoaded && <Text style={styles.title}>Confirme a sua presença!</Text>}
      <Text style={styles.montText}>Data: 31/12/2024</Text>
      <Image source={require('./assets/img.jpeg')} style={styles.image} />
      <Text style={styles.montText}>
        Casamento começa em: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </Text>
      <Text style={styles.montText}>Selecione a quantidade de pessoas:</Text>
      <View style={styles.counter}>
        <View style={styles.counterItem}>
          <Text style={styles.label}>Adultos:</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={String(adults)} onChangeText={(value) => setAdults(Number(value))} />
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.label}>Idosos:</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={String(seniors)} onChangeText={(value) => setSeniors(Number(value))} />
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.label}>Crianças:</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={String(children)} onChangeText={(value) => setChildren(Number(value))} />
        </View>
      </View>
      <Text style={styles.montText}>Total de Pessoas: {totalPeople}</Text>
      <Pressable style={styles.button} onPress={handleConfirmPresence}>
        <Text style={styles.buttonText}>Confirmar Presença</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#a3c2cc',
  },
  title: {
    fontFamily: 'myFont',
    fontSize: 35,
    color: '#fff0dd',
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 350,
    marginTop: 20,
    marginBottom: 20,
  },
  montText: {
    fontSize: 16,
    fontFamily: 'mont',
    color: '#fff0dd',
    marginBottom: 20,
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  counterItem: {
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
    color:'#fff0dd',
    fontSize:16,
    fontFamily: 'mont',
  },
  input: {
    marginLeft:5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 50,
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    borderRadius: 9,
    backgroundColor: '#fdebd4',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default EventInvitation;