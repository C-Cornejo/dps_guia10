import React, { useEffect, useState } from 'react';
import { View,Text, Button,ScrollView,StyleSheet,TextInput,TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Detalle({route,navigation})
{   
    const { id } = route.params;
    const [nombre, setNombre] =                useState('');
    const [apellido,setApellido] =             useState('');
    const [postalPersonal,setPostalPersonal] = useState('');
    const [postalTrabajo,setPostalTrabajo] =   useState('');
    const [telefono,setTelefono] =             useState('');
    const [correo,setCorreo] =                 useState('');
    const [nivelEconomico,setNivelEconomico] = useState('');
    const [intereses,setIntereses] =           useState('');


    useEffect(
        ()=>{
    
        cargarDetalle(id);
            
        },[]);


    const cargarDetalle = async function(codigo){

    const opciones = {
        header: {
            'Content-Type':'application/json',
            'Accept': 'application/json;charset=uft-8'
        },
        method: 'GET'
    }

    await fetch('https://cc131888.000webhostapp.com/carteraConnect.php?get=20&id='+codigo,opciones)
    .then(response => response.json())
    .then(data =>{
        console.log('LOGGING: data fetched...');

        setNombre(data.records[0].nombre);
        setApellido(data.records[0].apellido);
        setPostalPersonal(data.records[0].dir_postal_personal);
        setPostalTrabajo(data.records[0].dir_postal_trabajo);
        setTelefono(data.records[0].telefono);
        setCorreo(data.records[0].correo);
        setNivelEconomico(data.records[0].nivel_economico);
        setIntereses(data.records[0].intereses);

    }).catch(error => console.error('error fetching Details:',error.message));

    }// fin de cargarDetalle

    const actualizar = async function(){
        const payload = {
            id: id,
            nombre : nombre,
            apellido:apellido,
            postal_personal:postalPersonal,
            postal_trabajo:postalTrabajo,
            telefono:telefono,
            correo:correo,
            nivel_economico:nivelEconomico,
            intereses:intereses
        };
        
        var body = Object.keys(payload).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
        }).join('&');

        const opciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Accept':'application/json',
            },
            body
        }
        
        if(nombre != '' && apellido != '' && postalPersonal != '' && postalTrabajo != '' && telefono != '' & correo != '' && nivelEconomico != '' && intereses != '')
        {
            fetch('https://cc131888.000webhostapp.com/updateCartera.php',opciones)
            .then(response => response.json())
            .then(data => {
                if(data.mensaje == 'DATA SAVED'){
                    Alert.alert("Datos actualizados");
                }
                else
                {
                    Alert.alert("Error?");
                }
                    
            }).catch(error => console.error('error updating..:',error.message));
        }
        else 
        {
            Alert.alert('Debe completar todos los datos');
        }
    };


    const clickhandler = function()
    {
        Alert.alert(
            'Desea actualizar los datos?',
            '',
            [
              { text: "No quería hacer eso", style: 'cancel', onPress: () => {} },
              {
                text: 'Si',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => { actualizar();},
              },
            ]
          );
    }


    return(<>
        <View style={{flex:1}}>
        <ScrollView>
                <View>
                    <Text style={styles.etiqueta}>Nombre</Text>
                    <TextInput value={nombre} style={styles.caja} onChange={(e) => setNombre(e.nativeEvent.text)} placeholder='Nombre' />
                </View>
                <View>
                    <Text  style={styles.etiqueta}>Apellido</Text>
                <TextInput value={apellido}  style={styles.caja} onChange={(e) => setApellido(e.nativeEvent.text)} placeholder='Apellido' />
                </View>
                <View>
                    <Text  style={styles.etiqueta}>Postal personal</Text>
                    <TextInput value={postalPersonal}  style={styles.caja} onChange={(e) => setPostalPersonal(e.nativeEvent.text)} placeholder='Postal personal' />
                </View>
                <View>
                    <Text  style={styles.etiqueta}>Postal de trabajo</Text>
                <TextInput value={postalTrabajo}  style={styles.caja} onChange={(e) => setPostalTrabajo(e.nativeEvent.text)} placeholder='Postal de trabajo' />
                </View>
                <View>
                    <Text  style={styles.etiqueta}>Telefono</Text>
                <TextInput value={telefono}  style={styles.caja} onChange={(e) => setTelefono(e.nativeEvent.text)} placeholder='Teléfono' />
                </View>
                <View>
                    <Text  style={styles.etiqueta}>Correo</Text>
                <TextInput value={correo} style={styles.caja} onChange={(e) => setCorreo(e.nativeEvent.text)} placeholder='Correo' />
                </View>
                <View>
                    <Text  style={styles.etiqueta}>Nivel Económico</Text>
                <TextInput value={nivelEconomico}  style={styles.caja} onChange={(e) => setNivelEconomico(e.nativeEvent.text)} placeholder='Nivel económico' />
                </View>
                <View>
                    <Text  style={styles.etiqueta}>Intereses</Text>
                <TextInput value={intereses}  style={styles.caja} onChange={(e) => setIntereses(e.nativeEvent.text)} placeholder='Intereses' />
                </View>
                </ScrollView>
            {/* {<Button title='go back'  onPress={()=> navigation.goBack()}/>} */}
            <TouchableOpacity style={styles.btnContenedor} onPress={()=>{clickhandler();}}>
                <Icon name='account-edit' color={'#ffffff'} size={45} />
            </TouchableOpacity>
        </View>
        
    </>)
}


const styles = StyleSheet.create({
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
    },
    btnContenedor: {
        backgroundColor: '#3185fc',
        marginVertical:5,
        //width:'85%',
        alignSelf:'flex-end',
        padding: 7,
        borderRadius:50,
        bottom: 15,
        right: 15,
        position: 'absolute'
    }
});


export default Detalle;