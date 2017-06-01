sap.ui.define([
    "sapui5/demo/restservice/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/Device",
], function (BaseController, JSONModel, MessageToast, Device) {
    "use strict";

    return BaseController.extend("sapui5.demo.restservice.controller.Mapa", {

        onAfterRendering: function () {
            var that = this;
            if (!this.initialized) {
                this.initialized = true;
                this.geocoder = new google.maps.Geocoder();

                navigator.geolocation.getCurrentPosition(position => {                    
                    this.criarMapa(position.coords.latitude, position.coords.longitude);
                }
                    , function (error) {
                        switch (error.code) {
                            case error.TIMEOUT:
                                MessageToast.show("Não foi possível determinar sua localização atual.");                            
                            break;
                            case error.POSITION_UNAVAILABLE:
                                that.criarMapa(-16.6797147,-49.2542156);
                                MessageToast.show("Não foi possível determinar sua localização atual, O centro de goiânia foi atribuido como sua localização.");
                            break;
                        };
                    });


            }
        },
        onNavPress : function () {
			this.myNavBack("master");
		},
		
        actSearch: function () {
            var map = this.map;
            var view = this.getView();
            var directionsService = this.directionsService;
            var directionsDisplay = this.directionsDisplay;
            var enderecoPartida = this.getView().byId("pontoPartida").getValue();
            var enderecoChegada = this.getView().byId("pontoChegada").getValue();
            
            var iconBase = "https://maps.google.com/mapfiles/kml/shapes/play.png";
            this.geocoder.geocode({ 'address': enderecoChegada }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    window.latitude2 = results[0].geometry.location.lat();
                    window.longitude2 = results[0].geometry.location.lng();
                    var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
                        origin: enderecoPartida, // origem
                        destination: enderecoChegada, // destino
                        travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
                    };

                    directionsService.route(request, function(result, status) {
                        if (status == google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                            directionsDisplay.setDirections(result); // Renderizamos no mapa o resultado
                        }
                    });

                    var distancia = getDistanceFromLatLonInKm(window.latitude1, window.longitude1, window.latitude2, window.longitude2);
                    view.byId("textHeader").setText("Minha localização atual está a " + distancia + "km de distância do destino.");
                    console.log();

                   /* map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        icon: iconBase,
                        position: results[0].geometry.location,
                        map: map
                    });*/
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });

            function getDistanceFromLatLonInKm(lolatitude1, lolongitude1, lolatitude2, lolongitude2) {
                var R = 6371; // Radius of the earth in km
                var dLat = deg2rad(lolatitude2 - lolatitude1);  // deg2rad below
                var dLon = deg2rad(lolongitude2 - lolongitude1);
                var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(lolatitude1)) * Math.cos(deg2rad(lolatitude2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    ;
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; // Distance in km
                return d.toLocaleString();
            }
            function deg2rad(deg) {
                return deg * (Math.PI / 180)
            }
        }
        ,
        criarMapa: function (latitude, longitude) {
            window.latitude1 = latitude;
            window.longitude1 = longitude;
            var minhaLatitudeLongitude = { lat: latitude, lng: longitude };
            var mapOptions = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            //obtem elemento HTML                        
            var ele = this.getView().byId("map_canvas").getDomRef();
            var pontoPartida = this.getView().byId("pontoPartida");

            //cria o mapa no elemento
            this.map = new google.maps.Map(ele, mapOptions);
            this.directionsDisplay = new google.maps.DirectionsRenderer();
            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay.setMap(this.map);
            //Cria um marcador para o mapa     
            var iconBase = "https://maps.google.com/mapfiles/kml/shapes/play.png";
            var infowindow = new google.maps.InfoWindow;

            var marker = new google.maps.Marker({
                position: minhaLatitudeLongitude,
                draggable: true,
                animation: google.maps.Animation.BOUNCE,
                icon: iconBase,
                infowindow: infowindow
            });

            this.geocoder.geocode({ 'location': minhaLatitudeLongitude }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var address1 = results[1].formatted_address;
                        pontoPartida.setValue(address1);
                        infowindow.setContent("Minha localização atual: " + address1);
                        infowindow.open(this.map, marker);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }

            });



            // adiciona marcação no mapa
            marker.setMap(this.map);


            google.maps.event.addListener(this.map, "click", function (e) {
                var lolatitude = e.latLng.lat(); //calculates latitude of the point of click
                var lolongitude = e.latLng.lng()//calculates longitude of the point of click
                jQuery.sap.require("sap.m.MessageToast");
                sap.m.MessageToast.show("Sua Latitude: " + lolatitude + "\n Sua Longitude: Lng" + lolongitude);
                var latlng = new google.maps.LatLng("latlng", lolatitude, lolongitude);
                var text1 = new sap.m.Text({ text: lolatitude });
                var text2 = new sap.m.Text({ text: lolongitude });
                window.point1 = lolatitude;
                window.point2 = lolongitude;
            });
        }
    })
});