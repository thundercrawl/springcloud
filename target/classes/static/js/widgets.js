(function ($) {

    downloadFile = function(url) {
        var anchor = document.getElementById("downloadAnchor");
        if(!anchor) {
            anchor = document.createElement("a");
            anchor.id = "downloadAnchor";
            anchor.setAttribute("style","display:none");
            anchor.setAttribute("method", "get");
            anchor.setAttribute("target", "_blank");
            document.body.appendChild(anchor);
        }
        anchor.download = "report.zip";
        anchor.setAttribute("href", url);
        anchor.click();
    }
    uploadRequest = function(formData, url, cb) {
        var oXHR = getXMLHttp();
        oXHR.open("post", url, true);
        oXHR.withCredentials = true;

        oXHR.upload.onprogress = function(event) {
            var progress = event.lengthComputable ? (event.loaded * 100) / event.total : 0;
            var str = progress.toString();
            var precent = str.indexOf(".") > -1 ? str.substring(0, str.indexOf(".")) : str;
            $("#progressBar").css("width", precent + "%");
            $("#progressBar").text(precent + "%");
        };
        oXHR.onload = function() {
            cb(oXHR);
        };

        oXHR.send(formData);
    }

    getXMLHttp = function() {
        var xmlHttp = new XMLHttpRequest();
        if(!xmlHttp) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    }

    var messageHandle = function(message) {
        $("#messageBox").empty();
        var divContainer = document.createElement("div");
        
        var img = document.createElement("img");
        if(message.type === 'success') {
            img.src = '../resource/images/tick.png';
        } else if(message.type === 'error') {
            img.src = '../resource/images/error.png';
        }
        divContainer.appendChild(img);

        var span = document.createElement("span");
        span.appendChild(document.createTextNode(message.body));
        divContainer.appendChild(span);

        var close = function() {
            $("#messageBox").fadeOut();
        }

        var a = document.createElement("a");
        a.id = 'closeMessageBox';
            var imgClose = document.createElement("img");
            imgClose.src = '../resource/images/icon_close.png';
        a.appendChild(imgClose);
        a.onclick = close;
        divContainer.appendChild(a);

        $("#messageBox").append(divContainer);
        $("#messageBox").fadeIn();

        setTimeout(function() {
            close();
        },10000);
    }

    viewerErrorMessage = function(message) {
        $("#viewerMessage").empty();
        var domNode = $("#viewerMessage")[0];
        var img = document.createElement("img");
            img.src = '../resource/images/error.png';
        domNode.appendChild(img);

        var span = document.createElement("span");
        span.appendChild(document.createTextNode(message));
        domNode.appendChild(span);

        var close = function() {
            $("#viewerMessage").fadeOut();
        }

        var a = document.createElement("a");
        a.id = 'closeMessageBox';
            var imgClose = document.createElement("img");
            imgClose.src = '../resource/images/icon_close.png';
        a.appendChild(imgClose);
        a.onclick = close;
        domNode.appendChild(a);
        $("#viewerMessage").fadeIn();
    }
/*
    var scrollTop = function(id) {
        var domNode = $(id);
        var banner= $("#banner");
        var top = domNode.offset().top - (parseInt(domNode.css("margin-top")) + parseInt(banner.css("padding-top")) +
            parseInt(banner.css("padding-bottom")) + banner.height());
        $("html,body").animate({"scrollTop": top}, "slow");
    }
*/
    var formDate = function(value) {
        var date = new Date(value);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

        return year + "/" + month + "/" + day + " " + time;
    }

    var formatFrequence = function(value) {
        switch(value) {
            case 'FrequencePointTwo': return {index: 2, value: 'BDB2'};
            case 'FrequencePointOne': return {index: 1, value: 'GPSL1&BDB1'};
            case 'FrequencePointThree': return {index: 3, value: 'BDB3'};
            case 'FrequencePointFour': return {index: 4, value: 'GNR2'};
            case 'FrequencePointFive': return {index: 5, value: 'GPSL2'};
            case 'FrequencePointSix': return {index: 6, value: 'GPSL5'};
            default: return "";
        }
    }

    var formSize =  function(value){
        if(null==value||value==''){
            return "0 Bytes";
        }
        var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
        var index=0;
        var srcsize = parseFloat(value);
        index=Math.floor(Math.log(srcsize)/Math.log(1024));
        var size =srcsize/Math.pow(1024,index);
        size=size.toFixed(2);
        return size+unitArr[index];
    }

    var renderModelLayer = function() {
        var div = document.createElement("div");
            div.className = "modelBackground";
            div.id = "modelLayer";
            div.style= "display:none";
//        var top = $("body").scrollTop() || $("html").scrollTop();
//        top = "top: " +  top.toString() + "px";
//        div.setAttribute("style", top);
        document.body.appendChild(div);
        return div;
    }

    var setDropDownMeun = function(menuItem) {
        var menu = {
            accountSetting: {
                label: string.ACCOUNT_SEETING,
                handle: function(e) {
                    window.location.href = './account.html';
                }
            }, 
            logout: {
                label: string.LOG_OUT,
                handle: function(e) {
                    $.ajax({
                        url: configUtil.logout(),
                        type: 'GET',
                        complete: function(xhr) {
                            if(xhr.status === 200) {
                                window.location.href = './login.html';
                            }
                        }
                    });
                }
            }
        };

        for(var i=0; i<languages.length; i++) {
            menu[languages[i].lang] = {
                label: languages[i].lang,
                handle: function(e) {
                    
                }
            }
        }
        
        var filter = [];
        $.each(menuItem, function(index, item) {
            if(menu[item]) {
                filter.push(menu[item]);
            }
        });
        return filter;
    }

    var sendRequest = function(args) {
        url = args.url;
        type = args.type;
        callback = args.cb;
        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            complete: function(xhr) {
                if(xhr.getResponseHeader('content-type') === 'text/html') {
                    window.location.href = './login.html';
                } else {
                    callback(xhr);
                }
            }
        });
    };

    $.Header = function (args) {
        var title = args.title;
        var imgSrc = args.imgSrc;
        var string = args.string;
 
        this.renderTitle = function(domNode) {
            var divHeader = document.createElement("div");
            divHeader.id = "header";
            
            if($.isArray(imgSrc)) {
                for(var i=0; i<imgSrc.length; i++) {
                    var img = document.createElement("img");
                        img.src = imgSrc[i];
                    divHeader.appendChild(img);
                }
            }
            else {
                var img = document.createElement("img");
                img.src = imgSrc;
                divHeader.appendChild(img);
            }

            if(title)
                divHeader.appendChild(document.createTextNode(title));
            domNode.appendChild(divHeader);
        };

        this.renderProfile = function(domNode, user, menuItem) {
            var div =document.createElement("div");
            div.id = "userCard";
            var span = document.createElement("span");
            span.appendChild(document.createTextNode(user.name));
            div.appendChild(span)
            domNode.appendChild(div);
            $("#userCard").click(function(){
                var menuItems = setDropDownMeun(menuItem);;
                var dropDown = new $.DropDownMenu();
                dropDown.renderDropDown("#userCard", menuItems);
            });
        }

        this.renderLogIn = function(domNode) {
            var div =document.createElement("div");
            div.id = "login";
            var span = document.createElement("span");
            span.appendChild(document.createTextNode(string.LOG_IN));
            div.appendChild(span)
            domNode.appendChild(div);
            
            var th = this;
            $("#login").click(function(){
                window.location.href = './login.html';
                /*
                th.renderLogInDialog(document.body);
                
                $("#modelLayer").fadeIn(500);

                $("#closeLink").click(function(){
                    $("#loginDialog").fadeOut(500, function(){
                        $("#modelLayer").remove();
                    });
                });
                */
            });
        }

        this.renderLogInDialog = function (domNode) {

            var dialogFrame = document.createElement("div");
            dialogFrame.id = "loginDialog";
            dialogFrame.className = "dialogFrame";

            var divClose = document.createElement("div");
            divClose.className = "closeLink";
            divClose.id = "closeLink";
            dialogFrame.appendChild(divClose);

            var divTitle = document.createElement("div");
            divTitle.className = "dialogTitle";
            var h2 = document.createElement("h2");
            h2.appendChild(document.createTextNode(string.USER_LOGIN));
            divTitle.appendChild(h2);
            dialogFrame.appendChild(divTitle);
            
            var divForm = document.createElement("div");
            divForm.id = "logInForm";
            divForm.className = "form";
            var form = document.createElement("form");
            divForm.appendChild(form);
            
            var p1 = document.createElement("p");
            var userInput = document.createElement("input");
            userInput.placeholder = string.USER.INPUT_ACCOUNT;
            userInput.name = "name";
            userInput.type = "text";
            p1.appendChild(userInput);
            form.appendChild(p1);

            var p2 = document.createElement("p");
            var userInput = document.createElement("input");
            userInput.placeholder = string.PASSWORD.INPUT_PASSWORD;
            userInput.name = "password";
            userInput.type = "password";
            p2.appendChild(userInput);
            form.appendChild(p2);

            var p3 = document.createElement("p");
            var submitBtn = document.createElement("button");
            submitBtn.type = "button";
            submitBtn.className = "loginButton";
            submitBtn.value = string.SUBMIT_LOGIN;
            submitBtn.onclick = login;
            submitBtn.appendChild(document.createTextNode(string.SUBMIT_LOGIN));
            p3.appendChild(submitBtn);
            form.appendChild(p3);

            var divReg = document.createElement("div");
            var h4 = document.createElement("h4");
                h4.appendChild(document.createTextNode(string.NOT_A_MEMBER));

                var regLink = document.createElement("a");
                regLink.id = "registerLink";
                regLink.onclick = function() {
                    window.open('./registration.html');
                }
                regLink.appendChild(document.createTextNode(string.REGISTER));
                h4.appendChild(regLink)
            divReg.appendChild(h4);
                

            dialogFrame.appendChild(divForm);
            dialogFrame.appendChild(divReg);

            renderModelLayer().appendChild(dialogFrame);
       }

       var login = function() {
           var form = $("#logInForm form").serialize();
           $.ajax({
                type:"POST",
                url: configUtil.login(),
                processData: false,
                data: form,
                complete: function(res) {
                    if(res.status === 200) {
                        $("#errorLabel").addClass("hidden");
                        window.location.href = '/'
                    }
                    else {
                        $("#errorLabel").text(res.responseText);
                        $("#errorLabel").removeClass("hidden");
                    }
                }
            });
       }
    };

    $.DropDownMenu = function() {
        this.renderDropDown = function(domNode, menuItems) {
            var dropDownMenu = document.getElementById("menuDropDown");
            if(!dropDownMenu) {
                var div = document.createElement("div");
                div.id = "menuDropDown";

                var ul = document.createElement("ul");
                for(var i=0; i < menuItems.length; i++) {
                    var li = document.createElement("li");
                        var a = document.createElement("a");
                        a.appendChild(document.createTextNode(menuItems[i].label));
                        a.onclick = menuItems[i].handle;
                        li.appendChild(a);
                    ul.appendChild(li);
                }
                div.appendChild(ul);

                var offset = $(domNode).offset();
                var position = {
                    left: offset.left,
                    top: $(domNode).height() + parseInt($(domNode).css("padding-top"))
                         + parseInt($(domNode).css("padding-bottom")) + parseInt($(domNode).css("margin-top")),
                    width: $(domNode).width() + parseInt($(domNode).css("padding-left"))
                         + parseInt($(domNode).css("padding-right")),
                }

                $(domNode).append(div);
                this.setPosition(position);
                //var width = $("#menuDropDown").width();
                //$("#menuDropDown").css('width', width);
                //var originWidth = $(domNode).width();
                
                //- (parseInt($(domNode).css("padding-left"))
                //         + parseInt($(domNode).css("padding-right")))
                
                    $("#menuDropDown").slideToggle("slow");
            }
            else {
                $("#menuDropDown").slideToggle("slow", function() {
                    $("#menuDropDown").remove();
                });
                
            }
        }

        this.setPosition = function(position) {       
            $("#menuDropDown").css({
                "position": "fixed",
                "left": position.left,
                "top": position.top,
                "display": "none"
            });
        }
    };

    $.LanguageSwitcher = function(args) {
        var lang = args.lang;

        this.render = function(domNode) {
            var div =document.createElement("div");
            div.id = "langSwitcher";
            var span = document.createElement("span");
            span.appendChild(document.createTextNode(string.LANAGUAGE));
            div.appendChild(span)
            domNode.appendChild(div);

            $("#langSwitcher").click(function() {
                var dropDownMenu = new $.DropDownMenu();
                dropDownMenu.renderDropDown("#langSwitcher", setDropDownMeun(lang));
            });
        };
    };

    $.Navigation = function(args) {
        var navItems = args.navItems;
        this.renderNavigation = function(domNode) {
            var div = document.createElement("div");
            div.id = "tab";
            var ul = document.createElement("ul");
            for(var i=0; i<navItems.length; i++) {
                var navItem = navItems[i];
                var li = document.createElement("li");
                li.appendChild(this.renderItem(navItem));
                ul.appendChild(li);
            }
            div.appendChild(ul);
            domNode.appendChild(div);

        }

        this.handleClick = function(item) {
            this.showContent(item);
            
        }

        this.showContent =function(item) {
            $('#mainContainer').css('display', 'none');
            $('#mainContainer').empty();
            var mainContainer = $("#mainContainer")[0];
            switch (item.id) {
                case "contacts":
                    //scrollTop("#mainContainer");
                    break;
                case "homepage":
                    //scrollTop("#mainContainer");
                    var opts = {
                        imgSrc: "../resource/images/cover-site-7.jpg"
                    }
                    var container = new $.ManContainer(opts);
                    container.renderManContainer(mainContainer);
                    this.renderHomepage($("#content")[0]);   
                    break;
                case "scenarioDownload": 
                    var div = document.getElementById("scenarioDownlaod");
                    if(!div) {
                        div = document.createElement("div");
                        div.id = "scenarioDownlaod";
                        div.className = "table";
                        mainContainer.appendChild(div);
                    } else {
                        $("#scenarioDownlaod").empty();
                    }
                    this.renderScenarioDownload(div);
                    //scrollTop("#scenarioDownlaod");
                    break;
                case "machManagement":
                    this.renderMachManagerment(mainContainer);
                    break;
                case "RFDeviceManagement":
                    this.renderRFManagerment(mainContainer);
                    break;
                case "testManagement":
                    this.renderTestManagerment(mainContainer);
                    break;
                case "userManagement":
                    this.renderUserManagement(mainContainer);   
                    break;
                case "testHistory":
                    this.rendertestHistory(mainContainer);   
                    break;
                case "testSubmit":
                    var div = document.getElementById("testSubmitTable");
                    if(!div) {
                        div = document.createElement("div");
                        div.id = "testSubmitTable";
                        div.className = "table";
                        mainContainer.appendChild(div);
                    } else {
                        $("#testSubmitTable").empty();
                    }
                    this.renderTestSubmit(div);   
                    break;
                case "scenarioManagement":
                    this.renderScenarioManagement(mainContainer);
                    break;
                case "vmManagement":
                    this.renderVmManagerment(mainContainer);
                    break;
                case "accontSetting":
                    this.renderAccountSetting(mainContainer);
                    break;
                case "adminManageTest":
                    this.adminManageTest(mainContainer);
                    break;
                case "changePassword":
                    this.changePassword(mainContainer);
                    break;
                case "testStatus":
                    this.renderTestStatus(mainContainer);
                    break;
                case "go_homepage":
                    window.location.href = '/';
                    break;
            }
            $('#mainContainer').fadeIn('slow');
        }

        this.setActive = function(e) {
          var list = $("#tab li a");
          for(var i=0; i<list.length; i++) {
              var p = list[i].parentNode;
              var className =  p.className;
              if(e.target === list[i]) {
                  list[i].className = "active"
                  if(className.indexOf("selected") < 0) {
                      p.className = className + " selected";
                  }
              }
              else {
                  list[i].className = "";
                  if(className.indexOf("selected") >= 0) {
                      p.className = className.replace("selected", "");
                  }
              }
          }
        }

        this.renderItem = function(navItem) {
            var div = document.createElement("div");
            div.className =  navItem.active ? "navigationItem selected" : "navigationItem";
            var a = document.createElement("a");
            a.appendChild(document.createTextNode(navItem.title));
            a.href = "javascript:void(0)";
            a.className = navItem.active ? "active" : "";

            if(navItem.active) {
                this.showContent(navItem);
            }

            var self = this;
            a.onclick = function(e){
                e.stopPropagation();
                self.setActive(e);
                self.handleClick(navItem);
            };
            div.appendChild(a);
            return div;
        }

        this.renderHomepage = function(domNode) {
            /*
            var news = [
                {
                    topic: string.NEWS.TOPIC_NEWS,
                    content: string.NEWS.NEWS,
                },
                {
                    topic: string.NEWS.TOPIC_INTRODUCTION,
                    content: string.NEWS.INTRODUCTION,
                },
                {
                    topic: string.NEWS.TOPIC_SERVICE,
                    content: string.NEWS.SERVICE
                }
            ]
            */
            var boxWidget = new $.BoxWidget({info: string.HOMEPAGE_INTRODUCE_2});
            boxWidget.render(domNode);
            $("#box").fadeIn("slow");
            
        }

        this.renderMachManagerment = function(domNode) {
            var actions = [];
            var check = {
                id: "check",
                event: function(record) {
                    sendRequest({
                        url: configUtil.getDevice(record.id), 
                        type: 'GET', 
                        cb: function(xhr) {
                            if(xhr.status === 200) {
                                var viewer = new $.Viewer({
                                    data: mockData.AddDeviceForm, 
                                    hideButton: true,
                                    dialogTitle: string.DEVICE_INFORMATION
                                });
                                viewer.render();
                                $("#modelLayer").fadeIn(500);
                                viewer.fillIn({data: xhr.responseJSON, inputDisabled: true});
                            } else if(xhr.status === 400){
                                var message = {
                                    type: "error",
                                    body: string.LOAD_DEVICE_ERROR_AGENT_MISS
                                }
                                messageHandle(message);
                            } else {
                                var message = {
                                    type: "error",
                                    body: string.LOAD_DEVICE_ERROR
                                }
                                messageHandle(message);
                            }
                        }
                    });
                }
            };
            var modify = {
                id: "modify",
                event: function(record) {
                    sendRequest({
                        url: configUtil.modifyDevice(record.id),
                        type: "GET",
                        cb: function(xhr) {
                            if(xhr.status === 200) {
                                var viewer = new $.Viewer({
                                    url: configUtil.modifyDevice(record.id),
                                    context: "device",
                                    data: mockData.AddDeviceForm, 
                                    hideButton: false, 
                                    buttonType: "modify",
                                    dialogTitle: string.DEVICE_INFORMATION,
                                    cb: function() {
                                        renderDeviceTable();
                                        var message = {
                                            type: "success",
                                            body: string.MODIFY_DEVICE_SUCESS
                                        }
                                        messageHandle(message);
                                    }
                                });
                                viewer.render();
                                $("#modelLayer").fadeIn(500);
                                viewer.fillIn({data: xhr.responseJSON});
                            } else if(xhr.status === 400){
                                var message = {
                                    type: "error",
                                    body: string.LOAD_DEVICE_ERROR_AGENT_MISS
                                }
                                messageHandle(message);
                            }else {
                                var message = {
                                    type: "error",
                                    body: string.LOAD_DEVICE_ERROR
                                }
                                messageHandle(message);
                            }
                        }
                    });
                }
            };
            var remove = {
                id: "delete",
                event: function(record) {
                    sendRequest({
                        url: configUtil.deleteDevice(record.id), 
                        type: 'DELETE', 
                        cb: function(xhr) {
                            if(xhr.status === 200) {
                                console.log('delete device successfully');
                                renderDeviceTable();
                                var message = {
                                    type: "success",
                                    body: string.REMOVE_DEVICE_SUCESS
                                }
                                messageHandle(message);
                            } else if(xhr.status === 400){
                                var message = {
                                    type: "error",
                                    body: string.REMOVE_DEVICE_ERROR_AGENT_MISS
                                }
                                messageHandle(message);
                            } else if(xhr.status === 409) {
                                var message = {
                                    type: "error",
                                    body: string.REMOVE_DEVICE_ERROR_CONFLICT
                                }
                                messageHandle(message);
                            } else {
                                var message = {
                                    type: "error",
                                    body: string.REMOVE_DEVICE_ERROR
                                }
                                messageHandle(message);
                            }
                        }
                    });
                }
            };
            actions.push(check);
            if(!configUtil.isAdmin()) {
                actions.push(modify);
            }
            actions.push(remove);
            var renderDeviceTable = function() {
                sendRequest({
                    url: configUtil.getDevices(),
                    type: 'GET',
                    cb: function(xhr){
                        if(xhr.status === 200) {
                            $("#managerTable").remove();
                            var fields = mockData.getDevicefields();
                            var filter = ['name', 'dateCreated'];
                            if(configUtil.isAdmin())
                                filter.push('user');
                            var args = {
                                title: string.MACHINE_REGISTER,
                                fields: fields,
                                records: xhr.responseJSON,
                                filter: filter,
                                cssClass: "table",
                                showAdd: configUtil.isAdmin() ? false : true,
                                actions: actions,
                                emptyMessage: configUtil.isAdmin() ? string.NO_DEVICE_ADMIN : string.NO_DEVICE_ADD,
                                addOptions: {
                                    fields: mockData.AddDeviceForm,
                                    type: 'device',
                                    dialogTitle: string.DEVICE_INFORMATION
                                },
                                callback: function() {
                                    renderDeviceTable();
                                    var message = {
                                            type: "success",
                                            body: string.CREATE_DEVICE_SUCCESS
                                    }
                                    messageHandle(message);
                                }
                            }
                            var table = new $.Table(args);
                            table.render(domNode);
                            //scrollTop("#managerTable");
                        } else {
                            var message = {
                                    type: "error",
                                    body: string.LOAD_DEVICE_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
            };
           renderDeviceTable();
        }

        this.renderRFManagerment = function(domNode) {
            var actions = [];
            var modify = {
                id: "modify",
                event: function(record) {
                    sendRequest({
                        url: configUtil.getRFDeviceById(record.rfId),
                        type: "GET",
                        cb: function(xhr) {
                            if(xhr.status === 200) {
                                var viewer = new $.Viewer({
                                    url: configUtil.getRFDeviceById(record.rfId),
                                    context: "device",
                                    data: mockData.AddRFDeviceForm, 
                                    hideButton: false, 
                                    buttonType: "modify",
                                    dialogTitle: string.DEVICE_INFORMATION,
                                    cb: function() {
                                        renderRFDeviceTable();
                                        var message = {
                                            type: "success",
                                            body: string.MODIFY_DEVICE_SUCESS
                                        }
                                        messageHandle(message);
                                    }
                                });
                                viewer.render();
                                $("#modelLayer").fadeIn(500);
                                viewer.fillIn({data: xhr.responseJSON});
                            } else if(xhr.status === 400){
                                var message = {
                                    type: "error",
                                    body: string.LOAD_DEVICE_ERROR_AGENT_MISS
                                }
                                messageHandle(message);
                            }else {
                                var message = {
                                    type: "error",
                                    body: string.LOAD_DEVICE_ERROR
                                }
                                messageHandle(message);
                            }
                        }
                    });
                }
            };
            var remove = {
                id: "delete",
                event: function(record) {
                    sendRequest({
                        url: configUtil.getRFDeviceById(record.rfId), 
                        type: 'DELETE', 
                        cb: function(xhr) {
                            if(xhr.status === 200) {
                                console.log('delete device successfully');
                                renderRFDeviceTable();
                                var message = {
                                    type: "success",
                                    body: string.REMOVE_DEVICE_SUCESS
                                }
                                messageHandle(message);
                            } else if(xhr.status === 400){
                                var message = {
                                    type: "error",
                                    body: string.REMOVE_DEVICE_ERROR_AGENT_MISS
                                }
                                messageHandle(message);
                            } else if(xhr.status === 409) {
                                var message = {
                                    type: "error",
                                    body: string.REMOVE_DEVICE_ERROR_CONFLICT
                                }
                                messageHandle(message);
                            } else {
                                var message = {
                                    type: "error",
                                    body: string.REMOVE_DEVICE_ERROR
                                }
                                messageHandle(message);
                            }
                        }
                    });
                }
            };
            if(!configUtil.isAdmin()) {
                actions.push(modify);
            }
            actions.push(remove);
            var renderRFDeviceTable = function() {
                sendRequest({
                    url: configUtil.getRFDevices(),
                    type: 'GET',
                    cb: function(xhr){
                        if(xhr.status === 200) {
                            $("#managerTable").remove();
                            var fields = mockData.getRFDevicefields();
                            var filter = ['rfId', 'dateCreated'];
                            if(configUtil.isAdmin())
                                filter.push('user');
                            var args = {
                                title: string.MACHINE_REGISTER,
                                fields: fields,
                                records: xhr.responseJSON,
                                filter: filter,
                                cssClass: "table",
                                showAdd: configUtil.isAdmin() ? false : true,
                                actions: actions,
                                emptyMessage: configUtil.isAdmin() ? string.NO_DEVICE_ADMIN : string.NO_DEVICE_ADD,
                                addOptions: {
                                    fields: mockData.AddRFDeviceForm,
                                    type: 'RFdevice',
                                    dialogTitle: string.DEVICE_INFORMATION
                                },
                                callback: function() {
                                    renderRFDeviceTable();
                                    var message = {
                                            type: "success",
                                            body: string.CREATE_DEVICE_SUCCESS
                                    }
                                    messageHandle(message);
                                }
                            }
                            var table = new $.Table(args);
                            table.render(domNode);
                            //scrollTop("#managerTable");
                        } else {
                            var message = {
                                    type: "error",
                                    body: string.LOAD_DEVICE_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
            };
           renderRFDeviceTable();
        }

        this.renderUserManagement = function(domNode) {
            var actions = [
                {
                    id: 'check',
                    event: function(user) {
                        sendRequest({
                            url: configUtil.getUserByName(user.name),
                            type: 'GET',
                            cb: function(xhr) {
                                if(xhr.status === 200) {
                                    var data = xhr.responseJSON;
                                    var regMach = new $.Viewer({
                                        data: mockData.getUserForm({isUpdate: true, showRole: true}), 
                                        hideButton: true,
                                        dialogTitle: string.USER_INFORMATION
                                    });
                                    regMach.render();
                                    $("#modelLayer").fadeIn(500);

                                    switch(data.role) {
                                        case 'ROLE_ADMIN': data.role = 0; break;
                                        default: data.role = 1; break;
                                    }
                                    switch(data.license) {
                                        case 'FREE': data.license = 0; break;
                                        default: data.license = 1; break;
                                    }
                                    regMach.fillIn({data: data, inputDisabled: true});
                                } else {
                                    var message = {
                                        type: "error",
                                        body: string.LOAD_USER_ERROR
                                    }
                                    messageHandle(message);
                                }
                            }
                        });
                    }
                },
                {
                    id: "modify",
                    event: function(record) {
                        sendRequest({
                            url: configUtil.getUserByName(record.name),
                            type: "GET",
                            cb: function(xhr) {
                                if(xhr.status === 200) {
                                    var data = xhr.responseJSON;
                                    var viewer = new $.Viewer({
                                        url: configUtil.modifyUserById(record.id),
                                        data: mockData.getUserForm({isUpdate: true, showRole: true}), 
                                        hideButton: false, 
                                        buttonType: "modify",
                                        context: "user",
                                        dialogTitle: string.USER_INFORMATION,
                                        cb: function() {
                                            renderUserTable();
                                            var message = {
                                                type: "success",
                                                body: string.MODIFY_USER_SUCCESS
                                            }
                                            messageHandle(message);
                                        }
                                    });
                                    viewer.render();
                                    $("#modelLayer").fadeIn(500);
                                    switch(data.role) {
                                        case 'ROLE_ADMIN': data.role = 0; break;
                                        default: data.role = 1; break;
                                    }
                                    switch(data.license) {
                                        case 'FREE': data.license = 0; break;
                                        default: data.license = 1; break;
                                    }
                                    viewer.fillIn({data: data});
                                } else {
                                    var message = {
                                        type: "error",
                                        body: string.LOAD_USER_ERROR
                                    }
                                    messageHandle(message);
                                }
                            }
                        });
                    }
                },
                {
                    id: 'delete',
                    event: function(user) {
                        sendRequest({
                            url: configUtil.deleteUser(user.id),
                            type: 'DELETE',
                            cb: function(xhr) {
                                if(xhr.status === 200) {
                                    console.log('delete user successfully');
                                    renderUserTable();
                                    var message = {
                                        type: "success",
                                        body: string.REMOVE_USER_SUCCESS
                                    }
                                    messageHandle(message);
                                } else if(xhr.status === 409) {
                                    var message = {
                                        type: "error",
                                        body: string.REMOVE_USER_ERROR_CONFILCT
                                    }
                                    messageHandle(message);
                                }else {
                                    var message = {
                                        type: "error",
                                        body: string.REMOVE_USER_ERROR
                                    }
                                    messageHandle(message);
                                }
                            }
                        });
                    }
                }
            ];
            var renderUserTable = function() {
                sendRequest({
                    url: configUtil.getUsers(),
                    type: 'GET',
                    cb: function(xhr){
                        if(xhr.status === 200) {
                            $("#managerTable").remove();
                            var filter = ['name', 'email', 'license', 'role'];
                            var args = {
                                title: string.RESGISTER_USER,
                                fields: mockData.getUserfields(),
                                records: xhr.responseJSON,
                                filter: filter,
                                cssClass: "table",
                                Add: true,
                                actions: actions,
                                showAdd: true,
                                emptyMessage: string.NO_AVAILABLE_USER,
                                addOptions: {
                                    fields: mockData.getUserForm({showRole: true}),
                                    type: 'user',
                                    dialogTitle: string.USER_INFORMATION
                                },
                                callback: function() {
                                    var message = {
                                        type: "success",
                                        body: string.CREATE_USER_SUCCESS
                                    }
                                    messageHandle(message);
                                    renderUserTable();
                                }
                            }
                            var table = new $.Table(args);
                            table.render(domNode);
                            //scrollTop("#managerTable");
                        }
                    }
                });
            };
            renderUserTable();
        }

        this.renderTestFile = function(domNode, scenario) {
            var self = this;
            var renderBackButton = function() {
                var div = document.createElement("div");
                div.className = "footer";
                    var button = document.createElement("button");
                    button.appendChild(document.createTextNode(string.BACK_SCENARIO_LIST));
                    button.className = "backButton";
                    div.appendChild(button);
                    button.onclick = function() {
                        self.renderScenarioManagement(domNode);
                    };
                return div;
            }
            var renderTable = function() {
                sendRequest({
                    url: configUtil.getScenarioFile(scenario.id),
                    type: 'GET',
                    cb: function(xhr){
                        if(xhr.status === 200) {
                            $("#managerTable").remove();
                            var fileList = xhr.responseJSON;
                            $.each(fileList, function(index, file) {
                                file.fp = formatFrequence(file.frequencyPointType).value;
                                file.fileSize = formSize(file.fileSize);
                            });
                            var args = {
                                fields: mockData.getTestFileFields(),
                                filter: ['name', 'fp', 'fileSize'],
                                records: fileList,
                                title: string.SCENRIO_TEST_FILES + scenario.name,
                                showAdd: true,
                                actions: [],
                                emptyMessage: string.NO_AVAILABLE_TEST_FILE,
                                cssClass: "table",
                                showAdd: true,
                                addOptions: {
                                    handleClick: function() {
                                        var uploadDialog = new $.UploadDialog({
                                            url: configUtil.uploadFile(), 
                                            scenarioId: scenario.id,
                                            fileList: fileList,
                                            callback: function(xhr) {
                                                if(xhr.status === 200) {
                                                    $("#modelLayer").fadeOut(500, function(){
                                                        $("#modelLayer").remove();
                                                    });
                                                    var message = {
                                                        type: "success",
                                                        body: string.UPLOAD_FILE_SUCCESS
                                                    }
                                                    messageHandle(message);
                                                    renderTable();
                                                }
                                            }
                                        });
                                        uploadDialog.render();               
                                        $("#modelLayer").fadeIn(500);
                                    }
                                }
                            }
                            if(fileList.length >= 4) {
                                args.showAdd = false;
                            }
                            var table = new $.Table(args);
                            table.render(domNode);
                            $("#managerTable").append(renderBackButton());
                        }
                    }
                });
            };
            renderTable();
        }

        this.renderScenarioManagement = function(domNode) {
            var self = this;
            var actions = [
                {
                    id: "check",
                    event: function(record) {
                        self.renderTestFile(domNode, record)
                    }
                },
                {
                    id: "modify",
                    event: function(record) {
                        sendRequest({
                            url: configUtil.getScenarioById(record.id),
                            type: "GET",
                            cb: function(xhr) {
                                if(xhr.status === 200) {
                                    var data = xhr.responseJSON;
                                    var viewer = new $.Viewer({
                                        url: configUtil.modifyScenario(record.id),
                                        data: mockData.getScenarioForm({type: "modify"}), 
                                        hideButton: false, 
                                        buttonType: "modify",
                                        context: "scenario",
                                        dialogTitle: string.SCENARIO_INFORMATION,
                                        cb: function() {
                                            var message = {
                                                type: "success",
                                                body: string.MODIFY_SCENARIO_SUCCESS
                                            }
                                            messageHandle(message);
                                            renderTable();
                                        }
                                    });
                                    viewer.render();
                                        $("#modelLayer").fadeIn(500);
                                    viewer.fillIn({data: data});
                                } else {
                                    var message = {
                                        type: "error",
                                        body: string.LOAD_SCENARIO_ERROR
                                    }
                                    messageHandle(message);
                                }
                            }
                        });
                    }
                },
                {
                    id: "delete",
                    event: function(record) {
                        sendRequest({
                            url: configUtil.deleteScenario(record.id),
                            type: 'DELETE',
                            cb: function(xhr) {
                                if(xhr.status === 200) {
                                    console.log('delete scenario successfully');
                                    var message = {
                                        type: "success",
                                        body: string.REMOVE_SCENARIO_SUCCESS
                                    }
                                    messageHandle(message);
                                    renderTable();
                                } else if(xhr.status === 409) {
                                    var message = {
                                        type: "error",
                                        body: string.REMOVE_SCENARIO_ERROR_CONFLICT
                                    }
                                    messageHandle(message);
                                } else {
                                    var message = {
                                        type: "error",
                                        body: string.REMOVE_SCENARIO_ERROR
                                    }
                                    messageHandle(message);
                                }
                            }
                        });
                    }
                }
            ];

            var renderTable = function() {
                sendRequest({
                    url: configUtil.getScenarios(),
                    type: 'GET',
                    cb: function(xhr){
                        if(xhr.status === 200) {
                            $("#managerTable").remove();
                            var filter = ['name', 'description', 'free', 'sampleBit', 'sampleRate', 'minutes', 'dateCreated'];
                            var data = xhr.responseJSON;
                            $.each(data, function(i, record) {
                                if(!record.minutes) {
                                    record.minutes = "<1";
                                }
                            })
                            var args = {
                                title: string.TEST_SCENARIO,
                                fields: mockData.getScenariofields(),
                                filter: filter,
                                records: data,
                                cssClass: "table",
                                showAdd: true,
                                actions: actions,
                                emptyMessage: string.NO_SCENARIO_ADD,
                                addOptions: {
                                    fields: mockData.getScenarioForm(),
                                    type: 'scenario',
                                    dialogTitle: string.SCENARIO_INFORMATION,
                                    callback: function(data) {
                                        var formData = new FormData();
                                        for(var obj in data) {
                                            formData.append(obj, data[obj]);
                                        }
                                        var cb = function(xhr) {
                                            if(xhr.status === 200) {
                                                var message = {
                                                    type: "success",
                                                    body: string.CREATE_SCENARIO_SUCCESS
                                                }
                                                messageHandle(message);
                                                renderTable()
                                                $("#modelDialog").fadeOut(500, function(){
                                                    $("#modelLayer").remove();
                                                });
                                            } else if(xhr.status === 409) {
                                                var message = string.CONFLICT_ERROR_MESSAGE.replace(/\$\{0\}/g, string.SCENARIO_TITLE);
                                                viewerErrorMessage(message);
                                            }
                                        };
                                        var url = configUtil.addScenario();
                                        uploadRequest(formData, url, cb);
                                    }
                                }
                            }
                            var table = new $.Table(args);
                            table.render(domNode);
                            //scrollTop("#managerTable");
                        }
                    }
                });
            };
            renderTable();
        }

        this.renderVmManagerment = function(domNode) {
            var filterResponse = function(response) {
                var vmList = response;
                if(vmList instanceof Array) {
                    $.each(vmList, function(index, vm) {
                        if(vm.state === 'unknown') {
                            vm.showState = string.NO;
                        } else if(vm.state === 'running') {
                            vm.showState = string.YES;
                        }
                    });
                } else {
                    vmList.state = (vmList.state === 'running') ? true : (vmList.state === 'unknown') ? false : false;
                }
                
                return vmList;
            }
            var actions = [];
            var modifyAction = {
                id: "modify",
                event: function(record) {
                    sendRequest({
                        url: configUtil.getVMById(record.id),
                        type: "GET",
                        cb: function(xhr) {
                            if(xhr.status === 200) {
                                var data = filterResponse(xhr.responseJSON);
                                var viewer = new $.Viewer({
                                    url: configUtil.modifyVM(record.id),
                                    data: mockData.VMFormTable, 
                                    hideButton: false, 
                                    buttonType: "modify",
                                    dialogTitle: string.VM_INFORMATION,
                                    context: "VM",
                                    cb: function() {
                                        var message = {
                                            type: "success",
                                            body: string.MODIFY_VM_SUCCESS
                                        }
                                        messageHandle(message);
                                        renderVMTable();
                                    }
                                });
                                viewer.render();
                                    $("#modelLayer").fadeIn(500);
                                viewer.fillIn({data: data});
                            } else {
                                var message = {
                                    type: "error",
                                    body: string.LOAD_VM_ERROR
                                }
                                messageHandle(message);
                            }
                        }
                    });
                }
            };
            var deleteAction = {
                id: "delete",
                event: function(record) {
                    sendRequest({
                        url: configUtil.deleteVM(record.id),
                        type: 'DELETE',
                        cb: function(xhr) {
                            if(xhr.status === 200) {
                                console.log('delete VM successfully');
                                var message = {
                                    type: "success",
                                    body: string.REMOVE_VM_SUCCESS
                                }
                                messageHandle(message);
                                renderVMTable();
                            } else {
                                var message = {
                                    type: "error",
                                    body: string.REMOVE_VM_ERROR
                                }
                                messageHandle(message);
                            }
                        }
                    });
                }
            }
            if(configUtil.isAdmin()) {
                actions.push(modifyAction);
                actions.push(deleteAction);
            }
            

            var renderVMTable = function() {
                $.ajax({
                    url: configUtil.getVmList(),
                    type: 'GET',
                    complete: function(xhr){
                        if(xhr.status === 200) {
                            $("#managerTable").remove();
                            var filter = ['ip', 'cpu', 'memory','hd', 'showState'];
                            var data = filterResponse(xhr.responseJSON);
                            var args = {
                                title: string.VM_LIST,
                                fields: mockData.getVMfields(),
                                filter: filter,
                                records: data,
                                cssClass: "table",
                                showAdd: configUtil.isAdmin() ? true : false,
                                actions: actions,
                                addOptions: {
                                    fields: mockData.VMFormTable,
                                    type: 'VM',
                                    dialogTitle: string.VM_INFORMATION
                                },
                                emptyMessage: string.NO_VM_ADD,
                                callback: function() {
                                    var message = {
                                        type: "success",
                                        body: string.CREATE_VM_SUCCESS
                                    }
                                    messageHandle(message);
                                    renderVMTable()
                                }
                            }
                            var table = new $.Table(args);
                            table.render(domNode);
                            
                        } else {
                            var message = {
                                type: "error",
                                body: string.LOAD_VM_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
            }
            renderVMTable();
        }

        this.renderScenarioDownload = function(domNode) {
            var context = this;
            var renderTestFileTable = function(data, filter, emptyMessage) {
               $("#managerTable").remove();
               var args = {
                    fields: mockData.downloadScenarioFile(),
                    filter: filter,
                    records: data,
                    title: string.SCENRIO_TEST_FILES,
                    showAdd: false,
                    emptyMessage: emptyMessage
                }
                var table = new $.Table(args);
                table.render(domNode);
            }

            var getDownloadProcess = function(testFileName, testFileId) {
                var deviceId = $('#selectMach')[0].value;
                var result;
                $.ajax({
                    url: configUtil.checkDownloading(deviceId),
                    type: 'GET',
                    async: false,
                    complete: function(xhr) {
                        if(xhr.status === 200) {
                            var downloadingFile = xhr.responseJSON;
                            if(downloadingFile.filename === testFileName) {
                                result = string.DOWNLOAD_PRENCENT + ": " 
                                    + downloadingFile.percentge + " / " + string.DOWNLOAD_SPEED 
                                    + ": " + downloadingFile.downloadSpeed;             
                            } else {
                                $.ajax({
                                    url: configUtil.checkDownloadQueue(),
                                    type: 'GET',
                                    async: false,
                                    data: {
                                        deviceId: deviceId,
                                        testFileId: testFileId
                                    },
                                    complete: function(xhr) {
                                        if(xhr.status === 200) {
                                            var downloadQueue = string.DOWNLOAD_QUEUE;
                                            result = downloadQueue.replace(/\$\{0\}/, xhr.responseJSON);
                                        } else {
                                            var message = {
                                                type: "error",
                                                body: string.LOAD_DOWNLOAD_PROCESS_ERROR
                                            }
                                            messageHandle(message);
                                        }
                                    }
                                });
                            }
                        } else {
                            var message = {
                                type: "error",
                                body: string.LOAD_DOWNLOAD_PROCESS_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
                return result;
            }

            var getDevices = function() {
                var renderOnlineIcon = function(isOnline) {
                    var img = document.getElementById("agentStatusIcon");
                    if(!img) {
                        var img = document.createElement("img");
                        img.id = "agentStatusIcon";
                        $("#selectMach").after(img);
                    }
                    if(isOnline === "true") {
                        img.src = "../resource/images/agent_online.png";
                    } else {
                        img.src = "../resource/images/agent_offline.png";
                    }
                }
                sendRequest({
                    url: configUtil.getRFDevices(),
                    type: 'GET',
                    cb: function(xhr) {
                        if(xhr.status === 200) {
                            var data = xhr.responseJSON;
                            var div = document.createElement("div");
                            var label = document.createElement("label");
                                label.appendChild(document.createTextNode(string.SELECT_DEVICE));
                            var select = document.createElement("select");
                                select.id = "selectMach";
                            domNode.appendChild(div);
                            div.appendChild(label);
                            div.appendChild(select);
                            if(data.length === 0) {
                                var op = document.createElement("option");
                                    op.value = -1;
                                    op.appendChild(document.createTextNode(string.NO_DEVICE));
                                select.appendChild(op);
                                renderTestFileTable([], [], string.NO_SCENARIO_TEST_FILE_2);
                            } else {
                                $.each(data, function(i, device){
                                    var op = document.createElement("option");
                                        op.value = device.rfId;
                                        op.setAttribute('agentOnline', device.agentOnline);
                                        op.appendChild(document.createTextNode(device.rfId));
                                    select.appendChild(op);
                                })
                                select.onchange = function() {
                                    getScenarios($('#selectMach')[0].value);
                                    var isOnline = $('#selectMach option[value=' + this.value + ']').attr("agentOnline");
                                    renderOnlineIcon(isOnline);
                                }

                                var isOnline = $('#selectMach option[value=' + select.value + ']').attr("agentOnline");
                                renderOnlineIcon(isOnline);

                                getScenarios($('#selectMach')[0].value);
                            }
                        } else {
                            var message = {
                                type: "error",
                                body: string.LOAD_DEVICE_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
            };

            var getScenarios = function(deviceId) {
                 sendRequest({
                        url:configUtil.getScenarios(),
                        type: 'GET',
                        cb: function(xhr) {
                            if(xhr.status === 200) {
                                var data = [];
                                var scenarios = xhr.responseJSON;
                                for(var index = 0; index < scenarios.length; index++) {
                                    $.ajax({
                                        url: configUtil.getScenarioFile(scenarios[index].id, deviceId),
                                        type: 'GET',
                                        async: false,
                                        complete: function(xhr) {
                                            if(xhr.status === 200) {
                                                var testfiles = xhr.responseJSON;
                                                if(testfiles.length === 0) {
                                                    data.push({
                                                        scenarioId: scenarios[index].id,
                                                        scenarioType: scenarios[index].free,
                                                        scenarioName: scenarios[index].name,
                                                        scenarioDescp: scenarios[index].description,
                                                        frequencyFile: testfiles,
                                                        action: {
                                                            label: string.NO_SCENARIO_TEST_FILE_1
                                                        }
                                                    });
                                                } else {
                                                    var noDownloadFile = [];
                                                    var downloadingFile = [];
                                                    var downloadedFile = [];
                                                    var ReadyToTestFile = [];
                                                    var DownloadErrorFile = [];
                                                    var frequencyFile = [];
                                                    for(var i=0; i<testfiles.length; i++) {
                                                        var tf = {};
                                                        tf.name = testfiles[i].name;
                                                        tf.frequencePoint = formatFrequence(testfiles[i].frequencyPointType).value;
                                                        tf.size = formSize(testfiles[i].fileSize);

                                                        if(testfiles[i].downloadState === "None" || typeof testfiles[i].downloadState === 'undefined') {
                                                            tf.status = "noDownload";
                                                            noDownloadFile.push(testfiles[i]);
                                                            tf.context = "downloadFile";
                                                        } else if(testfiles[i].downloadState === "Downloading" || testfiles[i].downloadState === "Start" || testfiles[i].downloadState === "Continue" || testfiles[i].downloadState === "Waiting") {
                                                            tf.status = "downloading";
                                                            tf.link = {
                                                                text: string.DOWNLOADING + '  ' + string.CHECK_DOWNLOAD_PROCESS,
                                                                name: testfiles[i].name,
                                                                fileId: testfiles[i].id,
                                                                onClick: function() {
                                                                    var status = getDownloadProcess(this.name, this.fileId);
                                                                    if(typeof status === 'undefined') {
                                                                        this.outerHTML = "<span>" + string.GET_DOWNLOAD_PROCESS_ERROR + "</span>"
                                                                    }
                                                                    this.outerHTML = "<span>" + status + "</span>"
                                                                }
                                                            }
                                                            tf.canCancel = {
                                                                text: string.CANCEL_DOWNLOAD,
                                                                fileId: testfiles[i].id,
                                                                name: testfiles[i].name,
                                                                onClick: function() {
                                                                    $.ajax({
                                                                        type: 'DELETE',
                                                                        url: configUtil.cancelDownloading($('#selectMach')[0].value),
                                                                        data: {testfile: this.name},
                                                                        dataType: 'json',
                                                                        complete: function(xhr) {
                                                                            if(xhr.status === 200) {
                                                                                var message = {
                                                                                    type: "success",
                                                                                    body: string.CANCEL_DOWNLOADING
                                                                                }
                                                                                messageHandle(message);
                                                                                getScenarios($('#selectMach')[0].value);
                                                                            } else {
                                                                                var message = {
                                                                                    type: "error",
                                                                                    body: string.CANCEL_DOWNLOADING_ERROR
                                                                                }
                                                                                messageHandle(message);
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                            downloadingFile.push(testfiles[i]);
                                                        } else if(testfiles[i].downloadState === "DownloadFinish") {
                                                            tf.status = "downloaded";
                                                            tf.label = string.DOWNLOADED;
                                                            downloadedFile.push(testfiles[i]);
                                                        } else if(testfiles[i].downloadState === "ReadyToTest") {
                                                            tf.status = "readyToTest";
                                                            tf.label = string.READY_TO_TEST;
                                                            ReadyToTestFile.push(testfiles[i]);
                                                        } else {
                                                            tf.status = "downloadError";
                                                            tf.label = string.DOWNLOAD_ERROR;
                                                            DownloadErrorFile.push(testfiles[i]);
                                                        }
                                                        frequencyFile.push(tf);
                                                    }
                                                    var actionList = [];
                                                    var downloadAction = {};
                                                    if(noDownloadFile.length > 0) {
                                                        downloadAction.link = string.DOWNLOAD_FILE_BUTTON;
                                                        downloadAction.clickHandle = function() {
                                                            var chkbox = $("#frequencyFile input");
                                                            var fileList = [];
                                                            for(var i=0; i<chkbox.length; i++) {
                                                                if(chkbox[i].checked) {
                                                                    fileList.push(chkbox[i].id);
                                                                }
                                                            }
                                                            if(fileList.length > 0) {
                                                                $.ajax({
                                                                    type: 'GET',
                                                                    url: configUtil.downloadTestFile($('#selectMach')[0].value),
                                                                    data: {testfiles: fileList},
                                                                    dataType: 'json',
                                                                    complete: function(xhr) {
                                                                        if(xhr.status === 200) {
                                                                            var message = {
                                                                                type: "success",
                                                                                body: string.START_DOWNLOADING
                                                                            }
                                                                            messageHandle(message);
                                                                            getScenarios($('#selectMach')[0].value);
                                                                        } else {
                                                                            var message = {
                                                                                type: "error",
                                                                                body: string.DOWNLOAD_ERROR_NO_AGENT
                                                                            }
                                                                            messageHandle(message);
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                var message = {
                                                                    type: "error",
                                                                    body: string.NO_SELECT_FILE
                                                                }
                                                                messageHandle(message);
                                                            }
                                                        }
                                                    }
                                                    actionList.push(downloadAction);
                                                    
                                                    var deleteAction = {}
                                                    if(downloadedFile.length > 0 || ReadyToTestFile.length > 0) {
                                                        downloadAction.link = string.DELETE_FILE_BUTTON;
                                                        downloadAction.clickHandle = function(scenario) {
                                                            $.ajax({
                                                                type: 'DELETE',
                                                                url: configUtil.deleteFile($('#selectMach')[0].value, scenario.scenarioId),
                                                                complete: function(xhr) {
                                                                    if(xhr.status === 200) {
                                                                        var message = {
                                                                            type: "success",
                                                                            body: string.DELETE_FILE_SUCCESS
                                                                        }
                                                                        messageHandle(message);
                                                                        getScenarios($('#selectMach')[0].value);
                                                                    } else {
                                                                        var message = {
                                                                            type: "error",
                                                                            body: string.DELETE_FILE_ERROR
                                                                        }
                                                                        messageHandle(message);
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                    actionList.push(deleteAction);

                                                    data.push({
                                                        scenarioId: scenarios[index].id,
                                                        scenarioType: scenarios[index].free,
                                                        scenarioName: scenarios[index].name,
                                                        scenarioDescp: scenarios[index].description,
                                                        frequencyFile: frequencyFile,
                                                        action: actionList
                                                    });
                                                }                 
                                            } else {
                                                data.push({
                                                    scenarioId: scenarios[index].id,
                                                    scenarioType: scenarios[index].free,
                                                    scenarioName: scenarios[index].name,
                                                    scenarioDescp: scenarios[index].description,
                                                    frequencyFile: [],
                                                    action: {
                                                        label: string.NO_SCENARIO_TEST_FILE_1
                                                    }
                                                });
                                            }
                                        }
                                    }); 
                                }
                                renderTestFileTable(data, ['scenarioType', 'scenarioName', 'scenarioDescp', 'frequencyFile', 'action'], string.NO_SCENARIO);
                            }
                        }
                 });
            };
            getDevices();
        }


        this.renderTestSubmit = function(domNode) {
            var getPhoneDevice = function(domNode) {
                sendRequest({
                    url: configUtil.getDevices(),
                    type: 'GET',
                    cb: function(xhr) {
                        if(xhr.status === 200) {
                            var data = xhr.responseJSON;
                            var div = document.createElement("div");
                            div.className = "select";
                            var label = document.createElement("label");
                                label.appendChild(document.createTextNode(string.SELECT_TARGET_DEVICE));
                            var select = document.createElement("select");
                                select.id = "selectMach";
                            div.appendChild(label);
                            div.appendChild(select);
                            domNode.appendChild(div);
                            if(data.length === 0) {
                                var op = document.createElement("option");
                                    op.value = -1;
                                    op.appendChild(document.createTextNode(string.NO_DEVICE));
                                select.appendChild(op);
                            } else {
                                $.each(data, function(i, device){
                                    var op = document.createElement("option");
                                        op.value = device.id;
                                        op.appendChild(document.createTextNode(device.name));
                                    select.appendChild(op);
                                })
                            }
                        }
                        getRFDevices(domNode);
                    }
                })
            };
            var renderOnlineIcon = function(isOnline) {
                var img = document.getElementById("agentStatusIcon");
                if(!img) {
                    var img = document.createElement("img");
                    img.id = "agentStatusIcon";
                    $("#selectRFMach").after(img);
                }
                if(isOnline === "true") {
                    img.src = "../resource/images/agent_online.png";
                } else {
                    img.src = "../resource/images/agent_offline.png";
                }
            };
            var renderTestSubmitTable = function(data, filter, emptyMessage) {
               $("#test-submit").remove();
               $("#playSetting").remove();
               $("#managerTable").remove();
               var actions = [
                    {
                        id: "checkbox",
                        name: "scenario_checkBox"
                    }
                ];
               var args = {
                    fields: mockData.getScenariofields(),
                    filter: filter,
                    records: data,
                    title: string.SCENRIO_FILES,
                    showAdd: false,
                    emptyMessage: emptyMessage,
                    actions: actions
                }
                var table = new $.Table(args);
                table.render(domNode);
                renderTestSetting(domNode);
                renderSubmitBtn(domNode);
            };

            var getRFDevices = function(domNode) {
                sendRequest({
                    url: configUtil.getRFDevices(),
                    type: 'GET',
                    cb: function(xhr) {
                        if(xhr.status === 200) {
                            var data = xhr.responseJSON;
                            var div = document.createElement("div");
                            var label = document.createElement("label");
                                label.appendChild(document.createTextNode(string.SELECT_RF_DEVICE));
                            var select = document.createElement("select");
                            div.className = "select";
                                select.id = "selectRFMach";
                            div.appendChild(label);
                            div.appendChild(select);
                            domNode.appendChild(div);
                            if(data.length === 0) {
                                var op = document.createElement("option");
                                    op.value = -1;
                                    op.appendChild(document.createTextNode(string.NO_DEVICE));
                                select.appendChild(op);
                                getScenarios();
                            } else {
                                $.each(data, function(i, device){
                                    var op = document.createElement("option");
                                        op.value = device.rfId;
                                        op.setAttribute('agentOnline', device.agentOnline);
                                        op.appendChild(document.createTextNode(device.rfId));
                                    select.appendChild(op);
                                })
                                select.onchange = function() {
                                    var isOnline = $('#selectRFMach option[value=' + this.value + ']').attr("agentOnline");
                                    renderOnlineIcon(isOnline);
                                    getScenarios(this.value);
                                }

                                var isOnline = $('#selectRFMach option[value=' + select.value + ']').attr("agentOnline");
                                renderOnlineIcon(isOnline);
                                getScenarios($('#selectRFMach')[0].value);
                            }
                        }
                    }
                });
            }
            

            var getScenarios = function(deviceId) {
                $.ajax({
                    url: configUtil.getReadyScenarios(deviceId),
                    type: "GET",
                    contentType: "application/json",
                    complete: function(xhr) {
                        if(xhr.status === 200) {
                            var data = xhr.responseJSON;
                            $.each(data, function(i, record) {
                                if(!record.minutes) {
                                    record.minutes = "<1";
                                }
                            })
                            var filter = ['name', 'description', 'free', 'sampleBit', 'sampleRate', 'minutes']
                            renderTestSubmitTable(data, filter, string.NO_AVAILABLE_SCENARIO);
                        } else {
                            renderTestSubmitTable([], [], string.NO_AVAILABLE_SCENARIO);
                        }
                    }
                });
            };

            var renderTestSetting = function(domNode) {
                var div = document.createElement("div");
                div.id = "playSetting";
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    input.id = "playLoop";
                    input.onchange = function() {
                        if(this.checked) {
                            $("#playTime").removeClass("hidden");
                        } else {
                            $("#playTime").addClass("hidden");
                        }
                    }
                    div.appendChild(input);
                    var label = document.createElement("label");
                    label.appendChild(document.createTextNode(string.PLAY_LOOP));
                    div.appendChild(label);

                    var select = document.createElement("select");
                    select.id = "playTime";
                    select.className = "hidden";
                        for(var i=10; i<50; i+=10) {
                            var op = document.createElement("option");
                            op.value = i;
                            op.appendChild(document.createTextNode(i+string.MUNITE));
                            select.appendChild(op);
                        }
                        for(var i=60; i<130; i+=30) {
                            var op = document.createElement("option");
                            op.value = i;
                            op.appendChild(document.createTextNode(i+string.MUNITE));
                            select.appendChild(op);
                        }
                    div.appendChild(select);
                    domNode.appendChild(div);
            };

            var renderSubmitBtn = function(domNode) {
                var div = document.createElement("div");
                div.id = "test-submit";
                    var button = document.createElement("button");
                    button.type = "button";
                    button.className = "submitTestButton";
                    button.value = string.TEST_SUBMIT_BUTTON;
                    button.appendChild(document.createTextNode(string.TEST_SUBMIT_BUTTON));
                    button.onclick = function() {
                        var checkBox = $("input[name = 'scenario_checkBox']");
                        var deviceId = $('#selectMach')[0].value;
                        var seriesNumber = $('#selectRFMach')[0].value;
                        var dataArray = [];
                        if(deviceId == -1) {
                            var message = {
                                type: "error",
                                body: string.SELECT_TARGET_DEVICE
                            }
                            messageHandle(message);
                            return;
                        }
                        $.each(checkBox, function(i, chkbx) {
                            if(chkbx.checked) {
                                var postData = {
                                    name: null,
                                    scenarioName: chkbx.getAttribute("scenarioname"),
                                    state: 'pending',
                                    vm: null,
                                    startTime: null,
                                    endTime: null,
                                    device: {
                                        id: deviceId,
                                        seriesNumber: seriesNumber
                                    },
                                    user: {
                                        id: configUtil.currentUser.id,
                                        name: configUtil.currentUser.name
                                    }
                                }
                                if($("#playLoop")[0].checked) {
                                    postData.replayTime = parseInt($("#playTime")[0].value);
                                } else {
                                    postData.replayTime = -1;
                                }
                                dataArray.push(postData);
                            }
                        });
                        if(dataArray.length === 0) {
                            var message = {
                                type: "error",
                                body: string.PLEASE_SELECT_SCENARIO_TO_TEST
                            }
                            messageHandle(message);
                        } else if(dataArray.length === 1) {     
                            $.ajax({
                                url: configUtil.addTest(),
                                type: 'POST',
                                contentType: "application/json",
                                data: JSON.stringify(dataArray[0]),
                                complete: function(xhr) {
                                    var message = {
                                        type: "success",
                                        body: string.SUBMIT_TEST_SUCCESS
                                    }
                                    messageHandle(message);
                                    /*
                                    if(xhr.status === 200) {
                                        var message = {
                                            type: "success",
                                            body: string.SUBMIT_TEST_SUCCESS
                                        }
                                        messageHandle(message);
                                    } else if(xhr.status === 400) {
                                        var message = {
                                            type: "error",
                                            body: string.SUBMIT_TEST_ERROR_AGENT_MISS
                                        }
                                        messageHandle(message);
                                    } else {
                                        var message = {
                                            type: "error",
                                            body: string.SUBMIT_TEST_ERROR
                                        }
                                        messageHandle(message);
                                    }
                                    */
                                }
                            });
                        } else {
                            var message = {
                                type: "error",
                                body: string.NO_ALLOW_MUTIPLE_SUBMIT
                            }
                            messageHandle(message);
                        }
                    };
                    div.appendChild(button);
                domNode.appendChild(div);
            }
            getPhoneDevice(domNode);
        }

        this.rendertestHistory = function(domNode) {
            var actions = [
                {
                    id: "delete",
                    event: function(record) {
                        sendRequest({
                            url: configUtil.deleteTest(record.id),
                            type: 'DELETE',
                            cb: function(xhr) {
                                if(xhr.status === 200) {
                                    console.log('delete test successfully');
                                    renderTable();
                                    var message = {
                                        type: "success",
                                        body: string.DELETE_TEST_SUCCESS
                                    }
                                    messageHandle(message);
                                } else {
                                    var message = {
                                        type: "error",
                                        body: string.DELETE_TEST_ERROR
                                    }
                                    messageHandle(message);
                                }
                            }
                        });
                    }
                }
            ];

            var renderTable = function() {
                var filterResponse = function(testList) {
                    var tests = [];
                    testList.sort(function(a,b) {
                        return b.startTime - a.startTime;
                    });
                    $.each(testList, function(i, test) {
                        test.rfDevice = test.device.seriesNumber;
                        test.startTime = formDate(test.startTime);
                        if(test.endTime) {
                            test.endTime = formDate(test.endTime);
                        } else {
                            test.endTime = "";
                        }
                        if(test.state === 'cancelled') {
                            tests.push(test);
                            test.showState = string.TEST_CANCELED;
                            test.action = [
                                {
                                    link: string.RESET_TEST,
                                    clickHandle: function(record) {
                                        var postData = {
                                            name: null,
                                            scenarioName: record.scenarioName,
                                            state: 'pending',
                                            vm: null,
                                            startTime: null,
                                            endTime: null,
                                            device: {
                                                id: record.device.id,
                                                seriesNumber: record.device.seriesNumber
                                            },
                                            user: {
                                                id: configUtil.currentUser.id,
                                                name: configUtil.currentUser.name
                                            }
                                        };
                                        $.ajax({
                                            url: configUtil.addTest(),
                                            type: 'POST',
                                            contentType: "application/json",
                                            data: JSON.stringify(postData),
                                            complete: function(xhr) {
                                                if(xhr.status === 200) {
                                                    var message = {
                                                        type: "success",
                                                        body: string.SUBMIT_TEST_SUCCESS
                                                    }
                                                    messageHandle(message);
                                                    renderTable();
                                                } else if(xhr.status === 400) {
                                                    var message = {
                                                        type: "error",
                                                        body: string.SUBMIT_TEST_ERROR_AGENT_MISS
                                                    }
                                                    messageHandle(message);
                                                } else {
                                                    var message = {
                                                        type: "error",
                                                        body: string.SUBMIT_TEST_ERROR
                                                    }
                                                    messageHandle(message);
                                                }
                                            }
                                        });
                                    }
                                }
                            ]
                        }else if(test.state === 'done') {
                            tests.push(test);
                            test.showState = string.TEST_DONE;
                            test.action = [
                                {
                                    link: string.CHECK_TEST_REPORT,
                                    clickHandle: function(record) {
                                        window.open('./js/pdfjs/web/viewer.html?testId=' + record.id);
                                    }
                                },
                                {
                                    link: string.DOWNLOAD_TEST_REPORT,
                                    clickHandle: function(record) {
                                       downloadFile(configUtil.downloadReport(record.id));
                                    }
                                }
                            ]
                        }else if(test.state === 'failed') {
                            tests.push(test);
                            test.showState = string.TEST_FAILED;
                        }
                    });
                    return tests;
                }
                sendRequest({
                    url: configUtil.getTests(),
                    type: 'GET',
                    cb: function(xhr) {
                        if(xhr.status === 200) {
                            var data = filterResponse(xhr.responseJSON);
                            var args = {
                                fields: mockData.getTestRecordsFeilds(),
                                filter: ['device', 'rfDevice', 'scenarioName', 'replayTime', 'startTime', 'endTime', 'showState', 'action'],
                                records: data,
                                title: string.TEST_HISTORY,
                                showAdd: false,
                                actions: actions,
                                emptyMessage: string.NO_TEST_FINISH,
                                cssClass: 'table'
                            }
                            $("#managerTable").remove();
                            var table = new $.Table(args);
                            table.render(domNode);
                        } else {
                            var message = {
                                type: "error",
                                body: string.LOAD_TEST_RECORD_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
            };

            renderTable();
  
        }

        
        this.renderTestStatus = function(domNode) {
            var actions = [
                {
                    id: "delete",
                    event: function(record) {
                        sendRequest({
                            url: configUtil.deleteTest(record.id),
                            type: 'DELETE',
                            cb: function(xhr) {
                                if(xhr.status === 200) {
                                    console.log('delete test successfully');
                                    renderTable();
                                    var message = {
                                        type: "success",
                                        body: string.DELETE_TEST_SUCCESS
                                    }
                                    messageHandle(message);
                                } else {
                                    var message = {
                                        type: "error",
                                        body: string.DELETE_TEST_ERROR
                                    }
                                    messageHandle(message);
                                }
                            }
                        });
                    }
                }
            ];

            var renderTable = function() {
                var filterResponse = function(testList) {
                    var tests = [];
                    testList.sort(function(a,b) {
                        return b.startTime - a.startTime;
                    });
                    $.each(testList, function(i, test) {
                        test.rfDevice = test.device.seriesNumber;
                        test.startTime = formDate(test.startTime);
                        if(test.endTime) {
                            test.endTime = formDate(test.endTime);
                        } else {
                            test.endTime = "";
                        }
                        if(test.state === 'pending') {
                            test.showState = string.PENDING_APPROVAL;
                            tests.push(test);
                        }else if(test.state === 'approved') {
                            test.showState = string.TEST_APPROVAL;
                            tests.push(test);
                        }else if(test.state === 'waiting') {
                            test.showState = string.TEST_WAITING;
                            tests.push(test);
                        }else if(test.state === 'running') {
                            tests.push(test);
                            test.showState = string.TEST_RUNNING;
                            test.action = [
                                {
                                    link: string.CHECK_REALTIME_STATE,
                                    clickHandle: function(record) {
                                        window.open('./teststatus.html?seriesNumber=' + record.device.seriesNumber);
                                    }
                                },
                                {
                                    link: string.ADJUST_TEST,
                                    clickHandle: function(record) {
                                        var viewer = new $.Viewer({
                                            url: configUtil.adjustTest(record.id),
                                            data: mockData.AddDeviceForm, 
                                            hideButton: false, 
                                            buttonType: "modify",
                                            context: "adjust_test",
                                            dialogTitle: string.ADJUST_TEST,
                                            cb: function(xhr) {
                                                if(xhr.status === 200) {
                                                    var message = {
                                                        type: "success",
                                                        body: string.ADJUST_TEST_SUCESS
                                                    }
                                                    messageHandle(message);
                                                } else {
                                                    var message = {
                                                        type: "error",
                                                        body: string.ADJUST_TEST_ERROR
                                                    }
                                                    messageHandle(message);
                                                }
                                            }
                                        });
                                        viewer.renderAdjustTest();
                                        $("#modelLayer").fadeIn(500);
                                    }
                                },
                                {
                                    link: string.CANCEL_TEST,
                                    clickHandle: function(record) {
                                        sendRequest({
                                            url: configUtil.cancelTest(record.id),
                                            type: 'GET',
                                            cb: function(xhr) {
                                                if(xhr.status === 200) {
                                                    console.log('stop test successfully');
                                                    renderTable();
                                                    var message = {
                                                        type: "success",
                                                        body: string.CANCEL_TEST_SUCCESS
                                                    }
                                                    messageHandle(message);
                                                } else {
                                                    var message = {
                                                        type: "error",
                                                        body: string.CANCEL_TEST_ERROR
                                                    }
                                                    messageHandle(message);
                                                }
                                            }
                                        });
                                    }
                                }
                            ]
                        }else if(test.state === 'finished') {
                            test.showState = string.TEST_FINISHED_NO_REPORT;
                            tests.push(test);
                        }else if(test.state === 'generating') {
                            test.showState = string.TEST_REPORT_GENERATING;
                            tests.push(test);
                        }
                    });
                    return tests;
                }
                sendRequest({
                    url: configUtil.getTests(),
                    type: 'GET',
                    cb: function(xhr) {
                        if(xhr.status === 200) {
                            var data = filterResponse(xhr.responseJSON);
                            var args = {
                                fields: mockData.getTestRecordsFeilds(),
                                filter: ['device', 'rfDevice', 'scenarioName', 'replayTime', 'startTime', 'endTime', 'showState', 'action'],
                                records: data,
                                title: string.TEST_STATUS,
                                showAdd: false,
                                actions: actions,
                                emptyMessage: string.NO_TEST_SUBMIT,
                                cssClass: 'table'
                            }
                            $("#managerTable").remove();
                            var table = new $.Table(args);
                            table.render(domNode);
                        } else {
                            var message = {
                                type: "error",
                                body: string.LOAD_TEST_RECORD_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
            };

            renderTable();
        }

        this.adminManageTest = function(domNode) {
            var actions = [
                {
                    id: 'delete'
                }
            ]
            var renderTable = function() {
                var filterResponse = function(testList) {
                    testList.sort(function(a,b) {
                        return b.startTime - a.startTime;
                    });
                    $.each(testList, function(i, test) {
                        test.rfDevice = test.device.seriesNumber;
                        test.startTime = formDate(test.startTime);
                        if(test.endTime) {
                            test.endTime = formDate(test.endTime);
                        } else {
                            test.endTime = "";
                        }
                        if(test.state === 'pending') {
                            test.showState = string.PENDING_APPROVAL;
                        }else if(test.state === 'approved') {
                            test.showState = string.TEST_APPROVAL;
                        }else if(test.state === 'waiting') {
                            test.showState = string.TEST_WAITING;
                            tests.push(test);
                        }else if(test.state === 'running') {
                            test.showState = string.TEST_RUNNING;
                            test.action = [
                                {
                                    link: string.CHECK_REALTIME_STATE,
                                    clickHandle: function(record) {
                                        window.open('./teststatus.html?seriesNumber=' + record.device.seriesNumber);
                                    }
                                },
                                {
                                    link: string.ADJUST_TEST,
                                    clickHandle: function(record) {
                                        var viewer = new $.Viewer({
                                            url: configUtil.adjustTest(record.id),
                                            data: mockData.AddDeviceForm, 
                                            hideButton: false, 
                                            buttonType: "modify",
                                            context: "adjust_test",
                                            dialogTitle: string.ADJUST_TEST,
                                            cb: function(xhr) {
                                                if(xhr.status === 200) {
                                                    var message = {
                                                        type: "success",
                                                        body: string.ADJUST_TEST_SUCESS
                                                    }
                                                    messageHandle(message);
                                                } else {
                                                    var message = {
                                                        type: "error",
                                                        body: string.ADJUST_TEST_ERROR
                                                    }
                                                    messageHandle(message);
                                                }
                                            }
                                        });
                                        viewer.renderAdjustTest();
                                        $("#modelLayer").fadeIn(500);
                                    }
                                },
                                {
                                    link: string.CANCEL_TEST,
                                    clickHandle: function(record) {
                                        sendRequest({
                                            url: configUtil.cancelTest(record.id),
                                            type: 'GET',
                                            cb: function(xhr) {
                                                if(xhr.status === 200) {
                                                    console.log('stop test successfully');
                                                    renderTable();
                                                    var message = {
                                                        type: "success",
                                                        body: string.CANCEL_TEST_SUCCESS
                                                    }
                                                    messageHandle(message);
                                                } else {
                                                    var message = {
                                                        type: "error",
                                                        body: string.CANCEL_TEST_ERROR
                                                    }
                                                    messageHandle(message);
                                                }
                                            }
                                        });
                                    }
                                }
                            ]
                        }else if(test.state === 'finished') {
                            test.showState = string.TEST_FINISHED_NO_REPORT;
                        }else if(test.state === 'generating') {
                            test.showState = string.TEST_REPORT_GENERATING;
                        }else if(test.state === 'cancelled') {
                            test.showState = string.TEST_CANCELED;
                            test.action = [
                                {
                                    link: string.RESET_TEST,
                                    clickHandle: function(record) {
                                        var postData = {
                                            name: null,
                                            scenarioName: record.scenarioName,
                                            state: 'pending',
                                            vm: null,
                                            startTime: null,
                                            endTime: null,
                                            device: {
                                                id: record.device.id,
                                                seriesNumber: record.device.seriesNumber
                                            },
                                            user: {
                                                id: configUtil.currentUser.id,
                                                name: configUtil.currentUser.name
                                            }
                                        };
                                        $.ajax({
                                            url: configUtil.addTest(),
                                            type: 'POST',
                                            contentType: "application/json",
                                            data: JSON.stringify(postData),
                                            complete: function(xhr) {
                                                if(xhr.status === 200) {
                                                    var message = {
                                                        type: "success",
                                                        body: string.SUBMIT_TEST_SUCCESS
                                                    }
                                                    messageHandle(message);
                                                    renderTable();
                                                } else if(xhr.status === 400) {
                                                    var message = {
                                                        type: "error",
                                                        body: string.SUBMIT_TEST_ERROR_AGENT_MISS
                                                    }
                                                    messageHandle(message);
                                                } else {
                                                    var message = {
                                                        type: "error",
                                                        body: string.SUBMIT_TEST_ERROR
                                                    }
                                                    messageHandle(message);
                                                }
                                            }
                                        });
                                    }
                                }
                            ]
                        }else if(test.state === 'done') {
                            test.showState = string.TEST_DONE;
                            test.action = [
                                {
                                    link: string.CHECK_TEST_REPORT,
                                    clickHandle: function(record) {
                                        window.open('./js/pdfjs/web/viewer.html?testId=' + record.id);
                                    }
                                },
                                {
                                    link: string.DOWNLOAD_TEST_REPORT,
                                    clickHandle: function(record) {
                                        downloadFile(configUtil.downloadReport(record.id));
                                    }
                                }
                            ]
                        }else if(test.state === 'failed') {
                            test.showState = string.TEST_FAILED;
                        }
                    });
                    return testList;
                }
                sendRequest({
                    url: configUtil.getTests(),
                    type: 'GET',
                    cb: function(xhr){
                        if(xhr.status === 200) {
                            $("#managerTable").remove();
                            var data = filterResponse(xhr.responseJSON);
                            var fields = mockData.getTestRecordsFeilds();
                            var filter = ['device', 'rfDevice', 'scenarioName', 'replayTime', 'user', 'startTime', 'endTime', 'showState', 'action'];
                            var args = {
                                title: string.TEST_MANAGERMENT,
                                fields: fields,
                                records: data,
                                filter: filter,
                                actions: actions,
                                cssClass: "table",
                                emptyMessage: string.NO_TEST_ADMIN
                            }
                            var table = new $.Table(args);
                            table.render(domNode);
                            //scrollTop("#managerTable");
                        }
                    }
                });
            };
            renderTable();
        }
     
        this.renderTestManagerment = function(domNode) {
            var cards = [
                {
                    id: "testSubmit",
                    header: string.TEST_SUBMIT,
                    description: string.TEST_SUBMIT_DESCRIPTION,
                    icon: ""
                },
                {
                    id: "testRecord",
                    header: string.TEST_RECORD,
                    description: string.TEST_RECORD_DESCRIPTION,
                    icon: ""
                },
            ]
            var panel = new $.Panel({cards: cards});
             panel.render(domNode);
        }
        
        this.renderAccountSetting = function(domNode) {
            $("#mainContainer").empty();
            var user = configUtil.currentUser;
            if(!document.getElementById('boardTable')) {
                var board = new $.Board({
                    user: user,
                    data: mockData.getUserForm({isUpdate: true}),
                    callback: function(xhr) {
                        if(xhr.status === 200) {
                            var data = xhr.responseJSON;
                            board.fillIn(user);
                            var message = {
                                type: "success",
                                body: string.CHANGE_INFO_SUCCESS
                            }
                            messageHandle(message);
                        } else {
                            var message = {
                                type: "error",
                                body: string.CHANGE_INFO_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
                board.render(domNode);
                board.fillIn(user);
                var userType_div = document.createElement("div");
                var userType = user.license === 0 ? string.USER_NO_VIP : string.USER_VIP;
                userType_div.appendChild(document.createTextNode(userType));
                userType_div.className = "intro-title";
                $("#boardTable").prepend(userType_div);
            }
        }

        this.changePassword = function(domNode) {
            $("#mainContainer").empty();
            if(!document.getElementById('boardTable')) {
                var user = configUtil.currentUser;
                var board = new $.Board({
                    user: user,
                    data: mockData.changePasswordForm(), 
                    callback: function(xhr) {
                        if(xhr.status === 200) {
                            var message = {
                                type: "success",
                                body: string.CHANGE_PWD_SUCCESS
                            }
                            messageHandle(message);
                            setTimeout(function() {
                                window.location.href = "./login.html";
                            }, 5000);
                        } else {
                            var message = {
                                type: "error",
                                body: string.CHANGE_PWD_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
                board.render(domNode);
            }
        }
    };

    $.ManContainer = function(args) {
        var backGroundImg = args.imgSrc;
        this.renderBackground = function(domNode) {
            var div = document.createElement("div");
            div.className = "background";
            var img = document.createElement("img");
            img.src = backGroundImg;
            div.appendChild(img);
            domNode.appendChild(div);
        }

        this.renderContent = function(domNode) {
            var div = document.createElement("div");
            div.id = "content";
            domNode.appendChild(div);
        }

        this.renderManContainer = function(domNode) {
            this.renderBackground(domNode);
            this.renderContent(domNode);
        }
    }

    $.BoxWidget = function(args) {
        var info = args.info;

        this.render = function(domNode) {
            var div = document.createElement("div");
            div.id = "box";
            domNode.appendChild(div);
            
            //var index = 0;
            div.appendChild(document.createTextNode(info));
            //var self = this;
            /*
            setInterval(function(){
                 $("#box-content").animate({"margin-left": "-600px"}, "5000", function(){
                     $("#box-content").css("margin-left", "0px");
                 });
                if(index+1 == info.length) {
                    index = 0;
                }
                else {
                    index++;
                }

                self.changeContent(info[index]);
            }, 5000);
            */
        }

        this.renderContent = function(info) {
            var div = document.createElement("div");
            div.id = "box-content";

                var header = document.createElement("div");
                header.className = "box-header";
                    var h1 = document.createElement("h1");
                    h1.appendChild(document.createTextNode(info.topic));
                header.appendChild(h1);

                var content = document.createElement("div");
                content.className = "box-content";
                content.id = info.id;
                content.appendChild(document.createTextNode(info.content));

            div.appendChild(header);
            div.appendChild(content);

            return div;
        }

        this.changeContent = function(info) {
            $("#box-content .box-header h1").text(info.topic);
            $("#box-content .box-content").text(info.content);
        }
    }

    $.Panel = function(args) {
        var cards = args.cards;

        this.render = function(domNode) {
            var pannel = document.getElementById("pannel");
            if(!pannel) {
                pannel = document.createElement("div");
                pannel.id = "pannel";
                domNode.appendChild(pannel);
            }
            else {
                $("#pannel").empty();
            }
            this.renderDetail(pannel);
            //scrollTop("#pannel");
        }

        this.renderHeader = function (domNode) {
            var div = document.createElement("div");
            div.id = "test";
            domNode.appendChild(div);

                var div_header = document.createElement("div");
                div_header.id = "test-header";
                    var img = document.createElement("img");
                    img.src = test.icon;
                    div_header.appendChild(img);
                    div_header.appendChild(document.createTextNode(test.name));
                div.appendChild(div_header);
        }

        this.renderDetail = function(domNode) {
            var divTest = document.createElement("div");
            divTest.id = "test-detail";
            domNode.appendChild(divTest);
            
            var th = this;
            $.each(cards, function(i, val){
                var div = document.createElement("div");
                div.className = "test-intro";
                div.id = val.id;
                div.onclick = function() {
                    var node = th.renderPanel(this.id);
                    if(node) {
                        th.renderModel().appendChild(node);
                        $("#modelLayer").fadeIn(500);
                    }
                };

                    var div_title = document.createElement("div");
                    div_title.className = "intro-title";
                    div_title.appendChild(document.createTextNode(val.header));
                    div.appendChild(div_title);

                    var div_intro = document.createElement("div");
                    div_intro.className = "intro-content";
                    div_intro.appendChild(document.createTextNode(val.description));
                    div.appendChild(div_intro);
                divTest.appendChild(div);
            })
        }

        this.renderPanel = function(card) {
            var div = document.createElement("div");
            if(card == "testSubmit") {
                this.renderSubmitTest(div);
            }

            if(card == "testRecord") {
                this.renderTestRecords(div);
            }
            return div;
        }

        this.renderTestRecords = function(domNode) {
            var actions = [
                {
                    id: "delete",
                    event: function(record) {
                        sendRequest({
                            url: configUtil.deleteTest(record.id),
                            type: 'DELETE',
                            cb: function(xhr) {
                                if(xhr.status === 200) {
                                    console.log('delete test successfully');
                                    renderTable();
                                    var message = {
                                        type: "success",
                                        body: string.DELETE_TEST_SUCCESS
                                    }
                                    messageHandle(message);
                                } else {
                                    var message = {
                                        type: "error",
                                        body: string.DELETE_TEST_ERROR
                                    }
                                    messageHandle(message);
                                }
                            }
                        });
                    }
                }
            ];

            var renderTable = function() {
                var filterResponse = function(testList) {
                    testList.sort(function(a,b) {
                        return b.startTime - a.startTime;
                    });
                    $.each(testList, function(i, test) {
                        test.startTime = formDate(test.startTime);
                        if(test.endTime) {
                            test.endTime = formDate(test.endTime);
                        } else {
                            test.endTime = "";
                        }
                        if(test.state === 'running') {
                            test.action = {
                                link: string.CHECK_REALTIME_STATE,
                                clickHandle: function() {
                                    window.open('./teststatus.html?' + test.device.seriesNumber);
                                    /*
                                    sendRequest({
                                        url: configUtil.checkTestProcess(test.device.seriesNumber),
                                        type: 'GET',
                                        cb: function(xhr) {
                                            if(xhr.status === 200) {

                                            }
                                        }
                                    });
                                    */
                                }
                            }
                        } else if(test.state === 'done') {
                            test.action = {
                                link: string.CHECK_TEST_REPORT,
                                clickHandle: function() {
                                    window.open('./js/pdfjs/web/viewer.html?testId=' + test.id);
                                    //window.open(configUtil.checkTestReport(test.id));
                                }
                            }
                        }
                    });
                    return testList;
                }
                sendRequest({
                    url: configUtil.getTests(),
                    type: 'GET',
                    cb: function(xhr) {
                        if(xhr.status === 200) {
                            var data = filterResponse(xhr.responseJSON);
                            var args = {
                                fields: mockData.getTestRecordsFeilds(),
                                filter: ['device', 'rfDevice', 'scenarioName', 'replayTime', 'startTime', 'endTime', 'state', 'action'],
                                records: data,
                                title: string.TEST_RECORD,
                                showAdd: false,
                                actions: actions,
                                emptyMessage: string.NO_TEST_SUBMIT
                            }
                            $("#managerTable").remove();
                            var table = new $.Table(args);
                            table.render(domNode);
                        } else {
                            var message = {
                                type: "error",
                                body: string.LOAD_TEST_RECORD_ERROR
                            }
                            messageHandle(message);
                        }
                    }
                });
            };

            renderTable();
        }

        this.renderModel = function() {
            var dialogFrame = document.createElement("div");
            dialogFrame.id = "modelDialog";
            dialogFrame.className = "dialogFrame";

            var divClose = document.createElement("div");
            divClose.className = "closeLink blackStyle";
            divClose.id = "closeLink";
            divClose.onclick = function() {
                $("#modelLayer").fadeOut(500, function(){
                    $("#modelLayer").remove();
                });
            }
            dialogFrame.appendChild(divClose);

            var divForm = document.createElement("form");
            dialogFrame.appendChild(divForm);
            renderModelLayer().appendChild(dialogFrame);
            
            return divForm;
        }
    }

    $.TestManagerment = function(args) {
        var testRecods = args.testRecods;

        this.render = function() {
            var div_testManage = document.getElementById("test_Manage");
            if(!div_testManage) {
                var div_testManage = document.createElement("div");
                div_testManage.id = "test_Manage";
                $(".wrapper").append(div_testManage);
            }
            else {
                $("#test_Manage").empty();
            }
            this.renderTable(div_testManage);
            $("#test_Manage").insertAfter("#mainContainer");
            $("#mainContainer").animate({"margin-top":"-700px"}, "slow");
        }

    }

    $.Table = function(args) {
        var fields = args.fields;
        var records = args.records;
        var records_filter = args.filter;
        var title = args.title;
        var showAdd = args.showAdd;
        var cssClass = args.cssClass;
        var actions = args.actions;
        var addOptions = args.addOptions;
        var cb = args.callback;
        var emptyMessage = args.emptyMessage;

        this.render = function(domNode) {
            this.renderTable(domNode);
        }

        this.renderHeader = function(domNode) {
            var div = document.createElement("div");
            div.id = "record-headr";
                var h3 = document.createElement("h3");
                h3.appendChild(document.createTextNode(title));
            div.appendChild(h3);
            domNode.appendChild(div);
        }

        this.renderTable = function(domNode) {
            var managerTable = document.createElement("div");
            managerTable.id = args.tableId || "managerTable";
            managerTable.className = cssClass;
            this.renderHeader(managerTable);
            
            var tableContent = document.createElement("div");
            tableContent.id = "tableContent";
            var table = document.createElement("table");
            table.id = "table";
                var tr_title = document.createElement("tr");
                tr_title.id = "tableField"; 

                var colspan = 0;
                $.each(fields, function(i, val){
                    var td = document.createElement("td");
                    td.appendChild(document.createTextNode(val));
                    tr_title.appendChild(td);
                    colspan++;
                });

                table.appendChild(tr_title);
                
                if(records && records.length > 0) {
                    for(var i=0; i<records.length; i++) {
                        var tr = document.createElement("tr");
                        $.each(records_filter, function(j, val){
                            var td = document.createElement("td");
                            var value;
                            if(val === 'frequencyFile') {
                                var frequencyFile = records[i][val];
                                for(var index = 0; index < frequencyFile.length; index++) {
                                    var div = document.createElement('div');
                                    div.id = "frequencyFile"       
                                    if((frequencyFile[index].context === "downloadFile" && frequencyFile[index].status === "noDownload") || (frequencyFile[index].context === "testSubmit" && frequencyFile[index].status === "readyToTest")) {
                                        var chk = document.createElement("input");
                                        chk.type = "checkbox";
                                        chk.id = frequencyFile[index].name;
                                        if(frequencyFile[index].scenarioId)
                                            chk.setAttribute("scenarioId", frequencyFile[index].scenarioId);
                                        div.appendChild(chk);
                                    }
                                    
                                        var label = document.createElement("label");
                                        label.appendChild(document.createTextNode(frequencyFile[index].frequencePoint + "(" + frequencyFile[index].size + ")"));  
                                    div.appendChild(label);

                                    if(frequencyFile[index].link) {
                                        var a = document.createElement("a");
                                        a.name = frequencyFile[index].link.name;
                                        a.fileId = frequencyFile[index].link.fileId;
                                        a.style.color = "rgb(3, 114, 192)";
                                        a.appendChild(document.createTextNode(frequencyFile[index].link.text));
                                        a.onclick = frequencyFile[index].link.onClick;
                                        div.appendChild(a);

                                        if(frequencyFile[index].status === "downloading" && frequencyFile[index].canCancel) {
                                            var a_cancel = document.createElement("a");
                                            a_cancel.name = frequencyFile[index].canCancel.name;
                                            a_cancel.fileId = frequencyFile[index].canCancel.fileId;
                                            a_cancel.style.color = "rgb(3, 114, 192)";
                                            a_cancel.appendChild(document.createTextNode(frequencyFile[index].canCancel.text));
                                            a_cancel.onclick = frequencyFile[index].canCancel.onClick;
                                            div.appendChild(a_cancel);
                                        }
                                    }
                                    if(frequencyFile[index].label) {
                                        var span = document.createElement("span");
                                        span.appendChild(document.createTextNode(frequencyFile[index].label));
                                        div.appendChild(span);
                                    }
                                    td.appendChild(div);
                                }
                            } else if(val === 'action' && records[i][val]) {
                                if($.isArray(records[i][val])) {
                                    var actionList = records[i][val];
                                    for(var index=0; index<actionList.length; index++) {
                                        var div = document.createElement("div");
                                        if(actionList[index].link) {
                                            var a = document.createElement("a");
                                            a.style.color = "#0372c0";
                                            a.i = i;
                                            a.index = index;
                                            a.appendChild(document.createTextNode(actionList[index].link));
                                            a.onclick = function() {
                                                actionList[this.index].clickHandle(records[this.i]);
                                            }
                                            div.appendChild(a);
                                        } else if(actionList[index].label){
                                            var label = document.createElement("label");
                                            label.appendChild(document.createTextNode(actionList[index].label));
                                            div.appendChild(label);
                                        }
                                        td.appendChild(div);
                                    }  
                                } else if(records[i][val].link) {
                                    var a = document.createElement("a");
                                    a.style.color = "#0372c0";
                                    a.appendChild(document.createTextNode(records[i][val].link));
                                    a.onclick = records[i][val].clickHandle;
                                    td.appendChild(a);
                                } else if(records[i][val].label) {
                                    var label = document.createElement("label");
                                    label.appendChild(document.createTextNode(records[i][val].label));
                                    td.appendChild(label);
                                }
                            } else {
                                if(val === 'user' || val === 'scenario' || val === 'device') {
                                    value = records[i][val] ? records[i][val].name : '';
                                } else if(val === 'license'){
                                    switch(records[i][val]) {
                                        case 'FREE': value = string.USER_NO_VIP; break;
                                        case 'PAID' : value = string.USER_VIP; break;
                                    }
                                } else if(val === 'dateCreated') {
                                    value = formDate(records[i][val]);
                                } else {
                                    value = records[i][val];
                                }
                                td.appendChild(document.createTextNode(value || ""));
                            }
                            tr.appendChild(td);
                        });
                        
                        var self = this;
                        $.each(actions, function(j, action){
                            var td = document.createElement("td");
                                if(action.id == "checkbox") {
                                    var input = document.createElement("input");
                                    input.type = "checkbox";
                                    if(records[i].id)
                                        input.id = records[i].id;
                                    input.name = action.name ? action.name : "";
                                    input.setAttribute("scenarioName", records[i].name);
                                    td.appendChild(input);
                                } else if(action.id == "select") {
                                    var select = document.createElement("select");
                                    select.name = action.elementName;
                                    select.i = i;
                                    select.onclick = function() {
                                        action.event(this, records[this.i]);
                                    };
                                    if(action.defaultOption) {
                                        var op = document.createElement("option");
                                        op.appendChild(document.createTextNode(action.defaultOption));
                                        select.appendChild(op);
                                    }
                                    td.appendChild(select);
                                } else if(action.id == "link") {
                                    var a = document.createElement("a");
                                    a.style.color = "#0372c0";
                                    a.i = i;
                                    a.appendChild(document.createTextNode(action.label));
                                    a.onclick = function() {
                                        action.event(records[this.i]);
                                    };
                                    td.appendChild(a);
                                } else {
                                    var a = document.createElement("a");
                                    if(action.getTitle) {
                                        a.title = action.getTitle(records[i]);
                                    }
                                    a.i = i;
                                    a.onclick = function() {
                                        action.event(records[this.i]);
                                    };
                                        var img = document.createElement("img");
                                        img.src = self.setActions(action.id);
                                        a.appendChild(img);
                                    td.appendChild(a);
                                }

                            tr.appendChild(td);

                        });
                        table.appendChild(tr);
                    }
                }
                else {
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.setAttribute("colspan", colspan);
                    td.appendChild(document.createTextNode(emptyMessage));
                    tr.appendChild(td);
                    table.appendChild(tr);
                }

                
                if(showAdd) {
                    var tr = document.createElement("tr");
                    tr.id="addLink";
                    tr.onclick = function() {
                        if(typeof addOptions.handleClick === 'function') {
                            addOptions.handleClick();
                            return;
                        }
                        var url;
                        switch(addOptions.type) {
                            case 'user': url = configUtil.register(); break;
                            case 'device': url = configUtil.addDevice(); break;
                            case 'RFdevice': url = configUtil.addRFDevice(); break;
                            case 'scenario': url = configUtil.addScenario(); break;
                            case 'VM': url = configUtil.createVM(); break;
                        };
                        var regMach = new $.Viewer({
                            url: url,
                            data: addOptions.fields, 
                            type: addOptions.type,
                            dialogTitle: addOptions.dialogTitle,
                            addOptionsCallback: addOptions.callback,
                            context: addOptions.type,
                            cb: cb
                        });
                        regMach.render();
                        $("#modelLayer").fadeIn(500);
                    };

                    var td = document.createElement("td");
                    td.setAttribute("colspan", colspan);

                    var img = document.createElement("img");
                    img.src = "../resource/images/plus.svg";
                    td.appendChild(img);

                    tr.appendChild(td);
                    table.appendChild(tr);
                }
                
                tableContent.appendChild(table);
            managerTable.appendChild(tableContent);
            domNode.appendChild(managerTable);
        }

        this.setActions = function(id) {
            var icon = null;
            switch(id) {
                case "check": icon = "../resource/images/check.png"; break;
                case "modify": icon = "../resource/images/modify.png"; break;
                case "delete": icon = "../resource/images/delete.svg"; break;
            }

            return icon;
        }
    }

    $.Viewer = function(args) {
        var data = args.data;
        var type = args.type;
        var context = args.context;
        var cb = args.cb;
        var hideButton = args.hideButton;
        var buttonType = args.buttonType || "submit";
        var url = args.url;
        var dialogTitle = args.dialogTitle;
        var addOptionsCallback = args.addOptionsCallback;
        
        this.renderAdjustTest = function(content) {
            var dialogFrame = document.createElement("div");
            dialogFrame.id = "modelDialog";
            dialogFrame.className = "dialogFrame";
            
            if(dialogTitle) {
                var dlgTitle = document.createElement('div');
                dlgTitle.className = 'dialogTitle',
                dlgTitle.appendChild(document.createTextNode(dialogTitle));

                dialogFrame.appendChild(dlgTitle);
            }

            var divClose = document.createElement("div");
            divClose.className = "closeLink";
            divClose.id = "closeLink";
            divClose.onclick = this.closeViewer;
            dialogFrame.appendChild(divClose);

            var divForm = document.createElement("form");
            var table = document.createElement("div");
                table.id = "regTable";

                var tr = document.createElement("div");
                    tr.className = 'row';
                    var divChannallable = document.createElement("div");
                        divChannallable.className = "subColum";
                        tr.appendChild(divChannallable);  

                        var labelNode = document.createElement("label");
                        labelNode.appendChild(document.createTextNode(string.SELECT_TEST_CHANNEL));
                        divChannallable.appendChild(labelNode);

                    var divChannalSelect = document.createElement("div");
                        divChannalSelect.className = "colum";
                        tr.appendChild(divChannalSelect);
                            var selectNode = document.createElement("select");
                            selectNode.name = 'channel';
                            selectNode.id = "testChannel";
                            for(var index=0; index<4; index++) {
                                var option = document.createElement("option");
                                    option.value = '0' + index.toString();
                                    option.appendChild(document.createTextNode((index+1).toString()));
                                selectNode.appendChild(option);
                            }
                        divChannalSelect.appendChild(selectNode);

                    var divAttenuationLabel = document.createElement("div");
                        divAttenuationLabel.className = "subColum";
                        tr.appendChild(divAttenuationLabel);
                            var AttenuationLabel = document.createElement("label");
                            AttenuationLabel.appendChild(document.createTextNode(string.ATTENUATION));
                            divAttenuationLabel.appendChild(AttenuationLabel);

                    var divAttenuationInput = document.createElement("div");
                        divAttenuationInput.className = "colum";
                        tr.appendChild(divAttenuationInput);
                            var plus = document.createElement("a");
                            plus.style.fontSize = "15px";
                            plus.onclick = function() {
                                var currentValue = parseFloat($("#attenuation").val());
                                var value = currentValue;
                                if(currentValue < 40) {
                                    value += 0.5;
                                }
                                $("#attenuation").val(value);
                            }
                            plus.appendChild(document.createTextNode("+ "));
                            divAttenuationInput.appendChild(plus);

                            var AttenuationInput = document.createElement("input");
                            AttenuationInput.id = "attenuation"
                            AttenuationInput.type = "text";
                            AttenuationInput.name = "attenuation";
                            AttenuationInput.value = "20";
                            AttenuationInput.disabled = true;
                            AttenuationInput.style.width = "25px";
                            divAttenuationInput.appendChild(AttenuationInput);

                            var minus = document.createElement("a");
                            minus.style.fontSize = "15px";
                            minus.onclick = function() {
                                var currentValue = parseFloat($("#attenuation").val());
                                var value = currentValue;
                                if(currentValue > 0) {
                                    value -= 0.5;
                                }
                                $("#attenuation").val(value);
                            }
                            minus.appendChild(document.createTextNode(" -"));
                            divAttenuationInput.appendChild(minus);
                        tr.appendChild(divAttenuationInput);
                             
                table.appendChild(tr);
            divForm.appendChild(table);
            dialogFrame.appendChild(divForm);
            
                var div =document.createElement("div");
                div.className = "footer";
                var submitBtn = document.createElement("button");
                submitBtn.type = "button";
                submitBtn.className = "button";

                submitBtn.value = string.SUBMIT_MODIFY;
                submitBtn.appendChild(document.createTextNode(string.SUBMIT_MODIFY));
                var self = this;
                submitBtn.onclick = function() {
                    var data = {};
                    var channel = $("#testChannel")[0];
                    var attenuation = $("#attenuation")[0];
                    data[channel.name] = channel.value;
                    var str = (attenuation.value * 2).toString();
                    data[attenuation.name] = str.length === 2 ? str : "0" + str;
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType:"json",
                        data: data,
                        contentType: "application/json",
                        complete: function(xhr) {
                            self.closeViewer();
                            if(typeof cb === 'function')
                                cb(xhr);
                        }
                    });
                }

                div.appendChild(submitBtn);

                var cancelBtn = document.createElement("button");
                cancelBtn.className = "button";
                cancelBtn.id = "cancelBtn";
                cancelBtn.value = string.SUBMIT_LOGIN;
                cancelBtn.onclick = this.closeViewer;
                cancelBtn.appendChild(document.createTextNode(string.CANCEL_BUTTON));
                div.appendChild(cancelBtn);
            dialogFrame.appendChild(div);

            renderModelLayer().appendChild(dialogFrame);
        }

        this.render = function(domNode) {
            var dialogFrame = document.createElement("div");
            dialogFrame.id = "modelDialog";
            dialogFrame.className = "dialogFrame";
            
            if(dialogTitle) {
                var dlgTitle = document.createElement('div');
                dlgTitle.className = 'dialogTitle',
                dlgTitle.appendChild(document.createTextNode(dialogTitle));

                dialogFrame.appendChild(dlgTitle);
            }

            var divClose = document.createElement("div");
            divClose.className = "closeLink";
            divClose.id = "closeLink";
            divClose.onclick = this.closeViewer;
            dialogFrame.appendChild(divClose);

            var divForm = document.createElement("form");
                var table = document.createElement("div");
                table.id = "regTable";
                var divContainer = document.createElement("div");
                    divContainer.style.display = "none";
                    divContainer.id = "viewerMessage";
                    table.appendChild(divContainer);
                var h4 = document.createElement("h4");
                h4.appendChild(document.createTextNode(string.MANDATORY_DATA));
                table.appendChild(h4);
                $.each(data, function(i, val) {
                    var tr = document.createElement("div");
                    tr.className = 'row';
                        for(var obj in val) {
                            if(obj === "title" ) {
                                var div = document.createElement("div");
                                div.className = "columTitle";
                                var label = val[obj];
                                var labelNode = document.createElement("label");
                                labelNode.appendChild(document.createTextNode(label));
                                div.appendChild(labelNode);
                                tr.appendChild(div);
                            }
                            if(obj === "must" || val[obj].hasOwnProperty("must")) {
                                var div = document.createElement("div");
                                div.className = "columMandatory";
                                var spanNode = document.createElement("span");
                                spanNode.className = "mandatory"
                                spanNode.appendChild(document.createTextNode("*"));
                                div.appendChild(spanNode);
                                tr.appendChild(div);
                            }
                            if(obj === "label" || (obj != "span" && val[obj].hasOwnProperty("label"))) {
                                var div = document.createElement("div");
                                div.className = obj === "label" ? "colum" : "subColum";
                                var label = obj === "label" ? val[obj] : val[obj].label;
                                var labelNode = document.createElement("label");
                                labelNode.appendChild(document.createTextNode(label));
                                div.appendChild(labelNode);
                                tr.appendChild(div);
                            }
                            
                            if(obj === "input" || val[obj].hasOwnProperty("input")) {
                                var div = document.createElement("div");
                                div.className = obj === "input" ? "colum" : "subColum";
                                var input = obj === "input" ? val[obj] : val[obj].input;
                                var inputNode = document.createElement("input");
                                    inputNode.placeholder = input.placeholder;
                                    inputNode.name = input.name;
                                    inputNode.type = input.type;
                                div.appendChild(inputNode);
                                    if(input.label) {
                                        var labelNode = document.createElement("label");
                                        labelNode.appendChild(document.createTextNode(input.label));
                                        div.appendChild(labelNode);
                                    }
                                tr.appendChild(div);
                            }

                            if(obj === "select" || val[obj].hasOwnProperty("select")) {
                                var select = obj === "select" ? val[obj] : val[obj].select;
                                if(select.label) {
                                    var labelNode = document.createElement("label");
                                    labelNode.appendChild(document.createTextNode(select.label));
                                    div.appendChild(labelNode);
                                }
                                var div = document.createElement("div");
                                div.className = "colum";
                                var selectNode = document.createElement("select");
                                    selectNode.name = select.name;

                                    if(select.options instanceof Array) {
                                        $.each(select.options, function(index, option) {
                                            var op = document.createElement("option");
                                                op.value = option.value;
                                                op.appendChild(document.createTextNode(option.label));
                                            selectNode.appendChild(op);
                                        }); 
                                    } else {
                                        if(typeof select.options.min === 'number' && typeof select.options.max === 'number') {
                                            for(var i = select.options.min; i < select.options.max; i++) {
                                                var op = document.createElement("option");
                                                    op.value = i;
                                                    op.appendChild(document.createTextNode(i + select.options.unit));
                                                selectNode.appendChild(op);
                                            }
                                        }
                                    }
                                div.appendChild(selectNode);
                                tr.appendChild(div);
                            }
                        }
  /*
                        if(val.must) {
                            var span = document.createElement("span");
                            span.id = val.span.id;
                            span.appendChild(document.createTextNode(val.span.label));
                            span.className = "colum emptyError hidden";
                            tr.appendChild(span);
                        }
*/
                    table.appendChild(tr);
                });
                divForm.appendChild(table);
                
            dialogFrame.appendChild(divForm);

            if(!hideButton) {
                dialogFrame.appendChild(this.renderButton());
            }

            renderModelLayer().appendChild(dialogFrame);
        }

        this.renderButton = function() {
            var div =document.createElement("div");
            div.className = "footer";
            var submitBtn = document.createElement("button");
            submitBtn.type = "button";
            submitBtn.className = "button";

            var text = buttonType === "modify" ? string.SUBMIT_MODIFY : string.SUBMIT_ADD;
            submitBtn.value = text;
            submitBtn.appendChild(document.createTextNode(text));
            var self = this;
            submitBtn.onclick = function() {
                var form = $("#regTable :input");
                var data = {};
                $.each(form, function(i, input) {
                    if(input.type === "checkbox") {
                        if(input.name === 'state') {
                            input.value = input.checked ? 1 : 0;
                        } else {
                            input.value = input.checked;
                        }
                        data[input.name] = input.value;
                    } else if(input.type === "file") {
                        var file = input.files[0];
                        data['file'] = file;
                        data['md5'] = '';
                    } else {
                        data[input.name] = input.value;
                    }
                });

                data.dateCreated = "";
                data.user = {
                    id: configUtil.currentUser.id,
                    name: configUtil.currentUser.name
                }

                if(context === "scenario" || context === "VM" || context === "user") {
                    delete data.user;
                    if(context != "user" && buttonType != "modify") {
                        delete data.dateCreated;
                    }
                }
                if(typeof addOptionsCallback === 'function') {
                    addOptionsCallback(data);
                    return;
                }
                $.ajax({
                    type: buttonType === "modify" ? "PUT" : "POST",
                    url: url,
                    dataType:"json",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    complete: function(res) {
                        if(res.status === 200) {
                            self.closeViewer();
                            if(typeof cb === 'function')
                                cb();
                        } else if(res.status === 409) {
                            var str = "";
                            switch(context) {
                                case "user": str = string.USER_TITLE; break;
                                case "scenario": str = string.SCENARIO_TITLE; break;
                                case "VM": str = string.VM_TITLE; break;
                                case "device": str = string.DEVICE_TITLE; break;
                            }
                            var message = string.CONFLICT_ERROR_MESSAGE.replace(/\$\{0\}/g, str);
                            viewerErrorMessage(message);
                        }
                        else {
                            self.closeViewer();
                        }
                    }
                });
            };
            div.appendChild(submitBtn);

            var cancelBtn = document.createElement("button");
            cancelBtn.className = "button";
            cancelBtn.id = "cancelBtn";
            cancelBtn.value = string.SUBMIT_LOGIN;
            cancelBtn.onclick = this.closeViewer;
            cancelBtn.appendChild(document.createTextNode(string.CANCEL_BUTTON));
            div.appendChild(cancelBtn);

            return div;
        }

        this.closeViewer = function() {
            $("#modelDialog").fadeOut(500, function(){
                $("#modelLayer").remove();
            });
        }

        this.fillIn = function(args) {
            var data = args.data;
            $.each($("#regTable :input"), function(i, input) {
                if(args.inputDisabled) {
                    input.disabled = true;
                }
                var name = input.name;
                if(data.hasOwnProperty(name)) {
                    if(input.type === "checkbox") {
                        input.checked = data[name];
                    } else {
                        input.value = data[name] === "" || data[name] === null ? " " : data[name];
                    }
                }
            });
        }
    }

    $.Board = function(args) {
        var user = args.user;
        var data = args.data;
        var callback = args.callback;

        this.render = function(domNode) {
            var divForm = document.createElement("form");
                var table = document.createElement("div");
                table.id = "boardTable";
                
                $.each(data, function(i, item) {
                    var tr = document.createElement("div");
                    tr.setAttribute("style", "overflow:hidden");
                        tr.className = "row";
                            var td = document.createElement("div");
                            td.className = "colum"
                            td.setAttribute("style", "float:left");
                                var label = document.createElement("label");
                                label.appendChild(document.createTextNode(item.label));         
                            td.appendChild(label);
                        tr.appendChild(td);
                            var td = document.createElement("div");
                            td.className = "colum"
                            td.setAttribute("style", "float:left");
                                var input = document.createElement("input");
                                input.placeholder = item.input.placeholder;
                                input.name = item.input.name;
                                input.type = item.input.type;
                            td.appendChild(input);
                        tr.appendChild(td);
                        if(item.must) {
                            var td = document.createElement("div");
                                td.className = "colum"
                                td.setAttribute("style", "float:left");
                                var span = document.createElement("span");
                                span.id = item.span.id;
                                span.appendChild(document.createTextNode(item.span.label));
                                span.className = "colum emptyError hidden";
                            td.appendChild(span);
                            tr.appendChild(td);
                        }
                    table.appendChild(tr);
                });

            table.appendChild(this.renderButton());

            divForm.appendChild(table);
            domNode.appendChild(divForm);


        }

        this.renderButton = function() {
            var div =document.createElement("div");
            div.className = "footer";
            var submitBtn = document.createElement("button");
            submitBtn.type = "button";
            submitBtn.className = "button";
            submitBtn.value = string.SUBMIT_SAVE;
            submitBtn.appendChild(document.createTextNode(string.SUBMIT_MODIFY));
            submitBtn.onclick = function() {
                var form = $("#boardTable input");
                var formData = configUtil.currentUser;
                $.each(form, function(i, input) {
                    formData[input.name] = input.value;
                });
                $.ajax({
                    type: "PUT",
                    url: configUtil.modifyUserById(user.id),
                    dataType:"json",
                    data: JSON.stringify(formData),
                    contentType: "application/json",
                    complete: function(xhr) {
                        callback(xhr);
                    }
                });
            }
            div.appendChild(submitBtn);
/*
            var cancelBtn = document.createElement("button");
            cancelBtn.className = "button";
            cancelBtn.id = "cancelBtn";
            cancelBtn.value = string.CANCEL_BUTTON;
            cancelBtn.onclick = function() {

            };
            cancelBtn.appendChild(document.createTextNode(string.CANCEL_BUTTON));
            div.appendChild(cancelBtn);
*/
            return div;
        }

        this.fillIn = function(data) {
            var data = data;
            $.each($("#boardTable :input"), function(i, input) {
                if(args.inputDisabled) {
                    input.disabled = true;
                }
                var name = input.name;
                if(data.hasOwnProperty(name)) {
                    if(input.type === "checkbox") {
                        input.checked = data[name];
                    } else {
                        input.value = data[name] === "" || data[name] === null ? " " : data[name];
                    }
                }
            });
        }
    }

    $.UploadDialog = function(args) {
        var url = args.url;
        var fileList = args.fileList;
        var scenarioId = args.scenarioId;
        var cb = args.callback;
        this.render = function() {
            var dialogFrame = document.createElement("div");
            dialogFrame.id = "uploadDialog";
            dialogFrame.className = "dialogFrame";

            var dlgTitle = document.createElement('div');
                dlgTitle.className = 'dialogTitle',
                dlgTitle.appendChild(document.createTextNode(string.TEST_FILE));

                dialogFrame.appendChild(dlgTitle);

            var divClose = document.createElement("div");
            divClose.className = "closeLink";
            divClose.id = "closeLink";
            divClose.onclick = closeDialog;
            dialogFrame.appendChild(divClose);
            
            var divForm = document.createElement("div");
            divForm.id = "form";
            divForm.className = "form";
            var form = document.createElement("form");
            divForm.appendChild(form);
            
            var h4 = document.createElement("h4");
                h4.appendChild(document.createTextNode(string.MANDATORY_DATA));
            form.appendChild(h4);
            //form.appendChild(showSampleInfo(mockData.getSampleInfo()));
            form.appendChild(showUploadInput(fileList));
            form.appendChild(renderSubmitButton()); 
                         
            dialogFrame.appendChild(divForm);
            renderModelLayer().appendChild(dialogFrame);
        },

        showTestFile = function(domNode, fileList) {
            if(fileList.length === 0) {
                var emptyLabel = document.createElement("h4");
                emptyLabel.appendChild(document.createTextNode(string.UPLOAD_TEST_FILE));
                domNode.appendChild(emptyLabel);
            } else {
                $.each(fileList, function(index, file) {
                    file.fp = formatFrequence(file.frequencyPointType).value;
                    file.fileSize = formSize(file.fileSize);
                });
                var args = {
                    fields: mockData.getTestFileFields(),
                    filter: ['name', 'fp', 'sampleBit', 'sampleRate', 'fileSize'],
                    records: fileList,
                    title: string.SCENRIO_TEST_FILES,
                    showAdd: false,
                    actions: [],
                    emptyMessage: ''
                }
                var table = new $.Table(args);
                table.render(domNode);
            }
        },

        showSampleInfo = function(val) {
            var tr = document.createElement("div");
            tr.className = "row";
            for(var obj in val) {
                if(obj === "title" ) {
                    var div = document.createElement("div");
                    div.className = "columTitle";
                    var label = val[obj];
                    var labelNode = document.createElement("label");
                    labelNode.appendChild(document.createTextNode(label));
                    div.appendChild(labelNode);
                    tr.appendChild(div);
                }
                if(obj === "must" || val[obj].hasOwnProperty("must")) {
                    var div = document.createElement("div");
                    div.className = "columMandatory";
                    var spanNode = document.createElement("span");
                    spanNode.className = "mandatory"
                    spanNode.appendChild(document.createTextNode("*"));
                    div.appendChild(spanNode);
                    tr.appendChild(div);
                }
                if(obj === "label" || (obj != "span" && val[obj].hasOwnProperty("label"))) {
                    var div = document.createElement("div");
                    div.className = obj === "label" ? "colum" : "subColum";
                    var label = obj === "label" ? val[obj] : val[obj].label;
                    var labelNode = document.createElement("label");
                    labelNode.appendChild(document.createTextNode(label));
                    div.appendChild(labelNode);
                    tr.appendChild(div);
                }
                
                if(obj === "input" || val[obj].hasOwnProperty("input")) {
                    var div = document.createElement("div");
                    div.className = obj === "input" ? "colum" : "subColum";
                    var input = obj === "input" ? val[obj] : val[obj].input;
                    var inputNode = document.createElement("input");
                        inputNode.placeholder = input.placeholder;
                        inputNode.name = input.name;
                        inputNode.type = input.type;
                    div.appendChild(inputNode);
                        if(input.label) {
                            var labelNode = document.createElement("label");
                            labelNode.appendChild(document.createTextNode(input.label));
                            div.appendChild(labelNode);
                        }
                    tr.appendChild(div);
                }
            }
            return tr;
        }

        showUploadInput = function(fileList) {
            var div_input = document.createElement("div");
            div_input.className = "row";

                 var div_mandatory = document.createElement("div");
                    div_mandatory.className = "columMandatory";
                    var spanNode = document.createElement("span");
                    spanNode.className = "mandatory"
                    spanNode.appendChild(document.createTextNode("*"));
                    div_mandatory.appendChild(spanNode);
                    div_input.appendChild(div_mandatory);

                    var div_file = document.createElement("div");
                        div_file.className = "colum";
                    var fileInput = document.createElement("input");
                        fileInput.type = "file";
                        fileInput.name = "file"
                        div_file.appendChild(fileInput);
                    div_input.appendChild(div_file);

            var excludePoint = [];
            $.each(fileList, function(index, file) {
                excludePoint.push(formatFrequence(file.frequencyPointType).index);
            });

            var data = mockData.getFrequencyPoint(excludePoint);
            var div_select = document.createElement("div");
                div_select.className = "colum";
            for(var obj in data) {
                if(obj === 'label') {
                    var label = document.createElement('label');
                    label.appendChild(document.createTextNode(data[obj]));
                    div_select.appendChild(label);
                }
                if(obj === "select") {
                    var select = document.createElement("select");
                    select.name = data[obj].name;
                    $.each(data[obj].options, function(i, op) {
                        var option = document.createElement("option");
                        option.value = op.value;
                        option.appendChild(document.createTextNode(op.label));
                        select.appendChild(option);
                        div_select.appendChild(select);
                    });
                }
            }
            div_input.appendChild(div_select);
            return div_input;
        }

        renderSubmitButton = function() {
            var footerDiv = document.createElement("div");
            footerDiv.className = "footer";
            var submitBtn = document.createElement("button");
            submitBtn.type = "button";
            submitBtn.className = "uploadButton";
            submitBtn.value = string.SUBMIT_UPLOAD;
            submitBtn.onclick = upload;
            submitBtn.appendChild(document.createTextNode(string.SUBMIT_UPLOAD));
            footerDiv.appendChild(submitBtn);
            
            footerDiv.appendChild(renderProgressBar());
            return footerDiv;
        },

        renderProgressBar = function() {
            var div = document.createElement("div");
            div.id = "progressContainer";
                var divProcess = document.createElement("div");
                divProcess.id = "progressBar";
                div.appendChild(divProcess);

            return div;
        },

        closeDialog = function() {
            $("#modelLayer").fadeOut(500, function(){
                $("#modelLayer").remove();
            });
        },

        upload = function() {
            var fileList = $("#uploadDialog input[type='file']")[0].files;
            var select = $("#uploadDialog select")[0];
            var sampleBit = $("#uploadDialog input[name='sampleBit']")[0];
            var sampleRate = $("#uploadDialog input[name='sampleRate']")[0];
            var formData = new FormData();

            for(var i=0; i< fileList.length; i++) {
                formData.append('file', fileList[i]);
                formData.append('name', fileList[i].name);
                formData.append(select.name, select.value);
                formData.append('scenarioId', scenarioId);
                formData.append('md5', '');
                uploadRequest(formData, url, cb);
            }
        }
    },

    $.Card = function(args) {
        var data = args.data
        this.render = function() {
            var div = renderModelLayer();
            var dialogFrame = document.createElement("div");
            dialogFrame.id = "uploadDialog";
            dialogFrame.className = "dialogFrame";

            var dlgTitle = document.createElement('div');
                dlgTitle.className = 'dialogTitle',
                dlgTitle.appendChild(document.createTextNode(string.TEST_FILE));
                dialogFrame.appendChild(dlgTitle);

            var divClose = document.createElement("div");
            divClose.className = "closeLink";
            divClose.id = "closeLink";
            divClose.onclick = closeDialog;
            dialogFrame.appendChild(divClose);
            
            var divContent = document.createElement("div");
            divContent.id = args.id;
            var structure = mockData.getTestFile();
            for(var i=0; i< data.length; i++) {
                var p = document.createElement("p");
                for(item in structure) {
                    if(data[i][item]) {
                        var span = document.createElement("span");
                        span.appendChild(document.createTextNode(structure[item]));
                        var label = document.createElement("label");
                        label.appendChild(document.createTextNode(data[i][item]));

                        p.appendChild(span);
                        p.appendChild(label);
                    }
                }
                divContent.appendChild(p); 
            }
            dialogFrame.appendChild(divContent);
            div.appendChild(dialogFrame);
        },
        closeDialog = function() {
            $("#modelLayer").fadeOut(500, function(){
                $("#modelLayer").remove();
            });
        }
    }
})(jQuery);