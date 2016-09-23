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


    var notLast = false;


    //bereken positie binnen array al vantevoren
    if ($(this).next().size() > 0)
    {
        notLast = true;
    }

    //voor zekerheid positie dit element goed doen
    $(this).css('left', formatToLeftPX(-currentWidthHalf));

    //positie volgende element en breedte volgende element goed doen
    if(notLast)
    {
        $(this).next().css('left', formatToLeftPX( currentWidthHalf));
        nextWidth = $(this).next().width();
    }
    else
    {
        $(this).prevAll().last().css('left', formatToLeftPX( currentWidthHalf));
        nextWidth = $(this).prevAll().last().width();
    }

    //daaropvolgende element rechts van volgende plaatsen
    if(notLast)
    {
        if($(this).nextAll().size() > 1)
        {
            $(this).nextAll().eq(1).css('left', formatToLeftPX(currentWidthHalf + nextWidth));
        }
        else
        {
            $(this).prevAll().last().css('left', formatToLeftPX(currentWidthHalf + nextWidth));
        }
    }
    else
    {
        var selector = $(this).prevAll().size() - 2;
        $(this).prevAll().eq(selector).css('left', formatToLeftPX(currentWidthHalf + nextWidth));
    }

    //animatiebreedte bepalen
    animateWidth = currentWidthHalf + ( nextWidth / 2);

    //alles animeren door helft breedte huidige en helft breedte volgende naar links te plaatsen
    $('.pic').each(function () {
        var newLeft = $(this).position().left;
        newLeft = newLeft - animateWidth;
        $(this).animate({
            left: formatToLeftPX(newLeft)
        }, 500);
    });






});