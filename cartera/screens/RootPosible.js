import React,{ useEffect, useState } from "react";
import { View,Text,Button,StyleSheet,FlatList,TouchableOpacity, Alert  } from "react-native";
import { createStackNavigator} from '@react-navigation/stack';
import Detalle from "./Detalle";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createStackNavigator();

function RootPosible({navigation})
{   
    return(
        <>
            <View style={{flex:1}}>
            <Stack.Navigator
                initialRouteName="posible"
                screenOptions={{
                    headerMode: 'screen',
                    headerShown: false,
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'tomato' },
                }}>
            <Stack.Screen name="posible"
                            component={Posible}
                            options={{
                            title: 'Clientes posibles',
                        }}/>        
            <Stack.Screen name="detalle"
                            component={Detalle}
                            options={{
                            title: 'Detalle de cliente',
                        }}/>
    </Stack.Navigator>
            </View>
        </>
    );
}


function Posible({navigation})
{
    const [uPosibles,setUPosibles]= useState([]);
  

    useEffect(
        ()=>{
    
        cargarRegistros();
            
        },[]);
       
        const cargarRegistros = async () =>{
    
            // realizar fetch con id, nombre,apellido
            const url = 'https://cc131888.000webhostapp.com/carteraConnect.php?get=10';
            const opciones = {
                method: 'GET',
                header: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                        }
                }
           
            await fetch(url,opciones)
           .then(response => response.json())
           .then(data=>{
               console.log('LOGGING: data fetched...');
                setUPosibles(data.records);
           }).catch(error=>console.error('Error fetching posibles:',error.message));
    
            }//fin de cargar
    
    return(
        <>
            <FlatList
                data={uPosibles}
                renderItem={({item})=>{
                return(
                <>
                <View style={styles.contenedor}>
                    <View style={styles.contenedorInfo}>  
                        <Text style={styles.etiqueta}>  {item.nombre} {item.apellido} </Text>
                        {/* <Button title="detalles" onPress={()=> navigation.navigate("detalle",item) } /> */}
                    
                    </View>
                    <TouchableOpacity style={styles.contenedorBtn} onPress={()=> navigation.navigate("detalle",{id:item.id})} >
                            <Icon name='card-account-details-outline' color={'#3185fc'} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contenedorBtn} onPress={()=> Alert.alert('Aprobar')}>
                        <Icon  name='check-decagram' color={'#00CA4E'} size={45} />
                    </TouchableOpacity>     
                </View>
                </>);
        }}
        keyExtractor={item => item.id}
      />
    </>
    );
}


const styles = StyleSheet.create({
    contenedor:
    {
        flexDirection: 'row'
    } 
    ,etiqueta:
     {  
         color:    '#3f826d',
         fontSize:   22,
         fontWeight: 'bold'
     },
     contenedorInfo:
     {
        alignSelf:'flex-start',
        width: '70%',
     },

     contenedorBtn:
     {
         alignSelf:'flex-end',
        width: '15%',
     }
 });

export default RootPosible;