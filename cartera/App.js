import React from 'react';
import {Text,View} from 'react-native';
import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Ingreso from './screens/Ingreso';
import Navigation from './componentes/Navigation';
function Cartera()
{
  return (<>  
    <View style={{flex:1}}>
      <NavigationContainer > 
            <Stack.Navigator
                initialRouteName="Ingreso"
                screenOptions={{
                    headerMode: 'screen',
                    headerShown: false,
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: 'tomato' },
                }}>
            <Stack.Screen name="Ingreso"
                            component={Ingreso}
                            options={{
                            title: 'Ingreso',
                        }}/>
            <Stack.Screen name="Navigation"
                          component={Navigation}
                          options={{
                              headerShown:false
                            }}/>        
    </Stack.Navigator>
    </NavigationContainer>
            </View>
  </>);
}
const Stack = createStackNavigator();

export default Cartera;