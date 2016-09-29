/**
 * Created by Emscape on 21-9-2016.
 */

var currentIndex;
var dragStartX;
var dragStartLeftX;
var currentViewTopia;
var currentViewTopiaThumbnail;
var currentImageTextWrapper;
var isDrag = false;


/* when iframe Video's are used the width of the frame is calculated according to the height of the frame, which automatically adjusts to the height of the frame. */
$('.videowrapper').ready(function () {
    $(this).width($(this).height() * 0.5625)
});

/**
 *  Open the gallery with the right element centered, called when someone clicks on a span element.
 *  @param {Number} index - the index of the element within the Gallery
 *  @param {Number} galleryIndex - the index of the entire Gallery (when only a single gallery is used, use 0)
 *  @param {String} viewtopiaGalleryId - the name of the Gallery to be opened */
function openGallery(index, galleryIndex, viewtopiaGalleryId) {
    //Opens the Gallery.
    document.getElementById(viewtopiaGalleryId).style.width = "100%";

    //Sets the references to current viewtopia content.
    currentViewTopia = $('.viewtopiaImage').eq(galleryIndex) ;
    currentViewTopiaThumbnail = $('.viewtopiaThumbnail').eq(galleryIndex);
    currentImageTextWrapper = $('.imageTextWrapper').eq(galleryIndex);

    //Ensure the correct position of elements within the Gallery
    if (index > 0) {
        centreElement(index);
    }
    else {
        centreElement(0);
    }
        currentIndex = index;

    //Selects the current thumbnail
    currentThumbnail(currentIndex);
}

/**
 * Called when the Gallery overlay has to be closed.
 * @param {String} viewtopiaGalleryId - ID of the Gallery to be closed
 */
function closeGallery(viewtopiaGalleryId) {
    unselectAllThumbnails();

    var halfScreenWidth = ($(window).width() / 2);
    currentViewTopia.css('left', formatToLeftPX(halfScreenWidth));

    document.getElementById(viewtopiaGalleryId).style.width = "0%";


}

/**
 * Called when the "left" arrow has been clicked.
 */
function moveOneLeft() {
    animateToLeft(currentIndex, 0);
}

/**
 * Called when the "right" arrow has been clicked.
 */
function moveOneRight() {
    animateToRight(currentIndex, 0);
}

/**
 * Formats data as a string with 'px' added on the end.
 * @param pixels - the data that leads to the number of pixels
 * @returns {string}
 */
function formatToLeftPX(pixels)
{
    var toReturn =    pixels.toString();
    toReturn = toReturn.concat('px');
    return toReturn;
}


/**
 * Centres an element within the Gallery.
 * @param {Number} index - the index of the element within the Gallery
 * @param {Number} startingDisplacement - starting position of the animation when animating
 */
function centreElement(index, startingDisplacement)
{
    currentIndex = index;
    var currentWidthHalf =  currentViewTopia.children().eq(index).width() / 2;
    var halfScreenWidth = ($(window).width() / 2);
    var totalSize =  currentViewTopia.children().size();

    //Calculate the index of the image most to the left.
    var firstLeftIndex = Math.ceil(index - ((totalSize) / 2));
    if (firstLeftIndex < 0)
    {
        firstLeftIndex = (totalSize) + firstLeftIndex;
    }
    //Calculate the index of the image most to the right.
    var lastRightIndex = firstLeftIndex - 1;
    if (lastRightIndex < 0)
    {
        lastRightIndex = totalSize - 1;
    }

    //Calculate the left position of the central element.
    var currentLeft = (-currentWidthHalf);

    //Position the Gallery elements to the left of the central element correctly.
    var i = index;
    do{

        i = i - 1;
        if (i < 0)
        {
            i = totalSize - 1;
        }
        currentLeft = currentLeft -  currentViewTopia.children().eq(i).width();
        currentViewTopia.children().eq(i).css('left', formatToLeftPX(currentLeft));
        currentViewTopiaThumbnail.children().eq(i).css('top', '10%');
    }
    while(i != firstLeftIndex)

    //Position the Gallery elements to the right of the central element correctly.
    currentLeft = currentWidthHalf;
    i = index;
    do{

        i = i + 1;
        if (i == totalSize)
        {
            i = 0;
        }
        currentViewTopia.children().eq(i).css('left', formatToLeftPX(currentLeft));
        currentLeft = currentLeft +  currentViewTopia.children().eq(i).width();
        currentViewTopiaThumbnail.children().eq(i).css('top', '10%');
    }
    while(i != lastRightIndex)


    //Position the current element correctly.
    currentViewTopia.children().eq(index).css('left', formatToLeftPX(-currentWidthHalf));

    //Repostion the last thumbnail.
    currentViewTopiaThumbnail.children().eq(index).css('top', '10%');

    //Set de position of the parent.
    currentViewTopia.css('left', formatToLeftPX(halfScreenWidth + startingDisplacement));

}

/**
 * When a thumbnail image is clicked, this ensures the positioning of the Gallery and its elements.
 */
$('.vThumb').click(function () {
    var index = $(this).parent().index();
    centreElement(index,0);

    currentThumbnail(index);

})

/**
 * on mousclick start registering drag
 */
$('.viewtopiaImage').mousedown(function ()
{
    if (!isDrag)
    {
        dragStartLeftX = $(this).position().left;
        dragStartX = event.clientX;
        isDrag = true;
    }
});

/**
 * registers the mouse movement and scrolls the entire bar in the right direction
 */
$('.viewtopiaImage').mousemove( function()
{
    if (isDrag)
    {
        var newLeft = dragStartLeftX + (event.clientX - dragStartX) ;
        $(this).css('left', formatToLeftPX(newLeft));
        isDrag= isDrag;
    }
});

/**
 * when the mouse is released the elements moveback into place
 */
$('.viewtopiaImage').mouseup(function()
{

    if (isDrag) {
        isDrag = false;

        //Looks if the mouse or tough input was moved significantly enough to slide the Gallery.
        if (event.clientX - dragStartX > 10)
        {
            animateToLeft(currentIndex, event.clientX - dragStartX);
        }
        else if (dragStartX - event.clientX > 10)
        {
            animateToRight(currentIndex, event.clientX - dragStartX);
        }
    }
});

/**
 * Moves the Gallery one position to the right.
 * @param {Number} index - index of the current element
 * @param {Number} startingDisplacement - starting position of the animation when animating
 */
function animateToRight(index, startingDisplacement) {

    var currentWidthHalf = currentViewTopia.children().eq(index).width() /2;
    var nextWidth;
    var animateWidth;
    var halfScreenWidth = ($(window).width() / 2);
    var totalSize =  currentViewTopia.children().size();
    var notLast = false;

    //First ensure the position of all elements is correct to start the animation.
    centreElement(index, startingDisplacement);


    //Check if not the last element inside of the array of Gallery elements.
    if (currentViewTopia.children().eq(index).next().size() > 0)
    {
        notLast = true;
    }

    //Read the width of the next element.
    if(notLast)
    {
        nextWidth =currentViewTopia.children().eq(index).next().width();
    }
    else
    {
        nextWidth = currentViewTopia.children().eq(index-1).width();
    }


    //Calculate the total width of the animation.
    animateWidth = currentWidthHalf + ( nextWidth / 2);
    var newContainerLeft =  halfScreenWidth - animateWidth;



    //Animate the entire gallery instead of loose images.
    currentViewTopia.animate(
        {
       left: formatToLeftPX(newContainerLeft)
    }, 500);

    //Change currentIndex acordingly.
    if (currentIndex < totalSize - 1)
    {
        currentIndex = currentIndex + 1;
    }
    else
    {
        currentIndex = 0;
    }

    //Ensure the thumbnail is handled properly.
    currentThumbnail(currentIndex);
}


/**
 * Moves the Gallery one position to the left.
 * @param {Number} index - index of the current element
 * @param {Number} startingDisplacement - starting position of the animation when animating
 */
function animateToLeft(index , startingDisplacement) {
    var currentWidthHalf = currentViewTopia.children().eq(index).width() /2;
    var lastWidth;
    var animateWidth;
    var halfScreenWidth = ($(window).width() / 2);
    var totalSize =  currentViewTopia.children().size();
    var notFirst = false;

    //First ensure the position of all elements is correct to start the animation.
    centreElement(index, startingDisplacement);


    //Check if not the last element inside of the array of Gallery elements.
    if (currentViewTopia.children().eq(index).prev().size() > 0)
    {
        notFirst = true;
    }

    //Read the width of the previous element.
    if(notFirst)
    {
        lastWidth =currentViewTopia.children().eq(index-1).width();
    }
    else
    {
        lastWidth = currentViewTopia.children().eq(totalSize - 1).width();
    }


    //Calculate the total width of the animation.
    animateWidth = currentWidthHalf + ( lastWidth / 2);
    var newContainerLeft =  halfScreenWidth + animateWidth;



    //Animate the entire gallery instead of loose images.
    currentViewTopia.animate(
        {
            left: formatToLeftPX(newContainerLeft)
        }, 500);

    //Change currentIndex acordingly.
    if (currentIndex > 0)
    {
        currentIndex = currentIndex - 1;
    }
    else
    {
        currentIndex = totalSize - 1;
    }

    //Ensure the thumbnail is handled properly.
    currentThumbnail(currentIndex);
}

/**
 * Sets all thumbnail behavior to non active within the Gallery
 */
function unselectAllThumbnails() {
    currentImageTextWrapper.children().each(function () {
        $(this).css('display', 'none')

    });
}

/**
 * Changes the behavior of all thumnails to display the correct thumbnail as active, also displays correct text
 * @param {Number} currentIndex - index of the thumbnail to be activated
 */
function currentThumbnail(currentIndex){

    unselectAllThumbnails();

    currentImageTextWrapper.children().eq(currentIndex).css('display', 'block');

    currentViewTopiaThumbnail.children().eq(currentIndex).animate(
        {
            top: '-25%'

        } , 150);
}

