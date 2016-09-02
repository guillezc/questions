var QuestionsVar = function(){
	return{
		init: function(){
			window.setTimeout(function(){

		    function fullscreenChanged() {
		        if (document.webkitFullscreenElement == null) {
		            mf = document.getElementById("main_frame");
		            mf.style.display="none";
		        }
		    }

		    document.onwebkitfullscreenchange = fullscreenChanged;
		    $("#go-to-proyecteds").on("click", function(){
		    	mf = document.getElementById("main_frame");
		        mf.webkitRequestFullscreen();
		        mf.style.display="";
		    }) ;

			}, 1000);

			
		}
	}
}();