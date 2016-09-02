var DATAVOTES = [];

var ResultsVar = function(){
	return{
		init: function(){
			
			google.setOnLoadCallback(drawChart());

			window.setTimeout(function(){
			    function fullscreenChanged() {
			        if (document.webkitFullscreenElement == null) {
			            mf = document.getElementById("proyecteds_frame");
			            mf.style.display="none";
			        }
			    }
			    document.onwebkitfullscreenchange = fullscreenChanged;
			    $("#go-to-rproyecteds").on("click", function(){
			    	mf = document.getElementById("proyecteds_frame");
			        mf.webkitRequestFullscreen();
			        mf.style.display="";
			    }) ;
			}, 1000)
		},

		setVote: function(data){
			DATAVOTES.push(data);
		},

		reset: function(){
			DATAVOTES = [];
		}
	}
}();



function drawChart() {
	window.setTimeout(function(){
		// PIE CHART
	    var data = google.visualization.arrayToDataTable(DATAVOTES);
	    
	    var options = {
	        title: 'Votaciones',
	        sliceVisibilityThreshold: 0,
	        legend: {
	        	alignment: 'center'
	        }
	    };
	    var chart = new google.visualization.PieChart(document.getElementById('gchart_pie_1'));
	    chart.draw(data, options);
	}, 250);
}