Object.defineProperty(exports,"__esModule",{value:true});exports.Container=exports.getCurrentTheme=exports.createThemedComponent=exports.createStyle=undefined;exports.


























createTheme=createTheme;var _reactNative=require('react-native');var _createThemedComponent=require('./createThemedComponent');var _createThemedComponent2=_interopRequireDefault(_createThemedComponent);var _Theme=require('./Theme');var _Theme2=_interopRequireDefault(_Theme);var _Container=require('./Container');var _Container2=_interopRequireDefault(_Container);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default={View:(0,_createThemedComponent2.default)(_reactNative.View),Image:(0,_createThemedComponent2.default)(_reactNative.Image,['source']),Text:(0,_createThemedComponent2.default)(_reactNative.Text),ImageBackground:(0,_createThemedComponent2.default)(_reactNative.ImageBackground,['source']),AnimatedView:(0,_createThemedComponent2.default)(_reactNative.Animated.View),AnimatedImage:(0,_createThemedComponent2.default)(_reactNative.Animated.Image,['source']),AnimatedText:(0,_createThemedComponent2.default)(_reactNative.Animated.Text),Container:_Container2.default};exports.createStyle=_Theme.createStyle;exports.createThemedComponent=_createThemedComponent2.default;exports.getCurrentTheme=_Theme.getCurrentTheme;exports.Container=_Container2.default;function createTheme(definition,name){
return new _Theme2.default(definition,name);
}