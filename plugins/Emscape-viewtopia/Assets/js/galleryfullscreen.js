/**
 * Created by Emscape on 21-9-2016.
 */

var viewtopiaCurrentIndex;
var viewtopiaDragStartX;
var viewtopiaDragStartLeftX;
var currentViewTopia;
var currentViewTopiaThumbnail;
var currentViewtopiaImageTextWrapper;
var viewtopiaIsDrag = false;

//now follow the setting variables
var viewtopiaAnimSpeed = 100;
var viewtopiaThumbnailStyle = 1; //3 indicates moving thumbnails, 2 other border colors, 1 overlay effects, 0 means nothing.
var viewtopiaThumbnailHighlightColor = '#DDDDDD';
var viewtopiaThumbnailNormalColor = '#000000';


/* when iframe Video's are used the width of the frame is calculated according to the height of the frame, which automatically adjusts to the height of the frame.*/
$('.videowrapper').load(function () {
    $(this).width($(this).height() / 0.5625)
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
    currentViewTopia = $('.viewtopiaGallery').eq(galleryIndex) ;
    currentViewTopiaThumbnail = $('.viewtopiaThumbnail').eq(galleryIndex);
    currentViewtopiaImageTextWrapper = $('.imageTextWrapper').eq(galleryIndex);

    //Ensure the correct position of elements within the Gallery
    if (index > 0) {
        centreElement(index);
    }
    else {
        centreElement(0);
    }
        viewtopiaCurrentIndex = index;

    //Selects the current thumbnail
    currentThumbnail(viewtopiaCurrentIndex);
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
    animateToLeft(viewtopiaCurrentIndex, 0);
}

/**
 * Called when the "right" arrow has been clicked.
 */
function moveOneRight() {
    animateToRight(viewtopiaCurrentIndex, 0);
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
    viewtopiaCurrentIndex = index;
    var currentWidthHalf =  currentViewTopia.children().eq(index).width() / 2;
    var halfScreenWidth = ($(window).width() / 2);
    var totalSize =  currentViewTopia.children().size();
    var bordersize = currentViewTopia.children().eq(index).css("border-left-width");
    bordersize = parseInt(bordersize) * 2;

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
        currentLeft = currentLeft - bordersize - currentViewTopia.children().eq(i).width();
        currentViewTopia.children().eq(i).css('left', formatToLeftPX(currentLeft));
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
        currentLeft = currentLeft + bordersize + currentViewTopia.children().eq(i).width();
        currentViewTopiaThumbnail.children().eq(i).css('top', '10%');
    }
    while(i != lastRightIndex)


    //Position the current element correctly.
    currentViewTopia.children().eq(index).css('left', formatToLeftPX(-currentWidthHalf));

    //Repostion the last thumbnail.
    currentViewTopiaThumbnail.children().eq(index).css('top', '10%');

    //Set de position of the parent.
    currentViewTopia.css('left', formatToLeftPX(halfScreenWidth - (bordersize*2) + startingDisplacement));

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
$('.viewtopiaGallery').mousedown(function ()
{
    if (!viewtopiaIsDrag)
    {
        viewtopiaDragStartLeftX = $(this).position().left;
        viewtopiaDragStartX = event.clientX;
        viewtopiaIsDrag = true;
    }
});

/**
 * registers the mouse movement and scrolls the entire bar in the right direction
 */
$('.viewtopiaGallery').mousemove( function()
{
    if (viewtopiaIsDrag)
    {
        var newLeft = viewtopiaDragStartLeftX + (event.clientX - viewtopiaDragStartX) ;
        $(this).css('left', formatToLeftPX(newLeft));
        viewtopiaIsDrag= viewtopiaIsDrag;
    }
});

/**
 * when the mouse is released the elements moveback into place
 */
$('.viewtopiaGallery').mouseup(function()
{

    if (viewtopiaIsDrag) {
        viewtopiaIsDrag = false;

        //Looks if the mouse or tough input was moved significantly enough to slide the Gallery.
        if (event.clientX - viewtopiaDragStartX > 10) {
            animateToLeft(viewtopiaCurrentIndex, event.clientX - viewtopiaDragStartX);
        }
        else if (viewtopiaDragStartX - event.clientX > 10) {
            animateToRight(viewtopiaCurrentIndex, event.clientX - viewtopiaDragStartX);
        }
        else {
            var currentLeftPosition = $(this).position().left - event.clientX + viewtopiaDragStartX;
            currentViewTopia.animate(
                {
                    left: formatToLeftPX(currentLeftPosition)
                }, viewtopiaAnimSpeed);
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
    var bordersize = currentViewTopia.children().eq(index).css("border-left-width");
    bordersize = parseInt(bordersize) * 2;

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
    var newContainerLeft =  halfScreenWidth - animateWidth - 2 * bordersize;



    //Animate the entire gallery instead of loose images.
    currentViewTopia.animate(
        {
       left: formatToLeftPX(newContainerLeft)
    }, 5 * viewtopiaAnimSpeed);

    //Change viewtopiaCurrentIndex acordingly.
    if (viewtopiaCurrentIndex < totalSize - 1)
    {
        viewtopiaCurrentIndex = viewtopiaCurrentIndex + 1;
    }
    else
    {
        viewtopiaCurrentIndex = 0;
    }

    //Ensure the thumbnail is handled properly.
    currentThumbnail(viewtopiaCurrentIndex);
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
    var bordersize = currentViewTopia.children().eq(index).css("border-left-width");
    bordersize = parseInt(bordersize) * 2;

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
    var newContainerLeft =  halfScreenWidth + animateWidth - 2 * bordersize;



    //Animate the entire gallery instead of loose images.
    currentViewTopia.animate(
        {
            left: formatToLeftPX(newContainerLeft)
        }, 5 * viewtopiaAnimSpeed);

    //Change viewtopiaCurrentIndex acordingly.
    if (viewtopiaCurrentIndex > 0)
    {
        viewtopiaCurrentIndex = viewtopiaCurrentIndex - 1;
    }
    else
    {
        viewtopiaCurrentIndex = totalSize - 1;
    }

    //Ensure the thumbnail is handled properly.
    currentThumbnail(viewtopiaCurrentIndex);
}

/**
 * Sets all thumbnail behavior to non active within the Gallery
 */
function unselectAllThumbnails() {
    currentViewtopiaImageTextWrapper.children().each(function () {
        $(this).css('display', 'none')
    });

    switch (viewtopiaThumbnailStyle){
        case 3:
            currentViewTopiaThumbnail.children().each(function(){
                $(this).css('top', '10%')
            });
            break;
        case 2:
            currentViewTopiaThumbnail.children().each(function () {
                $(this).children().first().css('border-color', viewtopiaThumbnailNormalColor)
            });
            break;
        case 1:
            currentViewTopiaThumbnail.children().each(function () {
                $(this).children().first().css('border-radius' , '1%');
            });
        default:
            break;
    }


}

/**
 * Changes the behavior of all thumnails to display the correct thumbnail as active, also displays correct text
 * @param {Number} currentIndex - index of the thumbnail to be activated
 */
function currentThumbnail(currentIndex){

    unselectAllThumbnails();


    switch (viewtopiaThumbnailStyle){
        case 3:
            currentThumbnailMoving(currentIndex);
            break;
        case 2:
            currentThumbnailHIghlight(currentIndex);
        case 1:
            currentThumbnailBorder(currentIndex);
        default:
            break;
    }

}

/**
 * Animates the active thumbnail to get moved up in position.
 * @param {Number} currentIndex - index of the thumbnail to be activated
 */
function currentThumbnailMoving(currentIndex){
    currentViewTopiaThumbnail.children().eq(currentIndex).animate(
        {
            top: '-25%'

        } , 1.5 * viewtopiaAnimSpeed);
}

/**
 * Sets the active thumbnail to get highlighted.
 * @param {Number} currentIndex - index of the thumbnail to be activated
 */
function currentThumbnailHIghlight(currentIndex){
    currentViewTopiaThumbnail.children().eq(currentIndex).children().first().css('border-color' , viewtopiaThumbnailHighlightColor);

}

/**
 * Sets the active thumbnail to get into .
 * @param {Number} currentIndex - index of the thumbnail to be activated
 */
function currentThumbnailBorder(currentIndex){
    currentViewTopiaThumbnail.children().eq(currentIndex).children().first().css('border-radius' , '50%');

}
