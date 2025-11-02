/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getStatus, updateStatus } from "../services/status";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Home = () => {
    const devices = ["device1", "device2"];
    const [states, setStates] = useState<{ [key: string]: boolean }>({});

    const fetchStatus = async() =>{
        const newStates = await getStatus(devices);
        setStates(newStates);
    }

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleToggle = async(device: string) => {
        const novoEstado = states[device] ? 'desligar' : 'ligar';
        setStates(prev => ({ ...prev, [device]: !prev[device] }));
        await updateStatus(device, novoEstado);
    };

    return (
        <>
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/img/pisca-pisca.png")} />

                {devices.map((device, index) => (
                    <View key={index} style={styles.containerButton}>
                        <TouchableOpacity
                            style={[styles.toggle, states[device] ? styles.active : styles.inactive]}
                            onPress={() => handleToggle(device)}
                        >
                            <View
                            style={[
                                styles.circle,
                                states[device] ? styles.circleActive : styles.circleInactive,
                            ]}
                            />
                            <Text style={styles.text}>
                                {device === 'device1' ? 'Árvore' : 'Corredor'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
                </View>
        </>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    position: 'relative',
    minHeight: 150
  },
  toggle: {
    width: 90,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 2,
    marginBottom: 10,
  },
  active: {
    backgroundColor: '#4CAF50',
  },
  inactive: {
    backgroundColor: '#ccc',
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  circleActive: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  circleInactive: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  text: {
    top: 55,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
  },
  image: {
    position: "absolute",
    top: -5,
    // left: 0,
    // right: 0,
    width: "100%",
    height: 400
  }
});