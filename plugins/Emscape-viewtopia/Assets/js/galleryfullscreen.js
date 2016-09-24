/**
 * Created by Emscape on 21-9-2016.
 */
/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
    $('.pic').each(function () {
        $(this).attr('last','false');
    });
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

$('.pic').click(function () {

    //eerst helft breedte this uitrekenen
    var currentWidthHalf = $(this).width() /2;
    var nextWidth;
    var animateWidth;
    var halfScreenWidth = ($(window).width() / 2);
    var lastWidth;
    var notLast = false;
    var totalSize = $(this).parent().children().size();
    var index = $(this).parent().children().index($(this));
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




//reset de parent
    $('.viewtopiaImage').css('left', formatToLeftPX(halfScreenWidth));

    //bereken positie binnen array al vantevoren
    if ($(this).next().size() > 0)
    {
        notLast = true;
    }

    // breedte volgende element uitlezen
    if(notLast)
    {
        nextWidth = $(this).next().width();
    }
    else
    {
        nextWidth = $(this).prevAll().last().width();
    }

    //breedte vorige element uitlezen
    if($(this).prev().size() > 0)
    {
        lastWidth = $(this).prev().width();
    }
    else
    {
        lastWidth = $(this).nextAll().last().width();
    }

//animatiebreedte bepalen
    animateWidth = currentWidthHalf + ( nextWidth / 2);
    var lastAnimateWidth = currentWidthHalf + (lastWidth / 2);
    var newContainerLeft =  halfScreenWidth - animateWidth;

    var currentLeft = (-currentWidthHalf);
    //alle blokken naar links correct positioneren.
    var i = index;
    do{

        i = i - 1;
        if (i < 0)
        {
            i = totalSize - 1;
        }
        currentLeft = currentLeft - $(this).parent().children().eq(i).width();
        $(this).parent().children().eq(i).css('left', formatToLeftPX(currentLeft));
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
        $(this).parent().children().eq(i).css('left', formatToLeftPX(currentLeft));
        currentLeft = currentLeft + $(this).parent().children().eq(i).width();
    }
    while(i != lastRightIndex)//gaat 1 te ver door




    /*//lefts van alle elementen naar links verplaatsen zodat nieuwe parent positie goed gebruikt wordt
    $('.pic').each(function () {
        var newLeft = $(this).position().left;
        newLeft = newLeft - lastAnimateWidth;
        $(this).css('left', formatToLeftPX(newLeft));
    });*/

    // positie dit element goed doen
    $(this).css('left', formatToLeftPX(-currentWidthHalf));




    //parent container animeren naar positie naar links
    $('.viewtopiaImage').animate(
        {
       left: formatToLeftPX(newContainerLeft)
    }, 500);


    /* deprecated code
    //alles animeren door helft breedte huidige en helft breedte volgende naar links te plaatsen
    $('.pic').each(function () {
        var newLeft = $(this).position().left;
        newLeft = newLeft - animateWidth;
        $(this).animate({
            left: formatToLeftPX(newLeft)
        }, 500);
    });*/
});