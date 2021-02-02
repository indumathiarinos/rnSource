import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ScrollView,
    TextInput,
    FlatList,
    BackHandler,
    Dimensions,
    AsyncStorage,
    SafeAreaView,
    Button
} from 'react-native';
import { Divider, } from 'react-native-elements';
// import { Popover, PopoverController } from 'react-native-modal-popover';
// import Popover from '../components/popover';
import Tooltip from 'react-native-walkthrough-tooltip';
import { connect } from "react-redux";
import ModalBox from 'react-native-modalbox';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
// import TooltipView from 'react-native-tooltip-view'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.disableYellowBox = true;

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 0, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Frank Odalthh", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
            ],
            showlikeImg: false,
            replyImg: false,
            showPopover: false,
            toolTipVisible: false,
            popoverAnchor: { x: 0, y: 0, width: 0, height: 0 },
            selectedItem: [],
            selectedItemReply: [],
            selectedItemLike:[],
            viewModal: false,
            getuserid:'',
            comments:'',
            loading:true,
            postpageid:'',
            getpostid:'',
            commentCounts:'',
            commentText:'',
            gettypeid:'',
            getpageid:'',
            customlike:false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentDidMount() {
        AsyncStorage.getItem('userid').then((value)=>{this.setState({getuserid:value})}).done();
        AsyncStorage.getItem('typeid').then((value)=>{this.setState({gettypeid:value})}).done();
        AsyncStorage.getItem('postid').then((value)=>{this.setState({postpageid:value})}).done();

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        // {this.getData()}
        this.CheckConnectivity();
    }
    CheckConnectivity(){    
        NetInfo.fetch().then(state => {
      
          console.log("Connection type cheking", state.type);
          console.log("Is connected cheking?", state.isConnected);
      
          if(state.isConnected==true){
            {this.getData();}
          }else{
            alert('No Internet connection.Make sure that Mobile data or Wifi is turned on,then try again.')
        }
         
        });
      }
    getData() {
        setTimeout(() => {
            {this.state.gettypeid==4?this.setState({getpageid:this.state.postpageid,getpostid:''}):this.setState({getpostid:this.state.postpageid,getpageid:''})}
            { this.exploredata() }
        }, 1000)
    }
    exploredata(){
        var json=JSON.stringify({"pageID":this.state.getpageid,"PostID":this.state.getpostid});
        console.log('get json ',json,'type id ',this.state.gettypeid)
          fetch("http://162.250.120.20:444/Login/CommentGet",
            {
                method: 'POST',
                headers:  {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: json
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseText);1
                this.setState({comments: responseJson,loading:false,
                commentCounts:responseJson.COUNTS
            });
                AsyncStorage.setItem('commentId',JSON.stringify(Number(responseJson.commentID)))
                console.warn(responseJson)
            })
            .catch((error) => {
                console.warn(error);
            });
      }
      
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.backpress();
        return true;
    }
    // backpress = () => {
    //     this.props.changeNavNews();
    //     this.props.navigation.navigate('MainpageTabs')
    // }
   
    backpress = () => {
        //    console.log('before set',this.props.nav)
        // this.props.changeNavNews();
        // this.props.navigation.navigate('MainpageTabs')
        this.props.navigation.goBack();
        //    console.log('after set',this.props.nav);
    }
    setButton = (e) => {
        const handle = findNodeHandle(this.button);
        if (handle) {
            NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
                this.setState({ popoverAnchor: { x, y, width, height } });
            });
        }
    };

    openPopover = () => {
        this.setState({ showPopover: true })
    };
    closePopover = () => this.setState({ showPopover: false });
    onPressHandler(id) {
        // let selected;
        let list = [...this.state.data];
        for (let data of list) {
            if (data.id == id) {

                data.abc = (data.abc == null) ? true : !data.abc;

                (data.abc) ? this.state.selectedItem.push(data) : this.state.selectedItem.pop(data);
                console.log('selected item array ', this.state.selectedItem)
                console.log("data.selected" + data.abc, 'id', data.id);

                //   this.state.selectedItem.length!=0? this.setState({showlikeImg:true}):this.setState({showlikeImg:false});

                // console.log("id"+id);
                //  (data.selected)?this.state.selectedItemArray.push(id):this.state.selectedItemArray.pop(id);
                //console.log("array"+selectedItemArray);
                break;
            }
        }
        // console.log("array"+this.state.selectedItemArray);
        // MultiselectItems.push(selectedItemArray);
        this.setState({ data: list });
    }
    onPressHandler2(commentID) {
        // let selected;
        let list = [...this.state.comments];
        for (let comments of list) {
            if (comments.commentID == commentID) {

                comments.like = (comments.like == null) ? true : !comments.like;

                (comments.like) ? this.state.selectedItemLike.push(comments) : this.state.selectedItemLike.pop(comments);
                console.log('selected item array ', this.state.selectedItemLike)
                console.log("data.selected" + comments.like, 'id', comments.commentID);
                this.setState({ loading: true })
                var json = JSON.stringify({ "UserID": this.state.getuserid, "Post_Page_ID": this.state.postpageid,"TypeID":this.state.gettypeid });
               console.log('value json ',json)
                fetch("http://162.250.120.20:444/Login/LikesAdd",
                  {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'content-type': 'application/json'
                    },
                    body: json
                  }
                )
                  .then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({ loading: false,customlike:!this.state.customlike });
                    console.warn(responseJson);
                    // console.log('like service called');
                    { this.exploredata() }
                  })
                  .catch((error) => {
                    console.warn(error);
                  });
                //   this.state.selectedItem.length!=0? this.setState({showlikeImg:true}):this.setState({showlikeImg:false});

                // console.log("id"+id);
                //  (data.selected)?this.state.selectedItemArray.push(id):this.state.selectedItemArray.pop(id);
                //console.log("array"+selectedItemArray);
                break;
            }
        }
        // console.log("array"+this.state.selectedItemArray);
        // MultiselectItems.push(selectedItemArray);
        this.setState({ comments: list });
    }
    AllComments({ item,index }) {
            return (
                <View style={index==0?styles.selectedContainer:styles.container}>
                <View style={styles.heading1}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('profileAbout')}>
                        <Image style={styles.image} source={{ uri: item.avatar!=""?item.avatar:null }} />
                    </TouchableOpacity>
                    <Text style={styles.name}>{item.first_name}</Text>
                </View>
                <View style={styles.content}>

                    <Text style={styles.contentText} rkType='primary3 mediumLine'>{item.text}</Text>
                </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between",marginLeft:17,marginRight:17,}}>
                        <View style={styles.bottomReply}>
                            <TouchableOpacity
                                onPress={() => this.onPressHandler2(item.commentID)}
                            // onPress={() => this.setState({ showlikeImg: !this.state.showlikeImg })}
                            >
                                <View style={styles.bottomReply}>
                                    {/* <Image
                                    source={imgSource}
                                /> */}
                                    {item.like & this.state.customlike == true ? <Image source={require('../assets/img/like.png')} /> : <Image source={require('../assets/img/unlike.png')} />}

                                    <Text style={styles.textPadding}>Like</Text>
                                </View>
                                <Text style={{color:'#707070',}}>{item.CommentLike!=0?item.CommentLike:null}</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imgGap}
                                onPress={() => this.onPressHandler1(item)}
                            // onPress={() => this.setState({ replyImg: !this.state.replyImg })}
                            >
                                <View style={styles.bottomReply}>
                                    {item.reply == true ? <Image source={require('../assets/img/commentcolor.png')} />:<Image source={require('../assets/img/comment1.png')} />}

                                    {/* <Image
                                    source={replyImg} /> */}
                                    <Text style={styles.textPadding}>Reply</Text>
                                </View>

                            </TouchableOpacity>
                        </View>

                        <Text style={styles.time}>{item.created_at}</Text>
                    </View>
                    {/* <View style={styles.heading1}>


                    </View> */}
            </View>
          );
      }
    onPressHandler1(item) {
        // let selected;
        let list = [...this.state.comments];
        for (let comments of list) {
            if (comments.commentID == item.commentID) {

                comments.reply = (comments.reply == null) ? true : !comments.reply;

                (comments.abc) ? this.state.selectedItemReply.push(comments) : this.state.selectedItemReply.pop(comments);
                // console.log('selected item array ', this.state.selectedItemReply)
                // console.log("data.selected" + comments.reply, 'id', comments.commentID);
                AsyncStorage.setItem('userComment',JSON.stringify(item));
              console.log('comment id and get async com id ',item+' ');
              AsyncStorage.getItem('userComment').then((value)=>console.log('async value is ',value)).done();
                //   this.state.selectedItem.length!=0? this.setState({showlikeImg:true}):this.setState({showlikeImg:false});
                this.props.navigation.navigate('replyComment');

                // console.log("id"+id);
                //  (data.selected)?this.state.selectedItemArray.push(id):this.state.selectedItemArray.pop(id);
                //console.log("array"+selectedItemArray);
                break;
            }
        }
        // console.log("array"+this.state.selectedItemArray);
        // MultiselectItems.push(selectedItemArray);
        this.setState({ comments: list });
    }
    commentAddService(){
        this.setState({loading:true})
        var json=JSON.stringify({
            "UserID":this.state.getuserid,
            "PageID":this.state.getpageid,
            "Txt":this.state.commentText,
            "Imz_PagesID":"",
            "PostID":this.state.getpostid,
            "Imz_Post_post_id":""
        });
        console.log('comment add json ',json)
        fetch("http://162.250.120.20:444/Login/CommentAdd",
          {
              method: 'POST',
              headers:  {
                  'Accept': 'application/json',
                  'content-type': 'application/json'
              },
              body: json
          }
      )
          .then((response) => response.json())
          .then((responseJson) => {
              //alert(responseText);1
              this.setState({loading:false,commentText:""});
             {this.exploredata()}
              console.warn(responseJson);
              console.warn('comments add')
          })
          .catch((error) => {
              console.warn(error);
          });
    }
    goToTop = () => {
        console.log('scrollview content height ',this.scrollViewContent_height,'normal height ',height)
        this.scroll.scrollTo({x: 0, y: 0, animated: true});
     }
    render() {
        const like = require('../assets/img/like.png');
        const unlike = require('../assets/img/unlike.png');
        var imgSource = this.state.showlikeImg ? like : unlike;
        var replyImg = this.state.replyImg ? require('../assets/img/comment1.png') : require('../assets/img/commentcolor.png');
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>

                <View style={{
                    height: 50, backgroundColor: '#ffff', alignItems: 'center',
                    justifyContent: 'space-between', flexDirection: 'row',
                    paddingLeft: '5%', paddingRight: '5%', borderEndColor: '#707070', borderEndWidth: 0.5
                }}>
                    {/* <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}> */}
                    <View style={{flexDirection:'row',width:width/1.2,justifyContent:'space-between'}}>

                    <TouchableOpacity onPress={() => this.setState({ viewModal: !this.state.viewModal })}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: width / 3 }}>
                            <Text style={[styles.textnormal, !this.state.toolTipVisible ? null : styles.imgMove]}
                            >View by</Text>
                            <Image
                                source={require('../assets/img/dropdown.png')} />
                        </View>
                    </TouchableOpacity>
                   
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('commentsLike')}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',width:width/2 }}>
                            <Text style={{ fontSize: 18,color:'black' }}
                            >{this.state.commentCounts}</Text>
                            <Image style={{marginTop:'3%',marginLeft:'2%'}} source={require('../assets/img/comment1.png')} />
                        </View>

                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity  onPress={() => this.backpress()}>
                    <Image style={{ alignSelf: 'flex-end',width:50,height:50, }} source={require('../assets/img/close.png')} />
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
                <Divider />

                {/* <View  style={styles.root}> */}
                <ScrollView
                 onContentSizeChange={(width, height) => { this.scrollViewContent_height = height }}
                ref={(c)=>this.scroll=c}
                // style={{marginBottom:'20%'}}
                >
                    <Text style={styles.headline}>Comments</Text>

                    <Divider />
                    <FlatList

                        data={this.state.comments}
                        extraData={this.state}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator} />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item,index)=>this.AllComments(item,index)} />

                {/* {height>this.scrollViewContent_height? */}
                {this.state.comments.length>3?
                        <TouchableOpacity onPress={()=>this.goToTop()} style={styles.loadBtn}>
                            <View style={styles.cmtBtnrow}>
                            <Text style={styles.prevCommentBtn}>Load Previous Comments</Text>
                            <Image style={{alignSelf:'center',}} source={require('../assets/img/comment1.png')} />

                            </View>
                        </TouchableOpacity>
                        :null}

                </ScrollView>
                {/* </View> */}
                {/* <View style={styles.bottomLine}> */}
                {/* <Divider /> */}
                {/* <TouchableOpacity style={{width:'90%',backgroundColor:'#F9F9F9'}}> */}
                <View style={{ backgroundColor: '#fff', elevation: 1, borderColor: '#707070', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <TextInput style={styles.input}
                        placeholder="Write a Comment"
                        placeholderTextColor='#707070'
                        onChangeText={(val)=>this.setState({commentText:val})}
                        value={this.state.commentText}
                    // onChangeText={value => this.refs.modal4.open()}
                    />
                    <TouchableOpacity style={styles.touchableButton}
                        onPress={() => this.commentAddService()}>
                        <Image style={{width:25,height:25}}
                            source={require('../assets/img/send-icon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <ModalBox
                    isOpen={this.state.viewModal}
                    onClosed={() => this.setState({ viewModal: false })}
                    style={{width: width / 2,backgroundColor:'#fff',height:height/4.5,position:'absolute',left:-width/3.4}}
                    position={'top'}>
                    <View>
                        <TouchableOpacity style={{ height:height/13,marginTop:'1%'}} onPress={() => this.setState({ viewModal: !this.state.viewModal })}
                        >
                            <View style={{ flexDirection: 'row',marginTop:'5%',alignItems:'center',width: width / 2 ,justifyContent:'space-around'}}>
                                <Text style={{color:'#24d4bc',fontSize:16,fontFamily:'AzoSans-Regular'}}
                                >View by</Text>
                                <Image
                                    source={require('../assets/img/dropdown.png')} />
                            </View>
                        </TouchableOpacity>
                        <View style={{width:width/2,height:1,backgroundColor:'#CCCCCC'}}/>

                        <Text style={{color:'#707070',fontSize:18,padding:'5%',alignSelf:'center'}}>Newest</Text>
                        <Text style={{color:'#707070',fontSize:18,padding:'5%',alignSelf:'center'}}>Top Comments</Text>
                    </View>
                </ModalBox>
                <Modal isVisible={this.state.loading}>
                <Image source={require('../assets/gif/logo.gif')} style = {{alignSelf:'center',
                 width: 140,           
                       height: 140
                       }} />
                 </Modal>
                {/* </TouchableOpacity> */}

                {/* <View style={styles.SectionStyle}>

<Image source={require('../assets/img/send-icon.png')} style={styles.ImageStyle} />

  <TextInput
    //   style={{flex:1}}
      placeholder='Write a comment'
      placeholderTextColor='#CCCCCC'
    //   underlineColorAndroid="transparent"
  />

</View> */}
                {/* <TextInput
          style={styles.input}
         
          autoCapitalize="none"
          placeholderTextColor='#707070'
        //   onChangeText={val => this.onChangeText('email', val)}
        //   value={this.state.email}

        /> */}
                {/* <TouchableOpacity
                        style={{ width: width - 50, backgroundColor: '#F9F9F9', height: 50, borderRadius: 25, justifyContent: 'center', paddingLeft: '5%', paddingRight: '5%' }}
                        // onPress={() =>this.props.navigation.navigate('signup')}
                            >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Text style={{ color: '#000', fontSize: 19 }}>Back</Text>


                            <Image source={require('../assets/img/send-icon.png')} />
                        </View>
                    </TouchableOpacity> */}

                {/* </View> */}
               
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    // input:{
    //     width:"90%",
    //     backgroundColor:'#CCCCCC',
    //             padding:10,
    //     margin:5
    //   },
    loadBtn:{
        backgroundColor:'#fff',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        shadowColor: '#000',
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom:10
    },
    selectedContainer: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        borderTopRightRadius: 40,
        borderBottomEndRadius: 40,
        borderBottomLeftRadius: 40,
        borderWidth: 1,
        margin: 10,
        borderColor:'#27A291',
        borderWidth:2,
    },
    cmtBtnrow:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:width/1.7,height:height/20,
       
    },
    prevCommentBtn:{
        fontSize:15,
        color:'#27A291',

    },
    touchableButton: {
        position: 'absolute',
        right: '13%',
        // height: 40,
        width: 35,
        padding: 2
    },
    textnormal: {
        fontSize:16,
        fontFamily:'AzoSans-Regular',
        color:'#707070',
        marginRight:5
    },
    imgMove: {
        // marginRight:60,
        marginRight: '35%'
    },
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        borderTopRightRadius: 40,
        borderBottomEndRadius: 40,
        borderBottomLeftRadius: 40,
        borderWidth: 1,
        margin: 10,
        borderColor:'#cccccc'


    },
    content: {
        margin:14,
    },
    contentText:{
        fontSize:14,
        fontFamily:'AzoSans-Regular'

    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 10,
        // borderColor:'#CCCCCC',
        // borderWidth:0.5
    },
    heading1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        fontSize: 12,
        color: "#707070",
        fontFamily:'AzoSans-Light'
    },
    name: {
        fontSize: 14,
        fontFamily: "Montserrat-Bold",
    },
    bottomReply: {
        flexDirection: 'row',
    },
    textPadding: {
        marginLeft:5,
        color: '#707070',
        fontSize:12,
        fontFamily:'AzoSans-Light'
    },
    imgGap: {
        marginLeft:20
    },
    headline: {
        fontSize: 24,
        fontFamily: 'Montserrat-Light',
        textAlign: 'center',
        margin: '4%',
        padding: '4%'
    },
    bottomLine: {
        height: '5%',
        bottom: 0,
        left: 0,
        right: 0,

        position: 'absolute',
        backgroundColor: '#ffff',
        borderTopWidth: 0.1,
        elevation: 1,
        borderTopColor: '#707070'
    },
    input: {
        width: width - 80,
        height: height / 16,
        backgroundColor: '#fff',
        margin: '2%',
        // left:10,
        // padding: '3%',
        paddingLeft: '5%',
        // paddingLeft:20,
        // color: '#CCCCCC',
        borderRadius: 28,
        // borderWidth: 1,
        backgroundColor: '#ededed',

        // backgroundColor:'#ffff',
        fontSize: 18,
        fontWeight: '500',
    },
    SectionStyle: {
        width: width - 80,
        height: height / 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 28,
        backgroundColor: '#F9F9F9',
        // borderWidth: .5,
        // borderColor: '#000',
        // height: 40,
        // borderRadius: 5 ,
        // paddingLeft:20,
        margin: 10
    },

    ImageStyle: {
        padding: 10,
        margin: 12,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        // alignSelf:'flex-end'
        alignItems: 'flex-end'
    },
});
function mapStateToProps(state) {
    return {
        nav: state.apiReducer.nav,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeNavRec: () => dispatch({ type: 'CHANGE_NAV_REC' }),
        changeNavNews: () => dispatch({ type: 'CHANGE_NAV_NEWS' })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);