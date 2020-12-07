import React from 'react';
import {
    View, TouchableOpacity, Button, Icon, Text, Image, Linking,StyleSheet, AsyncStorage, ToastAndroid,
    Platform,
    AlertIOS, Animated
} from 'react-native';
import CheckBox from 'react-native-check-box'
import { Form, Field } from "react-native-validate-form";

import TextInputPassword from './TextInputPassword'
import TextInputLayout from './TextInputLayout';
import * as theme from '../constants/theme';
import CustomToast from '../Screens/CustomToast'
import OfflineNotice from '../Screens/OfflineNotice'
import NetInfo from "@react-native-community/netinfo";

const required = value => (value ? undefined : "This is a required field.");

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)
        ? "Please provide a valid email address."
        : undefined;

const pass = value =>
    value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
        ? "Please provide a valid password"
        : undefined;
const cnfrmpass = value =>
    value && !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#?&!])(?=\S+$).{4,}$/i.test(value)
        ? "Please provide a valid password"
        : undefined;

        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
          });
           
          // Unsubscribe
          unsubscribe();
          
          

export default class SignUpScreen extends React.Component {
    static navigationOptions = {
        title: '',
        header: null
    };



    state = {
        checked: false,
    };
    constructor() {
        super();
        this.state = {
            lastRefresh: Date(Date.now()).toString(),
            errors: [],
            email: "",
            // // email: "claimantarun@gmail.com",      
            pass: "",
            // email: "",
            // pass: "",
            data: '',
        };
    }


    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('Initial url is: ' + url);
                // E
                const { navigate } = this.props.navigation;
                const route = url.replace(/.*?:\/\//g, '');
                const id = route.match(/\/([^\/]+)\/?$/)[1];
                const routeName = route.split('/')[0];
                const routeName1 = route.split('/')[2];
                AsyncStorage.setItem('Tokenid1', id);
                console.log('F1 ' + route);
                console.log('F2 ' + id);
                console.log('F3  ' + routeName);
                console.log('F4  ' + routeName1);
                if (routeName1 === 'resetpassword') {
                    navigate('ResPass')
                }
            }
        }).catch(err => console.error('An error occurred', err));
    }
    Default_Toast_Bottom() {

        this.refs.defaultToastBottomWithDifferentColor.ShowToastFunction('Default Toast Bottom Message With Different Color.');
       
       

    }



    submitForm() {
        let submitResults = this.myForm.validate();

        let errors = [];

        submitResults.forEach(item => {
            errors.push({ field: item.fieldName, error: item.error });
        });

        this.setState({ errors: errors });
    }

    submitSuccess() {
        this.CheckConnectivity();
       
        console.log("Submit Success!");

    }

    submitFailed() {
        console.log("Submit Faield!");
    }





    CheckConnectivity(){
     
        
           NetInfo.fetch().then(state => {
       
             console.log("Connection type cheking", state.type);
             console.log("Is connected cheking?", state.isConnected);
       
             if(state.isConnected==true){
       
               this.onLoginPress(this.state.email, this.state.pass)
             }else{
               alert('Not Connected')
             }
            
           });
         }


    onLoginPress(email, pass) {


        const formData = new FormData()
        formData.append('email', email);
        formData.append('password', pass);

        fetch("https://rdov2testapi.resolvedisputes.online/api/auth/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson
                })

               
                console.log(this.state.data);
            

                let v = this.state.data.message;
                if (this.state.data.status === "error") {

                    alert(v)
                    //this.CustomToast(v)
                    
                    
                }
                else if (this.state.data.status === "success") {
               
                   
                    AsyncStorage.setItem('casecount', this.state.data.data.casecount + "");
                    AsyncStorage.setItem('uiddata', this.state.data.data.profile.u_id + "");
                   
                    if (this.state.data.data.activated === 1) {

                        AsyncStorage.setItem('DATAS1', this.state.data.data + "");

                        AsyncStorage.setItem('Loginemail', this.state.data.data.token + "");
                        AsyncStorage.setItem('name', this.state.data.data.name + "");
                        AsyncStorage.setItem('userimage', this.state.data.data.profile.user_image + "");
                        AsyncStorage.setItem('userimage2', this.state.data.data.profile.p_name + "");

                

                        if (this.state.data.data.casecount > "0") {
                            this.props.navigation.navigate('Home')
                             

                        }
                        else {
                      
                       this.props.navigation.navigate('Homeemp')
                         //this.Default_Toast_Bottom()
                        }


                    } else {

                    }
                    //activated



                }

            })
            .catch((error) => {
                console.log(error);
            });

    }
    render() {
        const { checked } = this.state;
        const { navigate } = this.props.navigation;
        console.disableYellowBox = true;

        return (

            <View style={styles.container}>

      

                <CustomToast ref="defaultToastBottomWithDifferentColor" backgroundColor='#808080' position="bottom" />

                {/* LOGO */}
                <View style={styles.rdologo}>

                <Image style={{
                                                width: 58,
                                                height: 58, justifyContent: 'center', alignItems: 'center'
                                            }}

                                                source={require('../assets/rdoLogo.jpeg')} />
                </View >



                {/* LOGIN and SIGN UP */}





                <View cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    style={styles.setUp}>


                    <View style={{
                        marginLeft: '15%',
                        width: "55%",


                    }}>

                        <View style={{
                            height: '14%',
                            width: 170,
                            backgroundColor: '#FFFFFF',
                            borderTopLeftRadius: 3,
                            borderBottomLeftRadius: 3,
                            shadowColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowRadius: 15,
                            shadowOpacity: 0.06,
                            elevation: 2,
                            flex: 1,

                            flexDirection: "row",
                            shadowOffset: { height: 4 }
                        }}>
                            <TouchableOpacity onPress={() => navigate('signUp')} style={{ marginRight: '20%' }}><Text style={{ color: "rgba(34, 56, 90, 0.3)" }}>Sign Up</Text>

                            </TouchableOpacity >
                            <TouchableOpacity style={{ marginLeft: '4%', }}><Text >Sign In</Text>
                                <View
                                    style={
                                        styles.verticalLine
                                    }
                                ></View>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>



                <View>

                    <View>
                        <View style={styles.CardStyle}>

                            <Form
                                ref={ref => (this.myForm = ref)}
                                validate={true}
                                submit={this.submitSuccess.bind(this)}
                                failed={this.submitFailed.bind(this)}
                                errors={this.state.errors}
                            >

                                <Text style={styles.textsyle} >Email ID</Text>
                                <Field
                                    required
                                    component={TextInputLayout}
                                    validations={[required, email]}
                                    secureTextEntry={false}
                                    value={this.state.email}
                                    onChangeText={val => this.setState({ email: val })}
                                    customStyle={styles.inputing}
                                    theme={{ colors: { primary: "#ffffff" } }}
                                    placeholder="Enter Email ID here"
                                    name="Email"
                                />

                                <Text style={styles.textsyle}>Password</Text>

                                <Field
                                    required
                                    component={TextInputPassword}
                                    validations={[required, pass]}
                                    value={this.state.pass}
                                    secureTextEntry={true}
                                    onChangeText={val => this.setState({ pass: val })}
                                    customStyle={styles.inputing}
                                    theme={{ colors: { primary: "#000" } }}
                                    name='Password'
                                    placeholder="Enter Password here" />
                            </Form>

                        </View>
                    </View>
                    {/*      <View style={{ flexDirection:'row-reverse'}}>
                        <Text onPress={()=>navigate('Forgotpass')} style={{ color: '#407FFA', margin: '5%', fontSize: 14, }}>Forgot Password ?</Text>
                    </View>
                    */}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row-reverse',

                    }}>
                        <View >

                            <Text style={{
                                fontSize: 14, marginLeft: '8%', marginTop: '8%', color: '#407FFA'
                            }} onPress={() => navigate('Forgotpass')}>
                                Forgot Password?
                        </Text>
                        </View>
                    </View>


                </View>

                {/* FOOTER VIEW */}

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',marginBottom:'10%' }}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 20, borderRadius: 5 }}>
                        <TouchableOpacity style={{ height: 40, width: 150, backgroundColor: '#407FFA', borderRadius: 5, alignItems: 'center', justifyContent: 'center', }} onPress={this.submitForm.bind(this)} >
                            <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}>Login</Text>
                        </TouchableOpacity>
                    </View>

                   

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '10%'
    },
    rdologo: {
        margin: "5%",
        height: "10%",
        alignItems: 'center',
        justifyContent: 'center',

    },
    setUp: {
        height: "8%",
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignContent: 'center',
        justifyContent: 'center',

    }, buttonContainerLeft: {
        height: 65,
        padding: '5%',
        marginLeft: '50%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 3,
        shadowColor: '#22385A0A',
        alignItems: 'center',
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        elevation: 6,
        position: 'relative',
        borderBottomLeftRadius: 3,
        borderColor: 'transparent'

    },
    buttonContainerRight: {
        height: 65,
        padding: '5%',
        marginRight: '50%',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,

        },
        shadowColor: '#22385A0A',
        marginBottom: '50%', elevation: 6,
        position: 'relative',
    },
    buttonText: {
        color: '#FFF',
    },
    verticalLine: {
        height: 4,
        width: 25,
        marginLeft: '20%',
        marginTop: '15%',
        borderRadius: 20,
        backgroundColor: '#407FFA'
    },
    backgroundViewLogin: {
        height: '300%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#22385A',
        opacity: 0.02,
    }, textSignUp: {
        color: '#22385A',
        marginBottom: '10%'

    },
    textSignIn: {
        color: '#A6A6A6',
        marginTop: 5
    },
    textSignUp1: {
        color: '#22385A',
        marginTop: '4%',
        fontSize: 10,
    },


    bottomLine: {
        height: 3,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        borderRadius: 10,
        backgroundColor: '#22385A',
        opacity: .10
    },
    CardStyle: {

        height: 'auto',
        borderRadius: 10,
        margin: "5%"
    },
    textsyle: {
        color: '#000000',
        fontSize: 16,
        marginTop: 15,
        marginBottom: 5,
    },
    textsyle1: {
        backgroundColor: theme.colors.lightgry,


    },
    inputing: {
        backgroundColor: 'transparent',

        color: 'red', //Expecting this to change input text color
        borderBottomColor: 'red',
    }, 

})
