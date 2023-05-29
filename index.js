const track = document.querySelector('.image-track')

window.onmousedown = e => {
    // update the position of the mouse down
    track.dataset.mouseDownAt = e.clientX;
}


window.onmouseup = () => {
    track.dataset.mouseDownAt = '0'
    // store last mouse position after releasing the mouse    ====== 2
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
    // use the previously stored value as a new starting point when determining the next percentage    =========3
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,

    // to prevent infinite scrolling set maximum value to zero
    // Math.min(nextPercentage,0);
    // set the minimum value to -100
    // Math.max(nextPercentage, -100);
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained,0), -100);

    // consantly track percentage the track has been moved    ========  1
    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    },{duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`},
            {duration: 1200, fill:"forwards"}
        );
    }
}