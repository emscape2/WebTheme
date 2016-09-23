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


    /*$('.pic').each(function () {
        if ($(this).attr('last') == 'true') {
            $(this).attr('last','false');
            $(this).css("left", "200%");
            $(this).animate({
                left: '100%'
            }, 500);
        }

    });

    $(this).attr('last','true');
    var currentWidth = 0- $(this).width();
    $(this).animate({
        left: currentWidth.toString().concat('px')
    }, 500);

    var leftPosition;
    var leftNextElement;

    if ($(this).next().size() > 0) {


        leftPosition = window.innerWidth / 2 - $(this).next().width()/2;
        $('.viewtopiaImage').animate({
            left: leftPosition.toString().concat('px') },500);

        $('.viewtopiaImage').width($(this).next().width());


        $(this).next().animate({
            left: '0%'
        }, 500);
    } else {

        leftPosition = window.innerWidth / 2 - $(this).prevAll().last().width()/2;
        $('.viewtopiaImage').animate({
            left: leftPosition.toString().concat('px') },500);

        $('.viewtopiaImage').width($(this).prevAll().last().width());


        $(this).prevAll().last().animate({
            left: '0%'
        }, 500);
    }*/





})