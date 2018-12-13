window.onload = function () {
    let getA = document.getElementById('selected-img');
    let attr= getA.hasAttribute('checked');
    if(attr){
        // getA.setAttribute('checked', getA.style.background='url(images/gou-red.png)');
        getA.style.background = "url(images/gou-red.png)";
        getA.style.backgroundSize = "30px 30px";
    }else{
        // getA.setAttribute('checked', getA.style.background='url(images/gou.png)');
        getA.style.background = "url(images/gou.png)";
        getA.style.backgroundSize = "30px 30px";
    }
}