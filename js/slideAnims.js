// typewriting animation
function typewriter(span, end) {
    var typingDelay = 30;
    var totalTime;
    const cursorDelay = 500;
    const newTextDelay = 500;
    let charIndex = 0;

    //console.log(".cursor" + span);
    const cursor = document.querySelector(".cursor" + span);
    //console.log(cursor);
    const typedTxtSpan = document.querySelector(span); 
    const word = typedTxtSpan.dataset.text;
    totalTime = word.length * typingDelay;

    var abort = false;
    function type(word, span) {
        if (!abort) {
            if (charIndex < word.length) {
                if (cursor.classList.contains("active"))
                    cursor.classList.remove("active");
                span.textContent += word.charAt(charIndex);
                charIndex++;
                window.addEventListener('click', () => {
                    //totalTime = charIndex * typingDelay;
                    clearTimeout();
                    span.textContent = word;
                    abort = true;
                });
                setTimeout(() => type(word, span), typingDelay);
            } else {
                cursor.classList.add("active");
                if (!end) setTimeout(() => { cursor.style.color="rgba(0,87,106,255)"; }, cursorDelay);
                //setTimeout(() => { cursor.style.opacity="0%" }, 1000);
            }
        } else {
            cursor.classList.add("active");
                if (!end) setTimeout(() => { cursor.style.color="rgba(0,87,106,255)"; }, cursorDelay);
        }
    }

    cursor.style.color = "lightgreen";
    setTimeout(() => { type(word, typedTxtSpan); }, newTextDelay);
    return totalTime;
}

// grid animation
function gridAnim(slide) {
    var items;
    var totalTime;

    if (slide == "slide three")
        items = document.querySelectorAll(".programming .grid-item");
    else if (slide == "slide four")
        items = document.querySelectorAll(".graphic .grid-item");
    
    for (var i = 0;i < items.length;i++) {
        var itemMove = moveItem(i);
        setTimeout(itemMove, i*50);
    }
    totalTime = items.length*50;
    
    setTimeout(() => {
        //console.log('execute');
        for (var i = 0;i < items.length;i++) {
            var itemHover = hoverItem(i);
            setTimeout(itemHover, i*60);
        }
    }, totalTime);                                

    function moveItem(i) {
        return () => { items[i].classList.add('moved'); }
    }
    function hoverItem(i) {
        return () => { items[i].classList.add('hover-on-spot'); }
    }
}

// fireworks

var fireworksDone = false;
function fireworksAnim(side) {
    var radial_items = document.querySelectorAll('.' + side + ' .radial-item');
    //console.log('execute');
    for (var i = 0;i < radial_items.length;i++) {
        radial_items[i].style.transition = 'none';
        var itemAppear = showItem(i);
        setTimeout(itemAppear, i*80);
        //console.log(radial_items[i]);
    }
    setTimeout( () => {
        for (var i = 0;i < radial_items.length; i++) {
            radial_items[i].style.transition = 'all 0.3s ease';
            radial_items[i].style.opacity = '0';
            //radial_items[i].classList.add('inactive');
        }
    }, 750);
    function showItem(i) {
        return () => { radial_items[i].style.opacity="100%"; }
    }
}


//slide animation
function slideAnim(entry) {
    var slide = entry.className;
    var time = 0;
    var end = true;
    const delay = 1200;
    if (slide == "slide one") {
        const planets1 = document.querySelector('.one .planets');
        //console.log(planets1);
        planets1.style.opacity = "100%";
    } else if (slide == "slide three" || slide == "slide four") {
        gridAnim(slide);
    } else if (slide == "slide seven") {
        if (entry.dataset.done == "false") {
            time = typewriter(".bloodhound-intro", end);
            end = true;
            //setTimeout(() => { time = typewriter(".bloodhound-content", end); }, time + delay);
            entry.dataset.done = "true"
        }
    } else if (slide == "slide nine") {
        if (entry.dataset.done == "false") {
            time = typewriter(".nationals-intro", end);
            end = true;
            //setTimeout(() => { time = typewriter(".nationals-content", end); }, time + delay);
            entry.dataset.done = "true"
        }
    } else if (slide == "slide eleven") {
        if (entry.dataset.done == "false") {
            time = typewriter(".dip-intro", end);
            end = true;
            //setTimeout(() => { time = typewriter(".clock-content", end); }, time + delay);
            entry.dataset.done = "true"
        }
    } else if (slide == "slide thirteen") {
        if (entry.dataset.done == "false") {
            time = typewriter(".ydsp-intro", end);
            end = true;
            //setTimeout(() => { time = typewriter(".ydsp-content", end); }, time + delay);
            entry.dataset.done = "true"
        }
    } else if (slide == "slide fifteen") {
        if (entry.dataset.done == "false") {
            time = typewriter(".clock-intro", end);
            end = true;
            //setTimeout(() => { time = typewriter(".clock-content", end); }, time + delay);
            entry.dataset.done = "true"
        }
    } else if (slide == "slide seventeen") {
        if (entry.dataset.done == "false") {
            time = typewriter(".yep-intro", end);
            end = true;
            //setTimeout(() => { time = typewriter(".piano-content", end); }, time + delay);
            entry.dataset.done = "true"
        }
    } else if (slide == "slide nineteen") {
        if (entry.dataset.done == "false") {
            time = typewriter(".piano-intro", end);
            end = true;
            //setTimeout(() => { time = typewriter(".piano-content", end); }, time + delay);
            entry.dataset.done = "true"
        }
    } else if (slide == "slide twenty") {
        if (!fireworksDone) {
            fireworksAnim('left');
            setTimeout(() => {
                fireworksAnim('right');
            }, 1200);
            setTimeout(() => {
                fireworksAnim('left');
            }, 2400);
            fireworksDone = true;
        }
    }
} 