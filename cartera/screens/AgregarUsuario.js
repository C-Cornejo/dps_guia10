import React,{useState,useEffect} from 'react';
import { 
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Alert,
    TouchableOpacity,
    TextInput
 } from 'react-native';



import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function AgregarUsuario({navigation})
{
    const [nombre, setNombre] =                useState('');
    const [apellido,setApellido] =             useState('');
    const [postalPersonal,setPostalPersonal] = useState('');
    const [postalTrabajo,setPostalTrabajo] =   useState('');
    const [telefono,setTelefono] =             useState('');
    const [correo,setCorreo] =                 useState('');
    const [nivelEconomico,setNivelEconomico] = useState('');
    const [intereses,setIntereses] =           useState('');

    const agregar = ()=>{
        // do save 
        const payload = {
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
            fetch('https://cc131888.000webhostapp.com/saveCartera.php',opciones)
            .then(response => response.json())
            .then(data => {
                if(data.mensaje == 'DATA SAVED'){
                    Alert.alert("Cliente agregado");
                }
                else
                {
                    Alert.alert("Error?");
                }
                    
            }).catch(error => console.error('error saving..:',error.message));
        }
        else 
        {
            Alert.alert('Debe completar todos los datos');
        }
}// fin de agregar


    return(<>
        <View style={{flex:1}}>
            <ScrollView>
                <View>
                    <Text style={styles.etiqueta}>Nombre</Text>
                    <TextInput style={styles.caja} onChange={(e) => setNombre(e.nativeEvent.text)} placeholder='Nombre' />
                </View>
                <View>
                    <Text style={styles.etiqueta}>Apellido</Text>
                <TextInput style={styles.caja} onChange={(e) => setApellido(e.nativeEvent.text)} placeholder='Apellido' />
                </View>
                <View>
                    <Text style={styles.etiqueta}>Postal personal</Text>
                    <TextInput style={styles.caja} onChange={(e) => setPostalPersonal(e.nativeEvent.text)} placeholder='Postal personal' />
                </View>
                <View>
                    <Text style={styles.etiqueta}>Postal de trabajo</Text>
                <TextInput style={styles.caja} onChange={(e) => setPostalTrabajo(e.nativeEvent.text)} placeholder='Postal de trabajo' />
                </View>
                <View>
                    <Text style={styles.etiqueta}>Telefono</Text>
                <TextInput style={styles.caja} onChange={(e) => setTelefono(e.nativeEvent.text)} placeholder='Teléfono' />
                </View>
                <View>
                    <Text style={styles.etiqueta}>Correo</Text>
                <TextInput style={styles.caja} onChange={(e) => setCorreo(e.nativeEvent.text)} placeholder='Correo' />
                </View>
                <View>
                    <Text style={styles.etiqueta}>Nivel Económico</Text>
                <TextInput style={styles.caja} onChange={(e) => setNivelEconomico(e.nativeEvent.text)} placeholder='Nivel económico' />
                </View>
                <View>
                    <Text style={styles.etiqueta}>Intereses</Text>
                <TextInput style={styles.caja} onChange={(e) => setIntereses(e.nativeEvent.text)} placeholder='Intereses' />
                </View>
                </ScrollView>
            <TouchableOpacity style={styles.btnContenedor} onPress={agregar}>
                {/* <Text style={styles.btnEtiqueta}>Agregar</Text> */}
                <Icon name='plus-thick' color={'#ffffff'} size={45} />
            </TouchableOpacity>
        </View>
        
    </>);
}



const styles = StyleSheet.create({
    etiqueta:{
        fontSize:20,
        color:'#3f826d',
        fontWeight: 'bold',
        marginLeft:15
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
    },
    btnEtiqueta:{
        color:'#f7f7ff',
        fontWeight:'bold',
        fontSize:22,
        textAlign:'center'
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

export default AgregarUsuario;