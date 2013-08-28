/*
Jordan Carter
VFW 1308
Project 4 javascript
*/
//Checking to see if the DOM is loaded
localStorage.clear();
window.addEventListener("DOMContentLoaded", function (){
alert("javascript loaded!!");
    //variables
    var dreamKind = ["--what kind of dream?--", "dream", "nightmare", "visonary"],
       recurringValue,
       rememberValue;
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
        var checkboxes = document.forms[0].obj;
        var checkedValue = [];
        for(i=0,j=checkboxes.length; i<j; i++) {
            if (checkboxes[i].checked) {
                var checkedboxes = checkboxes[i].value;
                checkedValue.push(checkedboxes);
                var rememberValue = JSON.stringify(checkedValue);
                return rememberValue;
            }
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
    
    function storeFormInfo(key) {
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
        var json = {
    "myNearDeath":{
        "ItWasA"   : ["Dream Kind: ", "visionary"],
        "specifics": ["Any Specifics: ", "I saw angels, looking at us"],
        "important": ["Level of Importance: ", 10],
        "recurring": ["Have this dream before?: ","No"],
        "remember" : ["I Remember?","People","Colors"],
        "indepth"  : ["Tell Me More: ", "I seen behind the vail for a brief second, i was hit by a car when i was 9, they said i died but I remember things, vividly... holding my moms hand feeling like i was slipping away, like falling asleep but it starts in your fingers and works its way up like waking up from the matrix or being submerged into cold water that you can breath. I never left my body though i felt, if i gave the command to my body to jump, i wouldnt be here right now like if i wanted to go i could have. i seen what had to have been 2 angels, i remember one of them asking the other 'this one?', and the other saying to the first, 'not yet.' telling another it wasnt my time yet, a light brighter than any i had ever seen behind them then, nothing."]
    },
    
    "Revalation":{
        "ItWasA"   : ["Dream Kind: ", "dream"],
        "specifics": ["Any Specifics: ", "I saw the throne"],
        "important": ["Level of Importance: ", 5],
        "recurring": ["Have this dream before?: ","No"],
        "remember" : ["I Remember?","Colors","People"],
        "indepth"  : ["Tell Me More: ", "and the one who sat on it, whos face the earth fled away from, called me an said 'the time has come. Write all that you see."]
    },
    
    "GenaricDream":{
        "ItWasA"   : ["Dream Kind: ", "nightmare"],
        "specifics": ["Any Specifics: ", "The Beast"],
        "important": ["Level of Importance: ", 10],
        "recurring": ["Have this dream before?: ","Yes"],
        "remember" : ["I Remember?","Feelings", "People"],
        "indepth"  : ["Tell Me More: ", "i seen how he'll convince the world, who doesn't believe, to turn on those who do. He'll use free will as his defense to bring about lawlessness, there's no way of stoping it without making you look like your atacking a God-given right, when you stand up for whats right. they'll call them 'moral police' when really they(those with the Spirit) are the only thing keeping the world from destruction"]
    }
}
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
        $('remember').value = item.remember[1];
        //Remove the initial listener from the nput "Save Info" button
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
        var getdreamKind = $('dreamKind');
        var getSpecifics = $('specifics');
        var getInDepth   = $('indepth');
        
        //get Error messages
        var messageAry = [];
        //dreamKind validation
        if (getdreamKind.value=="--what kind of dream?--") {
            var groupError = "Please Choose a Group...";
            getdreamKind.style.border= "1px solid red";
            messageAry.push(groupError);
        }
        
        //Specifics Validation
        if (getSpecifics.value === "") {
            var specificsErr = "Please enter at least 1 detail...";
            getSpecifics.style.border= "1px solid red";
            messageAry.push(specificsErr);
        }
        
        //InDepth Validation
        if (getInDepth.value === "") {
            var inDepthErr = "Please enter at least 1 detail...";
            getInDepth.style.border= "1px solid red";
            messageAry.push(inDepthErr);
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