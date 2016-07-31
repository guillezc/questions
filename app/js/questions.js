var QuestionsVar = function(){
	return{
		initCheckboxes: function(){
			$('#datatable_proyecteds .group-checkable').change(function() {
				var table = $("#datatable_proyecteds");
                var set = table.find('tbody > tr > td:nth-child(1) input[type="checkbox"]');
                var checked = $(this).prop("checked");
                $(set).each(function() {
                    $(this).prop("checked", checked);
                });
                //countSelectedRecords();
            });

            $('#datatable_proyecteds .checkboxes').change(function(){
            	console.log($(this).prop("checked"));
            });
		},
		init: function(){
			var qVars = this;
			window.setTimeout(function(){
				qVars.initCheckboxes();
			}, 100)
		}
	}
}();