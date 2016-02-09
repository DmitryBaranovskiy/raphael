Raphael(function () {
    var img = document.getElementById("photo");
    img.style.display = "none";
    var r = Raphael("holder", 600, 540);
    
    r.image(img.src, 140, 140, 320, 240);
    r.image(img.src, 140, 380, 320, 240).attr({
        transform: "s1-1",
        opacity: .5
    });
    r.rect(0, 380, 600, 160).attr({
        fill: "90-#333-#333",
        stroke: "none",
        opacity: .5
    });
});