/**
 * Created by Emscape on 21-9-2016.
 */

var currentIndex;

/* Open when someone clicks on the span element */
function openNav(index) {
    document.getElementById("myNav").style.width = "100%";
    centreElement(index);
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

function formatToLeftPX(pixels)
{
    var toReturn =    pixels.toString();
    toReturn = toReturn.concat('px');
    return toReturn;
}

function centreElement(index)
{
    currentIndex = index;
    var currentWidthHalf =  $('.viewtopiaImage').first().children().eq(index).width() / 2;
    var halfScreenWidth = ($(window).width() / 2);
    var totalSize =  $('.viewtopiaImage').first().children().size();
    //calculate the index of the image most to the left
    var firstLeftIndex = index - ((totalSize -1) / 2);
    if (firstLeftIndex < 0)
    {
        firstLeftIndex = totalSize - 1 + firstLeftIndex;
    }
    //calculate the index of the image most to the right
    var lastRightIndex = firstLeftIndex - 1;
    if (lastRightIndex < 0)
    {
        lastRightIndex = totalSize - 1;
    }


    var currentLeft = (-currentWidthHalf);
    //alle blokken naar links correct positioneren.
    var i = index;
    do{

        i = i - 1;
        if (i < 0)
        {
            i = totalSize - 1;
        }
        currentLeft = currentLeft -  $('.viewtopiaImage').first().children().eq(i).width();
        $('.viewtopiaImage').first().children().eq(i).css('left', formatToLeftPX(currentLeft));
    }
    while(i != firstLeftIndex)//gaat 1 te ver door

    //alle blokken rechts goed neerzetten
    currentLeft = currentWidthHalf;
    i = index;
    do{

        i = i + 1;
        if (i == totalSize)
        {
            i = 0;
        }
        $('.viewtopiaImage').first().children().eq(i).css('left', formatToLeftPX(currentLeft));
        currentLeft = currentLeft +  $('.viewtopiaImage').first().children().eq(i).width();
    }
    while(i != lastRightIndex)//gaat 1 te ver door


    // positie dit element goed doen
    $('.viewtopiaImage').first().children().eq(index).css('left', formatToLeftPX(-currentWidthHalf));


//reset de parent
    $('.viewtopiaImage').css('left', formatToLeftPX(halfScreenWidth));

}

$('.pic').click(function () {
    var index = $('.viewtopiaImage').first().children().index($(this));
    animateToLeft(index);
});

function animateToLeft(index) {


    //eerst helft breedte this uitrekenen
    var currentWidthHalf = $('.viewtopiaImage').first().children().eq(index).width() /2;
    var nextWidth;
    var animateWidth;
    var halfScreenWidth = ($(window).width() / 2);
    var totalSize =  $('.viewtopiaImage').first().children().size();
    var notLast = false;

    centreElement(index);


//    var lastAnimateWidth = currentWidthHalf + (lastWidth / 2);


    //bereken positie binnen array al vantevoren
    if ($('.viewtopiaImage').first().children().eq(index).next().size() > 0)
    {
        notLast = true;
    }

    // breedte volgende element uitlezen
    if(notLast)
    {
        nextWidth =$('.viewtopiaImage').first().children().eq(index).next().width();
    }
    else
    {
        nextWidth = $('.viewtopiaImage').first().children().eq(index-1).width();
    }


//animatiebreedte bepalen
    animateWidth = currentWidthHalf + ( nextWidth / 2);
    var newContainerLeft =  halfScreenWidth - animateWidth;



    //parent container animeren naar positie naar links
    $('.viewtopiaImage').animate(
        {
       left: formatToLeftPX(newContainerLeft)
    }, 500);

    if (currentIndex < totalSize - 1)
    {
        currentIndex = currentIndex + 1;
    }
    else
    {
        currentIndex = 0;
    }

    /* deprecated code
    //alles animeren door helft breedte huidige en helft breedte volgende naar links te plaatsen
    $('.pic').each(function () {
        var newLeft = $(this).position().left;
        newLeft = newLeft - animateWidth;
        $(this).animate({
            left: formatToLeftPX(newLeft)
        }, 500);
    });*/
}