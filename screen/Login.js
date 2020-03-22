/*
  Desarrollador: David Carbajal Rios
  Fecha: 04/03/2020                                 Grupo: TI01SM-18
  Descripsción: En esta pantalla nos muestra el interfaz de logueo de usuario donde el boton ingresar    nos enviará a otra pantalla ya sea "Principal o la de Usuario" dependiendo de cual de las dos          pantallas quieres ingresar, la de usuario muestra el nombre del usuario y la contraseña y la           pantalla principal muestra las peliculas api.
  El acitvityindicator esta ingresador al apretar el boton de ingresar.
  El boton de Registrarse nos manda a la pantalla de registro de sessión.
*/

import React, { Component } from 'react';
import {Container, Content, Card, CardItem, Text, Body, Button, Input, Item, Icon, View} from 'native-base';
import {StyleSheet, ActivityIndicator, Switch, Alert} from 'react-native';
import api from '../data/api';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username:'', 
            pass:''}
    }

    login = async() => {
        let validarLog = await api.validarLog(this.state.username, this.state.pass)

        if(validarLog.status == 1){
            this.props.navigation.navigate('Principal');
        }
        else{
            Alert.alert('Usuario o clave invalidos');
        }
    }


    state={
        showIndicator:false,
    }
    onButtonPress=()=>{
        this.setState({
            showIndicator:true
        }),
    this.props.navigation.navigate('Usuario',{contrasena:this.state.contrasena, usuario:this.state.usuario});
    }

    state = {switchValue:false}
    toggleSwitch = (value) => {
      this.setState({switchValue: value})
   }

   

    render(){
        const navegar = this.props.navigation;
        if(this.state.showIndicator){
            return(
                <View style={misEstilos.content}>
                    <ActivityIndicator size="large" color="FFFFFF"></ActivityIndicator>
                </View>
            );
        }else{
        return(
            <>


        <Container>
            <Content padder contentContainerStyle = {misEstilos.content}>
                <Card>
                    <CardItem header bordered>
                    <Text style = {misEstilos.textCenter}>Inicio de Sesion</Text>
                    </CardItem>
                <CardItem bordered>
                    <Body style = {misEstilos.body}>

                    <Item inlineLabel>
                        <Icon type = 'FontAwesome' name = 'user'></Icon>
                        <Input type="text"
                            placeholder = "Nombre de Usuario"
                            onChangeText={(username)=>this.setState({username})}
                        />
                    </Item>

                    <Item inlineLabel last>
                        <Icon type = 'FontAwesome' name = 'lock'></Icon>
                        <Input type="password"
                            placeholder = "Contrasena"
                            onChangeText={(pass)=>this.setState({pass})}
                            secureTextEntry={true}
                        />
                    </Item>


                    <Switch
                          style={{marginTop:30}}
                          onValueChange = {this.toggleSwitch}
                          value = {this.state.switchValue}/>
                           <Text>{this.state.switchValue ? 'Switch is ON' : 'Switch is OFF'}</Text>



                    </Body>
                </CardItem>

                <CardItem footer bordered>
                    <Button primary style = {misEstilos.boton} onPress ={() => navegar.navigate('Registro',{
                        pass: this.state.pass,
                        username: this.state.username})}>
                    <Text>Registrar</Text>
                    </Button>


                <Button primary style = 
                { misEstilos.boton} onPress={() => {this.login() }} >
                    <Text> Entrar </Text>
                    </Button>
                </CardItem>


                <CardItem>
                <Button primary style = {misEstilos.boton} 
                    onPress ={() =>
                        navegar.navigate('Principal')}>
                    <Text>Peliculas</Text>
                </Button>

                
                </CardItem>

                </Card>
            </Content>
        </Container>
        </>
        );
    }
}
}


const misEstilos = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    
    textCenter:{
        textAlign: 'center',
        width: '100%',
    },

    boton: {
        marginLeft: '8%',
    },
        
    body: {
        paddingVertical: 30,
    }        
        
});

export default Login;