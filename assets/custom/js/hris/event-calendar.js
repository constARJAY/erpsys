$(document).on("click","#showEventIcon", function(){
    let thisIcon        =  $(this).find(".zmdi");
    let collapseExample = $(".collapseExampleForIcon");
    if(thisIcon.hasClass("zmdi-hc-rotate-180")){
        $(".collapseExampleForIcon").hide(500);
        thisIcon.removeClass("zmdi-hc-rotate-180");
    }else{
        $(".collapseExampleForIcon").show(500);
        thisIcon.addClass("zmdi-hc-rotate-180");
    }
});