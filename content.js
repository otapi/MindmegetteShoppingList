const delay = ms => new Promise(res => setTimeout(res, ms));

console.log("MSL: start");

setTimeout(init, 5000)

function init() {
    let btn = document.createElement("a");
    btn.innerHTML = "Create Shoppinglist";
    btn.onclick=doit;
    var elementTo = document.evaluate(
        "//div[@class='taskToolbar-right']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
    elementTo.insertBefore(btn, elementTo.firstChild);
}

function parseIng(text, node) {
    var stext = text.split(" ");
    var index = text.indexOf( ' ', text.indexOf( ' ' ) + 1 );

    var secondChunk = text.substr( index + 1 );
    ret = {
        "quantity": stext[0],
        "unit": stext[1],
        "name": secondChunk,
        "index": secondChunk + "_" + stext[1],
        "node": node
    };
    return ret;

}

function doit() {
    console.log("MSL: Waited 5s");
    var meals = [];
    var ingredients = {}


    var taskItems = document.evaluate(
        "//div[@class='taskItem-body']",
        document,
        null,
        XPathResult.ANY_TYPE,
        null
    )
    console.log("MSL: taskItems");
    while (node = taskItems.iterateNext()) {
        console.log("MSL: task items ping");
        var link = document.evaluate(
            ".//button//a",
            node,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        if (link == null) {
            var ttitle = document.evaluate(
                ".//button//span[@class='taskItem-title']",
                node,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            taskTitle = ttitle.innerText;
            console.log("MSL: taskTitle: "+taskTitle);
            
            ing = parseIng(taskTitle, node);
            ingredients[ing["index"]] = ing;
        } else {
            console.log("MSL: link: "+link.getAttribute('href'));
            
            var important = document.evaluate(
                ".//span[starts-with(@class,'importanceButton')]",
                node,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            
            checked = important.getAttribute('aria-checked') == 'true'
            console.log("MSL: checked: "+checked);

            if (!checked) {
                meals.push({ node: node, link: link.getAttribute('href')});
            }
        }
    }

    for (const meal of meals){
        getPageContents(function(result) {
            console.log("MSL: load: "+meal['link'] );
            console.log("MSL: load content: "+result);
            //Now I can do anything here with the personinfo array
        },meal['link'],'fname=stretch&lname=wright')

    }

}

const executeScript = (tabId, func) => new Promise(resolve => {
    chrome.scripting.executeScript({ target: { tabId }, func }, resolve)
  })

function getPageContents(callback,url,params) {
    http=new XMLHttpRequest();
    if(params!=null) {
        http.open("POST", url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    } else {
        http.open("GET", url, true);
    }
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    }
    http.send(params);
}
// https://stackoverflow.com/questions/15034859/cannot-read-property-of-undefined-when-using-chrome-tabs-or-other-chrome-api-i