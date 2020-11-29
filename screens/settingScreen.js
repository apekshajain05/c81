import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,TextInput } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
            firstName:'',
            lastName:'',
            address:'',
            contactNo:'',
            emailId:'',
            docId:'',
        }
    }
    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
          "first_name": this.state.firstName,
          "last_name" : this.state.lastName,
          "address"   : this.state.address,
          "contact"   : this.state.contactNo,
        })
    
        alert("Profile Updated Successfully")
    
      }
      getUserDetails=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id','==',email).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
          var data = doc.data()
            this.setState({
              emailId   : data.email_id,
              firstName : data.first_name,
              lastName  : data.last_name,
              address   : data.address,
              contactNo : data.contact,
              docId     : doc.id
            })
          });
        })
      }
    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Settings</Text>
                <TextInput style={styles.loginBox} placeholder='First Name'
                onChangeText={(text)=>{
                    this.setState({
                        firstName:text
                    })
                }} 
                value={this.state.firstName}
                maxLength={10} />
                <TextInput style={styles.loginBox} placeholder='Last Name'
                onChangeText={(text)=>{
                    this.setState({
                        lastName:text
                    })
                }} 
                value={this.state.lastName}
                maxLength={10} />
                <TextInput style={styles.loginBox} placeholder='Address'
                onChangeText={(text)=>{
                    this.setState({
                        address:text
                    })
                }} 
                value={this.state.address}
                multiline={true} />
                <TextInput style={styles.loginBox} placeholder='Contact Number'
                onChangeText={(text)=>{
                    this.setState({
                        contactNo:text
                    })
                }} 
                value={this.state.contactNo}
                maxLength={10} 
                keyboardType={'numeric'}/>
                <TouchableOpacity style={styles.registerButton} onPress={()=>{
                    this.updateUserDetails()
                }}>
                    <Text style={styles.registerButtonText}>Update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },

})