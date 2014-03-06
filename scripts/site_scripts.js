$(document) .ready (function()
	{


	
	$('#cta') .click (function()
		{
		$('#overlay, #spinner') .fadeIn (300);		
		$('.main, .site_header') .addClass ('blur');
		
		var html = jQuery('html');
		html.css('overflow', 'hidden');
		
		
			$('#retrieving') .show () .delay (3000) .fadeOut (100, function()
				{
				
					$('#calculating') .show () .delay (3000) .fadeOut (100, function()
					{	
					
							$('#comparing') .show () .delay (3000) .fadeOut (100, function()
							{	
							
									$('#preparing') .show () .delay (3000) .fadeOut (100, function()
									{	
						
										$('#results') .show ();
										$('#spinner') .fadeOut (100);


									});
							
					


							});
					
					
					


					});
				
		

				});
	
	
	});
	


	$('#close') .click (function()
		{
		$('.main, .site_header') .removeClass ('blur');
		$('#overlay, #results') .fadeOut (100);
		var html = jQuery('html');
		html.css('overflow', 'scroll');
		
		
		});


	$('#details') .click (function()
		{
		$('#results') .hide ();
		$('#details_container') .fadeIn (200);

  		flot (numbers_array);

		});



///flot


	function flot (numbers)
		{
	
	
		var red = '#bb5637';
		var gray = '#666';
		var light_gray = '#999';
		var background = '#fff';
		var silver = '#d1d4d5';

		$.plot(
		   $("#chart"),
		   [
			/* {
			  label: "This is thing three",
			  color: light_gray,
			  data: dates,
			  bars: {
				show: true,
				barWidth: 0.5,
				align: "center",
				fillColor:light_gray,
				lineWidth: 0,
				label: "y = 3"
			  }   
			}, */
		
			{
			  label: "Recent intervals",
			  color: red,
			  data: numbers,
			  bars: {
				show: true,
				barWidth: 0.5,
				align: "center",
				fillColor:red,
				lineWidth: 0
			  }
			},	
			
		 ],
	 
		 {
		   
		   xaxis: {
					mode: "categories",
					tickLength: 0,
					color: silver,
					position: 'bottom',
					size: 9,
					lineHeight: 13,
					style: "italic",
					weight: "bold",
					family: "sans-serif",
					variant: "small-caps",

		   },
		   
		  	grid: {
					color:gray,
					backgroundColor: background,
					borderWidth: 0
					},
					
			legend: {
					show:true,
					backgroundColor: background,
					labelBoxBorderColor: silver
					}
   
		 			}
		);



	}


///end flot




  var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Ag48o_TvRMtcdFZ3WXdnY0NlNEFIbnU5ejJya1hBS3c&output=html';


	init(public_spreadsheet_url);

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                  //  callback: showInfo,
                    callback: parseData,
                     simpleSheet: true } )
  }

  
  function parseData (data, tabletop)
  	{

 	var length = data.length;
  	counter = 1;
  	dates_array = [];
	numbers_array = []

  	
  	while (counter < length)
	  {

		intervals = data[counter].intervals;
		dates = data[counter].datesworn;
		
		if (intervals > 0)
		
		{			
			dates_array.push(dates);
			numbers_array.push(intervals);	
		}
  	
	  	counter ++;
	 }
  	
	
  	}
	
  
  
  
  function showInfo(data, tabletop) {
  //  alert("Successfully processed!")
    console.log(data);
    
    console.log('last time worn ' + data[0].lasttimeworn);
    console.log('today\'s date' + data[0].todaysdate);
    console.log('average intervals ' + data[0].avgintervals);
    console.log('days since last worn ' + data[0].dayssinceworn);
    
  //	var days_since = data[0].dayssinceworn;
  	var days_since = 4;
  	intervals = 10;
  //	var intervals = data[0].avgintervals;
  	var factor = intervals/1.2;
  	var factor = Math.round(factor).toFixed(0);
  	
  	
  	
  	  				console.log('too' + factor);
  	  				
  	  				console.log('intervals' + intervals);

  	
  	
  	if (days_since == intervals)
  		{
  			match('high');		
  		}
  		
  		
  		 if (days_since > intervals)
  		{
 			match('critical');		
  		}
  		
  		
  	  	if (days_since >= factor & days_since != intervals & days_since < intervals )
  		{
  			match('likely');
  				console.log('works');
  		}
  		
  		if (days_since < factor)
  		{
  			match('low');
 		
  		}
  		
  	
  
  function match(status)
  {
  
  $('#chance') .append (status);
  
  
  }
  
  
  
  
  
 //   	console.log(data[0].datesworn);
    
  }
