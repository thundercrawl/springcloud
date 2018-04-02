var string = languages[0].content;
var pageTitle = document.createElement("title");
pageTitle.appendChild(document.createTextNode(string.TITLE));
$("head").append(pageTitle);
var url = window.location.search;
var search = '?testId=';
var testId = url.substring(search.length, url.length);

var renderHeader = function() {
    var domNode = document.getElementById("banner");
        var widgetContainer = document.createElement("div");
        widgetContainer.id = "widgetContainer";
        domNode.appendChild(widgetContainer);
    
    var header = new $.Header({
      string: string, 
      imgSrc: "../resource/images/logo-taier.png",
    });

    header.renderTitle(domNode);
}

var getReport = function() {
    var url = configUtil.checkTestReport(testId);
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    } else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onload = function() {
        if(xmlhttp.status === 200) {
            var txt = xmlhttp.responseText;
            $("#reportContent").append(document.createTextNode(txt));
        } else {
            $("#reportContent").append(document.createTextNode(string.GET_REPORT_ERROR));
        }
    };
}

var renderMainContainer = function() {
    var div = document.createElement('div');
       var title = document.createElement('div');
       title.id = "reportTitle";
       title.appendChild(document.createTextNode(string.REPORT_TITLE));
       div.appendChild(title);

      var chartContainer = document.createElement('div');
      chartContainer.id = "reportContent";
    div.appendChild(chartContainer);
    return div;
}

renderHeader();
$(".wrapper").append(renderMainContainer());
getReport()