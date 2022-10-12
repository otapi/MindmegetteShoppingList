console.log("MSL: start");

let btn = document.createElement("button");
btn.innerHTML = "This is a test2";
document.body.appendChild(btn);

try {
    var elementTo = document.evaluate(
        "//div[@id='ingradientsBox']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
    console.log("MSL: elementTo="+elementTo);

    var elementSaveMenu = document.evaluate(
        "//div[@class='col-sm-auto recipe-saving']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
    console.log("MSL: elementSaveMenu="+elementSaveMenu);

    //var elementSaveMenuClone = elementSaveMenu.cloneNode(true);
    elementTo.insertBefore(elementSaveMenu, elementTo.firstChild);
    console.log("MSL: added save menu to top of ingredients");

    var recps = document.getElementById("user_recipes_folders_ul")
    recps.className = "dropdown-menu dropdown-light show";
    recps.style.display="contents";
    recps.style.width='auto';
    elementSaveMenu.style.width='auto';
    console.log("MSL: expand save menu");
}
catch (e) {
    console.log("MSL: Error: " + e );
}


