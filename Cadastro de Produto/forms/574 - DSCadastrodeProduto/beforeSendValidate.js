//FUNÇÃO PARA VALIDAR SE O CAMPO CONCLUSÃO ESTÁ PREENCHIDO E SE SETOR ESTÁ PREENCHIDO
var beforeSendValidate = function (numState, nextState) {
	var atv = $("#ATIVIDADE").val();
	//var atv = numState;
	var msg = "";
	console.log("entrei na função", atv);
	var sel = $("#VALOR_RADIO3").val();
	var tipo = $("#TIPO").val();
	var ncm = $("#NCM").val();
	var classgeral2 = $("#CLASSIFICACAO_CONTABIL").val();
	var nome = $("#NOME").val();
	var classgeral = $("#CODCONTABIL").val();
	var referencia = $("#VALORREFERENCIA").val();
	var unmedida = $("#VALORUNIDADEMEDIDA").val();
	var sped = $("#VALOR_SPED").val();
	var descricao = $("#DESCRICAO").val();
	var prioridade = $("#VALOR_RADIO6").val()
	var classfiscal = $("#CLASSIFICACAO_FISCAL").val();
	var fiscal = $("#VALORFISCAL").val();
	var aplicacao = $("#APLICACAO").val();
	var valorFiscalConf = $("#VALORCLASSIFICACAO").val();
	var valorClassificacao = $("#CLASSIFICACAO").val();

	if (atv == 0 || atv == 4) {

		$("#CONTACONTABILSPED").prop("disabled", false);

		//MENSAGEM DE ERRO QUANDO NÃO SELECIONDO O TIPO
		if (tipo == "" || tipo == null || tipo == undefined) {
			var setor = $("#SELECIONE").val();
			if (setor == "" || setor == null) {
				Swal.fire({
					icon: 'warning',
					title: 'Selecione um Tipo'

				})
				return false;
			}
		}
		
		//VERIFICA SE O NOME OU A DESCRIÇÃO ESTÃO VAZIOS
		if ((nome == "" || nome == undefined || nome == null) || (descricao == undefined || descricao == "" || descricao == null)) {
			Swal.fire({
				icon: 'warning',
				title: 'Campo nome e descrição são obrigatórios'

			})
			return false;
		};
		
		//VERIFICA SE O CAMPO CLASSIFICAÇÃO FISCAL ESTÁ VAZIO
		if ((classfiscal == "" || classfiscal == undefined || classfiscal == null)) {
			Swal.fire({
				icon: 'warning',
				title: 'Classificação fiscal é campo obrigatório'

			})
			return false;
		}

		if(aplicacao == "" || aplicacao == null || aplicacao == undefined){
			Swal.fire({
				icon: 'warning',
				title: 'Aplicação do Produto é campo obrigatório'

			});
			return false;
		}
		else{
			var count = aplicacao.toString().length;
			if(count < 5){
				Swal.fire({
					icon: 'warning',
					title: 'Aplicação do Produto exige pelo menos 5 caracteres'
				});
				return false;
			}
		}
		
		//$("#RAD1_SIM").prop("disabled", false)
		$("#RAD1_SIM").prop("disabled", false)
		$("#RAD1_NAO").prop("disabled", false)
		$("#CLASSIFICACAO_FISCAL").prop("disabled", false)
		$("#NCM").prop("disabled", false)
		$("#CLASSIFICACAO_CONTABIL").prop("disabled", false)
		$("#UNIDADEMEDIDA").prop("disabled", false)
		$("#CONTACONTABILSPED").prop("disabled", false)
		$("#TIPO").prop("disabled", false)
		$("#CLASSIFICACAO").prop("disabled", false);

	

		//VERIFICA SE O CAMPO CLASSIFICAÇÃO GERAL ESTÁ VAZIO
		if (classgeral == "" || classgeral == undefined || classgeral == null) {
			Swal.fire({
				icon: 'warning',
				title: 'Classificação Geral é campo obrigatório'

			})
			return false;
		};

		//MENSAGEM DE ERRO QUANDO NÃO PREENCHIDO NCM
		if (ncm == "" || ncm == null || ncm == undefined) {
			//var numncm = $("#DIVNCM").val();
			var tipo1 = $("#TIPO").val();
			if (tipo1 == "PRODUTO") {
				Swal.fire({
					icon: 'warning',
					title: 'Campo NCM é Obrigatório'

				})
				return false;
			}
		}



		//VERIFICA SE O CAMPO UNIDAE DE MEDIDA ESTÁ VAZIO
		if ((unmedida == "" || unmedida == undefined || unmedida == null)) {
			Swal.fire({
				icon: 'warning',
				title: 'Unidade de medida é campo obrigatório'

			})
			return false;
		}
		

		
		//MENSAGEM DE ERRO QUANDO PRIORIDADE NÃO É PREENCHIDA
		if (prioridade == "" || prioridade == null || prioridade == undefined) {
			Swal.fire({
				icon: 'warning',
				title: 'Prioridade é obrigatório'

			});
			return false;

		};
	}


	if (atv == 5) {

		$("#RAD1_SIM").prop("disabled", false);
		$("#RAD1_NAO").prop("disabled", false)
		$("#RAD6_MA").prop("disabled", false)
		$("#RAD6_A").prop("disabled", false)
		$("#RAD6_M").prop("disabled", false)
		$("#RAD6_B").prop("disabled", false)
		$(".DIV_MOTIVO").hide();

		//VERIFICA SE O CAMPO REFERENCIA ESTÁ VAZIO
		if (referencia == "" || referencia == undefined || referencia == null) {
			Swal.fire({
				icon: 'warning',
				title: 'Referência é campo obrigatório!'

			})
			return false;
		};
		//VERIFICA SE A CONTA SPED ESTÁ VAZIA
		if (sped == "" || sped == undefined || sped==null) {
			Swal.fire({
				icon: 'warning',
				title: 'Campo sped é obrigatório!'

			})
			return false;
		};


		var erro = false; //VARIÁVEL QUE HABILITA OS CAMPOS DE NOVO

		//MENSAGEM DE ERRO QUANDO NÃO PREENCHIDO O CAMPO MOTIVO
		if (sel == "NAO" || sel == "ALTERAR") {
			var motivo = $("#MOTIVOAPR").val();
			if (motivo == "" || motivo == null || motivo == undefined) {
				Swal.fire({
					icon: 'error',
					title: 'Campo motivo é obrigatório'
				});
				return false;
			}
		}
		
		//VERIFICA SE A CONTA SPED ESTÁ VAZIA
		if (sel == "" || sel == undefined || sel==null) {
			Swal.fire({
				icon: 'warning',
				title: 'Cadastro aprovado é obrigatório'

			})
			return false;
		};

		/*	if(classgeral == "" || classgeral == null){
			
			var geral = $("#DIVGERAL").val();
			
			if(geral == "" || geral == null){
				
				Swal.fire({
					icon: 'warning',
					title: 'Classificação Geral é campo obrigatório'
					
				})
				erro = true;
				return false;
			
			}
			
		}*/

		if(fiscal == "01"){
        	if(classgeral == "018"){
        		if(valorFiscalConf == "" || valorFiscalConf == null || valorFiscalConf == undefined){
        			 Swal.fire({
     	            	icon: 'warning',
     	            	title: 'Classificação é campo obrigatório'                    
     	            });
     	            return false;
        		};
        	};
        };
        
        if(classfiscal.toString().split("- ")[0] == "01"){
        	if(classgeral2.toString().split("- ")[0] == "018"){
        		if(valorClassificacao == "" || valorClassificacao == null || valorClassificacao == undefined){
        			 Swal.fire({
     	            	icon: 'warning',
     	            	title: 'Classificação é campo obrigatório'                    
     	            });
     	            return false;
        		};
        	};
        };
		
		if (erro == false) {
			$("#CLASSIFICACAO_FISCAL").prop("disabled", false)
			$("#CLASSIFICACAO_CONTABIL").prop("disabled", false)
			$("#CONTACONTABILSPED").prop("disabled", false)
			$("#UNIDADEMEDIDA").prop("disabled", false)
			$("#GRUPO").prop("disabled", false)
			$("#SUBGRUPO").prop("disabled", false)
			$("#TIPO").prop("disabled", false)
			$("#NOME").prop("disabled", false)
			$("#DESCRICAO").prop("disabled", false)
			$("#switchControleLote").prop("disabled", false)
			$("#NCM").prop("disabled", false)
			$("#CEST").prop("disabled", false)
			$("#MOTIVO").prop("disabled", false)
			$("#RAD4_ICMS").prop("disabled", false);
			$("#RAD4_ISS").prop("disabled", false);

			// ESCONDE OS CAMPOS REFERENTES A APROVAÇÃO
			//$(".MOTIVOAPR").prop("disabled",false)
			//$(".OBSERVACOES").prop("disabled",false)
			//$(".DIVCLASSIFICACAOSERVICO").prop("disabled",false)
		}
	}
};












