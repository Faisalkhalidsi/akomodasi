var App = (function(lng, undefined) {

    about = function(event) {
        var environment = lng.Core.environment();
        if (environment.os) {
            var OSName = environment.os.name;
            var OSVersion = environment.os.version;
            $("li#os > strong").html(OSName);
            $("li#os > small").html(OSVersion);
        }
        var UkuranLayar = environment.screen.height + "p x " + environment.screen.width + "p";
        var Browser = environment.browser;
        var JenisMobile = "Mobile : " + environment.isMobile;

        $("li#resolution > strong").html(UkuranLayar);
        $("li#navigator > strong").html(Browser);
        $("li#navigator > small").html(JenisMobile);

        var classes = ['accept', 'cancel', 'biru'];
        $('li').addClass(function(i, c) {
            return classes[i % classes.length];
        });
    };

    film = function(event) {

        var classes = ['accept', 'cancel', 'biru'];
        $('li').addClass(function(i, c) {
            return classes[i % classes.length];
        });

        var checkData1 = $('#data1 li').size();
        if (checkData1 == '0') {
            lng.Notification.success("Status", "Checking the data from the server", "info", null);
            var NowPlaying = "http://yii.berthojoris.com/nowplaying.html";
            var parseResponse = function(result) {
                allData = result.items;
                $.each(allData, function(i, data) {
                    $('#data1').append(
                            '<li class="thumb big">' +
                            '<img src="http://' + data.img + '" />' +
                            '<div>' +
                            '<span class="text tiny opacity">Data Get : ' + dateFormat(data.fetch_date, "dd-mm-yyyy") + '</span>' +
                            '<strong>' + data.judul + '</strong>' +
                            '<small>' + data.desk + '</small>' +
                            '</div>' +
                            '<li id="readmore" style="display: none;">' +
                            '<span class="text tiny">' + data.desk + '</span>' +
                            '</li>' +
                            '</li>'
                            );
                });
                lng.Notification.hide;
                var totalNow = $('#data1 li').size();
                var uTotalNow = parseInt(totalNow) / 2;
                $$('a[name="aNow"] > span').html(uTotalNow);

                var classes = ['accept', 'cancel', 'warning', 'biru', 'ungu', 'kuning', 'warning', 'ungu', 'biru', 'warning', 'cancel', 'accept'];
                $('li').addClass(function(i, c) {
                    return classes[i % classes.length];
                });
            };
            Lungo.Service.get(NowPlaying, null, parseResponse, "json");
        }

        var checkData2 = $('#data2 li').size();
        if (checkData2 == '0') {
            var ComingSoon = "http://yii.berthojoris.com/comingsoon.html";
            var parseResponse = function(result) {
                allData = result.items;
                $("#loading1").hide();
                $("#loading2").hide();
                $.each(allData, function(i, data) {
                    $('#data2').append(
                            '<li class="thumb big">' +
                            '<img src="http://' + data.img + '" />' +
                            '<div>' +
                            '<span class="text tiny opacity">Data Get : ' + dateFormat(data.fetch_date, "dd-mm-yyyy") + '</span>' +
                            '<strong>' + data.judul + '</strong>' +
                            '<small>' + data.desk + '</small>' +
                            '</div>' +
                            '<li id="readmore" style="display: none;">' +
                            '<span class="text tiny">' + data.desk + '</span>' +
                            '</li>' +
                            '</li>'
                            );
                });
                var totalCom = $('#data2 li').size();
                var uTotalCom = parseInt(totalCom) / 2;
                $$('a[name="aCom"] > span').html(uTotalCom);

                var classes = ['accept', 'cancel', 'warning', 'biru', 'ungu', 'kuning', 'warning', 'ungu', 'biru', 'warning', 'cancel', 'accept'];
                $('li').addClass(function(i, c) {
                    return classes[i % classes.length];
                });
            };
            Lungo.Service.get(ComingSoon, null, parseResponse, "json");
        }

        Lungo.Service.Settings.error = function(type, xhr) {
            alert('Application cannot find server');
        };
    };


    Lungo.dom('#tNow li').tap(function(event) {
        event.stopPropagation();
        if ($(this).find('#tNow li').hasClass('active')) {
            Lungo.dom('#tNow li').removeClass('active');
        } else {
            Lungo.dom('#tNow li').removeClass('active');
            Lungo.dom(this).toggleClass('active');
            $(this).next().toggle();
        }
    });

    Lungo.dom('#tCom li').tap(function(event) {
        event.stopPropagation();
        if ($(this).find('#tCom li').hasClass('active')) {
            Lungo.dom('#tCom li').removeClass('active');
        } else {
            Lungo.dom('#tCom li').removeClass('active');
            Lungo.dom(this).toggleClass('active');
            $(this).next().toggle();
        }
    });

    peta = function(event) {
        function initialize() {
            var myLatlng = new google.maps.LatLng(-0.301436, 100.368835);
            var mapOptions = {
                zoom: 15,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Hello World!'
            });
            var contentString = 'Ini Bukittinggi';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    };

    return {
        about: about,
        peta: peta,
        film: film,
        about: about
    };

})(Lungo);

Lungo.Events.init({
    'load section#about': App.about,
    'load section#film': App.film,
    'load section#peta': App.peta,
});

//Lungo.ready(function() {
//    setTimeout(function() {
//        Lungo.Notification.success("Status", "Check the application module", "info", 8);
//    }, 50);
//});
