Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.







registerComponent=registerComponent;exports.








getCurrentTheme=getCurrentTheme;exports.



createStyle=createStyle;var _reactNative=require('react-native');var _ThemedStyle=require('./ThemedStyle');var _ThemedStyle2=_interopRequireDefault(_ThemedStyle);var _detectTheming=require('./detectTheming');var _detectTheming2=_interopRequireDefault(_detectTheming);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var allStyles=[];var allThemes=[];var allComponents=[];function registerComponent(component){allComponents.push(component);return function(){var idx=allComponents.indexOf(component);allComponents.splice(idx,1);};}var currentTheme=null;function getCurrentTheme(){return currentTheme;}function createStyle(stylesObject){
var themedStyles={};
var nonThemedStyles={};

Object.keys(stylesObject).forEach(function(key){
var style=stylesObject[key];


var themed=Object.keys(style).find(function(styleName){return(0,_detectTheming2.default)(style[styleName]);});

if(themed){
var id=allStyles.push(style);

allThemes.forEach(function(theme){return theme.addStyle(style);});
themedStyles[key]=new _ThemedStyle2.default(id);
}else{
nonThemedStyles[key]=style;
}
});

return _extends(themedStyles,_reactNative.StyleSheet.create(nonThemedStyles));
}var

Theme=function(){
function Theme(def,name){var _this=this;_classCallCheck(this,Theme);
this.def=def;
this.name=name;



this.styles=allStyles.map(function(style){return _this.parseStyle(style);});
allThemes.push(this);

if(currentTheme===null){
currentTheme=this;
}
}_createClass(Theme,[{key:'addStyle',value:function addStyle(

style){
this.styles.push(this.parseStyle(style));
}},{key:'mapStyle',value:function mapStyle(

style){var _this2=this;
var mapped={};
Object.keys(style).forEach(function(styleName){
var styleValue=style[styleName];
mapped[styleName]=_this2.parse(styleValue);
});
return mapped;
}},{key:'parseStyle',value:function parseStyle(

style){
var mapped=this.mapStyle(style);
return _reactNative.StyleSheet.create({mapped:mapped}).mapped;
}},{key:'parse',value:function parse(

value){var _this3=this;
if((0,_detectTheming2.default)(value)){

var v=this.def[value.substr(1)];
if(v!==undefined&&v!==null){
return v;
}



return value.replace(/@([\w_-]+)/gm,function(match,key){return _this3.def[key];});
}

return value;
}},{key:'apply',value:function apply()

{
if(currentTheme!==this){
currentTheme=this;


allComponents.forEach(function(component){return component.setTheme(currentTheme);});
}
}},{key:'getStyle',value:function getStyle(

style){var _this4=this;
if(style){
if(style.map){
return style.map(function(s){return _this4.getStyle(s);});
}else if(style instanceof _ThemedStyle2.default){
return this.styles[style.id-1];
}else if(typeof style==='object'){
return this.mapStyle(style);
}
}

return style;
}},{key:'getProp',value:function getProp(

value){
return this.parse(value);
}}]);return Theme;}();exports.default=


Theme;