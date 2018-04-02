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
              configUtil.currentUser = user;
              header.renderProfile(widgetContainer, user, ['accountSetting', 'logout']);   
          } else {
              header.renderLogIn(widgetContainer);
          }
      }
    });

    header.renderTitle(domNode);
}

var renderNavigation = function(string) {
    var navItems = [];
    var home = {
      id: "homepage",
      title: string.HOME_PAGE,
      active: true
    };
    navItems.push(home);
    
    var scenarioDownload = {
      id: "scenarioDownload",
      title: string.SCENARIO_DOWNLOAD
    };
    navItems.push(scenarioDownload);

    var testSubmit = {
      id: "testSubmit",
      title: string.TEST_SUBMIT
    };
    navItems.push(testSubmit);

    var testHistory = {
      id: "testHistory",
      title: string.TEST_HISTORY
    };
    navItems.push(testHistory);

    var testStatus = {
      id: "testStatus",
      title: string.TEST_STATUS
    };
    navItems.push(testStatus);

    var machManagement = {
      id: "machManagement",
      title: string.MACHINE_MANAGEMENT
    };
    navItems.push(machManagement);
    
    var RFDeviceManagement = {
      id: "RFDeviceManagement",
      title: string.RF_MANAGERMENT
    };
    navItems.push(RFDeviceManagement);
    
/*
    var vmManagement = {
      id: "vmManagement",
      title: string.VM_MANAGERMENT
    }
    navItems.push(vmManagement);
*/
    var contacts = {
      id: "contacts",
      title: string.CONTACT
    };
    navItems.push(contacts);

    var navigation = new $.Navigation({navItems: navItems});
    navigation.renderNavigation(document.getElementById("banner"));
}

/*
var renderMainContainer = function () {
    var domNode = document.getElementById("mainContainer");
    var opts = {
        imgSrc: "../resource/images/cover-site-7.jpg"
    }
    var container = new $.ManContainer(opts);
    container.renderManContainer(domNode);
}
*/
//renderMainContainer();
renderHeader();
renderNavigation(string);


