
window.onload = function () {

    //staat 2x in het script
    var biggestHeight = "0";
// Loop through elements children to find & set the biggest height
    $(".box").each(function () {

        // If this elements height is bigger than the biggestHeight
        if ($(this).height() > biggestHeight) {
            // Set the biggestHeight to this Height
            biggestHeight = $(this).height();
        }
    });

    biggestHeight += 120;
    $("#sliderwrapper").height(biggestHeight);




    $('.box').click(function () {
        $('.box').each(function () {
            if ($(this).offset().left < 0) {
                $(this).css("left", "200%");
            }
        });

        $(this).animate({
            left: '-100%'
        }, 500);

        if ($(this).next().size() > 0) {
            $(this).next().animate({
                left: '0%'
            }, 500);
        } else {
            $(this).prevAll().last().animate({
                left: '0%'
            }, 500);
        }

    })


    ;

    window.onresize= function () {

        var biggestHeight = "0";
// Loop through elements children to find & set the biggest height
        $(".box").each(function () {

            // If this elements height is bigger than the biggestHeight
            if ($(this).height() > biggestHeight) {
                // Set the biggestHeight to this Height
                biggestHeight = $(this).height();
            }
        });

        biggestHeight += 120;
        $("#sliderwrapper").height(biggestHeight);

    };


}/**
 * Created by Emscape on 17-9-2016.
 */
