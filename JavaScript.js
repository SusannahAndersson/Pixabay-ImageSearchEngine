
formHandler();

function formHandler(){
    let searchForm = document.querySelector('.InputSearch');
    let searchString = document.querySelector('#Search');
    let color = document.querySelector('#color');
    // let movies = document.querySelector('.movies');

    searchForm.onsubmit = event => {
        event.preventDefault();
        alert("Search: " + searchString.value + " Color: " + color.value);
    }
}

start();

// TODO rename and move to search
async function start() {
    let pixabay = await getPixabayData();

    // let totalHitsSpan = document.querySelector('#total-hits');
    // totalHitsSpan.textContent = pixabay.totalHits;
 
    let hitList = document.querySelector('#hit-list');
    let template = document.querySelector('#hit-template');
    template.remove(); // remove the template from the html document
    
    for (const image of pixabay.hits) {
        let li = template.content.firstElementChild.cloneNode(true); // true = copy all children
        li.querySelector('img').src = image.previewURL;
        li.querySelector('#tags').textContent = image.tags;
        li.querySelector('#photographer').textContent = image.user;
        hitList.append(li);
    }
}

// TODO set in parameters for function
async function getPixabayData() {
    let params = new URLSearchParams({
        key : '25655500-534d4ee5283250b244508c508',
        q : 'red roses',
        per_page : '10'
    });
    
    let response = await fetch("https://pixabay.com/api/?" + params.toString());
    let json = await response.json();
    return json;
}





