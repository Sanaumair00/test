$(document).ready(function(){

	
	App.initApp();	

});

var App ={
	
	clientData : {
		
		id: "0OAGS4B3SODYQM2K23SN3X0UBBPJWP4PO0ATCWH4LMMADM1N",
		secret:"YMNU2MYPGGBTJZIEXASW01GP5K2YTWIJBXAWYCI2RQVDPALL"
	},
	version : "20150825",
	locationLatLong : "",
	flag: 0
	
};


(function(){
	
	//var urlSubstr1 ="https://api.foursquare.com/v2/venues/";
	//var urlSubstr2= 
	
	var getUrl = function(urlSubstr1){
		
		
		return function(urlSubstr2,query,nearplace){
			var moreParam ="";
			if (nearplace !=""){
				moreParam="&near="+nearplace;
			}else{
				moreParam="&ll="+App.locationLatLong;		
			}
			return urlSubstr1+urlSubstr2+"?client_id="+App.clientData.id+"&client_secret="+App.clientData.secret+"&v="+App.version+"&query="+query+moreParam;
			
		};
	}
	

	//alert(getUrl("https://api.foursquare.com/v2/venues/"));
	App.initApp =function(){	
		
		var generateUrl = getUrl("https://api.foursquare.com/v2/venues/");
		$("#main-search-button").click(function(event){
			event.preventDefault();
			var query1= $("input#srchXplore").val();
				var nearplace1 =$("input#near").val();
				
				var generateUrl = getUrl("https://api.foursquare.com/v2/venues/");

				var getSearchUrl =generateUrl("search",query1,nearplace1);
				console.log(getSearchUrl);
				var str ="";
				//
				
				$("ul#list").remove();
				
				$.ajax({
					url: getSearchUrl,
					
					//url:"errorURl",
					success: function(result){
						setTimeout(function(){
								$("#loading").hide();
						},1000);
						$.each( result.response.venues, function( i, value ) {
							
							if(value.url!= undefined){
								str+="<li><a href='"+value.url+"' target='_blank'>"+ value.name+"</a></li>";
							}else{
								str+="<li>"+ value.name+"</li>";
							}
							
						});

						$("nav#results").html("<ul id='list'>"+str+"</ul>");
					},
					error: function(e){
						alert("error");
					}
				});
		
	
			
			//
		});

	
	}
	
	


		//alert(urlSubstr1);
	
	
	
}());


