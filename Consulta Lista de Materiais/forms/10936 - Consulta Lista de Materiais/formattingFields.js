// FAZ A FORMATAÇÃO DOS CAMPOS DA VALIDAÇÃO 
function formataCampos(){
	
	$(".formatacaoCRM").each(function(i){
		var x = $(this)
		var id = $(this).attr("id")
		
		CRM.validaCampoIni(x)
	});
	
}

// FORMATA A VALIDAÇÃO VISUAL NO RELOAD
function formataReload() {
	
	$(document).on('blur change', '.formatacaoCRM', function() {
	
		CRM.validaCampo(this)
		
	})
	
} 

// VARIÁVEL PARA VALIDAÇÃO VISUAL
var CRM = {
		
		//==========================================================================
		//VALIDA OS CAMPOS INPUT TEXT E NUMBER NO RELOAD DA PÁGINA
		validaCampoIni: function (e) {
			CRM.validaCampoGeral(e)
		},
		
		//==========================================================================
		//VALIDA OS CAMPOS INPUT TEXT E NUMBER NO PREENCHIMENTO DO FORMULÁRIO
		validaCampo: function (e) {
			CRM.validaCampoGeral(e)
		},
		
		validaCampoGeral: function (e) {
			var valor = $(e).val()
			
			var label = null
			var acerto = null
			var erro = null
	
			var target = $(e).closest('div')
			$(target).children().each(function() {
				if ($(this).context.className.indexOf("label-CRM") >= 0)
					label = $(this)
				else if ($(this).context.className.indexOf("acerto-CRM") >= 0)
					acerto = $(this)
				else if ($(this).context.className.indexOf("erro-CRM") >= 0)
					erro = $(this)	
			})
			
			var target2 = $(e).parent().parent().closest('div');
			$(target2).children().each(function() {
				if ($(this).context.className.indexOf("label-CRM") >= 0)
					label = $(this)
				else if ($(this).context.className.indexOf("acerto-CRM") >= 0)
					acerto = $(this)
				else if ($(this).context.className.indexOf("erro-CRM") >= 0)
					erro = $(this)	
			})	
			
			var editavel = true
			if ($(e).is('[readonly]'))
				editavel = false
			
			if (valor == "" || valor == null) {
				if(editavel == false) {
					//$(e).css("background-color", "#eee")
					//$(e).css("border-color", "rgb(204, 204, 204)")
					
					if (label != null)
						label.css("color", "#6666666")
				}
				else {
					//$(e).css("background-color", "#f2dede")
					//$(e).css("border-color", "red")
					
					if (label != null)
						label.css("color", "red")
				}
				
				if (acerto != null)
					acerto.hide()
				if (erro != null)
					erro.show()
			}
			else {
				if(editavel == false) {
					//$(e).css("background-color", "#eee")
					//$(e).css("border-color", "green")
					
					if (label != null)
						label.css("color", "green")
				}
				else {
					//$(e).css("background-color", "#dff0d8")
					//$(e).css("border-color", "green")
					
					if (label != null)
						label.css("color", "green")
				}
				
				if (acerto != null)
					acerto.show()
				if (erro != null)
					erro.hide()
			}
		}
	}