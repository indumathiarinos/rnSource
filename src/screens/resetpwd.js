import React from 'react'
import {
    View,
    Button,
    TextInput,
    BackHandler,
    StyleSheet, Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Dimensions
} from 'react-native'
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.disableYellowBox = true;

export default class ResetPassword extends React.Component {

    constructor(){
        super();
        this.state = {
            username: ''
        }
 this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
    this.props.navigation.navigate('newSignup');
    // this.props.navigation.goBack();
      return true;
} 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: "row", marginTop: '15%' }}>
                    <Image
                        style={{ width: 150, height: 100 }}
                        source={require('../assets/img/resetpwd.png')}
                    />
                </View>
                <Text style={styles.title}>
                     Password Reset
                </Text>
                <Text style={styles.subtitle}>
                We have send you an email with instructions to reset your password                </Text>
             
                <View style={{ flex: 1, marginBottom: '20%', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}>

                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 20, borderRadius: 5 }}>
                        <TouchableOpacity style={{ height: 40, width: 150, backgroundColor: '#407FFA', borderRadius: 5, alignItems: 'center', justifyContent: 'center', }} onPress={this.submitForm.bind(this)} >
                            <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={
                            styles.bottomLine
                        }
                    ></View> */}
              
                   
                    <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >

<TouchableOpacity
onPress={()=> this.props.navigation.navigate('loginSignup')}><Text style={{ color: 'white', fontSize: 19 }}>Back</Text>
</TouchableOpacity>
</LinearGradient>
                 
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

    input: {
        width: width - 100,
        height: height / 16,
        backgroundColor: '#F9F9F9',
        margin: '5%',
        // left:10,
        // padding: '3%',
        paddingLeft: '5%',
        // paddingLeft:20,
        color: 'black',
        borderRadius: 28,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    underlinetxt: {
        marginTop: '3%',
        textAlign: 'center',
        color: '#27A291',
        fontSize: 16,
        marginBottom:'3%',
        textDecorationLine: 'underline',
    },
    btnview: {
        backgroundColor: '#24D4BC',
        // padding: '2%',
        width: width/2,
        height: height / 16,
        maxWidth: 'auto',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: '5%'
    },
    subtitle: {
        margin: '5%',
        fontSize: 18,
        color: '#707070',
        textAlign: 'center',
        padding:'3%',
    }

})


