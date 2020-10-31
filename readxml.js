$(function(){
    $.ajax({
	url:XMLFile,
	type:'GET',
	dataType:'xml',
	timeout:1000,
	error:function() {
	    alert("Failed to load XML file");
	},
	success:function(xml){
	    var tag1='<ul>'; var tag2='</ul>';
	    // SetCSSForUL(); // Under development
	    $("#publist").append(tag1);
	    for (year = thisyear; year >= StartYear; year--){
		$("#publist").append('<li><strong><a href="#' + year + '"> Publication in ' + year + '</a></strong></li>');
	    }
	    $("#publist").append('<li><strong><a href="#otherpub"> Other publications </a></strong></li>');
	    $("#publist").append(tag2 + '</br><hr width="100%">');
	    for (year = thisyear; year >= StartYear; year--){
		PubListOfYear(xml, year, 'Journal Article');
	    }
	    var counterother = 0;
	    for (year = thisyear; year >= StartYear; year--){
		PubListOfYear(xml, year, '');
	    }
	    PubListOfYear(xml, 0, '');
	    //
	    MathJax.typesetPromise(); //REF: http://docs.mathjax.org/en/latest/advanced/typeset.html 'MathJax in Dynamic Content'
	}
    });
});

function PubListOfYear(xml, year, type) {
    var counter = 0;
    $(xml).find("record").each(function() {
	if ((year == $(this).find('year').text() && ( $(this).find('ref-type').attr("name") == type ||(type == '' && $(this).find('ref-type').attr("name") != 'Journal Article' )))){
	    if(counter++ == 0){
		$("#publist").append('<div><h3><a id="' + year + '">Publications in ' + year + '</a></h3>');
	    }
	}else if (year == 0 && !($(this).find('year').text() <= thisyear && $(this).find('year').text() >= StartYear)){
	    if(counterother++ == 0){
		$("#publist").append('<div><h3><a id="otherpub">Other publications</a></h3>');
	    }
	}else{
	    return true;
	}
	//
	authors = '';
	var numauthors = $(this).find('author').length;
	var i = 0;
	$(this).find('author').each(function() {

	    var name = $(this).text();
	    if(!name.indexOf(NameOfMe)){
		name = '<strong>' + $(this).text() + '</strong>';
	    }
	    if(numauthors==1){
		authors += name;
	    }else if(++i == numauthors){
		authors += ' and '
		authors += name;
	    }else{
		authors += name;
		authors += ', ';
	    }
	});
	/////
	var url = '';
	if($(this).find('web-urls').text()){
	    if(url=='')
		url ='<a href="' + $(this).find('web-urls').text() +  '" target="_blank">' + $(this).find('web-urls').text() + '</a>';
	}else if ($(this).find('electronic-resource-num').text()){
	    if(url=='')
		url ='<a href="https://doi.org/' + $(this).find('electronic-resource-num').text() +  '" target="_blank">https://doi.org/' + $(this).find('electronic-resource-num').text() + '</a>';
	}
	/////
	var title = '<strong>' + $(this).find('title').text() + '</strong>';
	////
	$("#publist").append('<p>'+  title + '</br>'
			    + authors + '</br>' 
			    + $(this).find('periodical').text() + ' <strong>' + $(this).find('volume').text() + '</strong>, ' + $(this).find('pages').text() + ' (' + $(this).find('year').text() + ')</br>' + url + '</p>');
    });
    if(counter>0) $("#publist").append('</br></div>');
}

/*
function SetCSSForUL() {
    tag1 = '<header class="c-header">'
        + '<div class="c-header__inner"><nav class="c-header__nav"><ul>';
    //
    tag2 = '</ul> </nav></div></header>';
}
*/
