var string = languages[0].content;
var pageTitle = document.createElement("title");
pageTitle.appendChild(document.createTextNode(string.TITLE));
$("head").append(pageTitle);
var formData = {};
var renderHeader = function() {
    var domNode = document.getElementById("banner");
        var widgetContainer = document.createElement("div");
        widgetContainer.id = "widgetContainer";
        domNode.appendChild(widgetContainer);

    var lang = []; 
    for(var i=0; i<languages.length; i++) {
      lang.push(languages[i].lang);
    }
    var switcher = new $.LanguageSwitcher({lang: lang});
    switcher.render(widgetContainer);
    
    var header = new $.Header({
      string: string, 
      imgSrc: "../resource/images/logo-taier.png",
    });

    header.renderTitle(domNode);
}

var renderbackground =function(){
    var div = document.createElement("div");
    div.className = "registerback";
    div.setAttribute("style", "float:left");
    var img = document.createElement("img");
    img.src = "../resource/images/beidou.jpg";
    div.appendChild(img);
    return div;
}

var renderForm = function(args) {
    var data;
    if(args.phase === 1) {
        data = mockData.getRegisterForm({phase: 1});
    } else if(args.phase === 2) {
        data = mockData.getRegisterForm({phase: 2});
    }
    var divForm  = document.getElementById("regForm");
    if(divForm) {
        $("#regForm").empty();
    } else {
        divForm = document.createElement("div");
        divForm.id = "regForm";
        divForm.className = "form";
    }
        
        var h4 = document.createElement("h4");
        h4.appendChild(document.createTextNode(string.MANDATORY_DATA));
        divForm.appendChild(h4);

        var form = document.createElement("form");
        divForm.appendChild(form);

        $.each(data, function(i, val) {
            var p = document.createElement("p");

                var label = document.createElement("label");
                if(val.must) {
                    var span = document.createElement("span");
                    span.appendChild(document.createTextNode('*'));
                    span.className = 'mandatory';
                    label.appendChild(span);
                }
                label.appendChild(document.createTextNode(val.label));
            p.appendChild(label);
                var input = document.createElement("input");
                input.placeholder = val.input.placeholder;
                input.name = val.input.name;
	            input.type = val.input.type;
            p.appendChild(input);
                if(val.must) {
                    var span = document.createElement("span");
                    span.id = val.span.id;
                    span.appendChild(document.createTextNode(val.span.label));
                    span.className = "emptyError hidden";
                    p.appendChild(span);
                }
            form.appendChild(p);
        });
        
        divForm.appendChild(renderButton(args));

        var p2 = document.createElement("p");
            var errorLabel = document.createElement("span");
            errorLabel.id = "errorLabel";
            errorLabel.className = "emptyError hidden";
        p2.appendChild(errorLabel);
        divForm.appendChild(p2);

        return divForm;
}

var renderButton = function(args) {
    var p = document.createElement("p");
        var submitBtn = document.createElement("button");
        submitBtn.type = "button";
        submitBtn.className = "submitButton";
        submitBtn.value = string.SUBMIT_LOGIN;
        
    p.appendChild(submitBtn);
    if(args.phase === 1) {
        submitBtn.appendChild(document.createTextNode(string.REGISTER_NEXT));
        submitBtn.onclick = function(){
            if(checkInput()) {
                setFormData();
                renderForm({phase: 2});
            }
        };
    } else if(args.phase === 2) {
        var preButton = document.createElement("button");
        preButton.type = "button";
        preButton.style.display = "inline-block";
        preButton.style.width = "160px";
        preButton.className = "submitButton";
        preButton.appendChild(document.createTextNode(string.PREVIOUS_PAGE));
        preButton.onclick = function() {
            resetFormData();
            renderForm({phase: 1});
        }
        p.insertBefore(preButton, submitBtn);

        submitBtn.appendChild(document.createTextNode(string.SUBMIT_REGISTER));
        submitBtn.style.display = "inline-block";
        submitBtn.style.width = "160px";
        submitBtn.onclick = function(){
            if(checkInput()) {
                setFormData();
                registerRequest();
            }
        };
    }

    return p;
}


var checkInput  = function() {
	var userName = $("input[name=name]").val();
	var pwd = $("input[name=password]").val();
	var confpwd = $("input[name=confPassword]").val();
    var email = $("input[name=email]").val();
    var pass = true;
    if(userName === '') {
        $("#userEmpty").removeClass("hidden");
        pass = false;
    }
    else {
        $("#userEmpty").addClass("hidden");
    }

    if(pwd === '') {
        $("#pwdEmpty").removeClass("hidden");
        pass = false;
    }
    else {
        $("#pwdEmpty").addClass("hidden");
    }

    if(email === '') {
        $("#emptyEmail").removeClass("hidden");
        pass = false;
    }
    else {
        $("#emptyEmail").addClass("hidden");
    }

    if(confpwd === '') {
        $("#pwdConfirmEmpty").removeClass("hidden");
        $("#pwdConfirmEmpty").text(string.CONFIRM_PASSWORD.EMPTY_CONFIRM_PASSWORD);
        pass = false;
    }
    else {
        $("#pwdConfirmEmpty").addClass("hidden");
    }

    if(pwd != '' && confpwd != '' ) {
        if(pwd !== confpwd) {
           $("#pwdConfirmEmpty").removeClass("hidden");
           $("#pwdConfirmEmpty").text(string.PASSWORD_MISMATCH);
           pass = false;
        }
        else {
            $("#pwdConfirmEmpty").addClass("hidden");
        }
    }
    return pass;
}

var resetFormData = function() {
    formData = {};
}

var setFormData = function() {
    var form = $("input");
    $.each(form, function(i, input) {
        if(input.name != "confPassword")
            formData[input.name] = input.value;
    });
}

var registerRequest = function() {
    var data = formData;
    data.dateCreated = "";
    data.role = "1";
    $.ajax({
        type:"POST",
        url: configUtil.register(),
        dataType:"json",
        data: JSON.stringify(data),
        contentType: "application/json",
        complete: function(res) {
            if(res.status === 200) {
                $("#errorLabel").addClass("hidden");
                window.location.href = '/'
            } else if(res.status === 409) {
                var errorString = string.SAME_ACCOUNT_ERROR;
                $("#errorLabel").text(errorString);
                $("#errorLabel").removeClass("hidden");
            } else {
                $("#errorLabel").text(res.responseText);
                $("#errorLabel").removeClass("hidden");
            }
        }
    });
}

var getDate = function() {
    var d = new Date(),str = '';
    str += d.getFullYear()+'-';
    str += d.getMonth() + 1+'-';
    str += d.getDate()+'-';
    str += d.getHours()+'-'; 
    str += d.getMinutes()+'-'; 
    str += d.getSeconds(); 
    return str;
}

$(".wrapper").append(renderForm({phase: 1}));
$(".wrapper").append(renderbackground());
renderHeader();