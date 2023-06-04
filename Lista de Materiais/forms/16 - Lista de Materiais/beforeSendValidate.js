// ANTES DE ENVIAR A ATIVIDADE, VALIDE
var beforeSendValidate = function(numState,nextState){
	
	console.log("Entrei no before")
	
	// VARIÁVEL PARA ATIVIDADE
    var atv = numState
    
    // VARIÁVEL PARA USUÁRIO ATUAL
    var usuario = $("#USUARIOATUAL").val()
    
    console.log("atv: "+atv)
    console.log("usuario: "+usuario)
    
	// SE ATIVIDADE INICIAL
	if(atv==0 || atv==4) {
		
		console.log("entrei na atv 0 ou 4")
		
		// SE TABELA SALVOS NÃO TEM ITENS
		if(!(tabelaSalvosTemItens())){
			
			console.log("tabela não tem itens salvos")
			
			// EXIBE MODAL
			Swal.fire({
				  icon: 'error',
				  title: 'Nenhum item foi salvo!',
				  text: 'É necessário incluir ao menos um registro na tabela salvos para que a solicitação possa ser enviada.'
			})
			
			return false
			
		} else {
			// SE TABELA SALVOS POSSUI ITENS
			
			// VARIÁVEL PARA CONTROLE DO EXCLUSIVO
			var exclusivo1 = $("#EXCLUSIVO1").val()
			
			console.log("EXCLUSIVO1: "+exclusivo1)
			
			// SE EXCLUSIVO AINDA NÃO FOI SETADO
			if(exclusivo1==null || exclusivo1==undefined || exclusivo1==""){
				
				console.log("vou exibir o alerta")
				
				// EXIBE ALERTA
				Swal.fire({
					
					  title: 'O que deseja fazer?',
					  icon: 'warning',
					  showCancelButton: true,
					  allowEscapeKey: true,
					  allowOutsideClick: true,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#F08E8E',
					  confirmButtonText: 'Salvar e editar depois',
					  cancelButtonText: 'Cancelar'
					  //footer: '<button type="button" role="button" tabindex="0" class="FINALIZAR" id="FINALIZAR">' + 'Finalizar' + '</button>'

					}).then(function(result){
					
					  // SE PRÓXIMA ATIVIDADE FOR A DE EDITAR
					  if (result.value) {
					      
					      // SETA CAMPO PARA CONTROLE DO EXCLUSIVO1 DO WORKFLOW EM "SIM" 
					      $("#EXCLUSIVO1").val("EDITAR");

					      var numOS = $("#NUM_OS").val()
							
						  // SE TABELA DE MATERIAIS TEM ITENS
						  if(tabelaTemItens()){
							
							// SETA VALOR EXCLUSIVO EM "NÃO"
							$("#EXCLUSIVO").val("NAO")
							
						  } else {
							
							// SETA VALOR EXCLUSIVO EM "SIM"
							$("#EXCLUSIVO").val("SIM")
							
						  }

						// CASO HAJA ITENS COM SUBSTITUTOS MAS SEM PRINCIPAL DEVE RETORNAR FALSE
						if(ItensSemPrincipalComSubstituto()){

							// EXIBE ALERTA
							Swal.fire({
								icon: 'error',
								title: 'Há itens com componentes substitutos porém sem componentes principais'
							})

							return false;

						}
						
					      /*
						  var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST);
			    		  var constraints = new Array(c1);
			    		  var dataset = DatasetFactory.getDataset("dsDeleteSalvos", null,constraints,null);
			    		  
			    		  console.log("apaguei os registros da tabela referente a OS "+numOS);
					      */

						  preparaTabelaSalvos()
					      
					      console.log("entrei na seleção de editar")
					      
					      apagaFiltros()
					      
					      finaliza = true
					      
					      // APAGA OS FILTROS
					      //apagaListaFiltros()
					      //apagaListaFiltrosSalvos()
					      //reconstroiFiltros()
					      //reconstroiFiltrosSalvos()
					     
					      $("#workflowActions > button:first-child", window.parent.document).click();
					      
					      return true
					      
					  } 				  
					  
				})
				
				// SE BOTÃO PARA FINALIZAR FOI SELECIONADO
				/*$(document).on('click', '#FINALIZAR', function(e) {
					
					e.preventDefault();
					
					// SE NÃO, SE FOR A DE APROVAR
					  
				    // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "NÃO" 
				    $("#EXCLUSIVO1").val("FINALIZAR");
				      
				    // SE TABELA DE MATERIAIS TEM ITENS
					if(tabelaTemItens()){
						
						// SETA VALOR EXCLUSIVO EM "NÃO"
						$("#EXCLUSIVO").val("NAO")
						
					} else {
						
						// SETA VALOR EXCLUSIVO EM "SIM"
						$("#EXCLUSIVO").val("SIM")
						
					}
					
					var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST);
		    		var constraints = new Array(c1);
		    		var dataset = DatasetFactory.getDataset("dsDeleteSalvos", null,constraints,null);
		    		console.log("apaguei os registros da tabela referente a OS "+numOS);
				    
		    		apagaFiltros()  
				    
				    console.log("entrei na seleção de aprovar")

				    $("#workflowActions > button:first-child", window.parent.document).click();
				    
				    // APAGA OS FILTROS
				    //apagaListaFiltros()
				    //apagaListaFiltrosSalvos()
				    //reconstroiFiltros()
				    //reconstroiFiltrosSalvos()
				    
				    finaliza = true
						
				    return true
					
				});*/
				 				
				console.log("não cliquei no botão, não vou finalizar")
				return false
				
			}
			else {
				// SE EXCLUSIVO1 JÁ FOI SETADO
				return true
				
			}

		}
		
		console.log("finalizei a atv 0 ou 4")
						
	}
	
	// SE ATIVIDADE FOR EDITAR LISTA
	if(atv==11){
		
		var numOS = $("#NUM_OS").val()
		
		// SE TABELA DE MATERIAIS TEM ITENS
		/*if(tabelaTemItens()){
			
			// SETA VALOR EXCLUSIVO EM "NÃO"
			$("#EXCLUSIVO").val("NAO")
			
		} else {
			
			// SETA VALOR EXCLUSIVO EM "SIM"
			$("#EXCLUSIVO").val("SIM")
			
		}*/
		
		// VARIÁVEL PARA CONTROLE DO EXCLUSIVO
		var exclusivo1 = $("#EXCLUSIVO1").val()
		
		// SE EXCLUSIVO AINDA NÃO FOI SETADO
		if(exclusivo1==null || exclusivo1==undefined || exclusivo1==""){
			
			// EXIBE ALERTA
			Swal.fire({
				
				  title: 'O que deseja fazer?',
				  icon: 'warning',
				  showCancelButton: true,
				  //showDenyButton: true,
				  allowEscapeKey: true,
				  allowOutsideClick: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#F08E8E',
				  confirmButtonText: 'Salvar e editar depois',
				  cancelButtonText: 'Cancelar',
				  //denyButtonText: 'Cancelar Solicitação',

				}).then(function(result){
				
				  // SE PRÓXIMA ATIVIDADE FOR A DE EDITAR
				  if (result.isConfirmed) {

					  // CASO HAJA ITENS COM SUBSTITUTOS MAS SEM PRINCIPAL DEVE RETORNAR FALSE
					  if(ItensSemPrincipalComSubstituto()){

						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: 'Há itens com componentes substitutos porém sem componentes principais'
						})

						return false;

					  }


						// SETA CAMPO PARA CONTROLE DO EXCLUSIVO1 DO WORKFLOW EM "SIM" 
						$("#EXCLUSIVO1").val("EDITAR");

						var numOS = $("#NUM_OS").val()
							
						// SE TABELA DE MATERIAIS TEM ITENS
						if(tabelaTemItens()){
							
							// SETA VALOR EXCLUSIVO EM "NÃO"
							$("#EXCLUSIVO").val("NAO")
							
						} else {
							
							// SETA VALOR EXCLUSIVO EM "SIM"
							$("#EXCLUSIVO").val("SIM")
							
						}
					
				      /*
					  var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST);
		    		  var constraints = new Array(c1);
		    		  var dataset = DatasetFactory.getDataset("dsDeleteSalvos", null,constraints,null);
		    		  
		    		  console.log("apaguei os registros da tabela referente a OS "+numOS);
		    		  */

					  preparaTabelaSalvos()

		    		  apagaFiltros()
		    		  
		    		  // SALVA OS ITENS SALVOS NA TABELA DOS COMPONENTES
				      //salvaItensLista()
		    		  
				      console.log("entrei na seleção de editar")
				      
				      finaliza = true
				      
				      $("#workflowActions > button:first-child", window.parent.document).click();
				      
				      // APAGA OS FILTROS
				      //apagaListaFiltros()
				      //apagaListaFiltrosSalvos()
				      //reconstroiFiltros()
				      //reconstroiFiltrosSalvos()
				      
				      
				      return true
				      
				  } 
				  /*else if(result.isDenied){

					console.log("entrei na seleção de cancelar solicitação")

						// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "FINALIZAR" 
						$("#EXCLUSIVO1").val("CANCELADA");

						preparaTabelaSalvos()
		
						
						// SE TABELA DE MATERIAIS TEM ITENS
						if(tabelaTemItens()){
							
							// SETA VALOR EXCLUSIVO EM "NÃO"
							$("#EXCLUSIVO").val("NAO")
							
						} else {
							
							// SETA VALOR EXCLUSIVO EM "SIM"
							$("#EXCLUSIVO").val("SIM")
							
						}
						
						//var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST);
						//var constraints = new Array(c1);
						//var dataset = DatasetFactory.getDataset("dsDeleteSalvos", null,constraints,null);
						//console.log("apaguei os registros da tabela referente a OS "+numOS);
						
						apagaFiltros()
		
						$("#workflowActions [data-cancel]", window.parent.document)[0].click()
		
						setTimeout(function() {
		
							$("[data-cancel-text]", window.parent.document).val("Solicitação cancelada")
		
							$("[data-cancel-request]", window.parent.document).click()
		
						},300)
						
						// APAGA OS FILTROS
						//apagaListaFiltros()
						//apagaListaFiltrosSalvos()
						//reconstroiFiltros()
						//reconstroiFiltrosSalvos()
							
						
						finaliza = true
							
						return true

				  }*/

				  
			})
			
			// // SE BOTÃO PARA FINALIZAR FOI SELECIONADO
			// $(document).on('click', '#FINALIZAR', function(e) {
				
			// 	e.preventDefault();
				
			// 	// SE NÃO, SE FOR A DE APROVAR
				  
			//     // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "FINALIZAR" 
			//     $("#EXCLUSIVO1").val("CANCELADA");

			// 	preparaTabelaSalvos()

			      
			//     // SE TABELA DE MATERIAIS TEM ITENS
			// 	if(tabelaTemItens()){
					
			// 		// SETA VALOR EXCLUSIVO EM "NÃO"
			// 		$("#EXCLUSIVO").val("NAO")
					
			// 	} else {
					
			// 		// SETA VALOR EXCLUSIVO EM "SIM"
			// 		$("#EXCLUSIVO").val("SIM")
					
			// 	}
				
			// 	//var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST);
	    	// 	//var constraints = new Array(c1);
	    	// 	//var dataset = DatasetFactory.getDataset("dsDeleteSalvos", null,constraints,null);
	    	// 	//console.log("apaguei os registros da tabela referente a OS "+numOS);
			     
			//     console.log("entrei na seleção de aprovar")
			//     apagaFiltros()

			//     $("#workflowActions [data-cancel]", window.parent.document).click()

			// 	setTimeout(function() {

			// 		$("[data-cancel-text]").val("Solicitação cancelada")

			// 		$("[data-cancel-request]").click()

			// 	},100)
			    
			//     // APAGA OS FILTROS
			//     //apagaListaFiltros()
			//     //apagaListaFiltrosSalvos()
			//     //reconstroiFiltros()
			//     //reconstroiFiltrosSalvos()
					
			    
			//     finaliza = true
					
			//     return true
				
			// });
			 				
			console.log("não cliquei no botão, não vou finalizar")
			return false
			
		}
		else {
			// SE EXCLUSIVO1 JÁ FOI SETADO
			return true
			
		}

	}
		
    console.log("final do before")

}


function preparaTabelaSalvos(){


	// PERCORRE A TABELA DE ITENS SALVOS
	$("input[id^='NUMDESENHOSALVOS___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idCriacao = $("#IDCRIACAOSALVOS___"+seq).val()
		idCriacao = idCriacao.split(";")

		console.log("origem1: " + $("#ORIGEMMP1SALVOS___"+seq).val())

		$("#ORIGEMMP1SALVOS___"+seq).val($("#ORIGEMMP1SALVOS___"+seq).val())

		
		console.log("origem1: " + $("#ORIGEMMP2SALVOS___"+seq).val())

		$("#ORIGEMMP2SALVOS___"+seq).val($("#ORIGEMMP2SALVOS___"+seq).val())

		console.log("idcriacao do item = " + idCriacao)

		if(idCriacao.length > 1){

			var numDesenho = $("#NUMDESENHOSALVOS___"+seq).val()
			var posicao = $("#POSICAOSALVOS___"+seq).val()
			var totalQtde = $("#QUANTIDADESALVOS___"+seq).val()
			var descricao = $("#DESCRICAOSALVOS___"+seq).val()
			var material = $("#MATERIALSALVOS___"+seq).val()
			var bitola = $("#BITOLASALVOS___"+seq).val()
			var largura = $("#LARGURASALVOS___"+seq).val()
			var comprimento = $("#COMPRIMENTOSALVOS___"+seq).val()
			var espRosca = $("#ESPROSCASALVOS___"+seq).val()
			var pesoBruto = $("#PESOBRUTOSALVOS___"+seq).val()
			var pesoBrutoUnitario = $("#PESOUNITARIO___"+seq).val()
			var produtoRM1 = $("#PRODUTORM1SALVOS___"+seq).val()
			var produtoRM2 = $("#PRODUTORM2SALVOS___"+seq).val()
			var produtoRM3 = $("#PRODUTORM3SALVOS___"+seq).val()
			var produtoRM4 = $("#PRODUTORM4SALVOS___"+seq).val()
			var produtoRM5 = $("#PRODUTORM5SALVOS___"+seq).val()
			var produtoRM6 = $("#PRODUTORM6SALVOS___"+seq).val()
			var idPrd1 = $("#IDPRD1SALVOS___"+seq).val()
			var idPrd2 = $("#IDPRD2SALVOS___"+seq).val()
			var idPrd3 = $("#IDPRD3SALVOS___"+seq).val()
			var idPrd4 = $("#IDPRD4SALVOS___"+seq).val()
			var idPrd5 = $("#IDPRD5SALVOS___"+seq).val()
			var idPrd6 = $("#IDPRD6SALVOS___"+seq).val()
			var codigoprd1 = $("#CODIGOPRD1SALVOS___"+seq).val()
			var codigoprd2 = $("#CODIGOPRD2SALVOS___"+seq).val()
			var codigoprd3 = $("#CODIGOPRD3SALVOS___"+seq).val()
			var codigoprd4 = $("#CODIGOPRD4SALVOS___"+seq).val()
			var codigoprd5 = $("#CODIGOPRD5SALVOS___"+seq).val()
			var codigoprd6 = $("#CODIGOPRD6SALVOS___"+seq).val()
			var numOS = $("#NUMOSSALVOS___"+seq).val()
			var origemMP1 = $("#ORIGEMMP1SALVOS___"+seq).val()
			var origemMP2 = $("#ORIGEMMP2SALVOS___"+seq).val()
			var undprd1 = $("#UNDPRD1SALVOS___"+seq).val()
			var undprd2 = $("#UNDPRD2SALVOS___"+seq).val()
			var undprd3 = $("#UNDPRD3SALVOS___"+seq).val()
			var undprd4 = $("#UNDPRD4SALVOS___"+seq).val()
			var undprd5 = $("#UNDPRD5SALVOS___"+seq).val()
			var undprd6 = $("#UNDPRD6SALVOS___"+seq).val()
			var obsGerais = $("#OBSGERAL___"+seq).val() 
			var diamExt = $("#DIAMETROEXTERNODISCO___"+seq).val()
			var diamInt = $("#DIAMETROINTERNODISCO___"+seq).val()
			var pedidoCompra = $("#PEDIDOCOMPRASALVOS___"+seq).val()
			var lote = $("#LOTESALVOS___"+seq).val()
			var qtdorigemMP1 = $("#QTDORIGEM1SALVOS___"+seq).val()
			var qtdorigemMP2 = $("#QTDORIGEM2SALVOS___"+seq).val()
			var revisaosalvos = $("#REVISAOSALVOS___"+seq).val()
		
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0; i<idCriacao.length; i++){
				
				// CRIA LINHA NA TABELA
				var seq2 = childAdd3()
				
				console.log("seq: "+seq2)
				
				// SALVA OS DADOS NA TABELA
				
				// SE NUMDESENHO NÃO É VAZIO OU NULO
				if(!(numDesenho=="" || numDesenho==null || numDesenho==undefined || numDesenho=="null")){
					
					$("#NUMDESENHOSALVOS___"+seq2).val(numDesenho)

				}
				
				// SE TOTALQTDE NÃO É VAZIO OU NULO
				if(!(totalQtde=="" || totalQtde==null || totalQtde==undefined || totalQtde=="null")){
				
					$("#QUANTIDADESALVOS___"+seq2).val(totalQtde)
					
				}
				
				// SE POSICAO NÃO É VAZIO OU NULO
				if(!(posicao=="" || posicao==null || posicao==undefined || posicao=="null")){
				
					$("#POSICAOSALVOS___"+seq2).val(posicao)
				
				}
				
				// SE DESCRIACAO NÃO É VAZIO OU NULO
				if(!(descricao=="" || descricao==null || descricao==undefined || descricao=="null")){
				
					$("#DESCRICAOSALVOS___"+seq2).val(descricao)
					
				}
				
				// SE MATERIAL NÃO É VAZIO OU NULO
				if(!(material=="" || material==null || material==undefined || material=="null")){
				
					$("#MATERIALSALVOS___"+seq2).val(material)
					
				}
				
				// SE BITOLA NÃO É VAZIO OU NULO
				if(!(bitola=="" || bitola==null || bitola==undefined || bitola=="null")){
				
					$("#BITOLASALVOS___"+seq2).val(bitola)
				
				}
				
				// SE LARGURA NÃO É VAZIO OU NULO
				if(!(largura=="" || largura==null || largura==undefined || largura=="null")){
				
					$("#LARGURASALVOS___"+seq2).val(largura)
					
				}
				
				// SE COMPRIMENTO NÃO É VAZIO OU NULO
				if(!(comprimento=="" || comprimento==null || comprimento==undefined || comprimento=="null")){
				
					$("#COMPRIMENTOSALVOS___"+seq2).val(comprimento)
					
				}
				
				// SE ESPROSCA NÃO É VAZIO OU NULO
				if(!(espRosca=="" || espRosca==null || espRosca==undefined || espRosca=="null")){
				
					$("#ESPROSCASALVOS___"+seq2).val(espRosca)
				
				}
				
				// SE PESOBRUTO NÃO É VAZIO OU NULO
				if(!(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="null")){
				
					$("#PESOBRUTOSALVOS___"+seq2).val((Math.round((parseFloat(pesoBruto.replace(",","."))/Number(idCriacao.length))*10000)/10000).toString().replace(".",","))
					
				}
				
				// SE IDCRIACAO NÃO É VAZIO OU NULO
				if(!(idCriacao=="" || idCriacao==null || idCriacao==undefined || idCriacao=="null")){
				
					$("#IDCRIACAOSALVOS___"+seq2).val(idCriacao[i])
					
				}
				
				// SE NUMOS NÃO É VAZIO OU NULO
				if(!(numOS=="" || numOS==null || numOS==undefined || numOS=="null")){
				
					$("#NUMOSSALVOS___"+seq2).val(numOS)

				}
				
				// SE ORIGEMMP NÃO É VAZIO OU NULO
				if(!(origemMP1=="" || origemMP1==null || origemMP1==undefined || origemMP1=="null")){
				
					$("#ORIGEMMP1SALVOS___"+seq2).val(origemMP1)
					
				}

				// SE ORIGEMMP NÃO É VAZIO OU NULO
				if(!(origemMP2=="" || origemMP2==null || origemMP2==undefined || origemMP2=="null")){

					$("#ORIGEMMP2SALVOS___"+seq2).val(origemMP2)

				}

				// SE QTDORIGEMMP1 NÃO É VAZIO OU NULO
				if(!(qtdorigemMP1=="" || qtdorigemMP1==null || qtdorigemMP1==undefined || qtdorigemMP1=="null")){

					$("#QTDORIGEM1SALVOS___"+seq2).val((Math.round((parseFloat(qtdorigemMP1.replace(",","."))/Number(idCriacao.length))*10000)/10000).toString().replace(".",","))
					//$("#PESOORIGEM1SALVOS___"+seq2).val(Number(qtdorigemMP1) * Number(pesoBrutoUnitario)) 
					
				}

				// SE QTDORIGEMMP2 NÃO É VAZIO OU NULO
				if(!(qtdorigemMP2=="" || qtdorigemMP2==null || qtdorigemMP2==undefined || qtdorigemMP2=="null")){

					$("#QTDORIGEM2SALVOS___"+seq2).val((Math.round((parseFloat(qtdorigemMP2.replace(",","."))/Number(idCriacao.length))*10000)/10000).toString().replace(".",","))
					//$("#PESOORIGEM2SALVOS___"+seq2).val(Number(qtdorigemMP2) * Number(pesoBrutoUnitario))
					
				}

				if(!(pesoBrutoUnitario=="" || pesoBrutoUnitario==null || pesoBrutoUnitario==undefined || pesoBrutoUnitario=="null")){

					$("#PESOBRUTOUNITARIOSALVOS___"+seq2).val((Math.round((parseFloat(pesoBrutoUnitario.replace(",","."))/Number(idCriacao.length))*10000)/10000).toString().replace(".",","))

				}
				
				// SE DIAMEXT NÃO É VAZIO OU NULO
				if(!(diamExt=="" || diamExt==null || diamExt==undefined || diamExt=="null")){
				
					$("#DIAMEXTSALVOS___"+seq2).val(diamExt)
					
				}
				
				// SE DIAMINT NÃO É VAZIO OU NULO
				if(!(diamInt=="" || diamInt==null || diamInt==undefined || diamInt=="null")){
				
					$("#DIAMINTSALVOS___"+seq2).val(diamInt)
					
				}
				
				// SE OBSGERAIS NÃO É VAZIO OU NULO
				if(!(obsGerais=="" || obsGerais==null || obsGerais==undefined || obsGerais=="null")){
				
					$("#OBSGERAISSALVOS___"+seq2).val(obsGerais)
					
				}
				
				// SE PEDIDO COMPRA NÃO É VAZIO OU NULO
				if(!(pedidoCompra=="" || pedidoCompra==null || pedidoCompra==undefined || pedidoCompra=="null")){
				
					$("#PEDIDOCOMPRASALVOS___"+seq2).val(pedidoCompra)
					
				}
				
				// SE PEDIDO COMPRA NÃO É VAZIO OU NULO
				if(!(lote=="" || lote==null || lote==undefined || lote=="null")){
				
					$("#LOTESALVOS___"+seq2).val(lote)
					
				}
				
				// SE PRODUTORM1 FOI PREENCHIDO
				if(!(produtoRM1=="" || produtoRM1==null || produtoRM1==undefined || produtoRM1=="null")){
					
					$("#PRODUTORM1SALVOS___"+seq2).val(produtoRM1)
					$("#IDPRD1SALVOS___"+seq2).val(idPrd1)
					$("#CODIGOPRD1SALVOS___"+seq2).val(codigoprd1)
					$("#UNDPRD1SALVOS___"+seq2).val(undprd1)
					
				}
				
				// SE PRODUTORM2 FOI PREENCHIDO
				if(!(produtoRM2=="" || produtoRM2==null || produtoRM2==undefined || produtoRM2=="null")){
					
					$("#PRODUTORM2SALVOS___"+seq2).val(produtoRM2)
					$("#IDPRD2SALVOS___"+seq2).val(idPrd2)
					$("#CODIGOPRD2SALVOS___"+seq2).val(codigoprd2)
					$("#UNDPRD2SALVOS___"+seq2).val(undprd2)
					
				}
				
				// SE PRODUTORM3 FOI PREENCHIDO
				if(!(produtoRM3=="" || produtoRM3==null || produtoRM3==undefined || produtoRM3=="null")){
					
					$("#PRODUTORM3SALVOS___"+seq2).val(produtoRM3)
					$("#IDPRD3SALVOS___"+seq2).val(idPrd3)
					$("#CODIGOPRD3SALVOS___"+seq2).val(codigoprd3)
					$("#UNDPRD3SALVOS___"+seq2).val(undprd3)
				
				}
				
				// SE PRODUTORM4 FOI PREENCHIDO
				if(!(produtoRM4=="" || produtoRM4==null || produtoRM4==undefined || produtoRM4=="null")){
					
					$("#PRODUTORM4SALVOS___"+seq2).val(produtoRM4)
					$("#IDPRD4SALVOS___"+seq2).val(idPrd4)
					$("#CODIGOPRD4SALVOS___"+seq2).val(codigoprd4)
					$("#UNDPRD4SALVOS___"+seq2).val(undprd4)
						
				}
				
				// SE PRODUTORM5 FOI PREENCHIDO
				if(!(produtoRM5=="" || produtoRM5==null || produtoRM5==undefined || produtoRM5=="null")){
					
					$("#PRODUTORM5SALVOS___"+seq2).val(produtoRM5)
					$("#IDPRD5SALVOS___"+seq2).val(idPrd5)
					$("#CODIGOPRD5SALVOS___"+seq2).val(codigoprd5)
					$("#UNDPRD5SALVOS___"+seq2).val(undprd5)
							
				}
				
				// SE PRODUTORM6 FOI PREENCHIDO
				if(!(produtoRM6=="" || produtoRM6==null || produtoRM6==undefined || produtoRM6=="null")){
					
					$("#PRODUTORM6SALVOS___"+seq2).val(produtoRM6)
					$("#IDPRD6SALVOS___"+seq2).val(idPrd6)
					$("#CODIGOPRD6SALVOS___"+seq2).val(codigoprd6)
					$("#UNDPRD6SALVOS___"+seq2).val(undprd6)
				
				}

				// SE REVISAO FOI PREENCHIDO
				if(!(revisaosalvos=="" || revisaosalvos==null || revisaosalvos==undefined || revisaosalvos=="null") || revisaosalvos==0){
	
					$("#REVISAOSALVOS___"+seq2).val(revisaosalvos)
				
				}


			}

			$("#LINHASALVOS___"+seq).remove()
		
		}
		
	})

	atualizaTabelaSalvos()


}