import React, { useEffect, useState } from 'react';
import { View,Text, StyleSheet, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

    function Ingreso({navigation}){

    const[usuario,setUsuario]= useState('');
    const[clave,setClave] = useState('');


    useEffect(()=>{
         setUsuario('chacc');
         setClave('d4rks1d3');
    },[]); // se ejecuta una vez por el []
    
    const autorizar = async () =>{
        var payload = {
             usuario: usuario,
            clave : clave
        }
        var body = Object.keys(payload).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
        }).join('&');
    
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Accept':'application/json',
            },
            body
        };

         fetch('https://cc131888.000webhostapp.com/carteraConnect.php',options)
        .then((response) => response.json())
        .then(data=> {
            console.log('datos:'+JSON.stringify(data,null,4));
                if(data.mensaje == 'ACCESS GRANTED')
                        {
                        navigation.navigate('Navigation');
                        }
                        else
                        {
                            Alert.alert('Datos erroneos');
                        }
        }).catch((error)=> console.error('error trying to authenticate:',error.message));
        
    };

    return(<>
        <View style={{flex:1,paddingTop:'35%'}}>
            <View style={styles.contenedor}>
                <Text style={styles.etiqueta}>Usuario</Text>
                <TextInput style={styles.caja} onChange={e=>{setUsuario(e.nativeEvent.text)}} />
            </View>
             <View style={styles.contenedor}>
                <Text textContentType="password" style={styles.etiqueta}>Clave</Text>
                <TextInput style={styles.caja} onChange={e=>{setClave(e.nativeEvent.text)}} />
            </View>
            <TouchableOpacity onPress={autorizar} style={styles.btnContenedor} >
                <Text style={styles.btnEtiqueta}>Ingresar</Text>    
            </TouchableOpacity> 
        </View>
        
    </>);
}// fin de Ingreso

const styles = StyleSheet.create({
    contenedor:{
        marginVertical:'7%'
    },
    btnContenedor: {
        backgroundColor: '#3185fc',
        marginVertical:5,
        width:'85%',
        alignSelf:'center',
        padding:10,
        borderRadius:3
    },
    btnEtiqueta:{
        color:'#f7f7ff',
        fontWeight:'bold',
        fontSize:22,
        textAlign:'center'
    },
    etiqueta:{
        fontSize:20,
        color:'#3f826d',
        fontWeight: 'bold',
        marginLeft:15
    },
    caja:{
        fontSize:18,
        width: '85%',
        alignSelf: 'center',
        borderBottomColor:'#c03221',
        borderBottomWidth:2,
        color:'#3f826d'
    }
});

export default Ingreso;