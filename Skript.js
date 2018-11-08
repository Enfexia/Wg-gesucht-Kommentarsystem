// ==UserScript==
// @name         Wg-gesucht-Kommentarsystem
// @namespace    https://cemcevik.com/
// @version      0.1
// @description  Skript zum Schreiben von Kommentaren auf der wg gesucht Website.
// @author       Cem Çevik
// @match        https://www.wg-gesucht.de/*
// @grant        none
// ==/UserScript==

(function() {
    var i = 0

    if($('#filterBox')[0] == undefined){
        var ev_id = $('#rhs_column > div.panel.panel-rhs-default.rhs_contact_information.hidden-sm > div.panel-body > div > div:nth-child(11)').text();

        if(localStorage.getItem(window.location.href.split(".")[3]) == null){

            butonekle_ilan(window.location.href.split(".")[3])}else{
                render_ilan(window.location.href.split(".")[3])}

    }else{

        listele()

    }
    function butonekle_ilan(ev_id){
        $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center').append( '<h4><a class="yorum" href="#!" onclick="adreseklee.updateGUI(' + ev_id + ', 1,0)">Kommentar hinzufügen</a></h4>' );
        $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center > h5').insertAfter('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center > h4')
        render_ilan(ev_id)
    }

    function render_ilan(ev_id,düzenle){
        if(düzenle == 1){
            $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center > h4').remove();
            $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center > h5').remove()
            $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center').append( '<h4>Dein Kommentar: <b>' + localStorage.getItem(ev_id) + '</b><h5><span class=" '+ev_id+' glyphicon glyphicon-remove cursor-pointer list-details-remove-icon " onclick="sil.updateGUI('+ ev_id + ',1,1)"></span><span class=" '+ev_id+' glyphicon cursor-pointer glyphicon-pencil" onclick="adreseklee.updateGUI('+ ev_id + ',1,1)" style="margin-left: 10px;top:8px;" aria-hidden="true"></span></h5></h4>');

        }else{if(localStorage.getItem(ev_id) == null){}else{
            $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center').append( '<h4>Dein Kommentar: <b>' + localStorage.getItem(ev_id) + '</b><h5><span class=" '+ev_id+' glyphicon glyphicon-remove cursor-pointer list-details-remove-icon " onclick="sil.updateGUI('+ ev_id + ',1,1)"></span><span class=" '+ev_id+' glyphicon cursor-pointer glyphicon-pencil" onclick="adreseklee.updateGUI('+ ev_id + ',1,1)" style="margin-left: 10px;top:8px;" aria-hidden="true"></span></h5></h4>');
            $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center > h4:nth-child(2) > a').remove()
        }}

    }

    function listele(){
        for (i = 0; i < $('#main_column > div.offer_list_item').length; i++) {
            var ev_id = $('#main_column > div.offer_list_item:eq('+ i +')').attr('data-id')
            if(localStorage.getItem(ev_id) == null){butonekle(ev_id)}else{render(ev_id)}

        }

    }

    function butonekle(ev_id){

        $('#liste-details-ad-'+ ev_id +' > div > div > div.col-sm-8 > div.list-details-panel-inner').append( '<a class="yorum" href="#!" onclick="adreseklee.updateGUI(' + ev_id + ', 0,0)">Kommentar hinzufügen</a>' );
        $('#liste-details-ad-6744188 > div > div > div.col-sm-8 > div.list-details-panel-inner > .yorum').insertAfter('#liste-details-ad-6744188 > div > div > div.col-sm-8 > div.list-details-panel-inner > p')

        render(ev_id)
    }


    var adreseklee = window.adreseklee = {};

    adreseklee.updateGUI = function adresekle(ev_id,ilan,degistir){
        var yorum = prompt("Dein Kommentar zum Haus");
        if(degistir == 1){

            localStorage.setItem(ev_id, yorum);

            if(ilan == 1){render_ilan(ev_id,1)}else{render(ev_id,1);}

        }else{

            localStorage.setItem(ev_id, yorum);

            if(ilan == 1){render_ilan(ev_id)}else{render(ev_id);}}



    }

    var sil = window.sil = {};

    sil.updateGUI = function il(ev_id,ilan){
        if(ilan == 1){
            localStorage.removeItem(ev_id);
            $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center > h4').remove()
            $('#main_column > nav:nth-child(2) > div > div.col-xs-4.text-center > h5').remove()
            butonekle_ilan(ev_id)
        }else{
            localStorage.removeItem(ev_id);
            $('.' + ev_id).remove()
            butonekle(ev_id)
        }
    }

    function render(ev_id,düzenle){
        if(düzenle == 1){
            $('#liste-details-ad-' + ev_id + ' > div > div > div.col-sm-8 > div.list-details-panel-inner > #yorumum').text('Dein Kommentar: ' + localStorage.getItem(ev_id) +'')
            $('#liste-details-ad-' + ev_id + ' > div > div > div.col-sm-8 > div.list-details-panel-inner > .yorum').remove()
        }else{
            if(localStorage.getItem(ev_id) == null){}else{
                $('#liste-details-ad-' + ev_id + ' > div > div > div.col-sm-8 > div.list-details-panel-inner').append( '<h4 class="'+ev_id+'" id="yorumum">Dein Kommentar: <b>' + localStorage.getItem(ev_id) + '</b></h4><h5><span class=" '+ev_id+' glyphicon glyphicon-remove cursor-pointer list-details-remove-icon pull-left" onclick="sil.updateGUI('+ ev_id + ',0,1)"></span><span class=" '+ev_id+' glyphicon cursor-pointer glyphicon-pencil pull-left" onclick="adreseklee.updateGUI('+ ev_id + ',0,1)" style="margin-left: 10px;margin-top:8px;" aria-hidden="true"></span></h5>' );
                $('#liste-details-ad-' + ev_id + ' > div > div > div.col-sm-8 > div.list-details-panel-inner > .yorum').remove()
            }

        }}


})();
