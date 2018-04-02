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
    $.ajax({
      url: configUtil.getCurrentUser(),
      type: "GET",
      dataType: "json",
      complete: function(xhr, status) {
          if(xhr.status === 200 && xhr.statusText === "success") { 
              var user = xhr.responseJSON;
              var changePwd;
              if(user.changePwd) {
                  changePwd = true;
              }
              configUtil.currentUser = user;
              header.renderProfile(widgetContainer, user, ['logout']);
              renderNavigation(string, changePwd);
          } else {
              window.location.href = "/login.html";
          }
      }
    });

    header.renderTitle(domNode);
    
}
renderHeader();


var renderNavigation = function(string, hideSetting) {
    var navItems = [];

    if(!hideSetting) {
        var accountManagement = {
            id: "accontSetting",
            title: string.ACCOUNT_INFORMATION,
            active: true
        }
        navItems.push(accountManagement);
    }
    
    var pwdManagement = {
      id: "changePassword",
      title: string.PASSWORD_MANAGE,
      active: hideSetting ? true : false
    }
    navItems.push(pwdManagement);
    
    if(!configUtil.isAdmin()) {
       var homepage = {
           id: "go_homepage",
           title: string.BACK_HOMEPAGE
       }
       navItems.push(homepage);
    }
    

    var navigation = new $.Navigation({navItems: navItems});
    navigation.renderNavigation(document.getElementById("navigation"));
}