/*
* JS file to edit the popup window depending on 
* harmful ingredients found in the "content.js" file
*/


//grabbing diferent elements found in the popup
const searchButton = document.querySelector("#Search");
const results = document.querySelector("#results");
const score = document.getElementById("score");
const careStatus = document.getElementById("status");
const ansDiv = document.getElementById("afterClick");

searchButton.addEventListener("click", async () => {
  
    searchButton.style.display= "none"; //button disappears after click
    ansDiv.style.display="block"; //yet results div appears

    let [activeTab] = await chrome.tabs.query({active: true, currentWindow: true});
    let response = await chrome.tabs.sendMessage(activeTab.id, { action: "GET_INGREDIENTS" }); //ask content script for score 
    results.innerHTML = response.list;
    score.innerHTML =  response.rating + " Irritants Identified";

    //color of response depends on status of products irritaiton score
    if (response.rating==0){
        score.style.color = "green";
        careStatus.style.color= "green"
        careStatus.innerHTML= "No irritating ingredients found";
    }else if (response.rating <= 1){
        score.style.color = "brown";
        score.innerHTML = response.rating + " Irritant Identified";
        careStatus.style.color= "brown"
        careStatus.innerHTML= "Product contains 1 irritant";
    }else if(response.rating <= 2){
        score.style.color = "brown";
        careStatus.style.color= "brown"
        careStatus.innerHTML= "Product contains 2 irritants";
    }else{
        score.style.color = "red";
        careStatus.style.color= "red"
        careStatus.innerHTML= "3 or more irritants identified.";
    };
})




