import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";

export default class EditEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
      salary: "",
      designation:"",
      key: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      this.getEmployee(key);
    });
  }

  getEmployee = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJsonString => {
        var employee = JSON.parse(employeeJsonString);
        //set key in this object
        employee["key"] = key;
        //set state
        this.setState(employee);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateEmployee = async key => {
    if (
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== "" &&
      this.state.salary !== "" &&
      this.state.designation !== ""
    ) {
      var employee = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
        salary : this.state.salary,
        designation : this.state.designation,
        
      };
      await AsyncStorage.mergeItem(key, JSON.stringify(employee))
        .then(() => {
          this.props.navigation.goBack();
        })
        .catch(eror => {
          console.log(error);
        });
    }
  };

  static navigationOptions = {
    title: "Edit Employee"
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={fname => this.setState({ fname })}
                value={this.state.fname}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={lname => this.setState({ lname })}
                value={this.state.lname}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={phone => this.setState({ phone })}
                value={this.state.phone}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
              />
            </Item>

            <Item style={styles.inputItem}>
              <Label>Salary</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                onChangeText={salary => this.setState({ salary })}
                value={this.state.salary}
              />
            </Item>

            <Item style={styles.inputItem}>
              <Label>Position</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={designation => this.setState({ designation })}
                value={this.state.designation}
              />
            </Item>
          </Form>
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => {
              this.updateContact(this.state.key);
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
