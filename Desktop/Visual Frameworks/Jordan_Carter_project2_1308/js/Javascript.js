/*
Jordan Carter
VFW 1308
Project 2 javascript
*/
//Checking to see if the DOM is loaded
window.addEventListener("DOMContentLoaded", function(){
    

    //get element by id function
    function $(x) {
        var myElement = document.getElementById(x);
        return myElement;
    }
    //creating our drop down list
    function makeSelect() {
        var formTag = document.getElementsByTagName('form'),
            selectLi = $("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "dreamType");
        for (var i=0, j=dreamKind.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optText = dreamKind[i];
            makeOption.setAttribute('value', optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
    //variables
    var dreamKind =["--what kind of dream?--", "dream","nightmare","visonary"];
    makeSelect();
    /*click eventListeners
    var displayLink =$("displayData")
    displayLink.addEventListener("click", getData);
    var clearLink = $("clear");
    clearLink.addEventListener("click", clearData);
    var save = $("submit");
    save.addEventListener("click", storeData);
    document.addEventListener("click", saveInfo)*/


});