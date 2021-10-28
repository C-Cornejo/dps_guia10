import React, { useEffect, useState } from "react";
import { View,Text, Button,StyleSheet,TouchableOpacity,Alert } from "react-native";
import { createStackNavigator} from '@react-navigation/stack';
import Detalle from "./Detalle";
import { FlatList } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createStackNavigator();


function RootConfirmado({navigation})
{
    
    return(
        <>
            <View style={{flex:1}}>
            <Stack.Navigator
                initialRouteName="confirmado"
                screenOptions={{
                    headerMode: 'screen',
                    headerShown: false,
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'tomato' },
                    
                }}>
            <Stack.Screen  name="confirmado"
                            component={Confirmado}
                            options={{
                            title: 'Clientes confirmados',
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


function Confirmado({navigation})
{

    const [uConfirmados,setUConfirmados]= useState([]);
  

    useEffect(
        ()=>{
    
        cargarRegistros();
            
        },[]);
        
    
    
    const cargarRegistros = async () =>{
    
        // realizar fetch con id, nombre,apellido
        const url = 'https://cc131888.000webhostapp.com/carteraConnect.php?get=1';
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
            setUConfirmados(data.records);
       }).catch(error=>console.error('Error fetching confirmados',error.message));

        }//fin de cargar 
    
    return(<>
            <FlatList
        data={uConfirmados}
        renderItem={({item})=>{
                return(
                <>
                <View style={styles.contenedor}>
                    <View style={styles.contenedorInfo}>  
                        <Text style={styles.etiqueta}>  {item.nombre} {item.apellido} </Text>
                        {/* <Button title="detalles" onPress={()=> navigation.navigate("detalle",item) } /> */}
                    </View>
                    <TouchableOpacity style={styles.contenedorBtn} onPress={()=> navigation.navigate("detalle",{id:item.id})} >
                            {/* <Icon name='card-account-details-outline' color={'#3f826d'} size={45} /> */}
                            <Icon name='card-account-details-outline' color={'#3185fc'} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contenedorBtn} onPress={()=> Alert.alert('aceptado')} >
                            {/* <Icon name='card-account-details-outline' color={'#3f826d'} size={45} /> */}
                            <Icon name='account-cancel' color={'#FF605C'} size={45} />
                    </TouchableOpacity>

                </View>
                </>);
        }}
        keyExtractor={item => item.id}
      />
            
    </>);
}

 const styles = StyleSheet.create({
    contenedor:
    {
        flexDirection: 'row'
    } 
    ,etiqueta:
     {  
         color: '#3f826d',
         fontSize:22,
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





export default RootConfirmado;