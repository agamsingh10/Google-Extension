let links = []
const input = document.getElementById("input")

const save = document.getElementById("save-btn")
const ulEl = document.getElementById("ulel")
const deletee = document.getElementById("del")
const tabBtn = document.getElementById("tab-btn")

const linksls = JSON.parse(localStorage.getItem("links"))

if (linksls) {
 links = linksls
    renderLinks()
}



// 2. Listen for clicks on tabBtn. Log Per's LinkedIn URL to the console
tabBtn.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        links.push(tabs[0].url)
    localStorage.setItem("links", JSON.stringify(links) )
    renderLinks()
        
    })


    
})

function renderLinks(){
    let listItem = ""
    
    for(let i=0; i< links.length; i++){
        //listItem += "<li><a target='_blank' href='" + links[i] + "'>" + links[i] + "</a></li>"
        listItem += `
        <li>
            <a target='_blank' href='${links[i]}'>
                ${links[i]}
            </a>
        </li>
    `
    
    }
    
    ulEl.innerHTML = listItem
    }

deletee.addEventListener("dblclick", function(){
    localStorage.clear()
    links=[]
    renderLinks()
})

save.addEventListener("click", function(){
     links.push(input.value)   //document.getElementById("input").value 
     input.value=""

     // Save the myLeads array to localStorage 
    // PS: remember JSON.stringify()
    localStorage.setItem("links", JSON.stringify(links) )
     renderLinks()
     
})

