
/**
 * Carousel lock to disable links on the sidebar while the carousel is loading
 */
carouselLock = 1;
function lockCarousel(){
    carouselLock = 0;
    $(".foodlink").addClass("disablelink");

}
function unlockCarousel(){
    carouselLock = 1;
    $(".foodlink").removeClass("disablelink");
}

// adds content to the page when it gets the json
function addContent(jsonInfo, contentEndpoint) {
    unlockCarousel();
    content = jsonInfo['content'];
    title = jsonInfo['title'];
    replaceTitle(title);
    for (i = 0; i < content.length; i++) {
        nextContent = content[i]
        addItem('https://s3.amazonaws.com/www.momobot.net/food/' + contentEndpoint + '/' + nextContent.file, nextContent.text, i == 0);
    }
}

function replaceTitle(newTitle) {
    $("#tl").empty();
    x = $("#tl").append(`<h2>` + newTitle + `</h2>`);
}


function addItem(imgSrc, text, isFirst) {
    $("#content").append(`
      <div class="item` + (isFirst ? " active" : "") + `" align="center">
        <div style="max-width: 700px;">
        <img style="max-height: 500px;" src="` + imgSrc + `" alt="pancake" style="width:100%;">`
	+ text.replace(new RegExp('\n', 'g'), '<br>') +
      ` </div>
      </div>
`);
}

function loadStuff(contentEndpoint) {
    if (carouselLock) {

        // set lockout until the async call is done
        lockCarousel();

        //destroy existing carousel HTML
        $("#content").empty();

        // Make callback and create new carousel
        fetch(contentEndpoint + '/info.json').then(r => r.json()).catch(e => unlockCarousel()).then(r => addContent(r, contentEndpoint));
    }
}

$().ready(() => loadStuff('010'));
