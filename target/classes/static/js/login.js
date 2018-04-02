var string = languages[0].content;
var pageTitle = document.createElement("title");
pageTitle.appendChild(document.createTextNode(string.TITLE));
$("head").append(pageTitle);
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

var renderForm = function(data) {
    var divForm = document.createElement("div");
        divForm.id = "loginForm";
        divForm.className = "form";
        var form = document.createElement("form");
        divForm.appendChild(form);

        $.each(data, function(i, val) {
            var p = document.createElement("p");
                var label = document.createElement("label");
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
        divForm.appendChild(renderErrorlable());
        var p1 = document.createElement("p");
            var submitBtn = document.createElement("button");
            submitBtn.type = "button";
            submitBtn.className = "submitButton";
            submitBtn.onclick = function(){
                if(checkInput()) {
                    loginRequest();
                }
            };
            
            submitBtn.value = string.SUBMIT_LOGIN;
            submitBtn.appendChild(document.createTextNode(string.SUBMIT_LOGIN));
        p1.appendChild(submitBtn);
        divForm.appendChild(p1);

        divForm.appendChild(renderLink());
        return divForm;
}

renderLink = function() {
    var h4 = document.createElement("h4");
        h4.appendChild(document.createTextNode(string.NOT_A_MEMBER));

        var regLink = document.createElement("a");
        regLink.id = "registerLink";
        regLink.onclick = function() {
            window.open('./registration.html');
        }
        regLink.appendChild(document.createTextNode(string.REGISTER));
        h4.appendChild(regLink)

        h4.appendChild(document.createTextNode(" / "))

        var resetLink = document.createElement("a");
        resetLink.id = "registerLink";
        resetLink.onclick = function() {
            window.open('./reset.html');
        }
        resetLink.appendChild(document.createTextNode(string.RESET_PASSWORD));
        h4.appendChild(resetLink)
        
    return h4;
}

var renderErrorlable = function() {
    //var p = document.createElement("p");
    var errorLabel = document.createElement("span");
    errorLabel.id = "errorLabel";
    errorLabel.className = "emptyError hidden";
    //p.appendChild(errorLabel);
    return errorLabel;
}


var checkInput  = function() {
	var userName = $("input[name=username]").val();
	var pwd = $("input[name=password]").val();
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

    return pass;
}

var loginRequest = function() {
    $("#errorLabel").addClass("hidden");
    var form = $("#loginForm form").serialize();
    $.ajax({
      type: 'POST',
      url: configUtil.login(),
      data: form,
      processData: false,
      complete: function(res) {
          if(res.status === 200) {
              $.ajax({
                  url: configUtil.getCurrentUser(),
                  type: "GET",
                  dataType: "json",
                  complete: function(xhr) {
                      if(xhr.status === 200 && xhr.statusText === "success") {
                          var user = xhr.responseJSON;
                          if(user.changePwd) {
                              window.location.href = './account.html';
                          }
                          else if(user.role === "ROLE_ADMIN") {
                              window.location.href = './admin.html';
                          }
                          else {
                              window.location.href = '/'
                          }
                      } else {
                          $("#errorLabel").text(string.LOGIN_ERROR);
                          $("#errorLabel").removeClass("hidden");
                          $("#errorLabel").addClass("showError");
                      }
                  }
              });  
          }
          else {
              $("#errorLabel").text(res.responseText);
              $("#errorLabel").removeClass("hidden");
              $("#errorLabel").addClass("showError");
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

$(".wrapper").append(renderForm(mockData.LoginForm));
$(".wrapper").append(renderbackground());
renderHeader();