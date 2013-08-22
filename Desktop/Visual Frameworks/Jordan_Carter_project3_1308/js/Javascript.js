/*
Jordan Carter
VFW 1308
Project 2 javascript
*/
//Checking to see if the DOM is loaded
localStorage.clear();
window.addEventListener("DOMContentLoaded", function (){
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
            rememberValue = $('remember').value;
        }else{rememberValue= "None";
        }
    }
    
    function toggleControls(n) {
        switch (n) {
            case "on":
                $("myForm").style.display = "none";
                $("clear").style.display = "inline";
                $('displayData').style.display = "none";
                $('addNew').style.display = "inline";                
                break;
            case "off":
                $("myForm").style.display = "block";
                $("clear").style.display = "inline";
                $('displayData').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    function storeFormInfo() {
         if (localStorage == 0) {
            localStorage.clear();
         }
         var id          	= Math.floor(Math.random()*100000000);
        getSelectedRadio();
        getCheckboxValue();
        //gather up our values in an object.
        //object properties contain an array w/ form lable and inputs values.
        var item            = {};
            item.ItWasA     = ["Dream Kind: ",$('dreamKind').value];
            item.specifics  = ["Any Specifics: ", $('specifics').value];
            item.important  = ["Level of Importance: ",$('important').value];
            item.recurring = ["Have this dream before?: ",recurringValue];
            item.remember   = ["I Remember?", rememberValue];
            item.indepth    = ["Tell Me More: ", $('indepth').value];
        //save data to local storage. Use stringafy to convert our objects to a string
        localStorage.setItem(id, JSON.stringify(item))
        alert("ok, got it!");    
    }
    
    function displayData() {
        toggleControls("on");
        if (localStorage.length==0) {
            alert("there is no data to display");
        }
        //writes the data from local storage
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id","items");
        var makeList = document.createElement('ol');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        makeDiv.style.display="block";
        $('items').style.display="block";
        for (var i = 0, len=localStorage.length; i<len;i++) {
            var makeLi = document.createElement('li');
            var linksli = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string to object using JSON
            var obj = JSON.parse(value);
            var makeSubList= document.createElement('li');
            makeDiv.appendChild(makeSubList);
            for(var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksli);
            }
            makeItemLinks(localStorage.key(i), linksli);//creating our edit and delete buttons for each item.
        }
    }
    //Making our Item links
    //creating edit and delete links for each stored item
    function makeItemLinks(key, linksli) {
        //add single edit link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Dream";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksli.appendChild(editLink);
        
        //add line break for clarity and read-ability
        var breakTag = document.createElement("br")
        linksli.appendChild(breakTag)
        //add a delete single item link
        var deleteLink = document.createElement("a");
        deleteLink.href =  "#";
        deleteLink.key = key;
        var deleteText = "Delete Dream";
        //deleteLink.addEventListener('click', deleteItem);
        deleteLink.innerHTML = deleteText;
        linksli.appendChild(deleteLink);
    }
    
    function editItem() {
        //Grab the data from our item from localStorage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        //show the form
        toggleControls('off');
        
        //populate the form fields with current localStorage values
        $('dreamKind').value = item.ItWasA[1];
        $('specifics').value = item.specifics[1];
        $('important').value = item.important[1];
        $('indepth').value = item.indepth[1];
        var radios = document.forms[0].recurring;
        for (var i = 0; i<radios.length;i++) {
            if (radios[i].value=="recurring"&& item.recurring[1]=="recurring") {
                radios[i].setAttribute("checked","checked");
            }
        }
        if (item.remember[1] == "Yes") {
            $('remember').setAttribute('checked',"checked");
        }
        //Remove the initial listener from the nput "Save Info" button
        
    }
    
    function clearLocal(){
        if (localStorage.length===0) {
            alert("there is no data to clear")
        }else{
            localStorage.clear();
            alert("All data cleared.")
            window.location.reload();
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