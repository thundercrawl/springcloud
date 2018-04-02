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
        divForm.appendChild(renderSuccesslable());
        divForm.appendChild(renderErrorlable());
        
        divForm.appendChild(renderButton());

        return divForm;
}

var renderButton = function() {
  var p = document.createElement("p");

      var preButton = document.createElement("button");
      preButton.type = "button";
      preButton.style.display = "inline-block";
      preButton.style.width = "160px";
      preButton.className = "submitButton";
      preButton.appendChild(document.createTextNode(string.PREVIOUS_PAGE));
      preButton.onclick = function() {
          window.location.href = '/';
      }
      p.appendChild(preButton);
      var submitBtn = document.createElement("button");
      submitBtn.type = "button";
      submitBtn.className = "submitButton";
      submitBtn.style.display = "inline-block";
      submitBtn.style.width = "160px";
      submitBtn.onclick = function(){
          if(checkInput()) {
              resetRequest();
          }
      };
      
      submitBtn.value = string.RESET_SUBMIT;
      submitBtn.appendChild(document.createTextNode(string.RESET_SUBMIT));
  p.appendChild(submitBtn);
  return p;

}

var renderErrorlable = function() {
    //var p = document.createElement("p");
    var errorLabel = document.createElement("span");
    errorLabel.id = "errorLabel";
    errorLabel.className = "emptyError hidden";
    //p.appendChild(errorLabel);
    return errorLabel;
}

var renderSuccesslable = function() {
    //var p = document.createElement("p");
    var successLabel = document.createElement("span");
    successLabel.id = "successLabel";
    successLabel.className = "successMessage hidden";
    //p.appendChild(errorLabel);
    return successLabel;
}


var checkInput  = function() {
	var userName = $("input[name=username]").val();
	var email = $("input[name=mailaddress]").val();
    var pass = true;
    if(userName === '') {
        $("#userEmpty").removeClass("hidden");
        pass = false;
    }
    else {
        $("#userEmpty").addClass("hidden");
    }

    if(email === '') {
        $("#emailEmpty").removeClass("hidden");
        pass = false;
    }
    else {
        $("#emailEmpty").addClass("hidden");
    }

    return pass;
}

var resetRequest = function() {
    $("#successLabel").addClass("hidden");
    $("#errorLabel").addClass("hidden");
    var form = $("input");
    var data = {};
    $.each(form, function(i, input) {
        data[input.name] = input.value;
    });
    $.ajax({
      type: 'POST',
      url: configUtil.resetPwd(),
      dataType:"json",
      data: JSON.stringify(data),
      contentType: "application/json",
      complete: function(res) {
          if(res.status === 200) {
              $("#successLabel").text(string.RESET_PASSWORD_SUCCESS);
              $("#successLabel").removeClass("hidden");
              $("#successLabel").addClass("showError");
          }
          else {
              $("#errorLabel").text(string.RESET_PASSWORD_ERROR);
              $("#errorLabel").removeClass("hidden");
              $("#errorLabel").addClass("showError");
          }
      }
    });
}

$(".wrapper").append(renderForm(mockData.resetForm));
$(".wrapper").append(renderbackground());
renderHeader();