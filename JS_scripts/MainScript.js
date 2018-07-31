/**
 * Created by Adrian on 31.07.2018.
 */

$(document).ready(function () {
    console.log("Ready");
    fillForm();
    addEventListenersToEveryTasteToCheckTheTastes();

});

function fillForm() {
    console.log("Działam");
    var images = ['smak1.png','smak2.png','smak3.png','smak4.png'];
    var htmlContent = '';
    for(var i=0;i<8;i++){
        htmlContent = htmlContent +
            "<div class='main_voting_panel_form_input_container'>" +
                "<input hidden class='main_voting_panel_form_input' id='taste_"+i+"' name='taste_"+i+"' type='checkbox' />" +
                "<img class='main_voting_panel_form_img' name='taste_"+i+"' src='images/"+images[Math.floor((Math.random() * 3) + 1)]+"'/>" +
                "<div class='main_voting_panel_form_description'>" +
                    "<div class='main_voting_panel_form_description_container'>" +
                        "<span class='main_voting_panel_form_description_button_choosed'>Wybrano</span>" +
                        "<p class='main_voting_panel_form_description_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }
    htmlContent = htmlContent +
        '<span class="main_voting_panel_form_submit_button_container">' +
            '<button class="main_voting_panel_form_submit_button main_voting_panel_form_submit_button_unchecked" type="submit">' +
            '<p class="form_submit_button_text">Głosuję!</p></button>' +
        '</span>';

    console.log(htmlContent);
    $('#voting_form').html(htmlContent);
}

function addEventListenersToEveryTasteToCheckTheTastes() {
    $('.main_voting_panel_form_img').each(function (index) {
        $(this).bind('click',function () {
            var nameOfCheckboxWithProperTaste = $(this).attr('name');
            if($('#'+nameOfCheckboxWithProperTaste).prop('checked')){
                $('#'+nameOfCheckboxWithProperTaste).prop('checked',false);
            } else {
                $('#'+nameOfCheckboxWithProperTaste).prop('checked',true);
                $('#'+nameOfCheckboxWithProperTaste).parent().children('.main_voting_panel_form_description').fadeIn();
                addEventListenerToEveryDescritpionTasteToUncheckTheTaset(nameOfCheckboxWithProperTaste);
            }
        })
    })
}

function addEventListenerToEveryDescritpionTasteToUncheckTheTaset(taste) {
    $('#'+taste).parent().children('.main_voting_panel_form_description').bind('click',function () {
        $('#'+taste).parent().children('.main_voting_panel_form_description').fadeOut();
        $('#'+taste).prop('checked',false);
    })

}