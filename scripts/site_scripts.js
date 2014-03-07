$(document) .ready (function()
	{


function load_results ()
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
	
	}

	function close()
		{
		$('.main, .site_header') .removeClass ('blur');
		$('#overlay, #results') .fadeOut (100);
		var html = jQuery('html');
		html.css('overflow', 'scroll');	
		}

	function close_too()
		{
		$('.main, .site_header') .removeClass ('blur');
		$('#overlay, #details, #details li, #details_container') .fadeOut (100);
		var html = jQuery('html');
		html.css('overflow', 'scroll');		
		}

	function details_button()
		{
		$('#results') .hide ();
		$('#details_container') .fadeIn (200);

  		flot (numbers_array);
  		}
	
	$('#cta') .click (function()
		{
		load_results ()
		});
	
	$('#close') .click (function()
		{
		close()
		});

	$('#close_too') .click (function()
		{
		close_too()
		});

	$('#details_button') .click (function()
		{
		details_button()
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
		
		if (intervals > 0 & counter < 6)		
		{	
			numbers_array.push([dates, intervals]);				
		}	
	  	counter ++;
	 }

	showInfo (data, tabletop);

  	}


  function showInfo(data, tabletop) {

	var intervals = data[1].avgintervals;	
	var days_since = data[0].dayssinceworn;	
	var factor = (days_since / intervals) * 100;
	  	var factor = Math.round(factor).toFixed(0);	
	var overdue = days_since - intervals;
	

  	var days_until = data[0].daysuntil;
  		
	  	if (factor <= 25)
  		{
  			match(' low', '#chance', days_since);
  			match(' ' + days_since + ' days ago', '#last_worn');
   			match('in ' + days_until  + ' days', '#predicted'); 			
  		}
	
		if (factor > 25 & factor <= 50)
  		{
  			match(' guarded', '#chance');
  			match(' ' + days_since  + ' days ago', '#last_worn');
  			match('in ' + days_until  + ' days', '#predicted');
  		}
  		
		
		if (factor > 50 & factor <= 75)
  		{
  			match(' elevated', '#chance');
  			match(' ' + days_since  + ' days ago', '#last_worn');
    		match('in ' + days_until  + ' days', '#predicted');		
  		}
	
		if (factor > 75 & factor <= 100)
  		{
  			match(' high', '#chance');
  			match(' ' + days_since  + ' days ago', '#last_worn');
   			match('in ' + days_until  + ' days', '#predicted'); 			
  		}
	
		if (factor > 100)
  		{
  			match(' severe', '#chance');
  			match(' ' + days_since  + ' days ago', '#last_worn');
  			match(' by' + overdue + ' days', '#overdue');	
  		}
	
  function match(status, target)
  {  
	$(target) .append (status);
	$(target) .show ();
  }
  
  
	function add_details(target, status)
  {  
  $(target) .append (status);
  }

  }
  
	
});




 