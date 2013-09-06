/*
Jordan Carter
VFW 1308
Project 4 javascript
*/
//Checking to see if the DOM is loaded

window.addEventListener("DOMContentLoaded", function (){
alert("javascript loaded!!");
    //variables
    var itemKind = ["--What section is this in?--", "Breads", "Dairy", "Meats", "Fruits and Vegetables", "Snacks", "Deli", "Cans"],
       rememberValue,
       recurringValue;
       errMsg = $('errors');
       
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
            makeSelect.setAttribute("id", "itemKind");
        for (var i=0, j=itemKind.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optText = itemKind[i];
            makeOption.setAttribute('value', optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect)
    }
    
        
    //find the value of selected radio button
    function getSelectedRadio(){
        if (recurring.checked) {
            recurringValue = $('recurring').value;
        }else{
            recurringValue = "no"
        }
    return recurringValue; 
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
    
    function storeFormInfo(key) {
        getSelectedRadio();
        getCheckboxValue();
        //if theres no key, generate one for new item
        if (!key) {
            var id          	= Math.floor(Math.random()*100000000);
        }else{
            //set the id to the existing key we're editing already so it will save over the data
            //The key is the same key that's been passed along from editSubmit event handler
            //to the validate fucn then her into storeData function
            var id = key;
        }
         if (localStorage == 0) {
            localStorage.clear();
         }
        
        
        
        //gather up our values in an object.
        //object properties contain an array w/ form lable and inputs values.
        var item            = {};
            item.ItWasA     = ["Item Kind: ",$('itemKind').value];
            item.specifics  = ["Item Name: ", $('specifics').value];
            item.important  = ["How many?: ",$('important').value];
            item.recurring = ["Essential?: ",recurringValue];
            item.indepth    = ["Tell Me More: ", $('indepth').value];
        //save data to local storage. Use stringafy to convert our objects to a string
        localStorage.setItem(id, JSON.stringify(item))
        alert("ok, got it!");    
    }
    
    function displayData() {
        toggleControls("on");
        if (localStorage.length==0) {
            alert("there is no data to display so test data was loaded.");
            autoFillData();
        }
        //writes the data from local storage
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id","items");
        var makeList = document.createElement('ul');
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
            var makeSubList= document.createElement('ul');
            makeLi.appendChild(makeSubList);
            getImage(obj.ItWasA[1],makeSubList);
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
    
    //set the image for the right category being displyed.
    function getImage(dynamicName, makeSubList) {
        //making list item tag
        var imageLi= document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg= document.createElement('img');
        var setSrc= newImg.setAttribute("src", "images/" + dynamicName + ".png");
        imageLi.appendChild(newImg);
    }
    
    //autopopulate local storage.
    function autoFillData() {
        //the actual JSON OBJECT data required for this to work is coming from json.js
        var json = {}
        //store the Json OBJECT into Local Storage.
        for (var n in json) {
            var id = Math.floor(Math.random()*100000000);
            localStorage.setItem(id,JSON.stringify(json[n]));
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
        deleteLink.addEventListener('click', deleteItem);
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
        $('itemKind').value = item.ItWasA[1];
        $('specifics').value = item.specifics[1];
        $('important').value = item.important[1];
        $('indepth').value = item.indepth[1];
        var radios = document.forms[0].recurring;
        for (var i = 0; i<radios.length;i++) {
            if (radios[i].value=="recurring"&& item.recurring[1]=="recurring") {
                radios[i].setAttribute("checked","checked");
            }
        }
        save.removeEventListener("click", storeFormInfo);
        //changeSubmit Button Value to Edit Button
        $("submit").value = "edit data";
        var editSubmit = $('submit');
        //saving the key value established in this function as a property of the editSubmit event
        //so we can use that value when we want to save our edited content
        editSubmit.addEventListener("click",validate);
        editSubmit.key = this.key;
    }
    
    function deleteItem() {
        var ask = confirm("are you sure you want to get rid of this dream?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("contact has been deleted.")
            window.location.reload();
        }else{
            alert("contact wasn't deleted");
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
    
    
    function validate(e){
        //define the elements we waant to check
        var getitemKind = $('itemKind');
        var getSpecifics = $('specifics');
        
        //get Error messages
        var messageAry = [];
        //dreamKind validation
        if (getitemKind.value=="--What section is this in?--") {
            var groupError = "Please Choose a Group...";
            getitemKind.style.border= "1px solid red";
            messageAry.push(groupError);
        }
        
        //Specifics Validation
        if (getSpecifics.value === "") {
            var specificsErr = "Please enter at least the item name...";
            getSpecifics.style.border= "1px solid red";
            messageAry.push(specificsErr);
        }
        
        
        //if there were errors, display them on the screen
        if (messageAry.length>=1){
            for (var i=0,j=messageAry.length;i<j;i++) {
                var txt= document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else{
            //if all is ok, Save our Data. Sending thee key value (which came from the editData Function)
            storeFormInfo(this.key);
        }
        
    }
    function showForm() {
        toggleControls('off');
    }
    
    makeSelect();
    
    //click eventListeners
    var displayLink =$("displayData");
    displayLink.addEventListener("click", displayData);
    var clearLink = $("clear");
    clearLink.addEventListener("click", clearLocal);
    var save = $("submit");
    save.addEventListener("click", validate);
    var addLink =$("addNew");
    addLink.addEventListener("click", showForm);


        });