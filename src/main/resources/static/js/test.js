var string = languages[0].content;
var pageTitle = document.createElement("title");
pageTitle.appendChild(document.createTextNode(string.TITLE));
$("head").append(pageTitle);
var url = window.location.search;
var search = '?seriesNumber=';
var seriesNumber = url.substring(search.length, url.length);

var formDate = function(value) {
    var date = new Date(value);
    return date;
}
var getCurrentDate = function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

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

var renderMainContainer = function() {
    var div = document.createElement('div');
    var chartContainer = document.createElement('div');
    chartContainer.id = "chartContainer";
    div.appendChild(chartContainer);
    var ggaContainer = document.createElement('div');
    ggaContainer.id = "ggaContainer";
    div.appendChild(ggaContainer);
    return div;
}

var renderErrorMessage = function(message) {
    var domNode = $("#errorMessage")[0];
    var img = document.createElement("img");
        img.src = '../resource/images/error.png';
    domNode.appendChild(img);

    var span = document.createElement("span");
    span.appendChild(document.createTextNode(message));
    domNode.appendChild(span);
}

var getData = function() {
    $("#errorMessage").empty();
    if(seriesNumber && seriesNumber != '') {
        $.ajax({
            url: configUtil.checkTestProcess(seriesNumber),
            type: 'GET',
            contentType: "application/json",
            complete: function(xhr) {
                if(xhr.status === 200) {
                    var data = xhr.responseJSON;
                    renderChart(data);
                } else {
                    renderChart([]);
                    renderErrorMessage(string.ERROR_TEST_STATUS);
                }
            }
        });
        $.ajax({
            url: configUtil.getGGA(seriesNumber),
            type: 'GET',
            contentType: "application/json",
            complete: function(xhr) {
                var data = {
                    la: "",
                    lo: "",
                    utc: "",
                }
                if(xhr.status === 200) {
                    data = xhr.responseJSON;
                }
                $("#ggaContainer").empty();
                rednerGgaData(data);
            }
        });
    }
}

var rednerGgaData = function(data) {
    var container = document.getElementById("ggaContainer");

    var div_la = document.createElement("div");
    var latitude_label = document.createElement("label");
    latitude_label.appendChild(document.createTextNode(string.LATITUDE));
    div_la.appendChild(latitude_label);
    div_la.appendChild(document.createTextNode(data.la));
    container.appendChild(div_la);

    var div_lo = document.createElement("div");
    var longitude_label = document.createElement("label");
    longitude_label.appendChild(document.createTextNode(string.LONGITUDE));
    div_lo.appendChild(longitude_label);
    div_lo.appendChild(document.createTextNode(data.lo));
    container.appendChild(div_lo);

    var div_utc = document.createElement("div");
    var utc_label = document.createElement("label");
    utc_label.appendChild(document.createTextNode(string.UTC));
    div_utc.appendChild(utc_label);
    div_utc.appendChild(document.createTextNode(data.utc));
    container.appendChild(div_utc);
}

var renderChart = function(data) {
    var categories = [];
    var dataSet = [];
    var series = [];
    var max = data.length >= 16 ? 16 : data.length;
    for(var i=0; i<max; i++) {
        categories.push(data[i].PRN);
        dataSet.push(parseInt(data[i].SNR));
    }
    series.push({
        name: string.SIGNAL_NOISE_RATIO,
        data: dataSet
    });

    Highcharts.chart('chartContainer', {
        chart: {
            type: 'column'
        },
        title: {
            text: string.TEST_REAL_STATUS
        },
        subtitle: {
            text: string.TEST_DEVICE_SERIESNUMBER + ": " + seriesNumber + "    " + string.CURRENT_TIME + ": " + getCurrentDate()
        },
        xAxis: {
            categories: categories,
            crosshair: true,
            title: {
                text: string.SATELITE_NUBMER
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: string.SIGNAL_NOISE_RATIO
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
    });
}

renderHeader();
$(".wrapper").append(renderMainContainer());
getData();
setInterval(getData, 10000);