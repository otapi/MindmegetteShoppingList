let btn = document.createElement("button");
btn.innerHTML = "This is a test";
document.body.appendChild(btn);
window.alert("Hello world")
var st = document.querySelectorAll('h1.title')
if (st.length > 1) {
    st.appendChild(btn);
    window.alert("itt1")


}

window.alert("itt2")
