var SessionJS = function(){
	return{
		init: function(){
			window.setTimeout(function(){
				$("#datatable_sessions").DataTable({
					pagingType: 'simple_numbers',
				    language: {
				    	lengthMenu: "Mostrar _MENU_ sesiones",
				    	info: "Mostrando página _PAGE_ de _PAGES_",
				    	infoFiltered: " - filtrado de _MAX_ sesiones",
				    	search: "Filtrar sesiones:",
				    	loadingRecords: "Porfavor espere - cargando...",
				    	infoEmpty: "No hay sesiones para mostrar",
				        paginate: {
				            first:    '«',
				            previous: '‹',
				            next:     '›',
				            last:     '»'
				        },
				        aria: {
				            paginate: {
				                first:    'Primero',
				                previous: 'Anterior',
				                next:     'Siguiente',
				                last:     'Último'
				            }
				        }
				    }
				});
			}, 100)
		}
	}
}();