
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";

function HomeScreen({ navigation }) {
 const [colorArray, setColorArray] = useState([]);

 function renderItem({ item }) {
   return (
     <TouchableOpacity onPress={()=> navigation.navigate("Details", item)}>
       <BlockRGB red={item.red} green={item.green} blue={item.blue} />
     </TouchableOpacity>
   );
 }

 function resetColors() {
  setColorArray([ ]);
}

 function addColor() {
   setColorArray([
     ...colorArray,
     {
       red: Math.floor(Math.random() * 256),
       green: Math.floor(Math.random() * 256),
       blue: Math.floor(Math.random() * 256),
       id: `${colorArray.length}`,
     },
   ]);
 }

 return (
   <View style={styles.container}>
     <TouchableOpacity
       style={{ height: 40, justifyContent: "center" }}
       onPress={addColor}
     >
       <Text style={{ color: "red" }}>Add colour</Text>
     </TouchableOpacity>
     <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={resetColors}
    >
      <Text style={{ color: "red" }}>Reset colour</Text>
      </TouchableOpacity>
     <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
   </View>
 );
}

function DetailsScreen({route}) {
  const {red,green,blue} =route.params;
  return(
    <View style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`, flex: 1}}>
       <Text style={styles.detailText}>Red: {red}</Text>
       <Text style={styles.detailText}>Green: {green}</Text>
       <Text style={styles.detailText}>Blue: {blue}</Text>

    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Colour List" component={HomeScreen} />
       <Stack.Screen name="Details" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
 list: {
   width: "100%",
 },
 detailText: {
   fontSize: 24,
   marginBottom: 20,
 },
});
