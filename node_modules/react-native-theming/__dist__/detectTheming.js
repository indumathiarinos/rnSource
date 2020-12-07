Object.defineProperty(exports,"__esModule",{value:true});exports.default=detectTheming;function detectTheming(value){
return typeof value==='string'&&(value[0]==='@'||value.indexOf('@')>=0);
}