import React from "react";
import { View,Text, Button, Touchable, TouchableOpacity } from "react-native";


function Item({item})
{

    return(
        <>
            <View style={{flex:1}}>
                <Text>{item.nombre},{item.apellido} </Text>
                <TouchableOpacity style={{ marginLeft:5 }} >
                    <Text>Go Details</Text>
                </TouchableOpacity> 
            </View>
        </>
        );
}

export default Item;