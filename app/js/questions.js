var QuestionsVar = function(){
	return{
		init: function(){
			window.setTimeout(function(){
				function goFullscreen() {
			        mf = document.getElementById("main_frame");
			        mf.webkitRequestFullscreen();
			        mf.style.display="";
			    }

		    function fullscreenChanged() {
		        if (document.webkitFullscreenElement == null) {
		            mf = document.getElementById("main_frame");
		            mf.style.display="none";
		        }
		    }

		    document.onwebkitfullscreenchange = fullscreenChanged;
		    document.getElementById("go-to-proyecteds").onclick = goFullscreen;
		    //document.onkeydown = goFullscreen;
			}, 1000)
		}
	}
}();