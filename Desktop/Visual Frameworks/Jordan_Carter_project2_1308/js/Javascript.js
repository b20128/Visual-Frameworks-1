/*
Jordan Carter
VFW 1308
Project 2 javascript
*/
//Checking to see if the DOM is loaded
window.addEventListener("DOMContentLoaded", function(){
alert("javascript loaded!!");

    //variables
    var dreamKind = ["--what kind of dream?--", "dream", "nightmare", "visonary"],
       recurringValue,
       rememberValue="No";
       
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
            makeSelect.setAttribute("id", "dreamKind");
        for (var i=0, j=dreamKind.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optText = dreamKind[i];
            makeOption.setAttribute('value', optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect)
    }
    
    
    //find the value of selected radio button
    function getSelectedRadio(){
        var radio = document.forms[0].recurring;
        for (var i=0; i<radio.length;i++) {
            if (radio[i].checked) {
                recurringValue=radio[i].value;
            }return recurringValue
            
        }
    }
    
    //find checkbox value    
    function getCheckboxValue() {
        if ($('remember').checked) {
            rememberValue= $('remember').value;
        }else{
            rememberValue= "No";
        }
    }
    
    //toggle controls    
    function toggleControls(n){
        switch(n){
            case "on":
                $('myForm').style.disply = "none";
                $('clear').style.display = "inline";
                $('displayData').style.display = "none";
                $('addNew').style.display = "inline";
                break;
            case "off":
                $('myForm').style.disply = "block";
                $('clear').style.display = "inline";
                $('displayData').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
               return false;
        }
    }
    
    function storeFormInfo() {
         var id          	= Math.floor(Math.random()*100000000);
        getSelectedRadio();
        getCheckboxValue();
        //gather up our values in an object.
        //object properties contain an array w/ form lable and inputs values.
        var item            = {};
            item.ItWasA     = ["Dream Kind: ",$('dreamKind').value];
            item.specifics  = ["Any Specifics: ", $('specifics').value];
            item.important  = ["Level of Importance: ",$('important').value];
            item.privileged = ["How Privileged Is This Info?",recurringValue];
            item.remember   = ["I Remember?", rememberValue];
            item.indepth    = ["Tell Me More: ", $('indepth').value];
        //save data to local storage. Use stringafy to convert our objects to a string
        localStorage.setItem(id, JSON.stringify(item))
        alert("ok, got it!");
        
    }
    function displayData() {
        toggleControls("on");
        //writes the data from local storage
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id","items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for (var i = 0, len=localStorage.length; i<len;i++) {
            var makeLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string to object using JSON
            var obj = JSON.parse(value);
            var makeSubList= document.createElement('ul');
            obj.appendChild(makeSubList);
            for(var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
            }
        }
    }
    function clearLocal(){
        if (localStorage.length===0) {
            alert("there is no data to clear")
        }else{
            localStorage.clear();
            alert("All data cleared.")
            window.location.reload();
            return false;
        }
    }
    
    
    
    
   
    
    
    makeSelect();
    
    //click eventListeners
    var displayLink =$("displayData");
    displayLink.addEventListener("click", displayData);
    var clearLink = $("clear");
    clearLink.addEventListener("click", clearLocal);
    var save = $("submit");
    save.addEventListener("click", storeFormInfo);
    


});