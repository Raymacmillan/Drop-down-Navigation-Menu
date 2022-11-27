import $ from "jquery";
const arrowUP = new URL("../images/icon-arrow-up.svg",import.meta.url);
const arrowDown = new URL("../images/icon-arrow-down.svg",import.meta.url);

const menuImages = {
    open: new URL("../images/icon-menu.svg", import.meta.url).toString(),
    close: new URL("../images/icon-close-menu.svg", import.meta.url).toString()
}

const menu = $(".mobile-menu");

const navLinks = $(".nav-links");

const navLinksContainer = $(".nav-links-container")

const header = $("HEADER");

navLinks.click(({ target }) => {
   // toggleSubLinks(target);
   toggleSub(target);
});


const helper = (icon, subLinks, isSlideDown = null)=> {
    if(isSlideDown === null){
        if(subLinks.css("display") === "none"){
            icon.src = arrowUP.toString();
            subLinks.slideDown({
                start : function () {
                    $(this).css ({
                        display: "flex"
                    })
                }
            })
            
        }else {
            icon.src = arrowDown.toString();
            subLinks.slideUp();
        }
    }else if(isSlideDown){
        icon.src = arrowUP.toString();
            subLinks.slideDown({
                start : function () {
                    $(this).css ({
                        display: "flex"
                    })
                }
            })
    }else {
        icon.src = arrowDown.toString();
        subLinks.slideUp();
    }
}


function toggleSub(target){
    if(target.tagName !== "A") return;

    const sublinksContainer = target.parentNode.querySelector(".sub-links");

    if(!sublinksContainer) return;

    const icon = target.querySelector("img");

    helper(icon, $(sublinksContainer));
    
}


window.addEventListener("click", ({target})=>{
    const sublinksContainers = document.querySelectorAll(".sub-links");
    for(let i = 0; i < sublinksContainers.length; i++){
        if(!sublinksContainers[i].contains(target) && sublinksContainers[i].parentNode.querySelector("a") !== target){
           const icon = sublinksContainers[i].parentNode.querySelector("a img");

           helper(icon, $(sublinksContainers[i]), false);
        }
    }
})

navLinksContainer.click(({target})=>{
    if(innerWidth >= 768) return;
    if(!target.classList.contains("nav-links-container")) return;
    
  
    
    toggleNavlinksContainer();
})


menu.click(()=> {
    toggleNavlinksContainer();
});

function toggleMenuIcon(){
    const menuIcon = document.querySelector(".mobile-menu img");
    if(menuIcon.src.includes("icon-menu")){
        menuIcon.src = menuImages.close;
    }else {
        menuIcon.src = menuImages.open;
    }
}

function toggleNavlinksContainer(){
    if(navLinksContainer.css("display") === "none"){
        navLinksContainer.toggle();
        navLinks.css("right", "-50%");
        navLinks.animate({
            right: 0
        });
    }else {
        navLinks.css("right", "0");
        navLinks.animate({
            right: "-=50%",
        }, {
            complete: function(){
                navLinksContainer.toggle();
            }
        });
    }

    toggleMenuIcon();

}




