var DATAVOTES_PROY = [];

var ResultsProyectedsVar = function(){
	return{
		updateBody: function(){
			$("body").addClass("page-proyecteds");
			$(".page-content").css("height", $(".page-content").height());
		},

		clean: function(){
			$("body").removeClass("page-proyecteds");
		},

		init: function(){
			this.updateBody();
			google.setOnLoadCallback(drawProyecteds());
		},

		setVote: function(data){
			DATAVOTES_PROY.push(data);
		},

		reset: function(){
			DATAVOTES_PROY = [];
		}
	}
}();

function drawProyecteds() {
	window.setTimeout(function(){
		// PIE CHART
	    var data = google.visualization.arrayToDataTable(DATAVOTES_PROY);
	    
	    var options = {
	        title: '',
	        sliceVisibilityThreshold: 0,
	        legend: {
	        	alignment: 'center'
	        }
	    };
	    var chart = new google.visualization.PieChart(document.getElementById('gchart_proyecteds'));
	    chart.draw(data, options);
	}, 250);
}