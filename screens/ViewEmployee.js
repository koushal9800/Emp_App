
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Platform, Alert, AsyncStorage } from 'react-native';

import { Card, CardItem} from 'native-base';
import { Entypo } from '@expo/vector-icons';

export default class ViewEmployee extends React.Component {

constructor(props){
  super(props);
  this.state = {
    fname : "DummyText",
    lname : "DummyText",
    phone : "DummyText",
    email : "DummyText",
    address : "DummyText",
    salary: "DummyText",
    designation:"DummyText",
    key : "DummyText"
  }
}

  static navigationOptions = {
    title: "View Employee"
  };


  componentDidMount(){
    const { navigation } = this.props;
    navigation.addListener("willFocus", ()=>{
      var key = this.props.navigation.getParam("key", "");

      //call a method to use key
      this.getEmployee(key)
    });
  }


  getEmployee = async key => {
    await AsyncStorage.getItem(key)
    .then(employeejsonString =>{
      var employee = JSON.parse(employeejsonString); 
      employee["key"] = key;
      this.setState(employee);
    })
    .catch(error =>{
      console.log(error);
    })
  };

  callAction = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telpromt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  smsAction = phone =>{
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`
    Linking.canOpenURL(phoneNumber)
    .then( supported =>{
      if( !supported ){
        Alert.alert("Phone Number is not available")
      }else{
        return  Linking.openURL(phoneNumber)
      }
    } )
    .catch(error=>{
      console.log(error);
    });
  };

  editEmployee = (key) =>{
    this.props.navigation.navigate("Edit", { key:key });
  };

  deleteEmployee = key => {
    Alert.alert("Delete Employee ?", `${this.state.fname} ${this.state.lname}`, [
      {
        text: "Cancel",
        onPress: () => console.log("cancel tapped")
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem(key)
            .then(() => {
              this.props.navigation.goBack();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    ]);
  };

  render(){
  return (
    <ScrollView style={styles.container}>
      <View style={styles.employeeIconContainer}>
  <Text style={styles.employeeIcon}>{this.state.fname[0].toUpperCase()}</Text>
  <View style={styles.nameContainer}>
  <Text style={styles.name}>{this.state.fname} {this.state.lname} </Text>
      </View>
      </View>

      


      <View style={styles.infoContainer}>
        <Card>
          <CardItem bordered>

            <Text style={styles.infoText}>Phone</Text>

          </CardItem>
          <CardItem bordered>

  <Text>{this.state.phone}</Text>

          </CardItem>
        </Card>

        <Card>
          <CardItem bordered>

            <Text style={styles.infoText}>Email</Text>

          </CardItem>
          <CardItem bordered>

  <Text>{this.state.email}</Text>

          </CardItem>
        </Card>


        <Card>
          <CardItem bordered>

            <Text style={styles.infoText}>Address</Text>

          </CardItem>
          <CardItem bordered>

  <Text>{this.state.address}</Text>

          </CardItem>
        </Card>

        <Card>
          <CardItem bordered>

            <Text style={styles.infoText}>Salary</Text>

          </CardItem>
          <CardItem bordered>

  <Text>{this.state.salary}</Text>

          </CardItem>
        </Card>


        <Card>
          <CardItem bordered>

            <Text style={styles.infoText}>Position</Text>

          </CardItem>
          <CardItem bordered>

  <Text>{this.state.designation}</Text>

          </CardItem>
        </Card>
      </View>
      


      <Card style={styles.actionContainer}>
        <CardItem style={styles.actionButton} bordered>

          <TouchableOpacity onPress={ ()=>{
            this.smsAction(this.state.phone)
          } }>
            <Entypo 
            name="message"
            size={50}
            color="#0A79DF"
            /> 
          </TouchableOpacity>

        </CardItem>

      


      
        <CardItem style={styles.actionButton} bordered>

          <TouchableOpacity onPress={ ()=>{
            this.callAction(this.state.phone)
          } }>
            <Entypo 
            name="phone"
            size={50}
            color="#0A79DF"
            /> 
          </TouchableOpacity>

        </CardItem>

      </Card>



      <Card style={styles.actionContainer}>
        <CardItem style={styles.actionButton} bordered>

          <TouchableOpacity onPress={()=>{
            this.editEmployee(this.state.key)
          }}
         >
            <Entypo 
            name="edit"
            size={50}
            color="#3C40C6"
            /> 
          </TouchableOpacity>

        </CardItem>

      


      
        <CardItem style={styles.actionButton} bordered>

          <TouchableOpacity onPress={ ()=>{
            this.deleteEmployee(this.state.key)
          } }>
            <Entypo 
            name="trash"
            size={50}
            color="#4C4B4B"
            /> 
          </TouchableOpacity>

        </CardItem>

      </Card>

      
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  infoContainer:{
    flexDirection:'column'
  },
  employeeIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  employeeIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  }
});

