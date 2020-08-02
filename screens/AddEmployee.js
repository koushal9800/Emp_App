
import React from 'react';
import { StyleSheet, Text, View, Keyboard, AsyncStorage, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';

import { Form, Item, Input, Label, Button } from 'native-base';

export default class AddEmployee extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            phone: "",
            email: "",
            address: "",
            salary: "",
            designation:"",

        }
    }


    static navigationOptions = {
        title: "Add Employee"
      };


     
      saveEmployee = async () => {
          if (
                this.state.fname !== "" &&
                this.state.lname !== "" &&
                this.state.phone !== "" &&
                this.state.email !== "" &&
                this.state.address !== "" &&
                this.state.salary !== "" &&
                this.state.designation !== ""
          )
           {
               var employee = {
                   fname : this.state.fname,
                   lname : this.state.lname,
                   phone : this.state.phone,
                   email : this.state.email,
                   address : this.state.address,
                   salary : this.state.salary,
                   designation : this.state.designation,
               }
               await AsyncStorage.setItem(Date.now().toString(),
               JSON.stringify(employee)
               )
               .then( ()=>{
                   this.props.navigation.goBack()
               } )
               .catch(error  => {
                   console.log("error")
               })

          } else {
              Alert.alert("All fields are required");
          }
      }


  render(){
  return (
      <TouchableWithoutFeedback 
      onPress={() => {
          Keyboard.dismiss
      }}
      >
    <ScrollView style={styles.container}>
      <Form>
          <Item style={styles.inputItem}>
              <Label>First Name</Label>
                  <Input
                  autoCorrect={false}
                  autoCapitalize= "none"
                  keyboardType="default"
                  onChangeText={ fname => this.setState({fname}) }
                  />
              
          </Item>


          <Item style={styles.inputItem}>
              <Label>Last Name</Label>
                  <Input
                  autoCorrect={false}
                  autoCapitalize= "none"
                  keyboardType="default"
                  onChangeText={ lname => this.setState({lname}) }
                  />
              
          </Item>


          <Item style={styles.inputItem}>
              <Label>Phone Number </Label>
                  <Input
                  autoCorrect={false}
                  autoCapitalize= "none"
                  keyboardType="number-pad"
                  onChangeText={ phone => this.setState({phone}) }
                  />
              
          </Item>


          <Item style={styles.inputItem}>
              <Label>Email</Label>
                  <Input
                  autoCorrect={false}
                  autoCapitalize= "none"
                  keyboardType="default"
                  onChangeText={ email => this.setState({email}) }
                  />
              
          </Item>


          <Item style={styles.inputItem}>
              <Label>Address</Label>
                  <Input
                  autoCorrect={false}
                  autoCapitalize= "none"
                  keyboardType="default"
                  onChangeText={ address => this.setState({address}) }
                  />
              
          </Item>

          <Item style={styles.inputItem}>
              <Label>Salary </Label>
                  <Input
                  autoCorrect={false}
                  autoCapitalize= "none"
                  keyboardType="number-pad"
                  onChangeText={ salary => this.setState({salary}) }
                  />
              
          </Item>



          <Item style={styles.inputItem}>
              <Label>Position</Label>
                  <Input
                  autoCorrect={false}
                  autoCapitalize= "none"
                  keyboardType="default"
                  onChangeText={ designation => this.setState({designation}) }
                  />
              
          </Item>
      </Form>

      <Button 
      style={styles.button}
      full
      rounded
      onPress={ ()=> {
          this.saveEmployee()
      } }
      >
          <Text style={styles.buttonText}>Save</Text>
      </Button>
      
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      margin: 10,
      height: 500
    },
    inputItem: {
      margin: 10
    },
    button: {
      backgroundColor: "#2C3335",
      marginTop: 40,
      marginLeft:70,
      marginRight:70
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize:20
    },
    empty: {
      height: 500,
      backgroundColor: "#FFF"
    }
  });
  
