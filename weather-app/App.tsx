import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [weatherList, setWeatherList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect (() => {
    loadList()
  }, []);
  const loadList = async () => {
    try {
      let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=Kajang, Malaysia&appid=5cc8d9be72e1fb006526bab4e19104d4');
      let json = await response.json();
      setWeatherList(json.list);
    } catch (error) { console.log(error); }
  }
  const [loaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.otf')
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 10, marginBottom: 10, fontFamily: 'PoppinsRegular' }}>Weather Forecast</Text>
          {(isLoading) ? <Text>Loading...</Text> : ((weatherList) ? weatherList : []).map((data, index) => {
            let mIcon = <Image source={require('./assets/cloudy.png')} style={(index === 0) ? styles.wIcon : styles.wIconMinor} />;
            if (data.weather[0].main === 'Rain') {
              mIcon = <Image source={require('./assets/rain.png')} style={(index === 0) ? styles.wIcon : styles.wIconMinor} />;
            }
            if (data.weather[0].main === 'Clouds') {
              mIcon = <Image source={require('./assets/cloud.png')} style={(index === 0) ? styles.wIcon : styles.wIconMinor} />;
            }
            if (index === 0) {
              return (<View style={styles.boxCard} key={index}>
                <View style={styles.weatherIcon}>
                  {mIcon}
                </View>
                <View style={{ paddingTop: 14, paddingBottom: 10 }}>
                  <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 20 }}>{data.main.temp} &deg; C</Text>
                  <Text style={{ fontFamily: 'PoppinsRegular', fontWeight: 'bold' }}>{data.weather[0].main} - {data.weather[0].description}</Text>
                  <Text style={{ fontFamily: 'PoppinsRegular', fontWeight: 'bold' }}>{data.dt_txt}</Text>
                </View>
              </View>)
            } else {
              return (<View style={styles.boxCardMinor} key={index}>
                <View style={styles.weatherIcon}>
                  {mIcon}
                </View>
                <View style={{ paddingTop: 14, paddingBottom: 10 }}>
                  <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 16 }}>{data.main.temp} &deg; C</Text>
                  <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12 }}>{data.weather[0].main} - {data.weather[0].description}</Text>
                  <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12 }}>{data.dt_txt}</Text>
                </View>
              </View>)
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  boxCard: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    width: '90%',
    marginBottom: 10,
    borderRadius: 5
  },
  weatherIcon: {
    width: 70,
    flexDirection: 'row',
    alignContent: 'center',
    padding: 15
  },
  scrollContainer: {
    width: '100%'
  },
  wIcon: {
    width: 35,
    height: 35
  },
  wIconMinor: {
    width: 25,
    height: 25
  },
  boxCardMinor: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5
  }
});
