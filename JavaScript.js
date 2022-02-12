let currentPage = 1;
let lastSearchString = "";
let lastSearchColor = "";
let totalHits = 0;

setPaginationButtonStatus();
function setPaginationButtonStatus(){
    let prevButton = document.querySelector('#previous');
    let nextButton = document.querySelector('#next');
    prevButton.disabled = false;
    nextButton.disabled = false;
    // if totalhits = 0 => both disabled
    if (totalHits === 0) {
        prevButton.disabled = true;
        nextButton.disabled = true;
    }
    // if currentPage * 10 <= totalHits => nextButton disabled
    if(totalHits <= currentPage * 10){
        nextButton.disabled = true;
    }
    // if currentPage <= 1 => prevButton disabled
    if (currentPage <= 1){
        prevButton.disabled = true;
    }
}

let template;
setUpTemplate();
function setUpTemplate() {
    template = document.querySelector('#hit-template');
    template.remove();
}

formHandler();
function formHandler(){
    let searchForm = document.querySelector('.InputSearch');
    let searchString = document.querySelector('#Search');
    let color = document.querySelector('#color');
    
    searchForm.onsubmit = event => {
        lastSearchColor = color.value; // cache
        lastSearchString = searchString.value; // cache
        event.preventDefault();
        searchPixaby(searchString.value, color.value, 1);
    }
}

nextPageButtonHandler();
function nextPageButtonHandler() {
    let button = document.querySelector('#next');
    button.onclick = () => {
        changePage(++currentPage);
    }
}

previousPageButtonHandler();
function previousPageButtonHandler() {
    let button = document.querySelector('#previous');
    button.onclick = () => {
        changePage(--currentPage);
    }
}

function changePage(newPageNumber){
    removeCurrentSearchItems();
    searchPixaby(lastSearchString, lastSearchColor, newPageNumber);
}

async function searchPixaby(searchQuery, searchColor, pageNumber) {
    let pixabay = await getPixabayData(searchQuery, searchColor, pageNumber);
    currentPage = pageNumber; // cache
    removeCurrentSearchItems();
    totalHits = pixabay.totalHits; // cache
    
    let hitList = document.querySelector('#hit-list');
    
    for (const image of pixabay.hits) {
        let li = template.content.firstElementChild.cloneNode(true);
        li.querySelector('img').src = image.previewURL;
        li.querySelector('#tags').textContent = image.tags;
        li.querySelector('#photographer').textContent = image.user;
        hitList.append(li);
    }
    setPaginationButtonStatus();
}

async function getPixabayData(searchQuery, searchColor, pageNumber) {
    let params = new URLSearchParams({
        key : '25655500-534d4ee5283250b244508c508',
        q : searchQuery,
        colors : searchColor,
        page : pageNumber,
        per_page : '10'
    });
    
    let response = await fetch("https://pixabay.com/api/?" + params.toString());
    let json = await response.json();
    return json;
}

function removeCurrentSearchItems() {
    let hitList = document.querySelector('#hit-list');
    let children = hitList.querySelectorAll('li');
    for (const child of children) {
        child.remove();
    }
}




