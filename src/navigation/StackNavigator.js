import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer,createSwitchNavigator,NavigationActions} from 'react-navigation';
import {  createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import loginSignup from '../screens/loginSignup';
import onboarding from '../screens/onboarding';
import signin from '../screens/signin';
import resetpwd from '../screens/resetpwd';
import home from '../screens/home';
import mainpage from '../screens/mainpage1';
import sectionFilter from '../screens/sectionFilter';
import forgotpwd from '../screens/forgotPassword';
import newsfeed from '../screens/newsfeed';
import collection from '../screens/collection';
import pins from '../screens/pins';
import qrcode from '../screens/qrcode';
import menu from '../screens/menu';
import search from '../screens/search';
import comments from '../screens/comments';
import TermsAndCondition from '../screens/TermsAndCondition';
import privacyPolicy from '../screens/privacyPolicy';
import Icon from 'react-native-vector-icons/AntDesign';
import FontIcons from 'react-native-vector-icons/Entypo';
import filter from '../screens/filter';
import searchFilter from '../screens/searchFilter';
import loading from '../screens/loading';
import searchDetail from '../screens/searchDetail';
import newSignup from '../screens/newSignup';
import confirmEmail from '../screens/confirmEmail';
import profileAbout from '../screens/profileAbout';
import createCollection from '../screens/createCollection';
import collectionFilter from '../screens/collectionFilter';
import readsCollection from '../screens/readsCollection';
import bookmarks from '../screens/bookmarks';
import viewBook from '../screens/viewBook';
import exploreSearch from '../screens/exploreSearch';
import readlater from '../screens/readLater';
import notification from '../screens/Notification';
import reminders from '../screens/reminders';
import profileCollection from '../screens/profileCollection';
import profileShelves from '../screens/profileShelves';
import books_pin from '../screens/books_pin';
import settings from '../screens/settings';
import offline from '../screens/offline';
import settingsAccount from '../screens/settingsAccount';
import emailNotification from '../screens/emailNotification';
import requestCreator from '../screens/requestCreator';
import thankyou from '../screens/thankyou';
import report from '../screens/report';
import reportIssue from '../screens/reportIssue';
import search_explore from '../screens/search_explore';
import reportThankyou from '../screens/reportThankyou';
import collectionDetail from '../screens/collectionDetail';
import profileSection from '../screens/profileSection';
import createSection from '../screens/createSection';
import editCreateSection from '../screens/editCreateSection';
import editCollection from '../screens/editCollection';
import readingBook from '../screens/readingBook';
import sectionDetail from '../screens/sectionDetail';
import profileReads from '../screens/profileReads';
import editSection from '../screens/editSection';
import editPins from '../screens/editPins';
import seriesViewBook from '../screens/seriesViewBook';
import periodiViewBook from '../screens/PeriodiViewBook';
import seriesFeed from '../screens/seriesFeed';
import seriesArchives from '../screens/seriesArchives';
import newOldFilter from '../screens/newOldFilter';
import periodiFeeds from '../screens/periodiFeeds';
import periodiIssues from '../screens/periodiIssues';
import periodIssuesHeader from '../screens/periodIssuesHeader';
// import share from './screens/share';
import filter_sortby from '../screens/filter_sortby';
import filter_date from '../screens/filter_date';
import upload_pic from '../screens/upload_pic';
import socialmedia from '../screens/socialmedia';
import share_modal from '../screens/share_modal';
// import modal from './screens/modal';
import contents from '../screens/contents';
import quoteCreation from '../screens/quoteCreation';
import periodicalContents from '../screens/periodicalContents';
import booksPinFilter from '../screens/booksPinFilter';
import followsubscribe from '../screens/followsubscribe';
import imgPreview from '../screens/imgPreview';
import MainpageTabs from '../screens/mainpageTabs';
import EditCollection1 from '../screens/EditCollection1';
import MergeCollection from '../screens/mergeCollection';
import RemoveCollection from '../screens/removeCollection';
import subCollectionMerge from '../screens/subCollectionMerge';
import EditSection1 from '../screens/editSection1';
import MergeSection from '../screens/mergeSection';
import RemoveSection from '../screens/removeSection';
import subSectionMerge from '../screens/subSectionMerge';
import readsEdit from '../screens/readsEdit';
import removePins from '../screens/removePins';
import sectionEdit from '../screens/sectionEdit';
import Help from '../screens/help';
import commentsLike from '../screens/comments_like';
import replyComment from '../screens/replyComment';
import pins1 from '../screens/pins1';
import exploreReadBook from "../screens/exploreReadBook";
const {width,height}=Dimensions.get('window');
// import TopNavigator from './TopNavigator';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
const HomeNavigator = createStackNavigator({
  mainpage:{
    screen:mainpage,
    navigationOptions:{
      header:null
    }
  },
  newsfeed:{
    screen:newsfeed,
    navigationOptions:{
    header:null,
  },
  },

  collectionDetail:{
    screen:collectionDetail,
    navigationOptions:{
      header:null
    }
  },
  collection:{
    screen:collection,
    navigationOptions:{
      header:null
    }
  },
  profileSection:{
    screen:profileSection,
    navigationOptions:{
      header:null
    }
  },
  profileReads:{
    screen:profileReads,
    navigationOptions:{
      header:null
    }
  },
  search:{
    screen:search,
    navigationOptions:{
      header:null
    }
  },
  exploreReadBook:{
    screen:exploreReadBook,
    navigationOptions:{
      header:null
    }
  },
  // menu:{
  //   screen:menu,
  //   navigationOptions:{
  //     header:null
  //   },
  // },
  MainpageTabs:{
    screen:MainpageTabs,
    navigationOptions:{
      header:null,
    } 
  },
  sectionEdit:{
    screen:sectionEdit,
    navigationOptions:{
    header:null,
  },
  },

  commentsLike:{
    screen:commentsLike,
    navigationOptions:{
      header:null
    }
  },
  collectionFilter:{
    screen:collectionFilter,
    navigationOptions:{
    header:null,
  },
  },
  periodIssuesHeader:{
    screen:periodIssuesHeader,
    navigationOptions:{
      header:null
    }
  },
  help:{
    screen:Help,
    navigationOptions:{
    header:null,
  },
  },
  removePins:{
    screen:removePins,
    navigationOptions:{
    header:null,
  },
  },
  sectionFilter:{
    screen:sectionFilter,
    navigationOptions:{
      header:null
    }
  },
  readsEdit:{
    screen:readsEdit,
    navigationOptions:{
      header:null
    }
  },
  filter_date:{
    screen:filter_date,
    navigationOptions:{
      header:null
    }
  },
  searchFilter:{
    screen:searchFilter,
    navigationOptions:{
      header:null
    }
  },
  contents:{
    screen:contents,
    navigationOptions:{
      header:null
    }
  },
  loading:{
    screen:loading,
    navigationOptions:{
      header:null
    }
  },
  periodicalContents:{
    screen:periodicalContents,
    navigationOptions:{
      header:null
    }
  },
  socialmedia:{
    screen:socialmedia,
    navigationOptions:{
      header:null
    }
  },
  upload_pic:{
    screen:upload_pic,
    navigationOptions:{
      header:null
    }
  },
  
  // modal:{
  //   screen:modal,
  //   navigationOptions:{
  //     header:null
  //   }
  // },
  share_modal:{
    screen:share_modal,
    navigationOptions:{
      header:null
    }
  },
  // share:{
  //   screen:share,
  //   navigationOptions:{
  //     header:null
  //   }
  // },
  filter_sortby:{
    screen:filter_sortby,
    navigationOptions:{
      header:null
    }
  },
  editCollection:{
    screen:editCollection,
    navigationOptions:{
      header:null
    }
  },
  imgPreview:{
    screen:imgPreview,
    navigationOptions:{
      header:null
    }
  },
  newOldFilter:{
    screen:newOldFilter,
    navigationOptions:{
      header:null
    }
  },
  periodiFeeds:{
    screen:periodiFeeds,
    navigationOptions:{
      header:null
    }
  },
  periodiIssues:{
    screen:periodiIssues,
    navigationOptions:{
      header:null
    }
  },
  menu:{
    screen:menu,
    navigationOptions:{
      header:null
    },
  },
  reportIssue:{
    screen:reportIssue,
    navigationOptions:{
      header:null
    }
  },
  quoteCreation:{
    screen:quoteCreation,
    navigationOptions:{
      header:null
    }
  },
  replyComment:{
    screen:replyComment,
    navigationOptions:{
      header:null
    }
  },
  seriesArchives:{
    screen:seriesArchives,
    navigationOptions:{
      header:null
    }
  },
  // menu:{
  //   screen:menu,
  //   navigationOptions:{
  //     header:null
  //   },
  // },
  seriesFeed:{
    screen:seriesFeed,
    navigationOptions:{
      header:null
    }
  },
  booksPinFilter:{
    screen:booksPinFilter,
    navigationOptions:{
      header:null
    }
  },
  editSection:{
    screen:editSection,
    navigationOptions:{
      header:null
    }
  },
  editPins:{
    screen:editPins,
    navigationOptions:{
      header:null
    }
  },
  sectionDetail:{
    screen:sectionDetail,
    navigationOptions:{
      header:null
    }
  },
  seriesViewBook:{
    screen:seriesViewBook,
    navigationOptions:{
      header:null
    }
  },
  searchDetail:{
    screen:searchDetail,
    navigationOptions:{
      header:null
    }
  },
  periodiViewBook:{
    screen:periodiViewBook,
    navigationOptions:{
      header:null
    }
  },
  profileAbout:{
    screen:profileAbout,
    navigationOptions:{
      header:null
    }
  },
  
  readingBook:{
    screen:readingBook,
    navigationOptions:{
      header:null
    }
  },
  createSection:{
    screen:createSection,
    navigationOptions:{
      header:null
    }
  },
  editCreateSection:{
    screen:editCreateSection,
    navigationOptions:{
      header:null
    }
  },
  report:{
    screen:report,
    navigationOptions:{
      header:null
    }
  },
  reportThankyou:{
    screen:reportThankyou,
    navigationOptions:{
      header:null
    }
  },
  requestCreator:{
    screen:requestCreator,
    navigationOptions:{
      header:null
    }
  },
  offline:{
    screen:offline,
    navigationOptions:{
      header:null
    }
  },
  pins1:{
    screen:pins1,
    navigationOptions:{
      header:null
    }
  },
  settingsAccount:{
    screen:settingsAccount,
    navigationOptions:{
      header:null
    }
  },
  emailNotification:{
    screen:emailNotification,
    navigationOptions:{
      header:null
    }
  },
  books_pin:{
    screen:books_pin,
    navigationOptions:{
      header:null
    }
  },
  profileCollection:{
    screen:profileCollection,
    navigationOptions:{
      header:null
    }
  },
  profileShelves:{
    screen:profileShelves,
    navigationOptions:{
      header:null
    }
  },
  search_explore:{
    screen:search_explore,
    navigationOptions:{
      header:null
    }
  },
  createCollection:{
    screen:createCollection,
    navigationOptions:{
      header:null
    }
  },
  settings:{
    screen:settings,
    navigationOptions:{
      header:null
    }
  },
  sectionFilter:{
    screen:sectionFilter,
    navigationOptions:{
      header:null
    }
  },
  viewBook:{
    screen:viewBook,
    navigationOptions:{
      header:null
    }
  },
  exploreSearch:{
    screen:exploreSearch,
    navigationOptions:{
      header:null
    }
  },
  notification:{
    screen:notification,
    navigationOptions:{
      header:null
    }
  },
  readlater:{
    screen:readlater,
    navigationOptions:{
      header:null
    },
  },
  followsubscribe:{
    screen:followsubscribe,
    navigationOptions:{
      header:null
    }
  },
  bookmarks:{
    screen:bookmarks,
    navigationOptions:{
      header:null
    },
  },
  
  
 
  comments:{
    screen:comments,
    navigationOptions:{
      header:null
    }
  },
  pins:{
    screen:pins,
    navigationOptions:{
    header:null,
  },
  },
  reminders:{
    screen:reminders,
    navigationOptions:{
      header:null
    }
  },
  
  newsfeed:{
    screen:newsfeed,
    navigationOptions:{
    header:null,
  },
  },
  qrcode:{
    screen:qrcode,
    navigationOptions:{
      header:null
    },
  },
  
// home:{
//   screen:home,
//   navigationOptions:{
//   header:null,
// },
// },


filter:{
  screen:filter,
  navigationOptions:{
    header:null
  },
},
readsCollection:{
  screen:readsCollection,
  navigationOptions:{
    header:null,

  }
},

mergeCollection:{
  screen:MergeCollection,
  navigationOptions:{
    header:null
  },
},
editCollection1:{
  screen:EditCollection1,
  navigationOptions:{
    header:null,

  }
},
removeCollection:{
  screen:RemoveCollection,
  navigationOptions:{
    header:null,

  } 
},
subCollectionMerge:{
  screen:subCollectionMerge,
  navigationOptions:{
    header:null,

  } 
},
thankyou: {
  screen: thankyou,
  navigationOptions: {
    header: null,
},
},
mergeSection:{
  screen:MergeSection,
  navigationOptions:{
    header:null
  },
},
editSection1:{
  screen:EditSection1,
  navigationOptions:{
    header:null,

  }
},
removeSection:{
  screen:RemoveSection,
  navigationOptions:{
    header:null,

  } 
},
subSectionMerge:{
  screen:subSectionMerge,
  navigationOptions:{
    header:null,

  } 
},
newSignup: {
  screen: newSignup,
  navigationOptions: {
    header: null,
},
},
  }
  );
  const FullStack=createStackNavigator({
 
 
    Onboarding: {
      screen: onboarding,
      navigationOptions: {
        header: null,
    },
    
    },
    privacyPolicy:{
      screen:privacyPolicy,
      navigationOptions:{
      header:null,
    },
    },
    thankyou: {
      screen: thankyou,
      navigationOptions: {
        header: null,
    },
    },
  loginSignup: {
    screen: loginSignup,
    navigationOptions: {
      header: null,
  },
  },
  newSignup: {
    screen: newSignup,
    navigationOptions: {
      header: null,
  },
  },
  confirmEmail: {
    screen: confirmEmail,
    navigationOptions: {
      header: null,
  },
  },
  forgotpwd:{
    screen:forgotpwd,
    navigationOptions:{
    header:null,
  },
  },
  signin: {
    screen: signin,
    navigationOptions: {
      header: null,
  },
  },
  resetpwd: {
    screen: resetpwd,
    navigationOptions: {
      header: null,
  },
  
  },
  TermsAndCondition: {
    screen: TermsAndCondition,
    navigationOptions: {
      header: null,
  },
  
  },
 
 
  })
 
  const MainDrawer = createDrawerNavigator({
    MainTabs: HomeNavigator,
    
    // Settings: SettingsStack,
  },
  {
    contentComponent: menu,
    drawerWidth: width/1.2,
    borderBottomEndRadius:40
  
  });
  
  const AppModalStack = createStackNavigator(
    {
      App: MainDrawer,
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );
  
  const App = createStackNavigator({
   
    App2: {
      screen: AppModalStack,
      navigationOptions:{
        header:null
      }
    },
    StacksView: {
      screen: FullStack,
      navigationOptions:{
        header:null
      }
    },
  
  },
  {'initialRouteName':'StacksView'}); 
 
  
  export default createAppContainer(App);