// Use JS to dynamically load content into the page
function loadContentWithJs(partialName, container){
    console.log('fetching partial', partialName);
    var $container = $(container);
    $container.load('/partials/' + partialName);
}