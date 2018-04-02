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
                header.renderProfile(widgetContainer, user, ['logout']);
            } else {
                window.location.href = './login.html';
            }
        }
    });
    header.renderTitle(domNode);
}

var renderNavigation = function(string) {
    var navItems = [];

    var userManagement = {
      id: "userManagement",
      title: string.USER_MANAGEMENT,
      active: true
    }
    navItems.push(userManagement);

    var machManagement = {
      id: "machManagement",
      title: string.MACHINE_MANAGEMENT
    }
    navItems.push(machManagement);

    var RFDeviceManagement = {
      id: "RFDeviceManagement",
      title: string.RF_MANAGERMENT
    };
    navItems.push(RFDeviceManagement);
    
    var scenarioManagement = {
      id: "scenarioManagement",
      title: string.SCENARIO_MANAGERMENT
    }
    navItems.push(scenarioManagement);

    var vmManagement = {
      id: "vmManagement",
      title: string.VM_MANAGERMENT
    }
    navItems.push(vmManagement);

    var adminManageTest = {
      id: "adminManageTest",
      title: string.TEST_MANAGERMENT
    }
    navItems.push(adminManageTest);
    var navigation = new $.Navigation({navItems: navItems});
    navigation.renderNavigation(document.getElementById("banner"));
}
/*
var renderMainContainer = function () {
    var domNode = document.getElementById("mainContainer");
    var container = new $.ManContainer({imgSrc: "../resource/images/cover-site-7.jpg"});
    container.renderManContainer(domNode);
}
renderMainContainer();
*/
renderHeader();
renderNavigation(string);