var _form;
function SQS(){}
SQS.prototype = {
    _parameters : "",
    request : function (url){
        if((_url = url).indexOf("?") != -1){
            _url = url.substr(0,url.indexOf("?"));
            _qstring = url.substr(url.indexOf("?") + 1 );
            o._parameters = _qstring.split("&");
        }
        o.createForm();
        o.createInputElements();
        document.getElementById('_s_p').action = _url;
        document.getElementById('_s_p').submit();        
    },
    createForm : function(){
        _form = document.createElement("form");   
        _form.setAttribute("id","_s_p");   
        _form.setAttribute("name","_secure_post");       
        _form.setAttribute("method","post");
        _form.setAttribute("style","padding:0px !important; margin:0px !important;");        
        document.getElementsByTagName('body')[0].appendChild(_form);
    },
    createInputElements : function(){
        for(i = 0; i < o._parameters.length; i++){
            var _elm = document.createElement("input");
            _cur_param = o._parameters[i];
            _elm.setAttribute("type","hidden");         
            _elm.setAttribute("name",_cur_param.substr(0,_cur_param.indexOf("=")));   
            _elm.setAttribute("value",_cur_param.substr(_cur_param.indexOf("=") + 1));   
            _form.appendChild(_elm);
        }
    }    
}
var o; window.onload = function () {  o = new SQS(); }
