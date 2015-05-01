$(document).ready(function() {
// CArgo la API - Facebook sdk
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    var post = '<div class="fb-post"  data-width="500" id="id_fb_post" data-href="https://www.facebook.com/permalink.php?story_fbid=943094279044538&amp;id=362311790456126">' +
            ' <div class="fb-xfbml-parse-ignore">' +
            '<blockquote cite="https://www.facebook.com/permalink.php?story_fbid=943094279044538&amp;id=362311790456126">' +
            '<p>Apuntes en 2 minutos. s&#xed;ntesisi informativa de la #UNCHoy:- Se presenta en la universidad el Programa &#x201c;Ciencia de...</p>' +
            'Posted by ' +
            '<a href="https://www.facebook.com/pages/Universidad-Nacional-de-C%C3%B3rdoba-Oficial/362311790456126">' +
            'Universidad Nacional de Córdoba (Oficial)</a> on ' +
            '<a href="https://www.facebook.com/permalink.php?story_fbid=943094279044538&amp;id=362311790456126">Jueves, 30 de abril de 2015</a>' +
            '</blockquote>' +
            '</div>' +
            '</div>';

    console.log("antes");
    $("#fb-root").after(post);
    console.log("despues");


    var url = "http://graph.facebook.com/362311790456126";

    $.getJSON(url, function(resultado) {
        var resultado_html = '<div id="universidad_info"> <ul class="list-group">';
        var tag_lista_inicio = '<li class="list-group-item list-group-item-info">';
        var tag_label_inicio = '<label class="labels">';
        if (resultado.name !== undefined)
            resultado_html += tag_lista_inicio + tag_label_inicio + 'Nombre: </label>' + resultado.name + '</li>';
        if (resultado.location.city !== undefined && resultado.location.country !== undefined)
            resultado_html += tag_lista_inicio + tag_label_inicio + 'Ubicacion: </label>' + resultado.location.city + ', ' + resultado.location.country + '</li>';

        if (resultado.category !== undefined)
            resultado_html += tag_lista_inicio + tag_label_inicio + 'Categoría: </label>' + resultado.category + '</li>';
        //if (resultado.description !== undefined)
        //  resultado_html += '<li class="list-group-item list-group-item-info"> <label class="labels">Descripción: </label>' + resultado.description + '</li>';
        if (resultado.likes !== undefined)
            resultado_html += tag_lista_inicio + tag_label_inicio + 'Likes: </label>' + resultado.likes + '</li>';
        if (resultado.link !== undefined)
            resultado_html += tag_lista_inicio + '<a class="btn btn-link btn-md active" href="' + resultado.link + '">Visitar perfil</a> </li>';
        //if (resultado.website !== undefined)
        //  resultado_html += '<li class="list-group-item list-group-item-info"> <label class="labels">Pagina Web: </label> <a class="btn btn-link btn-sm active" href="' + resultado.website + '">'+resultado.website+'</a> </li>';
        if (resultado.phone !== undefined)
            resultado_html += tag_lista_inicio + tag_label_inicio + 'Tel.: </label>' + resultado.phone + '</li>';
        resultado_html += '</ul></div>';
        console.log(resultado_html);
        $("#id_fb_post").after(resultado_html);
    });

});


