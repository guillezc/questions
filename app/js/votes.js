var VoteJS = function(){
	return{
		init: function(){
			window.setTimeout(function(){
				if ( $.fn.dataTable.isDataTable( '#datatable_votes' ) ) {
				    table = $('#datatable_participants').DataTable();
				}
				else {
				    table = $('#datatable_votes').DataTable( {
				        pagingType: 'simple_numbers',
					    language: {
					    	lengthMenu: "Mostrar _MENU_ sesiones",
					    	info: "Mostrando página _PAGE_ de _PAGES_",
					    	infoFiltered: " - filtrado de _MAX_ sesiones",
					    	search: "Filtrar sesiones:",
					    	loadingRecords: "Porfavor espere - cargando...",
					    	infoEmpty: " ",
					    	emptyTable: "No se han encontrado encuestas",
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
				    } );
				}
			}, 100)
		}
	}
}();