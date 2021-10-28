import React, { useState ,useEffect} from "react";
import { View, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  RootConfirmado  from  '../screens/RootConfirmado';
import RootPosible from '../screens/RootPosible';
import AgregarUsuario from "../screens/AgregarUsuario";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

 
const tabs = createBottomTabNavigator();
    

function Navigation({navigation})
{
    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            e.preventDefault();
            // Prompt the user before leaving the screen
            Alert.alert(
              'Cerrar sesión?',
              '',
              [
                { text: "No quería hacer eso", style: 'cancel', onPress: () => {} },
                {
                  text: 'Si, sacame de aquí',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ]
            );
          }),
        [navigation]
      );

    return(
            <View style={{flex:1}}>
                <tabs.Navigator initialRouteName="confirmados">
                    <tabs.Screen 
                        name="agregarUsuario"  
                        component={ AgregarUsuario } 
                        options={{ 
                          title:"Agregar Usuario",
                          tabBarIcon:
                        ({color,size})=>( <Icon name='account-plus' color={color} size={45} /> )}} />
                    <tabs.Screen 
                        name="confirmados"     
                        component={ RootConfirmado }
                        options={{ 
                          title:"Confirmados",
                          tabBarIcon: ({color,size})=>( <Icon name='account-multiple-check'  color={color} size={45} />)}}/>
                    <tabs.Screen 
                        name="posibles"
                        component={ RootPosible    }
                        options={{ title:"Posibles", 
                        tabBarIcon: ({color,size})=>(<Icon name='account-question'  color={color} size={45} />)}}/>
                </tabs.Navigator>
            </View>
    );
}

export default Navigation;