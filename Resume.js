 // TO MAKE THE SCROLLING SMOOTH ON TAPPING ONTO THE SECTION WRITTEN ON THE TOP OF THE RESUME PAGE

var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');

for(var i = 0 ; i<navMenuAnchorTags.length ; i++){
    navMenuAnchorTags[i].addEventListener("click", function(event){
        event.preventDefault();   // First we have to stop the default behaviour of scrolling to the resume sections i.e.abrubt

        var targetSectionId = this.innerText.trim().toLowerCase();  
        //trim is used for removing any spaces in the innerText of 'a' tag. /*Because id's are in lowercase */
        var targetSection = document.getElementById(targetSectionId);
        // Now we have the sectionId  of each section in the variable targetSection

        var interval = setInterval(function(){
            var targetSectionCoordinates = targetSection.getBoundingClientRect();//It gives the coordinates of the section contained in targetSection .  
            if(targetSectionCoordinates.top<=0 ){
                clearInterval(interval);
                return;
            }
            window.scrollBy(0, 50);
        }, 20)

    })
}


//TO ADD ANIMATION FILLING OF THE SKILL BARS ON GOING TO THE SKILLS SECTION.

var progressBars = document.querySelectorAll(".skill-progress > div");
var skillsContainer = document.getElementById("skills-container");
window.addEventListener("scroll", checkScroll);
var animationDone = false;

function initialiseBars(){
    for(let bar of progressBars){
        bar.style.width = 0 + '%' ; 
    }
}

initialiseBars();

function fillBars(){

    for(let bar of progressBars){
        let targetWidth = bar.getAttribute('data-bar-width');
        let currentWidth = 0;
        let interval = setInterval(function(){
            if(currentWidth > targetWidth){
                clearInterval(interval);
                return;
            }
            currentWidth++;
            bar.style.width = currentWidth + '%';
        }, 5)
    }
}

function checkScroll(){
    //we have to check whether skill container container is visible or not.
    
    var coordinates = skillsContainer.getBoundingClientRect();
    if(!animationDone && coordinates.top <= window.innerHeight){
        animationDone = true;
        fillBars();
    }else if(coordinates.top > window.innerHeight){
        animationDone = false;
        initialiseBars();
    }
}