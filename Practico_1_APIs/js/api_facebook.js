$(document).ready(function() {
// CArgo la API - Facebook sdk
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/es_LA/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    var permisos = 'email, user_friends, user_online_presence';
    var btn_iniciar_sesion = ' <a href="#" class="btn btn-primary btn-lg btn-block" id="btn_iniciar_sesion">Inciar Sesión en Facebook</a>';
    var div_session_iniciada = "<div id='facebook-sesion_iniciada'>" +
            "<strong></strong>" +
            "<img>" +
            "<a href='#' class='btn btn-danger btn-lg btn-block' id='btn_cerrar_sesion'>Cerrar sesión</a>" +
            "</div>" +
            "<div class='form-group'>" +
            "</div>";
    window.fbAsyncInit = function() {

        FB.init({
            appId: '1648376878725605', //ID aplicacion en facebook
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.3'
        });
        FB.getLoginStatus(function(sesion_facebook_actual) {
            cambiar_Estado(sesion_facebook_actual, function() {
            });
        });
    };
    var cambiar_Estado = function(sesion_facebook_actual, callback) {
        console.log(sesion_facebook_actual);
        if (sesion_facebook_actual.status === 'connected') {
            get_datos_facebook();
            get_amigos_facebook();
        } else {
            callback(false);
        }
    };
    var verificar_estado_inicio_sesion = function(callback) {
        FB.getLoginStatus(function(sesion_facebook_actual) {
            callback(sesion_facebook_actual);
        });
    };
    var get_datos_facebook = function() {
        FB.api('/me', function(sesion_facebook_actual) { //me para la session iniciada en facebook
            $('#btn_iniciar_sesion').after(div_session_iniciada);
            $('#btn_iniciar_sesion').remove();
            $('#facebook-sesion_iniciada strong').text("Bienvenido: " + sesion_facebook_actual.name);
            $('#facebook-sesion_iniciada img').attr('src', 'http://graph.facebook.com/' + sesion_facebook_actual.id + '/picture?type=large');
        });
    };
    var get_amigos_facebook = function() {
        var url_data_facebook_json = 'https://graph.facebook.com/me?fields=id,cover,email,first_name,gender,last_name,link,name,friends.limit%2810%29&access_token=' + FB.getAccessToken();
        $.get(url_data_facebook_json, function(resultado) {
            console.log(resultado);
            var datos = ' <ul id=lista_datos>';
            if (resultado.name !== undefined) {
                datos += '<li class="list-group-item list-group-item-info">' + '<label class="labels_datos">Nombre:</label>' + resultado.name + '</li>';
            }
            if (resultado.id !== undefined) {
                datos += '<li class="list-group-item list-group-item-info">' + '<label class="labels_datos">Id Usuario:</label>' + resultado.id + '</li>';
            }
            if (resultado.gender !== undefined) {
                var genero = '';
                if (resultado.gender === 'female') {
                    genero = 'femenino';
                } else {
                    genero = 'masculino';
                }
                datos += '<li class="list-group-item list-group-item-info">' + '<label class="labels_datos">Sexo:</label>' + genero + '</li>';
            }
            if (resultado.email !== undefined) {
                datos += '<li class="list-group-item list-group-item-info">' + '<label class="labels_datos">Email:</label>' + resultado.email + '</li>';
            }
            if (resultado.cover !== undefined) {
                datos += '<li class="list-group-item list-group-item-info">' + '<label class="labels_datos">Portada:</label> <img src="' + resultado.cover.source + '" class="img-circle"></img></li>';
            }
            if (resultado.link !== undefined) {
                datos += '<li class="list-group-item list-group-item-info">' + '<a href=' + resultado.link + ' class="btn btn-success btn-xs">Ir a Perfil</a>' + '</li>';
            }
            if (resultado.friends !== undefined) {
                datos += '<li class="list-group-item list-group-item-info">' + '<label class="labels_datos">Cantidad Amigos:</label>' + resultado.friends.summary.total_count + '</li>';
            }
            console.log(datos);
            datos += '</ul>';
            $('#datos_facebook').append(datos);
            $('#lista_datos').css("text-align", 'center');
            $('.labels_datos').css("margin-right", '5px');
            $('.img-circle').css("width", '100%');
        });
        /*FB.api('/me?fields=id,cover,email,first_name,gender,last_name,link,name,friends.limit(10)', function(sesion_facebook_actual) {
         var amigos = sesion_facebook_actual.data;
         console.log(amigos);
         });*/

    };
    var iniciar_sesion_facebook = function() {
        verificar_estado_inicio_sesion(function(data) {
            if (data.status !== 'connected') {
                FB.login(function(sesion_facebook_actual) {
                    if (sesion_facebook_actual.status === 'connected')
                    {
                        get_datos_facebook();
                        get_amigos_facebook();
                    }
                }, {scope: permisos});
            }
        });
    };
    var facebookLogout = function() {
        verificar_estado_inicio_sesion(function(data) {
            if (data.status === 'connected') {
                FB.logout(function(sesion_facebook_actual) {
                    $('#facebook-sesion_iniciada').before(btn_iniciar_sesion);
                    $('#facebook-sesion_iniciada').remove();
                    $('#datos_facebook').remove();
                });
            }
        });
    };
    $(document).on('click', '#btn_iniciar_sesion', function(e) {
        e.preventDefault();
        iniciar_sesion_facebook();
    });
    $(document).on('click', '#btn_cerrar_sesion', function(e) {
        e.preventDefault();
        if (confirm("¿Está seguro?"))
            facebookLogout();
        else
            return false;
    });
});


