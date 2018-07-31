/**
 * Created by Adrian on 31.07.2018.
 */
$(document).ready(function () {
    var arrayOfImages = ['smak1.png','smak2.png','smak3.png','smak4.png','smak3.png','smak2.png','smak4.png','smak3.png'];
    var thanksSection = $('.thanks_container');
    fillFormWithInoputsAndButtons(arrayOfImages);
    addEventListenersToEveryTasteToCheckTheTastes();

    $('#voting_form').on('submit',function (event) {
        event.preventDefault();
        setTimeout(function () {
            thanksSection.fadeIn();
        },500);
        setTimeout(function () {
            thanksSection.fadeOut();
            fillFormWithInoputsAndButtons(arrayOfImages);
            addEventListenersToEveryTasteToCheckTheTastes();
        },5000);
    })

});


function fillFormWithInoputsAndButtons(arrayOfImages) {
    var voteForm = $('#voting_form');
    var images = arrayOfImages;
    var buttonSubmitText= "Głosuję";
    var formContent = '';
    for(var i=0;i<images.length;i++){
        formContent = formContent +
            "<div class='main_voting_panel_form_input_container'>" +
                "<input hidden class='main_voting_panel_form_input' id='taste_"+i+"' name='taste_"+i+"' type='checkbox' />" +
                "<img class='main_voting_panel_form_img' name='taste_"+i+"' src='images/"+images[i]+"'/>" +
                "<div class='main_voting_panel_form_description'>" +
                    "<div class='main_voting_panel_form_description_container'>" +
                        "<span class='main_voting_panel_form_description_button_choosed'>Wybrano</span>" +
                        "<p class='main_voting_panel_form_description_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }
    formContent = formContent +
        '<span class="main_voting_panel_form_submit_button_container">' +
            '<button class="main_voting_panel_form_submit_button main_voting_panel_form_submit_button_unchecked" type="submit" disabled>' +
            '<p class="form_submit_button_text">'+buttonSubmitText+'<span class="font_specialCharacter">!</span></p></button>' +
        '</span>';
    voteForm.html(formContent);
}

function addEventListenersToEveryTasteToCheckTheTastes() {
    var formInputDescription = '.main_voting_panel_form_description';
    $('.main_voting_panel_form_img').each(function (index) {
        $(this).bind('click',function () {
            var nameOfCheckboxWithProperTaste = $(this).attr('name');
            if($('#'+nameOfCheckboxWithProperTaste).prop('checked')){
                $('#'+nameOfCheckboxWithProperTaste).prop('checked',false);
            } else {
                $('#'+nameOfCheckboxWithProperTaste).prop('checked',true);
                $('#'+nameOfCheckboxWithProperTaste).parent().children(formInputDescription).show('clip',400);
                addEventListenerToEveryDescritpionTasteToUncheckTheTaste(nameOfCheckboxWithProperTaste);
            }
            changeAppearanceOfVotingButton();
        })
    })
}

function addEventListenerToEveryDescritpionTasteToUncheckTheTaste(taste) {
    var formInputDescription = '.main_voting_panel_form_description';
    $('#'+taste).parent().children(formInputDescription).bind('click',function () {
        $('#'+taste).parent().children(formInputDescription).hide('clip',400);
        $('#'+taste).prop('checked',false);
        changeAppearanceOfVotingButton();
    })

}

function changeAppearanceOfVotingButton() {
    var formInput = $('.main_voting_panel_form_input');
    var submitButton = $('.main_voting_panel_form_submit_button');
    var checkedButtonClass = 'main_voting_panel_form_submit_button_checked';
    var uncheckedButtonClass ='main_voting_panel_form_submit_button_unchecked';
    var numberOfCheckedInputs =0;

    formInput.each(function () {
        if($(this).prop('checked')){
            numberOfCheckedInputs++;
        }
    });
    if(numberOfCheckedInputs >0){
        submitButton.removeAttr('disabled');
        submitButton.removeClass(uncheckedButtonClass);
        submitButton.addClass(checkedButtonClass);
    } else{
        submitButton.attr('disabled',true);
        submitButton.addClass(uncheckedButtonClass);
        submitButton.removeClass(checkedButtonClass);
    }
    numberOfCheckedInputs=0;
}