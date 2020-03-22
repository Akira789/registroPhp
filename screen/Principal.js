/*
  Desarrollador: David Carbajal Rios
  Fecha: 04/03/2020                                 Grupo: TI01SM-18
  Descripsción: La pantalla principal muestra las peliculas api. de la página                            reactnative.dev/movies.json 
*/

import React, {Component} from 'react';
import {View,Text, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Button,Item, Label, Input, Icon} from "native-base";


class Principal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading : true,
        }
    }//fin constructor

    async componentDidMount (){

        try{
            const response = 
            await fetch('https://reactnative.dev/movies.json');   //se guarda en la constante para que  no lo cambie
            const responseJson = await response.json();
            this.setState({
                isloading: false,
                dataSource:responseJson.movies,

            },function(){

            });

        }catch(error){
            console.log(error);
        }
    }//fin DidMount

    render(){
        if(this.state.isloading){
            return (
                <View style={{flex:1, paddin: 20}}> 
                    <ActivityIndicator/>
                </View>
            );
        }//end if
        return(
            <View>
              <Card>
                <CardItem header bordered>
                  <Text style = {misEstilos.textCenter}> Peliculas </Text>
                </CardItem>
              </Card>
              <Card>
                <CardItem header bordered>
                <FlatList
                  data = {this.state.dataSource}
                  renderItem= {({item}) => 
                  <Text>
                      {item.title},{item.releaseYear}
                  </Text>
                  }
                  keyExtractor = {({id},index) => id}
                />
                </CardItem>
              </Card>
            </View>
        )
    }//fin render
}//fin clase 

const misEstilos = StyleSheet.create({
  
  textCenter:{
    textAlign: 'center',
    width: '100%',
    fontSize: 23,
  },

});

export default Principal;