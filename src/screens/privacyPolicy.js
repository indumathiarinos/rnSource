import React from 'react'
import {
    View,
    TextInput,
    StyleSheet, Text,
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage,
    BackHandler,
    SafeAreaView,
    Dimensions
} from 'react-native';
import HTMLView from 'react-native-htmlview';
// import Button from '../components/Button';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.disableYellowBox = true;

export default class Privacy extends React.Component {
    constructor(){
        super();
    this.state = {
        username: '',
        asyncVal:0,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // AsyncStorage.getItem('signupPrivacy').then((value) => this.setState({ asyncVal : value })).done();

}
componentDidMount() {
BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
    // AsyncStorage.getItem('loginPrivacy').then((value) => this.setState({ asyncVal : value })).done();
    // if(this.state.asyncVal==2){
    //     this.props.navigation.navigate('loginSignup');
    //         //     console.log('value is ',this.state.asyncVal);
    // //     AsyncStorage.setItem('signupPrivacy', JSON.stringify(0));
    // //     this.props.navigation.navigate('signup')
    // // }else if(this.state.asyncVal==2){
    // //     console.log('value is ',this.state.asyncVal);
    // //     AsyncStorage.setItem('signupPrivacy', JSON.stringify(0));
    // //     this.props.navigation.navigate('signin')
    // }else{
    // this.props.navigation.navigate('newSignup')
    // }
    this.props.navigation.goBack();
return true;
}

    render() {
        const htmlcontents = `<div style="text-align:justify">
        <br><h4><b><center>MOBILE APP PRIVACY POLICY TEMPLATE</center></b></h4><br><h4><b>[MOBILE APP]</b></h4>Last updated [month day, year] <br><br>[BUSINESS ENTITY NAME] (“we” or “us” or “our”) respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application (the “Application”). Please read this Privacy Policy carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION.<br><br>We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted.<br><br>This Privacy Policy does not apply to the third-party online/mobile store from which you install the Application or make payments, including any in-game virtual items, which may also collect and use data about you. We are not responsible for any of the data collected by any such third party.<br><br>COLLECTION OF YOUR INFORMATION We may collect information about you in a variety of ways. The information we may collect via the Application depends on the content and materials you use, and includes: Personal Data Demographic and other personally identifiable information (such as your name and email address) that you voluntarily give to us when choosing to participate in various activities related to the Application, such as chat, posting messages in comment sections or in our forums, liking posts, sending feedback, and responding to surveys.<br><br>If you choose to share data about yourself via your profile, online chat, or other interactive areas of the Application, please be advised that all data you disclose in these areas is public and your data will be accessible to anyone who accesses the Application. Derivative Data Information our servers automatically collect when you access the Application, such as your native actions that are integral to the Application, including liking, re-blogging, or replying to a post, as well as other interactions with the Application and other users via server log files.<br><br>Financial Data Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Application. [We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, [Amazon Payments,] [Authornize.Net,] [Braintree Payments,] [Chargify,] [Dwolla,] [Google Checkout,] [Paypal,] [SafeCharge,] [Stripe,] [WePay,] [2Checkout,] [other], and you are encouraged to review their privacy policy and contact them directly for responses to your questions.<br><br>Facebook Permissions The Application may by default access your Facebook basic account information, including your name, email, gender, birthday, current city, and profile picture URL, as well as other information that you choose to make public. We may also request access to other permissions related to your account, such as friends, checkins, and likes, and you may choose to grant or deny us access to each individual permission. For more information regarding Facebook permissions, refer to the Facebook Permissions Reference page.<br><br>Data from Social Networks User information from social networking sites, such as [Apple’s Game Center, Facebook, Google+ Instagram, Pinterest, Twitter], including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks. This information may also include the contact information of anyone you invite to use and/or join the Application.<br><br>Geo-Location Information We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using the Application, to provide location-based services. If you wish to change our access or permissions, you may do so in your device’s settings. Mobile Device Access We may request access or permission to certain features from your mobile device, including your mobile device’s [bluetooth, calendar, camera, contacts, microphone, reminders, sensors, SMS messages, social media accounts, storage,] and other features. If you wish to change our access or permissions, you may do so in your device’s settings.<br><br>Mobile Device Data Device information such as your mobile device ID number, model, and manufacturer, version of your operating system, phone number, country, location, and any other data you choose to provide. Push Notifications We may request to send you push notifications regarding your account or the Application. If you wish to opt-out from receiving these types of communications, you may turn them off in your device’s settings. Third-Party Data Information from third parties, such as personal information or network friends, if you connect your account to the third party and grant the Application permission to access this information.<br><br>Data From Contests, Giveaways, and Surveys Personal and other information you may provide when entering contests or giveaways and/or responding to surveys. USE OF YOUR INFORMATION Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:<br><br>1. Administer sweepstakes, promotions, and contests.<br><br>2. Assist law enforcement and respond to subpoena. <br><br>3. Compile anonymous statistical data and analysis for use internally or with third parties. <br><br>4. Create and manage your account. <br><br>5. Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Application to you. <br><br>6. Email you regarding your account or order. <br><br>7. Enable user-to-user communications. <br><br>8. Fulfill and manage purchases, orders, payments, and other transactions related to the Application. <br><br>9. Generate a personal profile about you to make future visits to the Application more personalized. <br><br>10. Increase the efficiency and operation of the Application. <br><br>11. Monitor and analyze usage and trends to improve your experience with the Application. <br><br>12. Notify you of updates to the Application. <br><br>13. Offer new products, services, mobile applications, and/or recommendations to you. <br><br>14. Perform other business activities as needed. <br><br>15. Prevent fraudulent transactions, monitor against theft, and protect against criminal activity. <br><br>16. Process payments and refunds. <br><br>17. Request feedback and contact you about your use of the Application. <br><br>18. Resolve disputes and troubleshoot problems. <br><br>19. Respond to product and customer service requests. <br><br>20. Send you a newsletter. <br><br>21. Solicit support for the Application. <br><br>22. [Other] DISCLOSURE OF YOUR INFORMATION We may share information we have collected about you in certain situations. Your information may be disclosed as follows: <br><br>By Law or to Protect Rights If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation. This includes exchanging information with other entities for fraud protection and credit risk reduction. Third-Party Service Providers We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance. Marketing Communications With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law. <br><br>Interactions with Other Users If you interact with other users of the Application, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users, chatting with other users, liking posts, following blogs. Online Postings When you post comments, contributions or other content to the Applications, your posts may be viewed by all users and may be publicly distributed outside the Application in perpetuity Third-Party Advertisers We may use third-party advertising companies to serve ads when you visit the Application. <br><br>These companies may use information about your visits to the Application and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you. Affiliates We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us. Business Partners We may share your information with our business partners to offer you certain products, services or promotions. Offer Wall The Application may display a third-party-hosted “offer wall.” Such an offer wall allows third-party advertisers to offer virtual currency, gifts, or other items to users in return for acceptance and completion of an advertisement offer. Such an offer wall may appear in the Application and be displayed to you based on certain data, such as your geographic area or demographic information. <br><br>When you click on an offer wall, you will leave the Application. A unique identifier, such as your user ID, will be shared with the offer wall provider in order to prevent fraud and properly credit your account. Social Media Contacts If you connect to the Application through a social network, your contacts on the social network will see your name, profile photo, and descriptions of your activity. <br><br>Other Third Parties We may share your information with advertisers and investors for the purpose of conducting general business analysis. We may also share your information with such third parties for marketing purposes, as permitted by law. Sale or Bankruptcy If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity, we may transfer your information to the successor entity. If we go out of business or enter bankruptcy, your information would be an asset transferred or acquired by a third party. You acknowledge that such transfers may occur and that the transferee may decline honor commitments we made in this Privacy Policy. <br><br>We are not responsible for the actions of third parties with whom you share personal or sensitive data, and we have no authority to manage or control third-party solicitations. If you no longer wish to receive correspondence, emails or other communications from third parties, you are responsible for contacting the third party directly. <br><br>TRACKING TECHNOLOGIES Cookies and Web Beacons We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Application to help customize the Application and improve your experience. When you access the Application, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Application. You may not decline web beacons. However, they can be rendered ineffective by declining all cookies or by modifying your web browser’s settings to notify you each time a cookie is tendered, permitting you to accept or decline cookies on an individual basis. <br><br>Internet-Based Advertising Additionally, we may use third-party software to serve ads on the Application, implement email marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us. For more information about opting-out of interest-based ads, visit the Network Advertising Initiative Opt-Out Tool or Digital Advertising Alliance Opt-Out Tool. <br><br>Website Analytics We may also partner with selected third-party vendors[, such as <br><br>[Adobe Analytics,] <br><br>[Clicktale,] <br><br>[Clicky,] <br><br>[Cloudfare,] <br><br>[Crazy Egg,] <br><br>[Flurry Analytics,]<br><br>[Google Analytics,] <br><br>[Heap Analytics,] <br><br>[Inspectlet,] <br><br>[Kissmetrics,]<br><br>[Mixpanel,]<br><br>[Piwik,] and others], to allow tracking technologies and remarketing services on the Application through the use of first party cookies and third-party cookies, to, among other things, analyze and track users’ use of the Application, determine the popularity of certain content, and better understand online activity. <br><br>By accessing the Application, you consent to the collection and use of your information by these third-party vendors. You are encouraged to review their privacy policy and contact them directly for responses to your questions. We do not transfer personal information to these third-party vendors. However, if you do not want any information to be collected and used by tracking technologies, you can install and/or update your settings for one of the following: <br><br>[Adobe Privacy Choices Page] <br><br>[Clicktale Opt-Out Feature] <br><br>[Crazy Egg Opt-Out Feature] <br><br>Digital Advertising Alliance Opt-Out Tool <br><br>[Flurry Analytics Yahoo Opt-Out Manager] <br><br>[Google Analytics Opt-Out Plugin] <br><br>[Google Ads Settings Page] <br><br>[Inspectlet Opt-Out Cookie] <br><br>[Kissmetrics Opt-Out Feature] <br><br>[Mixpanel Opt-Out Cookie] <br><br>Network Advertising Initiative Opt-Out Tool You should be aware that getting a new computer, installing a new browser, upgrading an existing browser, or erasing or otherwise altering your browser’s cookies files may also clear certain opt-out cookies, plug-ins, or settings. <br><br>THIRD-PARTY WEBSITES The Application may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Application, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information. <br><br>We are not responsible for the content or privacy and security practices and policies of any third parties, including other sites, services or applications that may be linked to or from the Application. SECURITY OF YOUR INFORMATION We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. <br><br>Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information. POLICY FOR CHILDREN We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below. <br><br>CONTROLS FOR DO-NOT-TRACK FEATURES Most web browsers and some mobile operating systems [and our mobile applications] include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. <br><br>If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.<br><br>OPTIONS REGARDING YOUR INFORMATION [Account Information You may at any time review or change the information in your account or terminate your account by: <br><br>● Logging into your account settings and updating your account <br><br>● Contacting us using the contact information provided below <br><br>● [Other] Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.] Emails and Communications If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by: <br><br>● Noting your preferences at the time you register your account with the Application <br><br>● Logging into your account settings and updating your preferences. <br><br>● Contacting us using the contact information provided below If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly. <br><br>CALIFORNIA PRIVACY RIGHTS California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. <br><br>If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below. If you are under 18 years of age, reside in California, and have a registered account with the Application, you have the right to request removal of unwanted data that you publicly post on the Application. <br><br>To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Application, but please be aware that the data may not be completely or comprehensively removed from our systems. <br><br>CONTACT US If you have questions or comments about this Privacy Policy, please contact us at: <br><br>[Company Name] <br><br>[Street Address] <br><br>[City, State Zip] <br><br>[Phone Number] <br><br>[Fax Number] <br><br>[Email]<br></div>`



        const htmlContent1 = `<h4>If you’re visiting this page, you’re likely here because you’re searching for a random sentence. Sometimes a random word just isn’t enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways.</h4>`
        return (
            <SafeAreaView style={styles.container}>
                {/* <View style={{ flexDirection: "row", marginTop: '15%' }}>
                    <Image
                        style={{ width: 67, height: 67 }}
                        source={require('../assets/imgs/termscondition.png')}
                    />
                </View> */}
                <Text style={styles.title}>
                    Privacy Policy
                </Text>
                {/* <View style={styles.subtitle1}>
                <Text style={styles.subtitle}>
                    By continuing you indicate that you have agree to PageVio’s Term of Service and Privacy Policy                </Text>

                </View> */}

                <View style={{ flex: 8, flexDirection: 'column' }}>
                    <View style={{
                        flex: 50,
                        padding: '4%'
                    }}>

                        <ScrollView style={{ backgroundColor: '#F9F9F9', borderRadius: 1, flexWrap: 'nowrap' }}>
                            <HTMLView stylesheet={styles} value={htmlcontents}  ></HTMLView>
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1, marginBottom: '10%', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}>
                    <LinearGradient style={styles.btnview} colors={['#24D4BC', '#27A291']} >

                        <TouchableOpacity onPress={()=>this.handleBackButtonClick()}>
                            <Text style={{ color: 'white', fontSize: 19 }}>Back</Text>
                        </TouchableOpacity>
                        {/* <Button>
                            <Text style={{ color: 'white', fontSize: 19 }}>Back</Text>
                            </Button> */}
                    </LinearGradient>

                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    div:{
        fontFamily:'AzoSans-Regular',
        fontSize:14
    },
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
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    underlinetxt: {
        marginTop: '3%',
        textAlign: 'center',
        color: '#27A291',
        fontSize: 16,
        marginBottom: '3%',
        textDecorationLine: 'underline',
    },
    btnview: {
        backgroundColor: '#24D4BC',
        // padding: '2%',
        width: width / 2,
        height: height / 16,
        maxWidth: 'auto',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
    },
    title: {
        color: '#27A291',
        fontSize: 24,
        fontFamily: 'Montserrat-Light',
        // top:'15%',
        marginTop: '15%'
    },
    subtitle1: {
        flex: 1,
        padding: '5%'

    },
    subtitle: {
        fontSize: 18,
        padding: '2%',
        color: '#707070',
        textAlign: 'center',
    }

})


