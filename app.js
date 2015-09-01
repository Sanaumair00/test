$(document).ready(function(){


	
	//App.getLocation();
	//alert(App.flag+" , "+App.locationLatLong);
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
		getLocation();
		var generateUrl = getUrl("https://api.foursquare.com/v2/venues/");
		$("#main-search-button").click(function(event){
			event.preventDefault();
			getSearchData();
			
			//
		});
		$("#main-explore-button").click(function(event){
			
			event.preventDefault();
			$("#loading").show();
			var query1= $("input#srchXplore").val();
			var nearplace1 =$("input#near").val();
			
			var getXploreUrl =generateUrl("explore",query1,nearplace1);
			var str ="";
			$("ul#list").remove();
			
			
			$.ajax({
				
				url:getXploreUrl,
				
				success: function(result){
					setTimeout(function(){
								$("#loading").hide();
						},1000);
						str+="<div id='desc'><p>"+ result.response["headerFullLocation"];
						if(result.response["geocode"]!= undefined){
							str+="<span>( "+result.response["geocode"]["displayString"]+" ) - </span>";
						}
							str+="<span>Total Results "+result.response["totalResults"]+"</span></p>";
						
					$.each( result.response.groups, function( i, value ) {
						str+="<p id='desc'>"+value["type"]+"</p></div>";
						$.each( value["items"], function( itr, val ) {
							str+="<li>"+ val.venue.name;
							if(val.tips!= undefined){
								str+="<div id='tips'>";
									$.each( val.tips, function( itrr, tipss ) {
										
											str+=tipss.text +"<span class='bold'> Name "+tipss.user.firstName;
											if(tipss["likes"]!=undefined){
												
											str+=" ("+tipss["likes"].summary+") </span>";
											}
									
									});
								str+="</div>";
							}
							str+="<p>";
							$.each( val.venue.location["formattedAddress"], function( itr2, val2 ) {
								str+= val2+" ";
							});
							str+="</p></li>";
						});
					 
					});
					$("nav#results").html("<ul id='list'>"+str+"</ul>");
				},
				error: function(e){
					alert("error");
				}
			});
		});

	
	}
	
	function getLocation() {
		
		if (navigator.geolocation) {		
			navigator.geolocation.getCurrentPosition(setPosition, showError);		
		} else { 
			$("#demo").html("Geolocation is not supported by this browser, explore near place.");
			
		}
		
		setTimeout(function(){
			$("#loading").hide();
			$("#demo").show();					
		},1000);
		//$("#demo").show("slow");
	}

	function setPosition(position) {
		
		App.locationLatLong = position.coords.latitude +","+ position.coords.longitude;
		getSearchData();
			//App.initApp();	
	}

	function showError(error) {
		
		switch(error.code) {
			case error.PERMISSION_DENIED:
				$("#demo").html( "User denied the request for Geolocation, explore near places.");
					
				break;
			case error.POSITION_UNAVAILABLE:
				$("#demo").html("Location information is unavailable, explore near place.");
				break;
			case error.TIMEOUT:
				$("#demo").html( "The request to get user location timed out, explore near place.");
				break;
			case error.UNKNOWN_ERROR:
				$("#demo").html("An unknown error occurred, explore near place.");
				break;
				
				
		}
		setTimeout(function(){
			$("#loading").hide();
			$("#demo").show();					
		},1000);
		
	}
	function getSearchData(generateUrl){
		var query1= $("input#srchXplore").val();
				var nearplace1 =$("input#near").val();
				
				var generateUrl = getUrl("https://api.foursquare.com/v2/venues/");

				var getSearchUrl =generateUrl("search",query1,nearplace1);
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
		
		
	}

		//alert(urlSubstr1);
	
	
	
}());

