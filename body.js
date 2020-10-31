var thisyear = new Date().getFullYear();
$(function(){
    $("#header").empty();
    $("#header").append('<h1>' + TitleOfPage + '</h1>');
});

$(function(){
    $("#footer").empty();
    $("#footer").append('<hr width="100%"> Template of Xml2Publist is available in <a href="https://github.com/ryotani/Xml2Publist">https://github.com/ryotani/Xml2Publist</a>.</br>Copyright &#169 2020' + (thisyear==2020?"":("-"+thisyear)) + ' by <a href="https://ryo-t.com/">Ryo Taniuchi</a>. Released under the <a href="https://github.com/ryotani/Xml2Publist/blob/main/LICENSE">MIT license</a>.');
});

