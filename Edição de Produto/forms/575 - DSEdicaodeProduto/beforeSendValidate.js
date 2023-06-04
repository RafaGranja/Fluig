//FUNÇÃO PARA VALIDAR SE O CAMPO CONCLUSÃO ESTÁ PREENCHIDO E SE SETOR ESTÁ PREENCHIDO
var beforeSendValidate = function(numState,nextState){
	var atv = $("#ATIVIDADE").val();
	//var atv = numState;
	var msg = "";
	console.log("entrei na função", atv);
	var sel = $("#VALOR_RADIO3").val();
	var tipo = $("#TIPO").val();
	var ncm = $("#NCM").val();
	var classgeral = $("#CLASSIFICACAOGERAL").val();
	var nome = $("#NOME").val();
	var classgeral = $("#CODCONTABIL").val();
	var referencia = $("#VALORREFERENCIA").val();
	var unmedida = $("#VALORUNIDADEMEDIDA").val();
	var sped = $("#VALOR_SPED").val();
	var descricao = $("#DESCRICAO").val();
	var cproduto = $("#CONSULTA_PRODUTO").val();
	var produto = $("#VALORPRODUTO").val();
	var aprovacao = $("#VALOR_RADIO3").val();
	var prioridade = $("#VALOR_RADIO6").val();
	var fiscal = $("#VALORFISCAL").val();

	if (atv == 0 || atv == 4){
        

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
        
        //VERIFICA SE O NOME OU A DESCRIÇÃO ESTÃO VAZIOS
     /*   if((nome == "" || nome == undefined) || (descricao == undefined ||descricao == "")){
            Swal.fire({
                icon: 'warning',
                title: 'Campo nome e descrição são obrigatórios'                
            })
            return false;
        };*/
            
        //VERIFICA SE O CAMPO CLASSIFICAÇÃO CONTABIL ESTÁ VAZIO
        if(!(fiscal == "" || fiscal == undefined || fiscal == null || fiscal == "null")){   
        	if(classgeral == "" || classgeral == undefined || classgeral == null || classgeral == "null"){
	            Swal.fire({
	            	icon: 'warning',
	            	title: 'Classificação Contábil é campo obrigatório'                    
	            })
	            return false;
	       }
        };
        //MENSAGEM DE ERRO QUANDO NÃO PREENCHIDO NCM
      /*  if(ncm == "" || ncm == null){
        //var numncm = $("#DIVNCM").val();
            var tipo1 = $("#TIPO").val();
            if(tipo1 == "PRODUTO"){
                Swal.fire({
                	icon: 'warning',
                	title: 'Campo NCM é Obrigatório'                        
            })
            return false;
            }
        };*/
                
      // VERIFICA SE O CAMPO PRODUTO/SERVIÇO ESTÁ VAZIO
        if(produto == "" || produto == undefined || produto == null || produto == 'null'){
            Swal.fire({
                icon: 'error',
                title: 'Produto ou serviço  obrigatório'
                    
                })
                return false;
            };
            
          //MENSAGEM DE ERRO QUANDO NÃO SELECIONDO A PRIORIDADE
            if(prioridade == "" || prioridade == null || prioridade == undefined || prioridade == "null"){
                Swal.fire({
                    icon: 'warning',
                    title: 'Prioridade é campo obrigatório!'
                })
                return false;            
            };
        }
	
	if(atv == 5){
		
			$("#RAD6_MA").prop("disabled", false)
			$("#RAD6_A").prop("disabled", false)
			$("#RAD6_M").prop("disabled", false)
			$("#RAD6_B").prop("disabled", false)
			$(".DIV_MOTIVO").hide();
		    console.log("estou entrando na atividade para habilitar os campos" + atv)
		
		//	var z = $("#CLASSIFICACAO_CONTABIL").val().toString();
		    var z = $("#CODCONTABIL").val();
			$("#CLASSIFICACAO_FISCAL").prop("disabled",false)
			$("#CLASSIFICACAO_CONTABIL").prop("disabled",false)
			$("#UNIDADEMEDIDA").prop("disabled",false)
			$("#GRUPO").prop("disabled",false)
			$("#SUBGRUPO").prop("disabled",false)
			$("#NCM").prop("disabled",false)
			$("#CONTACONTABILSPED").prop("disabled", false);
			$("#CLASSIFICACAO").prop("disabled", false);
			$("#RAD1_NAO").prop("disabled", false)
			$("#RAD1_SIM").prop("disabled", false)
			$("#C_RAD1_NAO").prop("disabled", false)
			$("#C_RAD1_SIM").prop("disabled", false)
			$("#C_TIPO").prop("disabled", false)
			
			if(cproduto == "" || cproduto == undefined || cproduto == null){
				$("#CONTACONTABILSPED").prop("disabled", false);
			}else{
				$("#CONTACONTABILSPED").prop("disabled", true);
			}
			
		    $("#TIPO").prop("disabled",false)
		    $("#NOME").prop("disabled",false)
		    $("#DESCRICAO").prop("disabled",false)
	        $("#MOTIVO").prop("disabled",false)
		
		    //VERIFICA SE O CAMPO REFERENCIA ESTÁ VAZIO
		if(referencia == "" || referencia == undefined  || referencia == null){
			Swal.fire({
				icon: 'warning',
				title: 'Referência é campo obrigatório!'
			
			})
			return false;
		};
		//VERIFICA SE A CONTA SPED ESTÁ VAZIA
		if(sped == "" || sped == undefined || sped == null){
			Swal.fire({
				icon: 'warning',
				title: 'Campo sped é obrigatório!'
			
			})
			return false;
		};
		
		
	    var erro = false; //VARIÁVEL QUE HABILITA OS CAMPOS DE NOVO
	
		//MENSAGEM DE ERRO QUANDO NÃO PREENCHIDO O CAMPO MOTIVO
		if(sel == "NAO" || sel == "ALTERAR"){
			var motivo = $("#MOTIVOAPR").val();
			if(motivo == ""  || motivo == null || motivo == undefined){			
	    		Swal.fire({
	    			icon: 'error',
	    			title: 'Campo motivo é obrigatório'
	    	    });
	    	    return false;
			}
		}
		
		 //VERIFICA SE O CAMPO APROVAÇÃO ESTÁ VAZIO
		if(aprovacao== "" || aprovacao == null || aprovacao == "null" || aprovacao == undefined){
			Swal.fire({
				icon: 'warning',
				title: 'Selecione uma opção de aprovação'
			
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
		
		if(erro == false){
			$("#CLASSIFICACAO_FISCAL").prop("disabled",false)
			$("#CLASSIFICACAO_CONTABIL").prop("disabled",false)
			$("#UNIDADEMEDIDA").prop("disabled",false)
			$("#GRUPO").prop("disabled",false)
			$("#SUBGRUPO").prop("disabled",false)
			$("#TIPO").prop("disabled",false)
			$("#NOME").prop("disabled",false)
			$("#DESCRICAO").prop("disabled",false)
			$("#switchControleLote").prop("disabled",false)
			$("#NCM").prop("disabled",false)
			$("#CEST").prop("disabled",false)		
			$("#MOTIVO").prop("disabled",false)
			$("#RAD4_ICMS").prop("disabled", false);
			$("#RAD4_ISS").prop("disabled", false);	
		
			// ESCONDE OS CAMPOS REFERENTES A APROVAÇÃO
			//$(".MOTIVOAPR").prop("disabled",false)
			//$(".OBSERVACOES").prop("disabled",false)
			//$(".DIVCLASSIFICACAOSERVICO").prop("disabled",false)
		};
		
			
    };
};


