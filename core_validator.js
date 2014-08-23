        $(document).ready(function(){
            $("form").each(function(_i, _fld){
                if($(_fld).onsubmit == undefined){
                    $(_fld).submit(function(){
                        var isValidated = true;
                         $(_fld).find("input").each(function(_j,_input){
                            if(this.type == "text" || this.type == "password"){
                                $(_input).removeAttr("style");
                                var val = $(_input).val();
                                if(val == null || val == ""){ 
                                    if($(_input).attr("required") != undefined){
                                        var msg = $(_input).attr("required");
                                        if(msg.length == 0) msg = "Please enter valid data"; 
                                        else msg = msg.substr(msg.indexOf("{")+1,msg.indexOf("}") - 1);
                                        alert(msg);
                                        highlight(_input);
                                        isValidated = false;
                                        return isValidated;
                                    }
                                }else{
                                    var _elm_value = $(_input).val();
                                    if($(_input).attr("email") != undefined){
                                        var email = $(_input).attr("email");
                                        if(email.length > 0){
                                            email = email.substr(email.indexOf("{")+1,email.indexOf("}") - 1);
                                            _conditions = email.split(",");
                                            for(i = 0; i < _conditions.length; i++){
                                                _keys = _conditions[i].split(":");
                                                _key = _keys[0];
                                                _value = _keys[1];
                                                if(_key == "length"){
                                                    if(_elm_value.length < parseInt(_value)){
                                                        alert("Minimum "+_value+" characters required");
                                                        highlight(_input);
                                                        isValidated = false;
                                                        return isValidated;                                                            
                                                    }
                                                }else if(_key == "confirm"){
                                                    if($("#"+_value).val() != _elm_value){
                                                        alert("Confirm text is not matching");
                                                        highlight(_input);
                                                        isValidated = false;
                                                        return isValidated;                                                         
                                                    }
                                                }
                                            }
                                            var emailFilter=/^.+@.+\..{2,3}$/;
                                            if (!emailFilter.test(_elm_value)){
                                                alert("Please enter a valid email");
                                                highlight(_input);                                                     
                                                isValidated = false;
                                                return isValidated;
                                            }
                                        }
                                    }
                                    if($(_input).attr("numeric") != undefined){
                                        var alphanum=/^[0-9]+$/;
                                        if (!alphanum.test(_elm_value)){
                                            alert("Please enter only numeric value");
                                            highlight(_input);                                                     
                                            isValidated = false;
                                            return isValidated;                                                
                                        }
                                    }
                                    if($(_input).attr("phone") != undefined){
                                        var re = /^\(?[2-9]\d{2}[\)\.-]?\s?\d{3}[\s\.-]?\d{4}$/
                                        if(!re.test(_elm_value)){
                                            alert("Please enter a valid phone number.  ex: (000)000-0000, (000) 000-0000, 000-000-0000, 000.000.0000, 000 000 0000, 0000000000 ");
                                            highlight(_input);                                                    
                                            isValidated = false;
                                            return isValidated;                                                
                                        }
                                    }                                   
                                }
                            }
                        });
                        return isValidated;
                    });
                }
            });
        });
        function highlight(_e){
            $(_e).attr("style","border:solid #F87217 2px");
            $(_e).focus();            
        }