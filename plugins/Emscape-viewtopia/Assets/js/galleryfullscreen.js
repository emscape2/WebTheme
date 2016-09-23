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


    //lefts van alle elementen naar links verplaatsen zodat nieuwe parent positie goed gebruikt wordt
    $('.pic').each(function () {
        var newLeft = $(this).position().left;
        newLeft = newLeft - lastAnimateWidth;
        $(this).css('left', formatToLeftPX(newLeft));
    });

    // positie dit element goed doen
    $(this).css('left', formatToLeftPX(-currentWidthHalf));


    //positie volgende element goed doen
    if(notLast)
    {
        $(this).next().css('left', formatToLeftPX( currentWidthHalf));
    }
    else
    {
        $(this).prevAll().last().css('left', formatToLeftPX( currentWidthHalf));
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