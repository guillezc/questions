var ProyectedsVar = function(){
	return{
		updateBody: function(){
			$("body").addClass("page-proyecteds");
			$('.carousel').carousel();
			$(".page-content").css("height", $(".page-content").height());
		},
		clean: function(){
			$("body").removeClass("page-proyecteds");
		},
		init: function(){
			this.updateBody();
		}
	}
}();