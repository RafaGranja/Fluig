// INCLUI UM ITEM NA TABELA E NA ESTRUTURA
function incluirItem(op){
	
	var indicePaiPrincipal = $("#INDICEPAI").val()
	var indice = $("#INDICE_INFO").val()
	var numDesenho = $("#NUMDESENHO_INFO").val()
	var descricao = $("#DESCRICAO_INFO").val()
	var posicaoDesenho = $("#POSICAO_INFO").val()
	var numOS = $("#NUM_OS").val()
	var idprj = $("#IDPRJ_OS").val()
	var descOS = $("#DESCRICAO_OS_INFO").val()
	var codTarefa = $("#CODTRF").val()
	var codColigada = $("#CODCOLIGADA").val()
	var codFilial = $("#CODFILIAL").val()
	var quantidade = $("#QTDE_INFO").val()
	var expansor = "EXPANDIDO"
	var comporLista = "SIM"	
	var	revisaoDesenho = ""
	var	dataRevisao = ""
	var	numDbi = ""
	var	revisaoDbi = ""
	var	codigoTarefaDesc = ""
	var	nomeTrfItem = ""
	var	idTrfItem = ""
	var	codTrfItem = ""
	var detalhado = "SIM"
	var codTrfPai = $("#F_CODTRFPAI").val()
	var idTrfPai = $("#F_IDTRFPAI").val()
	var nomeTrfPai = $("#F_NOMETRFPAI").val()
	var execucoes = $("#EXECUCOES").val()
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
		
	/*var indice = $("#INDICE_INFO").val()
	var numDesenho = $("#NUMDESENHO_INFO").val()
	var descricao = $("#DESCRICAO_INFO").val()
	var posicaoDesenho = $("#POSICAO_INFO").val()
	var os = $("#NUM_OS").val()
	var codTarefa = $("#CODTRF").val()*/
	
	// SE JÁ TEM ITENS NA TABELA, NÃO É O PAI
	if(tabelaTemItens()){
			
		// CRIA TABELA
		//var seq = childAdd()
		
		// BUSCA O IDCRIACAO 
		//var idCriacao = buscaIdCriacaoTab()
		
		// SE IDCRIAÇÃO É 0
		/*if(idCriacao==0){
			
			idCriacao = seq
			
		} else {
			// SE NÃO, SOMA
			
			idCriacao += 1
			$("#IDMAX_CRIACAO").val(idCriacao)
			
		}
		
		//var indice = $("#INDICE_INFO").val()
		var sep = indice.lastIndexOf(".")*/
		
		// CALCULA A QUANTIDADE TOTAL PARA O CAMPO MODAL
		calculaTotalQtde()	
		
		var totalQtde = $("#QTDETOTAL_INFO").val()
		
		var posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		var nivel = indice.substr(0,indice.lastIndexOf("."))	
		//var numDesenho = $("#NUMDESENHO_INFO").val()
		//var descricao = $("#DESCRICAO_INFO").val()
		//var indiceSemPonto = indice.replace(/\D+/g, '');
		var nivel2 = ""
		var idCriacaoPai = ""	
			
    	console.log("o nível do item criado é "+nivel+" e o indice do pai principal é "+indicePaiPrincipal)
	    	
	    // SE O ÍNDICE PAI PRINCIPAL É O MESMO DO INDICE PAI DO ITEM A SER INCLUÍDO
		if(nivel==indicePaiPrincipal){
			
			console.log("o nível é o indicePaiPrincipal")
			
			nivel2 = nivel
			
		} else {
			// SE NÃO
			
			console.log("o nível não é o indicePaiPrincipal")
			
			nivel2 = nivel.substr(0,nivel.lastIndexOf("."))
			
		}
		
		// BUSCA O IDCRIACAO DO PAI
        idCriacaoPai = buscaIdCriacao(nivel2)	
		
		var nivelPontos = indice.replace(/[^.]/g, "").length
		var retorno = new Array()
		
		console.log("NIVEL PONTOS: "+nivelPontos)
		
		// SE NÃO É DO PRIMEIRO E NEM DO SEGUNDO NÍVEL
		if(nivelPontos>1){
			
			console.log("Vou buscar o código da tarefa do pai")
			
			// BUSCA O CODIGO DA TAREFA DO PAI
			retorno = buscaCodTarefaPai(nivel,idCriacao)
		
			console.log(retorno)
		
			codigoTarefaDesc = TAREFA.CODIGOTAREFADESC
			nomeTrfItem = TAREFA.NOMETRFITEM
			idTrfItem = TAREFA.IDTRFITEM
			codTrfItem = TAREFA.CODTRFITEM
			
		}
		
		// BUSCA DESENHO E COLOCA DADOS
		var retornoDesenho = buscaDesenho(numDesenho)
		
		//numDesenho = DESENHO.NUMDESENHO
		revisaoDesenho = DESENHO.REVISAODESENHO
		dataRevisao = DESENHO.DATAREVISAO
		numDbi = DESENHO.NUMDBI
		revisaoDbi = DESENHO.REVISAODBI
		
		/*var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var constraints = new Array(a1)	
		var dataset = DatasetFactory.getDataset("dsInfoEstruturaOS",null,constraints,null)
		var row = dataset.values
		var rep = row[0]
		
		var companyid = rep["companyid"]
		var cardid = rep["cardid"]
		//var documentid = rep["documentid"]
		//var version = rep["version"]
		var tableid = rep["tableid"]
		
		var dataset = DatasetFactory.getDataset("dsMaxIdEstruturaOS",null,null,null)
		var row = dataset.values
		var rep = row[0]
		
		var id = rep["IDMAX"]
		id = parseInt(id)
		console.log("IDMAX do banco: "+id)
		id += 1 
	
		console.log("companyid: "+companyid+", cardid: "+cardid+", tableid:"+tableid+", Novo Id: "+id+",nivel: "+nivel+", posição: "+posicao)*/
		
		// SALVA OS DADOS
		
		/*$("#POSICAOINDICE___"+seq).val(posicao)
		$("#NIVEL___"+seq).val(nivel)
		//$("#POSICAOCOMPLETA___"+seq).val(indice)
		$("#POSICAODESENHO___"+seq).val(posicaoDesenho)
		$("#NUMDESENHO___"+seq).val(numDesenho)
		$("#DESCRICAO___"+seq).val(descricao)
		$("#SEQ___"+seq).val(seq)
		$("#INDICE___"+seq).val(indice)
		$("#OS___"+seq).val(os)
		$("#CODTRFOS___"+seq).val(codTarefa)
		$("#IDCRIACAO___"+seq).val(idCriacao)
		$("#EXPANSOR___"+seq).val("EXPANDIDO")*/
		
		/*var a1 = DatasetFactory.createConstraint("ID",id,id,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("companyid",companyid,companyid,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("cardid",cardid,cardid,ConstraintType.MUST)
		//var a5 = DatasetFactory.createConstraint("documentid",documentid,documentid,ConstraintType.MUST)
		//var a5 = DatasetFactory.createConstraint("version",version,version,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("tableid",tableid,tableid,ConstraintType.MUST)
		var a6 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a7 = DatasetFactory.createConstraint("POSICAOINDICE",posicao,posicao,ConstraintType.MUST)
		var a8 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
		var a9 = DatasetFactory.createConstraint("POSICAODESENHO",posicaoDesenho,posicaoDesenho,ConstraintType.MUST)
		var a10 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
		var a11 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)
		var a12 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
		var a13 = DatasetFactory.createConstraint("CODTRFOS",codTarefa,codTarefa,ConstraintType.MUST)
		var a14 = DatasetFactory.createConstraint("EXPANSOR",expansor,expansor,ConstraintType.MUST)		
		
		var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14)	
		var dataset = DatasetFactory.getDataset("dsInsertSimplesOS",null,constraints,null)
		//var row = dataset.values*/
		
		/*var dataset = DatasetFactory.getDataset("dsMaxIdEstruturaOS",null,null,null)
		var row = dataset.values
		var rep = row[0]
		
		var id = rep["IDMAX"]
		id = parseInt(id)
		id += 1*/
		
		if(!(nivel=="")){
			
			execucoes = 1
			
		} else {
			
			if(execucoes=="" || execucoes==null || execucoes==undefined){
				
				execucoes = 1
				
			}
			
		}
		
		//var a1 = DatasetFactory.createConstraint("ID",id,id,ConstraintType.MUST)
		//var a3 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("POSICAOINDICE",posicao,posicao,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("POSICAODESENHO",posicaoDesenho,posicaoDesenho,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
		var a6 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)
		var a7 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
		var a8 = DatasetFactory.createConstraint("CODTRFOS",codTarefa,codTarefa,ConstraintType.MUST)
		var a9 = DatasetFactory.createConstraint("EXPANSOR",expansor,expansor,ConstraintType.MUST)		
		var a10 = DatasetFactory.createConstraint("COMPORLISTA",comporLista,comporLista,ConstraintType.MUST)
		var a11 = DatasetFactory.createConstraint("IDPRJOS",idprj,idprj,ConstraintType.MUST)
		var a12 = DatasetFactory.createConstraint("DESCOS",descOS,descOS,ConstraintType.MUST)
		var a13 = DatasetFactory.createConstraint("OPCAO",2,2,ConstraintType.MUST)
		var a14 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
		var a15 = DatasetFactory.createConstraint("REVISAODESENHO",revisaoDesenho,revisaoDesenho,ConstraintType.MUST)
		var a16 = DatasetFactory.createConstraint("DATAREVISAO",dataRevisao,dataRevisao,ConstraintType.MUST)
		var a17 = DatasetFactory.createConstraint("NUMDBI",numDbi,numDbi,ConstraintType.MUST)
		var a18 = DatasetFactory.createConstraint("REVISAODBI",revisaoDbi,revisaoDbi,ConstraintType.MUST)
		var a19 = DatasetFactory.createConstraint("CODIGOTAREFADESC",codigoTarefaDesc,codigoTarefaDesc,ConstraintType.MUST)
		var a20 = DatasetFactory.createConstraint("NOMETRFITEM",nomeTrfItem,nomeTrfItem,ConstraintType.MUST)
		var a21 = DatasetFactory.createConstraint("IDTRFITEM",idTrfItem,idTrfItem,ConstraintType.MUST)
		var a22 = DatasetFactory.createConstraint("CODTRFITEM",codTrfItem,codTrfItem,ConstraintType.MUST)
		var a23 = DatasetFactory.createConstraint("DETALHADO","SIM","SIM",ConstraintType.MUST)
		var a24 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
		var a25 = DatasetFactory.createConstraint("DESQTDE",quantidade,quantidade,ConstraintType.MUST)
		var a26 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
		var a27 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
		var a28 = DatasetFactory.createConstraint("CODTRFPAI",codTrfPai,codTrfPai,ConstraintType.MUST)
		var a29 = DatasetFactory.createConstraint("IDTRFPAI",idTrfPai,idTrfPai,ConstraintType.MUST)
		var a30 = DatasetFactory.createConstraint("NOMETRFPAI",nomeTrfPai,nomeTrfPai,ConstraintType.MUST)
		var a31 = DatasetFactory.createConstraint("EXECUCOES",execucoes,execucoes,ConstraintType.MUST)
		var a32 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
		var a33 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);

		var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31,a32,a33)	
		
		var dataset = DatasetFactory.getDataset("dsInsertItemEstruturaOS",null,constraints,null)
		//var row = dataset.values
		
		var row = dataset.values
		var rep = row[0]
		var idCriacao = rep["IDCRIACAO"]
		
		console.log("vou incluir indice: "+indice+", numDesenho: "+numDesenho+", descrição: "+descricao+", posicaoPai: "+posicaoDesenho+", OS "+numOS+", idprj: "+idprj+
				", descOS: "+descOS)
				
		if(op=="" || op==undefined || op==null){
        	
        	 atualizarNivel(idCriacaoPai)
            //atualizar()
        	
        }
		
		// LIMPA OS CAMPOS 
		$("#INDICE_INFO").val("")
		$("#NUMDESENHO_INFO").val("")
		$("#DESCRICAO_INFO").val("")
		$("#POSICAO_INFO").val("")
		$("#SEQ_INFO").val("")
		
		// CALCULA A QUANTIDADE DOS COMPONENTES
		calculaQtdesComponentesGeral(idCriacao)
		
		/*console.log("vou incluir indice: "+indice+", numDesenho: "+numDesenho+", descrição: "+descricao+", posicaoPai: "+posicaoDesenho+", OS "+os+" no seq "+seq)
		
		// BUSCA DESENHO E COLOCA DADOS
		buscaDesenho(numDesenho,seq)
		
		var nivelPontos = indice.replace(/[^.]/g, "").length
		
		console.log("NIVEL PONTOS: "+nivelPontos)
		
		if(nivelPontos>1){
			
			// BUSCA O CODIGO DA TAREFA DO PAI
			buscaCodTarefaPai(nivel,seq)
			
		}
		
		// SALVA OS DADOS
		$("#POSICAOINDICE___"+seq).val(posicao)
		$("#NIVEL___"+seq).val(nivel)
		//$("#POSICAOCOMPLETA___"+seq).val(indice)
		$("#POSICAODESENHO___"+seq).val(posicaoDesenho)
		$("#NUMDESENHO___"+seq).val(numDesenho)
		$("#DESCRICAO___"+seq).val(descricao)
		$("#SEQ___"+seq).val(seq)
		$("#INDICE___"+seq).val(indice)
		$("#OS___"+seq).val(os)
		$("#CODTRFOS___"+seq).val(codTarefa)
		$("#IDCRIACAO___"+seq).val(idCriacao)
		$("#EXPANSOR___"+seq).val("EXPANDIDO")
		
		// ATUALIZA VIEW
		atualizar()
		
		// LIMPA OS CAMPOS 
		$("#INDICE_INFO").val("")
		$("#NUMDESENHO_INFO").val("")
		$("#DESCRICAO_INFO").val("")
		$("#POSICAO_INFO").val("")
		$("#SEQ_INFO").val("")*/
		
	} else {
		// SE NÃO, É O PRIMEIRO PAI
			
		// CRIA TABELA
		//var seq = childAdd()
		
		// BUSCA O IDCRIACAO 
		//var idCriacao = buscaIdCriacaoTab()
		
		// SE IDCRIAÇÃO É 0
		/*if(idCriacao==0){
			
			idCriacao = seq
			
		} else {
			// SE NÃO, SOMA
			
			idCriacao += 1
			$("#IDMAX_CRIACAO").val(idCriacao)
			
		}*/
		
		var totalQtde = quantidade
		
		indice = "1"
		var nivel = ""
		var posicao = "1"
		//var numDesenho = $("#NUMDESENHO_PAI").val()
		//var descricao = $("#DESCRICAO_PAI").val()
		//var posicaoPai = $("#POSICAO_PAI").val()
		//var numDesenho = $("#NUMDESENHO_INFO").val()
		//var descricao = $("#DESCRICAO_INFO").val()
		//var posicaoPai = $("#POSICAO_INFO").val()
		//var os = $("#NUM_OS").val()
		var codTarefa = $("#CODTRF").val()
		
		// BUSCA DESENHO E COLOCA DADOS
		var retornoDesenho = buscaDesenho(numDesenho)
		
		//numDesenho = DESENHO.NUMDESENHO
		revisaoDesenho = DESENHO.REVISAODESENHO
		dataRevisao = DESENHO.DATAREVISAO
		numDbi = DESENHO.NUMDBI
		revisaoDbi = DESENHO.REVISAODBI
		
		/*var dataset = DatasetFactory.getDataset("dsMaxIdEstruturaOS",null,null,null)
		var row = dataset.values
		var rep = row[0]
		
		var id = rep["IDMAX"]
		id = parseInt(id)
		id += 1*/
		
		if(execucoes=="" || execucoes==null || execucoes==undefined){
			
			execucoes = 1
			
		} 
		
		//var indiceSemPonto = indice.replace(/\D+/g, '');
		
		//var a1 = DatasetFactory.createConstraint("ID",id,id,ConstraintType.MUST)
		//var a3 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("POSICAOINDICE",posicao,posicao,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("POSICAODESENHO",posicaoDesenho,posicaoDesenho,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
		var a6 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)
		var a7 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
		var a8 = DatasetFactory.createConstraint("CODTRFOS",codTarefa,codTarefa,ConstraintType.MUST)
		var a9 = DatasetFactory.createConstraint("EXPANSOR",expansor,expansor,ConstraintType.MUST)		
		var a10 = DatasetFactory.createConstraint("COMPORLISTA",comporLista,comporLista,ConstraintType.MUST)
		var a11 = DatasetFactory.createConstraint("IDPRJOS",idprj,idprj,ConstraintType.MUST)
		var a12 = DatasetFactory.createConstraint("DESCOS",descOS,descOS,ConstraintType.MUST)
		var a13 = DatasetFactory.createConstraint("OPCAO",1,1,ConstraintType.MUST)
		var a14 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
		var a15 = DatasetFactory.createConstraint("REVISAODESENHO",revisaoDesenho,revisaoDesenho,ConstraintType.MUST)
		var a16 = DatasetFactory.createConstraint("DATAREVISAO",dataRevisao,dataRevisao,ConstraintType.MUST)
		var a17 = DatasetFactory.createConstraint("NUMDBI",numDbi,numDbi,ConstraintType.MUST)
		var a18 = DatasetFactory.createConstraint("REVISAODBI",revisaoDbi,revisaoDbi,ConstraintType.MUST)
		var a19 = DatasetFactory.createConstraint("CODIGOTAREFADESC",codigoTarefaDesc,codigoTarefaDesc,ConstraintType.MUST)
		var a20 = DatasetFactory.createConstraint("NOMETRFITEM",nomeTrfItem,nomeTrfItem,ConstraintType.MUST)
		var a21 = DatasetFactory.createConstraint("IDTRFITEM",idTrfItem,idTrfItem,ConstraintType.MUST)
		var a22 = DatasetFactory.createConstraint("CODTRFITEM",codTrfItem,codTrfItem,ConstraintType.MUST)
		var a23 = DatasetFactory.createConstraint("DETALHADO","SIM","SIM",ConstraintType.MUST)
		var a24 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
		var a25 = DatasetFactory.createConstraint("DESQTDE",quantidade,quantidade,ConstraintType.MUST)
		var a26 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
		var a27 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
		var a28 = DatasetFactory.createConstraint("CODTRFPAI",codTrfPai,codTrfPai,ConstraintType.MUST)
		var a29 = DatasetFactory.createConstraint("IDTRFPAI",idTrfPai,idTrfPai,ConstraintType.MUST)
		var a30 = DatasetFactory.createConstraint("NOMETRFPAI",nomeTrfPai,nomeTrfPai,ConstraintType.MUST)
		var a31 = DatasetFactory.createConstraint("EXECUCOES",execucoes,execucoes,ConstraintType.MUST)
		var a32 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
		var a33 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);

		var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31,a32,a33)	
		var dataset = DatasetFactory.getDataset("dsInsertItemEstruturaOS",null,constraints,null)
		
		//var row = dataset.values
		
		var row = dataset.values
		var rep = row[0]
		var idCriacao = rep["IDCRIACAO"]
		
		console.log("vou incluir indice: "+indice+", numDesenho: "+numDesenho+", descrição: "+descricao+", posicaoDesenho: "+posicaoDesenho+", OS "+numOS+", idprj: "+idprj+", descOS: "+descOS)

		// CALCULA A QUANTIDADE DOS COMPONENTES
		calculaQtdesComponentesGeral(idCriacao)
		
		// SALVA OS DADOS
		/*$("#POSICAOINDICE___"+seq).val(indice)
		//$("#POSICAOCOMPLETA___"+seq).val(indice)
		$("#NUMDESENHO___"+seq).val(numDesenho)
		$("#POSICAODESENHO___"+seq).val(posicaoPai)
		$("#DESCRICAO___"+seq).val(descricao)
		$("#SEQ___"+seq).val(seq)
		$("#INDICE___"+seq).val(indice)
		$("#OS___"+seq).val(os)
		$("#CODTRFOS___"+seq).val(codTarefa)
		$("#IDCRIACAO___"+seq).val(idCriacao)
		$("#EXPANSOR___"+seq).val("EXPANDIDO")*/

		// ATUALIZA VIEW
		atualizar()
		
		// LIMPA OS CAMPOS 
		$("#INDICE_INFO").val("")
		$("#NUMDESENHO_INFO").val("")
		$("#DESCRICAO_INFO").val("")
		//$("#NUMDESENHO_PAI").val("")
		$("#POSICAO_INFO").val("")
		//$("#DESCRICAO_PAI").val("")
		//$("#POSICAO_PAI").val("")
		$("#SEQ_INFO").val("")
					
	}
	
}

// VERIFICA O CHECKBOX DA USINAGEM E ATUALIZA O BANCO 
function checkUsinagem(obj,idCriacao){
	
	console.log("entrei para verificar o checkbox da usinagem para o idCriacao "+idCriacao)
	
	var numOS = $("#NUM_OS").val()
	var check = ""
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
		
	// SE CHECKBOX FOI SELECIONADO
	if($(obj).is(":checked")){
		
		console.log("está checado")
		
		check = "S"
		
		
	} else {
		// SE NÃO
		
		console.log("não está checado")
		
		check = "N"
		
	}
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CHECKUSINAGEM",check,check,ConstraintType.MUST);
	//var a4 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
	//var a5 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2,a3);
	
	var dataset = DatasetFactory.getDataset("dsUpdateCheckUsinagemOS",null,constraints,null);
	
	console.log("atualização feita")
	
}

// VERIFICA O CHECKBOX DA CALDERARIA E ATUALIZA O BANCO 
function checkCalderaria(obj,idCriacao){
	
	console.log("entrei para verificar o checkbox da calderaria para o idCriacao "+idCriacao)
	
	var numOS = $("#NUM_OS").val()
	var check = ""
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
		
	// SE CHECKBOX FOI SELECIONADO
	if($(obj).is(":checked")){
		
		console.log("está checado")
		
		check = "S"
		
		
	} else {
		// SE NÃO
		
		console.log("não está checado")
		
		check = "N"
		
	}
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CHECKCALDERARIA",check,check,ConstraintType.MUST);
	//var a4 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
	//var a5 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2,a3);
	
	var dataset = DatasetFactory.getDataset("dsUpdateCheckCalderariaOS",null,constraints,null);
	
	console.log("atualização feita")
	
}

// BUSCA O PROCESSO CADASTRADO PARA O ÍNDICE INFORMADO
function buscarProcessoIndice(){
	
	console.log("entrei para buscar processo")
	
	var indice = $("#INDICE_PROCESSO").val()
	var ret = false
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
    
	setTimeout(function(){
	
		// SE ÍNDICE NÃO FOI INFORMADO
		if(indice=="" || indice==undefined || indice==null){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O índice não foi informado!',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO, BUSCA PROCESSO DO ÍNDICE INFORMADO
			
			var idCriacao = buscaIdCriacao(indice)
			console.log("idCriacao: "+idCriacao)
			
			// SE IDCRIACAO NÃO É VÁLIDO
			if(idCriacao=="" || idCriacao==null || idCriacao==undefined || idCriacao=="null"){
				
				console.log("idCriacao é nulo")
				
				ret = true
				
			} else {
				// SE NÃO
				
				var numOS = $("#NUM_OS").val()
				
				var b1 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
				var b2 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
				
				var constraints = new Array(b1,b2)
				
				var dataset = DatasetFactory.getDataset("dsBuscaItensProcessoOS",null,constraints,null)
				
				var row = dataset.values
				
				// SE RETORNO É NULO OU VAZIO
				if(row=="" || row==undefined || row==null || row=="null"){
					
					console.log("retorno dos processos vazio ou nulo")
					
					ret = true
					
				} else {
					// SE NÃO 
					
					console.log("tem processo")
					
					var count = dataset.values.length
					
					// PERCORRE TODOS OS REGISTROS ENCONTRADOS
					for(var i=0; i<count; i++){
						
						var rep = row[i]
						
						// ADICIONA LINHA NO PROCESSO
						var seq = addViewProcesso()
						
						$("#VIEWPRIORIDADE___"+seq).val(rep["PRIORIDADE"])
						$("#VIEWATIVIDADE___"+seq).val(rep["CODATIVIDADE"]+ " - "+rep["DESCATIVIDADE"])
						$("#VIEWCODATIVIDADE___"+seq).val(rep["CODATIVIDADE"])
						$("#VIEWDESCATIVIDADE___"+seq).val(rep["DESCATIVIDADE"])
						$("#VIEWHABILIDADEREQUERIDA___"+seq).val(rep["HABILIDADEREQUERIDA"])
						$("#VIEWCODHABILIDADE___"+seq).val(rep["CODHABILIDADE"])
						$("#VIEWPOSTO___"+seq).val(rep["CODPOSTO"]+" - "+rep["DESCPOSTO"])
						$("#VIEWCODPOSTO___"+seq).val(rep["CODPOSTO"])
						$("#VIEWDESCPOSTO___"+seq).val(rep["DESCPOSTO"])
						$("#VIEWFILA___"+seq).val(rep["FILA"])
						$("#VIEWCONFIGURACAO___"+seq).val(rep["CONFIGURACAO"])
						$("#VIEWPROCESSAMENTO___"+seq).val(rep["PROCESSAMENTO"])
						$("#VIEWDESAGREGACAO___"+seq).val(rep["DESAGREGACAO"])
						$("#VIEWESPERA___"+seq).val(rep["ESPERA"])
						$("#VIEWMOVIMENTACAO___"+seq).val(rep["MOVIMENTACAO"])
						$("#VIEWMINUTOSGASTOS___"+seq).val(rep["MINUTOSGASTOS"])
						$("#VIEWDESCPROCESSO___"+seq).val(rep["DESCPROCESSO"])
						$("#VIEWDOCAPOIOATV1___"+seq).val(rep["DOCAPOIOATV1"])
						$("#VIEWDOCAPOIOATV2___"+seq).val(rep["DOCAPOIOATV2"])
						$("#VIEWDOCAPOIOATV3___"+seq).val(rep["DOCAPOIOATV3"])
						$("#VIEWDOCAPOIOATV4___"+seq).val(rep["DOCAPOIOATV4"])
						$("#VIEWFORNPARA___"+seq).val(rep["FORNPARA"])
						
					}
					
				}
				
			}
				
		}
		
		// SE NENHUM PROCESSO FOI LOCALIZADO
		if(ret){
			
			myLoading2.hide();
	    	
			console.log("retorno dos processos vazio ou nulo")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não foi localizado processo para o índice informado!',
				  text: 'Verifique e tente novamente'
			})
			
		}
		
		// MOSTRA/ESCONDE A DIV DA CÓPIA DO PROCESSO
		//mostraDivCopiaProc()
		
		// VERIFICA SE TEM REGISTROS PARA LIBERAR OU NÃO FUNCIONALIDADE DE CÓPIA
		verificaItensCopia()
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
	
}

// VERIFICA SE OS É VÁLIDA
/*function verificaOS(){
	
	var indice = $("#INDICE_OS_INFO").val()

	// SE ÍNDICE CONTEM PONTOS
	if(indice.includes(".")){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Esse índice é inválido para a OS!',
			  text: 'Verifique e tente novamente'
		})
		
		// LIMPA OS CAMPOS PREENCHIDOS
		$("#OS_INFO").val("")
		$("#INDICE_OS_INFO").val("")
		$("#NUMDESENHO_OS_INFO").val("")
		$("#DESCRICAO_OS_INFO").val("")
		
	}
	
}*/

// VERIFICA SE OS JÁ FOI CADASTRADA, SE NÃO, INCLUI NA ESTRUTURA
function incluirOS(){
	
	var numOS = $("#NUM_OS").val()
	var codTarefa = $("#CODTRF").val()
	
	// SE OS NÃO FOI PREENCHIDA
	if((numOS=="" || numOS==null || numOS==undefined)/* || 
			(codTarefa=="" || codTarefa==null || codTarefa==undefined)*/){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Nenhuma OS foi selecionada!',
			  text: 'Verifique e tente novamente'
		})

	} else {
		// SE JÁ FOI PREENCHIDA
		
		// SE TABELA JÁ TEM ITENS
		/*if(tabelaTemItens()){
			
			// MOSTRA/ESCONDE CAMPOS
			$(".VIEW").show()
			$(".INFO_OS").hide()
			$(".INFO_INDICE").show()
			$(".BOTOES_CAB").show()
			
		} else {
			
			// MOSTRA/ESCONDE CAMPOS
			$(".VIEW").show()
			$(".INFO_OS").hide()
			
		}*/
		
		// SE TABELA NÃO TEM ITENS
		if(!tabelaTemItens()){
			
			console.log("tabela não tem itens")
			
			// EXIBE ALERTA
			Swal.fire({
				
				  title: 'Deseja copiar estrutura já cadastrada?',
				  icon: 'warning',
				  showCancelButton: true,
				  allowEscapeKey: true,
				  allowOutsideClick: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#F08E8E',
				  confirmButtonText: 'Sim',
				  cancelButtonText: 'Não',

				}).then(function(result){
				
				  // SE FOR COPIAR
				  if (result.value) {
				      
					  // ESCONDE/EXIBE CAMPOS
				      $(".INFO_OS").hide()
				      $(".OS_COPIA").show()
				      
				  }else{
					  // SE NÃO
					  
					  	// SE TABELA JÁ TEM ITENS
						if(tabelaTemItens()){
							
							// MOSTRA/ESCONDE CAMPOS
							$(".VIEW").show()
							$(".INFO_OS").hide()
							$(".INFO_INDICE").show()
							$(".BOTOES_CAB").show()
							
						} else {
							
							// MOSTRA/ESCONDE CAMPOS
							$(".VIEW").show()
							$(".INFO_OS").hide()
							
						}
					  
				  } 				  
				  
			})
			
		} else {
			// SE TABELA TEM ITENS
			
			console.log("tabela tem itens")
			
			// MOSTRA/ESCONDE CAMPOS
			$(".VIEW").show()
			$(".INFO_OS").hide()
			$(".INFO_INDICE").show()
			$(".BOTOES_CAB").show()
			
		}
		
		// ATUALIZAR DADOS DA OS
		atualizar()
		
	}

}

// CONFIRMA A ALTERAÇÃO DA OS
function confirmaAlteracaoOS(){
	
	var numOS = $("#NUM_OS").val()
	
	// SE A OS NÃO FOI PREENCHIDA
	if(numOS=="" || numOS==null || numOS==undefined){
		
		// EXIBE ALERTA
		Swal.fire({
				  icon: 'error',
				  title: 'É necessário informar a OS do Projeto!',
				  text: 'Verifique e tente novamente.'
		})
		
	} else {
		// SE NÃO
		
		// ATUALIZA A OS DO PROJETO
		atualizaOS()
		
		// ATUALIZAR DADOS DA OS
		atualizar()
			
		// MOSTRA/ESCONDE CAMPOS
		$(".VIEW").show()
		$(".INFO_OS").hide()
		$(".INFO_INDICE").show()
		$(".BOTOES_CAB").show()
		
	}
	
}

// VOLTA PARA A TELA DO CROQUI
function voltarOS(){
	
	var numOS = $("#NUM_OS").val()
	
	// NUM DA OS FOI REMOVIDO
	if(numOS=="" || numOS==null || numOS==undefined){
		
		// EXIBE ALERTA
		Swal.fire({
				  icon: 'error',
				  title: 'É necessário informar a OS do Projeto!',
				  text: 'Verifique e tente novamente.'
		})
		
	} else {
		// SE NÃO
		
		// LIMPA AS INFORMAÇÕES DA OS ANTIGA
		$("#NUM_OS_ANTIGA").val("")
		
		// MOSTRA/ESCONDE CAMPOS
		$(".VIEW").show()
		$(".INFO_OS").hide()
		$(".INFO_INDICE").show()
		$(".BOTOES_CAB").show()
		
	}
	
}

// ATUALIZA A OS DO PROJETO
function atualizaOS(){
	
	console.log("VOU ATUALIZAR A OS")
	
	var osAntiga = $("#NUM_OS_ANTIGA").val()
	var numOS = $("#NUM_OS").val()
	var idprj = $("#IDPRJ_OS").val()
	var descOS = $("#DESCRICAO_OS_INFO").val()
	
	console.log("VOU ATUALIZAR A OS")
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDPRJOS",idprj,idprj,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("DESCOS",descOS,descOS,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("OS_ANTIGA",osAntiga,osAntiga,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsUpdateGeralOS",null,constraints,null)
	
}

// CANCELAR A CÓPIA DA OS
function cancelarOSCopia(){
	
	// SE TABELA JÁ TEM ITENS
	if(tabelaTemItens()){
		
		// MOSTRA/ESCONDE CAMPOS
		$(".VIEW").show()
		$(".INFO_OS").hide()
		$(".INFO_INDICE").show()
		$(".BOTOES_CAB").show()
		
	} else {
		
		// MOSTRA/ESCONDE CAMPOS
		$(".VIEW").show()
		$(".INFO_OS").hide()
		
	}
	
}

// INCLUI A OS NA TABELA
/*function incluirOSTabela(){
	
	// CRIA TABELA
	var seq = childAdd()
	
	var indice = $("#INDICE_OS_INFO").val()
	var descricaoOS = $("#DESCRICAO_OS_INFO").val()
	var numDesenhoOS = $("#NUMDESENHO_OS_INFO").val()
	
	// SALVA OS DADOS
	$("#POSICAO___"+seq).val(indice)
	//$("#NIVEL___"+seq).val()
	$("#POSICAOCOMPLETA___"+seq).val(indice)
	//$("#POSICAOCOMPLETAANTIGA___"+seq).val()
	$("#NUMDESENHO___"+seq).val(numDesenhoOS)
	$("#DESCRICAO___"+seq).val(descricaoOS)
	
}*/

// BUSCA NO BANCO A OS INFORMADA E CARREGA NA VIEW
/*function buscarOS(){
	
	var os = $("#OS_CONSULTA").val()
	
	// CONSTRÓI A CONSULTA DO DATASET
	var b1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
	var constraints = new Array(b1)
	var dataset = DatasetFactory.getDataset("dsOSEstrutura",null,constraints,null)
	var row = dataset.values
	
	
	// SE RETORNO É VAZIO
	if(row=="" || row==undefined || row==null || row=="null"){
		
		console.log("não localizei no banco")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'OS ainda não cadastrada!',
			  text: 'Verifique e tente novamente'
		})
		
		$("")
		
	}
	else {
		
		// PERCORRE OS REGISTROS ENCONTRADOS E ORDENA A CRIA A TABELA
		for(var i=0; i < row.length; i++){
			
			// CRIA ARRAY COM OS REGISTROS DE CADA ITEM
			var rep = row[i]
			
			// PREENCHE A TABELA COM OS REGISTROS DO BANCO
			preenhceTabela(rep)
			
		}
	
	}
	
	// ATUALIZA A VISUALIZAÇÃO DA VIEW
	atualizar()
			
}

// PREENCHE A TABELA COM OS REGISTROS DO BANCO
function preencheTabela(rep){
	
	// CRIA TABELA
	var seq = childAdd()
	
	// SALVA OS DADOS DO REGISTRO DO BANCO NA TABELA
	$("#POSICAO___"+seq).val(rep['POSICAO'])
	$("#NIVEL___"+seq).val(rep['NIVEL'])
	$("#POSICAOCOMPLETA___"+seq).val(rep['POSICAOCOMPLETA'])
	$("#POSICAOCOMPLETAANTIGA___"+seq).val(rep['POSICAOCOMPLETAANTIGA'])
	$("#DESCRICAO___"+seq).val(rep['DESCRICAO'])
	$("#NUMDBI___"+seq).val(rep['NUMDBI'])
	$("#REVISAODBI___"+seq).val(rep['REVISAODBI'])
	$("#NUMDESENHO___"+seq).val(rep['NUMDESENHO'])
	$("#REVISAODESENHO___"+seq).val(rep['REVISAODESENHO'])
	$("#DESQTDE___"+seq).val(rep['DESQTDE'])
	$("#TOTALQTDE___"+seq).val(rep['TOTALQTDE'])
	$("#ESPESSURA___"+seq).val(rep['ESPESSURA'])
	$("#BITOLA___"+seq).val(rep['BITOLA'])
	$("#LARGURA___"+seq).val(rep['LARGURA'])
	$("#MASSALINEAR___"+seq).val(rep['MASSALINEAR'])
	$("#ESPROSCA___"+seq).val(esprosca)
	$("#DIAMETROEXTERNO___"+seq).val(rep['DIAMETROEXTERNO'])
	$("#DIAMETROINTERNO___"+seq).val(rep['DIAMETROINTERNO'])
	$("#COMPRIMENTO___"+seq).val(rep['COMPRIMENTO'])
	$("#MATERIAL___"+seq).val(rep['MATERIAL'])
	$("#OS___"+seq).val(rep['OS'])
	$("#DATAREVISAO___"+seq).val(rep['DATAREVISAO'])
	$("#OBSERVACOESDESENHO___"+seq).val(rep['OBSERVACOESDESENHO'])
	$("#PESOBRUTO___"+seq).val(rep['PESOBRUTO'])
	$("#PESOLIQUIDO___"+seq).val(rep['PESOLIQUIDO'])
	$("#PERIMETROCORTE___"+seq).val(rep['PERIMETROCORTE'])
	$("#AREAPINTURA___"+seq).val(rep['AREAPINTURA'])
	$("#OBSPROCESSO___"+seq).val(rep['OBSPROCESSO'])
	$("#OBSGERAL___"+seq).val(rep['OBSGERAL'])
	$("#TIPO___"+seq).val(rep['TIPO'])
	$("#TIPODESENHO___"+seq).val(rep['TIPODESENHO'])
	$("#MATERIAL_ZOOM___"+seq).val(rep['MATERIAL_ZOOM'])
	$("#NOVOMATERIAL___"+seq).val(rep['NOVOMATERIAL'])
	$("#IDMATERIAL___"+seq).val(rep['IDMATERIAL'])
	$("#CODIGOPRD___"+seq).val(rep['CODIGOPRD'])
	$("#SEQ___"+seq).val(seq)
	
}*/

// INCLUIR ESTRUTURA
/*function incluirEstrutura() {
	
	//console.log("Entrei na função incluirEstrutura")
	var posicao = $("#F_POSICAOCOMPLETA").val()
	
	// VERIFICA O NÍVEL E A POSIÇÃO QUE SERÁ INSERIDA
	verificaNivel()
	verificaPosicao()
	procuraPosicao(posicao)
	
	// PREENCHE A TABELA COM OS DADOS INSERIDOS E ATUALIZA AS INFORMAÇÕES
	var ret = preencherTabela()
	
	// SE PREENCHIMENTO FOI REALIZADO
	if(ret) {
		
		// SALVA A ÚLTIMA POSIÇÃO CADASTRADA
		$("#F_ULTIMAPOSICAO").val($("#F_POSICAOCOMPLETA").val())
		
		atualizar()
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})

		Toast.fire({
			  icon: 'success',
			  title: 'Item incluído com sucesso'
		})
		
		// ATIVA A ABA DESENHO
		ativaAbaDesenho()
		
		// COLOCA O FOCO NO CAMPO OS
		$("#F_OS").focus()
		
		// MOSTRA O ÍCONE DA DIV
		//$(".beforeCroqui").show();
		//$("#ICONRtxtHistoricoITMMOV").show()
		
		// HABILITA CAMPO NÍVEL
		$("#F_NIVEL").prop("readonly",false)
	
	}
	
	// COLOCA O FOCO NO CAMPO OS DO FORMULÁRIO
	$("#F_OS").focus()
	//$(".F_MATERIAL_ZOOM").show()
	//$(".F_MATERIAL").hide()
	
}*/

// CANCELA A ALTERAÇÃO DO ITEM SELECIONADO
function cancelar() {
	
	//console.log("entrei para cancelar edição")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
	
		var atv = $("#ATIVIDADE").val()
		var radio4 = $("#VALOR_RADIO4").val()
		
		// SE ATV FOR INICIAL OU DE EDIÇÃO DA ESTRUTURA
		if(atv==0 || atv==4 || atv==11){
			
			$(".RADIO3").show()
			
			// SE RADIO4 JÁ FOI SELECIONADO
			if(!(radio4=="" || radio4==undefined || radio4==null)){
				
				$(".RADIO4").show()
				
			}
			
		}
		
		// SE ATV FOR DE APROVAÇÃO
		if(atv==14){
		
			$(".RADIO4").show()
			$(".APROVACAO").show()
			
		}
		
		// SALVA O VALOR DO ÍNDICE
		var indice = $("#F_INDICE").val()
		var indiceCorrente = indice
		var indicePai = $("#INDICEPAI").val()
		
		console.log("indiceCorrente: "+indiceCorrente+", indicePai: "+indicePai)
		
		indice = indice.toString()
		
		indice = indice.replace(/\./g,"P")
		
		// LIMPA OS CAMPOS DO FORMULÁRIO
		limparForm()
			
		// HABILITA OS CAMPOS
		//habilitaCampos()
		
		$(".CABECALHO").show()
		$(".INFO_OS").hide()
		//$(".BOTOES_CAB").hide()
		$(".VIEW").show()
		$(".FORMULARIO").hide()
		//$(".INCLUIR_CAB").show()
		$(".SOLABERTAS").show()
		
		// LIMPA CAMPOS DO CABEÇALHO
		limpaCabIndice()
		
		// TIRA A SELEÇÃO DA VIEW
		//tiraSelecaoSpan()
		//colocaSelecaoSpan()
								
		//indice = indice.replace(/\./g,"P")
		
		// SE ÍNDICE CORRENTE NÃO É O ÍNDICE PAI
		if(!(indiceCorrente==indicePai)){
			
			//$("#SPANINTERNO"+indice+"").prop('onclick',null).off('click')
			$("#SPANINTERNO"+indice+"").click()
			$(".fluigicon-copy").mouseout()
			//$("#SPANINTERNO"+indice+"").prop('onclick','exibeAlertaPai()')
			
			console.log("vou colocar a seleção em SPANINTERNO"+indice)
		
		} /*else {
			// SE NÃO
			
			//$("#SPANINTERNO"+indice+"").prop('onclick',null).off('click')
			//$("#SPANINTERNO"+indice+"").click()
			$("#SPANINTERNO"+indice+"").mouseover()
			//$(".fluigicon-copy").mouseout()
			//$("#SPANINTERNO"+indice+"").prop('onclick','exibeAlertaPai()')
			
			console.log("vou colocar a seleção em SPANINTERNO"+indice)
			
		}*/

		var cor = coresOrdenadas($("#F_INDICE").val())
		cor=cor[0];
		cor=cor.substring(7,cor.length)
		cor=cor.substring(0,cor.length-2)
		$("#SPANINTERNO"+indice+"").prev().children().attr("style",cor);
		
	},500)
		
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
	
}

// LIBERA A EDIÇÃO DO ITEM SELECIONADO
function editar() {
	
	//console.log("entrei para editar")
	
	// MOSTRA/ESCONDE OS BOTÕES
	$(".EDITAR").hide()
	$(".SALVAR").show()
	$(".SALVAR2").show()
	$(".REMOVER").show()

	var idCriacao = $("#F_IDCRIACAO").val()
	var tipoDesenho = $("#VALOR_RADIO2").val()
	
	console.log("idCriacao: "+idCriacao)
	
	// SE ITEM É UM DOS QUE FORAM PARALISADOS OU UM ITEM NOVO
	//if(itemParalisado(idCriacao) || itemNovo(idCriacao)){
		
		console.log("item foi paralisado")
		
		// HABILITA TODOS OS CAMPOS PARA SEREM PREENCHIDOS
		habilitaCampos()
		
	/*} else {
		
		console.log("item não foi paralisado")
		
		// HABILITA SOMENTE OS CAMPOS DA ABA DESENHO PARA SEREM PREENCHIDOS/EDITADOS
		habilitaCamposAbaDesenho()
		
	}*/
	
	// SE NÃO É UM NÃO MANUFATURADO
	if(!(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO")){

		$("#ADICIONARPROCESSO").show()
		
		// VERIFICA SE TEM REGISTROS PARA LIBERAR OU NÃO FUNCIONALIDADE DE CÓPIA
		verificaItensCopia()
		
	}		
	
}

//SALVA AS ALTERAÇÕES NA TABELA DO ITEM SELECIONADO
function salvar2(op) {
	
	console.log("entrei para salvar as alterações do item")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
	
		var seqTabela = ""
		var indiceAtual = "" 
		var indiceForm = ""
		var indice = $("#F_INDICE").val()
		indice = indice.toString()
		var numOS = $("#NUM_OS").val()
		var idCriacao = $("#F_IDCRIACAO").val()
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var constraints = new Array(c1);
		
		//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
		dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
		
		// QUANTIDADE DE REGISTROS DA CONSULTA
		var row = dataset.values;
		var countRow = dataset.values.length
			
		// SE É DO CABECALHO
		/*if(op=='c'){
			
			seqTabela = $("#SEQ_INFO").val()	
			console.log("seq: "+seqTabela)
			indiceForm = $("#INDICE_INFO").val()
			indiceAtual = $("#INDICE___"+seqTabela).val()
			
			console.log("indiceAtual: "+indiceAtual+", indiceForm: "+indiceForm)
			
		}
		
		// SE É DO FORMULÁRIO
		if(op=='f'){
			
			seqTabela = $("#F_SEQ").val()
			console.log("seq: "+seqTabela)
			indiceForm = $("#F_INDICE").val()	
			indiceAtual = $("#INDICE___"+seqTabela).val()
			console.log("indiceAtual: "+indiceAtual+", indiceForm: "+indiceForm)
			
		}
		
		// SE A POSIÇÃO FOI ALTERADA
		if(!(indiceAtual==indiceForm)){
			
			var posicaoCompletaAtual = $("#INDICE___"+seqTabela).val()
			
			console.log("o índice foi alterado")
			
			// ATUALIZA O CAMPO ÚLTIMA POSIÇÃO
			//$("#F_ULTIMAPOSICAO").val(posicaoCompletaAtual)
		
			$("#INDICEANTIGO___"+seqTabela).val(indiceAtual)
			
			var indiceAntigo = $("#INDICEANTIGO___"+seqTabela).val()
			console.log("indiceAntigo: "+indiceAntigo)
			
			// VERIFICA A POSIÇÃO SEM LIMPAR OS DADOS
			//verificaPosicaoAlterada('s')
			verificaAlteracaoIndice(indiceForm,indiceAntigo,seqTabela)
			
			
		} else {*/
			// SE A POSIÇÃO NÃO FOI ALTERADA
			
			// VERIFICA A POSIÇÃO LIMPANDO OS DADOS
			//verificaPosicao('c')
			
		var tipoDesenho = $("#VALOR_RADIO2").val()
		var desQtde = $("#F_DESQTDE").val()
		var pesoBruto = $("#F_PESOBRUTO").val()
		var undMedida = $("#F_UNDMEDIDA").val()
		var codTarefa = $("#F_CODIGOTAREFA").val()
		var qtdeUnComp = $("#VALOR_RADIO4").val()
		var comporLista = $("#F_COMPORLISTA").is(":checked")
		var retComp = false
		var retQtdeComp = false
		var retProc = false
		var prioridadeMil = false
		var condicao
		
		// SE É UM NÃO MANUFATURADO
		if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
			
			if(comporLista){
				
				condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined) || (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined)
				
			} else {
				
				condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined)
				
			}
					
		}else{
			// SE NÃO
			
			if(comporLista){
				
				condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(undMedida=="" || undMedida==null || undMedida==undefined) || (codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined) || (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
					
			}else{
				
				condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(undMedida=="" || undMedida==null || undMedida==undefined) || (codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined)  
						
			}
					
		}
	
		console.log("condição: "+condicao)
			
		// SE OS CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
		if( condicao ){
			
			console.log("campos obrigatórios não preenchidos")
			
			// SE É UM NÃO MANUFATURADO
			if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
				
				if(comporLista){
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Necessário informar o Tipo, Quantidade, o Código da tarefa, o Peso Bruto e a Quantidade Unitária do Componente!',
						  text: 'Verifique e tente novamente'
					})
					
				} else {
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Necessário informar o Tipo, o Código da tarefa, o Peso Bruto e a Quantidade!',
						  text: 'Verifique e tente novamente'
					})
				
				}
				
			} else {
				// SE NÃO
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Necessário informar o Tipo, Quantidade, Unidade de medida, o Código da tarefa, o Peso Bruto e a Quantidade Unitária do Componente!',
					  text: 'Verifique e tente novamente'
				})
				
			}
	
			// DESATIVA O LOAD
			setTimeout(function(){
					
				myLoading2.hide();
					
			}, 500)
			
			return false
			
		} else {
		// SE NÃO, SE FORAM PREENCHIDOS
				
				// SE TABELA VIEW DE COMPONENTES FOI CRIADA
				if(tabelaComponentesExiste()){
					
					console.log("TEM ITENS NA TABELA COMPONENTES")
						
					// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
					$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
						
						var seq = $(this).attr("id").split("___")[1]
						
						var produtoComp = $("#VIEWPRODUTOCOMPONENTES___"+seq).val()
						var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
						var prioridadeAtv = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
						var qtdeUnComp = $("#VIEWQTDEUNCOMPONENTES___"+seq).val()
						var qtdeTotalComp = $("#VIEWQTDETOTALCOMPONENTES___"+seq).val()
						var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
						
						// SE É UM NÃO MANUFATURADO
						if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
					
							if(produtoComp=="" || produtoComp==null || produtoComp==undefined){
								
								retComp = true
								
							}
							
							if( (substituto=="" || substituto==null || substituto==undefined) && ( (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
									|| (qtdeTotalComp=="" || qtdeTotalComp==null || qtdeTotalComp==undefined) ) ){
								
							
								retQtdeComp = true
								
							}
							
						} else {
							
							if((produtoComp=="" || produtoComp==null || produtoComp==undefined) || (!(lista=="L") && (prioridadeAtv=="" || prioridadeAtv==null || prioridadeAtv==undefined))){
								
								retComp = true
								
								
								
							}
							
							if( (substituto=="" || substituto==null || substituto==undefined) && ( (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
									|| (qtdeTotalComp=="" || qtdeTotalComp==null || qtdeTotalComp==undefined) ) ){
								
							
								retQtdeComp = true
								
							}
	
						}
						
					})
					
					if(retQtdeComp){
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'Há campos de quantidade unitária e/ou total de compenentes que não foram preenchidos!',
							  text: 'Verifique e tente novamente'
						})
					
						// DESATIVA O LOAD
						setTimeout(function(){
								
							myLoading2.hide();
								
						}, 500)
						
						return false
						
					} else
					
					if(retComp){
						
						console.log("VOU EXIBIR O ALERTA")
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'Há campos obrigatórios na tabela de Componentes que não foram preenchidos!',
							  text: 'Verifique e tente novamente'
						})
					
						// DESATIVA O LOAD
						setTimeout(function(){
								
							myLoading2.hide();
								
						}, 500)
						
						return false
						
					}
					
				}
				
				//
				if(!retComp && !retQtdeComp){
						
					// SE TABELA VIEW DE PROCESSOS FOI CRIADA
					if(tabelaProcessoExiste()){
						
						var prioridadesErro = new Array()
						
						// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
						$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
							
							var seq = $(this).attr("id").split("___")[1]
							
							var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
							var atv = $("#VIEWATIVIDADE___"+seq).val()
							var habilidade = $("#VIEWHABILIDADEREQUERIDA___"+seq).val()
							var posto = $("#VIEWPOSTO___"+seq).val()
							var minutos = $("#VIEWMINUTOSGASTOS___"+seq).val()
							var descProcesso = $("#VIEWDESCPROCESSO___"+seq).val()
							
							if((prioridade=="" || prioridade==null || prioridade==undefined) || (atv=="" || atv==null || atv==undefined)
									|| (habilidade=="" || habilidade==null || habilidade==undefined) || (posto=="" || posto==null || posto==undefined)
									|| (minutos=="" || minutos==null || minutos==undefined) || (descProcesso=="" || descProcesso==null || descProcesso==undefined)){
								
								prioridadesErro.push(prioridade)
								
								retProc = true
								
							}
							
							if(prioridade==1000){
								console.log("achei a prioridade 1000")
								prioridadeMil=true
								
							}
						
						})
						
						if(retProc){
							
							var msg = ""
								
								for(var i=0; i<prioridadesErro.length; i++){
									
									if(i==0){
										
										msg = prioridadesErro[i]
										
									} else {
										
										msg = msg +", "+prioridadesErro[i]
										
									}
									
								}
								
								// EXIBE ALERTA
								Swal.fire({
									  icon: 'error',
									  title: 'Há campos obrigatórios na tabela de Processos que não foram preenchidos!',
									  text: 'Verifique as prioridades : '+msg 
								})
								
								// DESATIVA O LOAD
								setTimeout(function(){
										
									myLoading2.hide();
										
								}, 500)
								
								return false
							
						} 
						
						/*if(!prioridadeMil){
							
							console.log("não existe prioridade 1000")
							
							retProc = true
							
							// EXIBE ALERTA
							Swal.fire({
								  icon: 'error',
								  title: 'É necessário incluir ao menos uma atividade com prioridade valor "1000"!',
								  text: 'Verifique e tente novamente'
							})
							
							desativaSpinner()
							
							return false
							
						}*/
						
					}
					
				}
			
				// SE PROCESSO E COMPONENTES FOI CONCLUÍDO
				if(!retProc && !retComp){
					
					console.log("indice não foi alterado")
					
					var numDesenho = ""
					var descricao = ""
					var posicao = ""
						
					// SE É DO CABEÇALHO
					if(op=='c'){
						
						numDesenho = $("#NUMDESENHO_INFO").val()
						descricao = $("#DESCRICAO_INFO").val()
						posicao = $("#POSICAO_INFO").val()
						
						console.log("numDesenho: "+numDesenho+", descricao: "+descricao)
						
						// SALVAR AS INFORMAÇÕES NO FORMULÁRIO
						$("#F_NUMDESENHO").val(numDesenho)
						$("#F_DESCRICAO").val(descricao)
						$("#F_POSICAODESENHO").val(posicao)
						
						//$(".BOTOES_CAB").hide()
						//$(".INCLUIR_CAB").show()
						
					}
					
					// FINALIZA A OPERAÇÃO DE SALVAR
					finalizarSalvar(1)
					
					// LIMPA TABELA VIEW DE PROCESSOS
					limparTabelaProcessos()
					
					// CARREGA TABELA VIEW DE PROCESSOS
					preencheTabelaProcessos(idCriacao)
					
					// FAZ A ALTERAÇÃO DO CÁLCULO DAS QUANTIDADES 
					//alteraDesQtdeGeral()
					
				}/* else {
					
					console.log("indice não foi alterado")
					
					var numDesenho = ""
					var descricao = ""
					var posicao = ""
						
					// SE É DO CABEÇALHO
					if(op=='c'){
						
						numDesenho = $("#NUMDESENHO_INFO").val()
						descricao = $("#DESCRICAO_INFO").val()
						posicao = $("#POSICAO_INFO").val()
						
						console.log("numDesenho: "+numDesenho+", descricao: "+descricao)
						
						// SALVAR AS INFORMAÇÕES NO FORMULÁRIO
						$("#F_NUMDESENHO").val(numDesenho)
						$("#F_DESCRICAO").val(descricao)
						$("#F_POSICAODESENHO").val(posicao)
						
						//$(".BOTOES_CAB").hide()
						//$(".INCLUIR_CAB").show()
						
					}
					
					// FINALIZA A OPERAÇÃO DE SALVAR
					finalizarSalvar()
					
					// FAZ A ALTERAÇÃO DO CÁLCULO DAS QUANTIDADES 
					alteraDesQtdeGeral()
					
				} */
				
			//}
					
		}
		
		/*indice = indice.replace(/\./g,"P")
		
		$("#SPANINTERNO"+indice+"").click()
		$(".fluigicon-copy").mouseout()
							
		console.log("vou colocar a selecao em SPANINTERNO"+indice)*/
		
	
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)	
	
}

// SALVA AS ALTERAÇÕES NA TABELA DO ITEM SELECIONADO
function salvar(op) {
	
	console.log("entrei para salvar as alterações do item")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
	
		var seqTabela = ""
		var indiceAtual = "" 
		var indiceForm = ""
		var indice = $("#F_INDICE").val()
		indice = indice.toString()
		var nivel = indice.substr(0,indice.lastIndexOf("."))
		var numOS = $("#NUM_OS").val()
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var constraints = new Array(c1);
		
		//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
		dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
		
		// QUANTIDADE DE REGISTROS DA CONSULTA
		var row = dataset.values;
			
		// SE É DO CABECALHO
		/*if(op=='c'){
			
			seqTabela = $("#SEQ_INFO").val()	
			console.log("seq: "+seqTabela)
			indiceForm = $("#INDICE_INFO").val()
			indiceAtual = $("#INDICE___"+seqTabela).val()
			
			console.log("indiceAtual: "+indiceAtual+", indiceForm: "+indiceForm)
			
		}
		
		// SE É DO FORMULÁRIO
		if(op=='f'){
			
			seqTabela = $("#F_SEQ").val()
			console.log("seq: "+seqTabela)
			indiceForm = $("#F_INDICE").val()	
			indiceAtual = $("#INDICE___"+seqTabela).val()
			console.log("indiceAtual: "+indiceAtual+", indiceForm: "+indiceForm)
			
		}
		
		// SE A POSIÇÃO FOI ALTERADA
		if(!(indiceAtual==indiceForm)){
			
			var posicaoCompletaAtual = $("#INDICE___"+seqTabela).val()
			
			console.log("o índice foi alterado")
			
			// ATUALIZA O CAMPO ÚLTIMA POSIÇÃO
			//$("#F_ULTIMAPOSICAO").val(posicaoCompletaAtual)
		
			$("#INDICEANTIGO___"+seqTabela).val(indiceAtual)
			
			var indiceAntigo = $("#INDICEANTIGO___"+seqTabela).val()
			console.log("indiceAntigo: "+indiceAntigo)
			
			// VERIFICA A POSIÇÃO SEM LIMPAR OS DADOS
			//verificaPosicaoAlterada('s')
			verificaAlteracaoIndice(indiceForm,indiceAntigo,seqTabela)
			
			
		} else {*/
			// SE A POSIÇÃO NÃO FOI ALTERADA
			
			// VERIFICA A POSIÇÃO LIMPANDO OS DADOS
			//verificaPosicao('c')
			
		var tipoDesenho = $("#VALOR_RADIO2").val()
		var desQtde = $("#F_DESQTDE").val()
		var pesoBruto = $("#F_PESOBRUTO").val()
		var undMedida = $("#F_UNDMEDIDA").val()
		var codTarefa = $("#F_CODIGOTAREFA").val()
		var qtdeUnComp = $("#VALOR_RADIO4").val()
		var comporLista = $("#F_COMPORLISTA").is(":checked")
		var retComp = false
		var retQtdeComp = false
		var retProc = false
		var prioridadeMil = false
		var condicao
		
		// SE É UM NÃO MANUFATURADO
		if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
			
			if(comporLista){
				
				condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined) || (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined)
				
			} else {
				
				condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined)
				
			}
					
		}else{
			// SE NÃO
			
			if(comporLista){
				
				condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(undMedida=="" || undMedida==null || undMedida==undefined) || (codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined) || (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
					
			}else{
				
				condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(undMedida=="" || undMedida==null || undMedida==undefined) || (codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined)  
						
			}
					
		}
	
		console.log("condição: "+condicao)
			
		// SE OS CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
		if( condicao ){
			
			console.log("campos obrigatórios não preenchidos")
			
			// SE É UM NÃO MANUFATURADO
			if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
				
				if(comporLista){
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Necessário informar o Tipo, Quantidade, o Código da tarefa, o Peso Bruto e a Quantidade Unitária do Componente!',
						  text: 'Verifique e tente novamente'
					})
					
				} else {
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Necessário informar o Tipo, o Código da tarefa, o Peso Bruto e a Quantidade!',
						  text: 'Verifique e tente novamente'
					})
				
				}
				
			} else {
				// SE NÃO
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Necessário informar o Tipo, Quantidade, Unidade de medida, o Código da tarefa, o Peso Bruto e a Quantidade Unitária do Componente!',
					  text: 'Verifique e tente novamente'
				})
				
			}
	
			// DESATIVA O LOAD
			setTimeout(function(){
					
				myLoading2.hide();
					
			}, 500)
			
			return false
			
		} else {
		// SE NÃO, SE FORAM PREENCHIDOS
				
			// SE TABELA VIEW DE COMPONENTES FOI CRIADA
			if(tabelaComponentesExiste()){
				
				console.log("TEM ITENS NA TABELA COMPONENTES")
					
				// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
				$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
					
					var seq = $(this).attr("id").split("___")[1]
					
					var produtoComp = $("#VIEWPRODUTOCOMPONENTES___"+seq).val()
					var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
					var prioridadeAtv = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
					var qtdeUnComp = $("#VIEWQTDEUNCOMPONENTES___"+seq).val()
					var qtdeTotalComp = $("#VIEWQTDETOTALCOMPONENTES___"+seq).val()
					var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
					
					// SE É UM NÃO MANUFATURADO
					if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
				
						if(produtoComp=="" || produtoComp==null || produtoComp==undefined){
							
							retComp = true
							
						}
						
						if( (substituto=="" || substituto==null || substituto==undefined) && ( (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
								|| (qtdeTotalComp=="" || qtdeTotalComp==null || qtdeTotalComp==undefined) ) ){
							
						
							retQtdeComp = true
							
						}
						
					} else {
						
						if((produtoComp=="" || produtoComp==null || produtoComp==undefined) || (!(lista=="L") && (prioridadeAtv=="" || prioridadeAtv==null || prioridadeAtv==undefined))){
							
							retComp = true
							
							
							
						}
						
						if( (substituto=="" || substituto==null || substituto==undefined) && ( (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
								|| (qtdeTotalComp=="" || qtdeTotalComp==null || qtdeTotalComp==undefined) ) ){
							
						
							retQtdeComp = true
							
						}

					}
					
				})
				
				if(retQtdeComp){
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Há campos de quantidade unitária e/ou total de compenentes que não foram preenchidos!',
						  text: 'Verifique e tente novamente'
					})
				
					// DESATIVA O LOAD
					setTimeout(function(){
							
						myLoading2.hide();
							
					}, 500)
					
					return false
					
				} else
				
				if(retComp){
					
					console.log("VOU EXIBIR O ALERTA")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Há campos obrigatórios na tabela de Componentes que não foram preenchidos!',
						  text: 'Verifique e tente novamente'
					})
				
					// DESATIVA O LOAD
					setTimeout(function(){
							
						myLoading2.hide();
							
					}, 500)
					
					return false
					
				}
				
			}
			
			//
			if(!retComp && !retQtdeComp){
					
					// SE TABELA VIEW DE PROCESSOS FOI CRIADA
					if(tabelaProcessoExiste()){
					
						var prioridadesErro = new Array()
						
						// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
						$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
							
							var seq = $(this).attr("id").split("___")[1]
							
							var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
							var atv = $("#VIEWATIVIDADE___"+seq).val()
							var habilidade = $("#VIEWHABILIDADEREQUERIDA___"+seq).val()
							var posto = $("#VIEWPOSTO___"+seq).val()
							var minutos = $("#VIEWMINUTOSGASTOS___"+seq).val()
							var descProcesso = $("#VIEWDESCPROCESSO___"+seq).val()
							
							if((prioridade=="" || prioridade==null || prioridade==undefined) || (atv=="" || atv==null || atv==undefined)
									|| (habilidade=="" || habilidade==null || habilidade==undefined) || (posto=="" || posto==null || posto==undefined)
									|| (minutos=="" || minutos==null || minutos==undefined) || (descProcesso=="" || descProcesso==null || descProcesso==undefined)){
								
								prioridadesErro.push(prioridade)
								retProc = true
								
							}
							
							if(prioridade==1000){
								console.log("achei a prioridade 1000")
								prioridadeMil=true
								
							}
						
						})
						
						if(retProc){
							
							var msg = ""
								
							for(var i=0; i<prioridadesErro.length; i++){
								
								if(i==0){
									
									msg = prioridadesErro[i]
									
								} else {
									
									msg = msg +", "+prioridadesErro[i]
									
								}
								
							}
							
							// EXIBE ALERTA
							Swal.fire({
								  icon: 'error',
								  title: 'Há campos obrigatórios na tabela de Processos que não foram preenchidos!',
								  text: 'Verifique as prioridades : '+msg 
							})
							
							// DESATIVA O LOAD
							setTimeout(function(){
									
								myLoading2.hide();
									
							}, 500)
														
							return false
							
						} 
						
						/*if(!prioridadeMil){
							
							console.log("não existe prioridade 1000")
							
							retProc = true
							
							// EXIBE ALERTA
							Swal.fire({
								  icon: 'error',
								  title: 'É necessário incluir ao menos uma atividade com prioridade valor "1000"!',
								  text: 'Verifique e tente novamente'
							})
							
							desativaSpinner()
							
							return false
							
						}*/
						
					}
					
				}
			
				// SE PROCESSO E COMPONENTES FOI CONCLUÍDO
				if(!retProc && !retComp){
					
					console.log("indice não foi alterado")
					
					var numDesenho = ""
					var descricao = ""
					var posicao = ""
						
					// SE É DO CABEÇALHO
					if(op=='c'){
						
						numDesenho = $("#NUMDESENHO_INFO").val()
						descricao = $("#DESCRICAO_INFO").val()
						posicao = $("#POSICAO_INFO").val()
						
						console.log("numDesenho: "+numDesenho+", descricao: "+descricao)
						
						// SALVAR AS INFORMAÇÕES NO FORMULÁRIO
						$("#F_NUMDESENHO").val(numDesenho)
						$("#F_DESCRICAO").val(descricao)
						$("#F_POSICAODESENHO").val(posicao)
						
						//$(".BOTOES_CAB").hide()
						//$(".INCLUIR_CAB").show()
						
					}
					
					// FINALIZA A OPERAÇÃO DE SALVAR
					finalizarSalvar(2)
					
					// FAZ A ALTERAÇÃO DO CÁLCULO DAS QUANTIDADES 
					//alteraDesQtdeGeral(row)
					
				}/* else {
					
					console.log("indice não foi alterado")
					
					var numDesenho = ""
					var descricao = ""
					var posicao = ""
						
					// SE É DO CABEÇALHO
					if(op=='c'){
						
						numDesenho = $("#NUMDESENHO_INFO").val()
						descricao = $("#DESCRICAO_INFO").val()
						posicao = $("#POSICAO_INFO").val()
						
						console.log("numDesenho: "+numDesenho+", descricao: "+descricao)
						
						// SALVAR AS INFORMAÇÕES NO FORMULÁRIO
						$("#F_NUMDESENHO").val(numDesenho)
						$("#F_DESCRICAO").val(descricao)
						$("#F_POSICAODESENHO").val(posicao)
						
						//$(".BOTOES_CAB").hide()
						//$(".INCLUIR_CAB").show()
						
					}
					
					// FINALIZA A OPERAÇÃO DE SALVAR
					finalizarSalvar()
					
					// FAZ A ALTERAÇÃO DO CÁLCULO DAS QUANTIDADES 
					alteraDesQtdeGeral()
					
				} */
				
			//}
					
		}
		
		if(!(nivel=="" || nivel==null || nivel==undefined)){
			
			indice = indice.replace(/\./g,"P")
			
			$("#SPANINTERNO"+indice+"").click()
			$(".fluigicon-copy").mouseout()
									
		}
		
		limparForm()
		
		console.log("vou colocar a selecao em SPANINTERNO"+indice)

		var cor = coresOrdenadas($("#F_INDICE").val())
		cor=cor[0];
		cor=cor.substring(7,cor.length)
		cor=cor.substring(0,cor.length-2)
		$("#SPANINTERNO"+indice+"").prev().children().attr("style",cor);
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
	
}

// ALTERAR ÍNDICE OU CONTEÚDO DA TABELA E DO CABEÇALHO
function alterarCab(){
	
	// VERIFICA E SALVA AS ALTERAÇÕES
	salvar('c')
	
	// ATUALIZAR
	atualizar()
	
	// MOSTRA/ESCONDE CAMPOS
	//$(".BOTOES_CAB").hide()
	//$(".INCLUIR_CAB").show()
	
}

// REMOVE ITEM DA ESTRUTURA
function removerCab(){
	
	var numDesenho = $("#NUMDESENHO_INFO").val()
	
	// SE NUMDESENHO NÃO FOI PREENCHIDO
	if(!(numDesenho=="")){
	
		// ALERTA PARA REMOVER
		alertaRemover()
		
	}else{
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'error',
			  title: 'Não é possível remover!'
		})
		
		
	}
	
}

// CANCELA ALTERAÇÕES NO ÍNDICE
function cancelarCab(){
	
	// LIMPA OS CAMPOS DO CABEÇALHO
	$("#INDICE_INFO").val("")
	$("#NUMDESENHO_INFO").val("")
	$("#DESCRICAO_INFO").val("")
	$("#SEQ_INFO").val("")
	
	// ESCONDE/MOSTRA CAMPOS NECESSÁRIOS
	$(".BOTOES_CAB").hide()
	$(".INCLUIR_CAB").show()
	
}

// REMOVE O ITEM SELECIONADO DA ESTRUTURA
function remover() {
	
	//console.log("entrei para remover o item da estrutura")
	var atv = $("#ATIVIDADE").val()
	var radio4 = $("#VALOR_RADIO4").val()
	
	//var indice = $("#F_INDICE").val()
		
	var indice = $("#INDICE_INFO").val()
	
	console.log("vou remover o índice: "+indice+" e seus filhos")
	
	//var irmaoDireita = buscaIrmaoDireita(posicaoCompleta)
	
	var indices = retornaArrayIndices()
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	
	var idCriacao = buscaIdCriacao(nivel)
	
	/// REMOVE TODOS OS FILHOS
	removeFilhos(indice,0,indices)
	
	//indices = retornaArrayIndices()
	
	// DECREMENTA INDICE DOS IRMAOS A DIREITA
	decrementaIndice(indice,indices)
	
	// SE NÃO É A ATIVIDADE DE APROVAÇÃO
	if(atv==0 || atv==4 || atv==11){
		
		// SE RADIO4 JÁ FOI SELECIONADO
		if(!(radio4=="" || radio4==undefined || radio4==null)){
			
			$(".RADIO4").show()
			
		}
		
	}
	
	var indicePai = $("#INDICEPAI").val()
	
    // SE NÍVEL NÃO É O PAI PRINCIPAL
    if(nivel.includes(".") && !(nivel==indicePai)){
            
        var nivel2 = nivel.substr(0,nivel.lastIndexOf("."))
        var idCriacaoPai = buscaIdCriacao(nivel2)
        
        // ATUALIZA AS INFORMAÇÕES
        atualizarNivel(idCriacaoPai)
        
    } else {
        // SE NÃO
        
        atualizarNovo()
        
    }
	
	// LIMPA OS CAMPOS DO CABEÇALHO
	$("#INDICE_INFO").val("")
	$("#NUMDESENHO_INFO").val("")
	$("#DESCRICAO_INFO").val("")
	$("#POSICAO_INFO").val("")
	
	// SE TABELA NÃO TEM ITENS
	if(!(tabelaTemItens())){
		
		$(".BOTOES_CAB").hide()
		$(".INFO_INDICE_PAI").show()
		
	}
	
}

// VOLTAR PARA VIEW DA ESTRUTURA
function voltar(){
	
	// VARIÁVEL PARA ATIVIDADE
	var atv = $("#ATIVIDADE").val(); 
	var radio4 = $("#VALOR_RADIO4").val()
	
	// ESCONDE/EXIBE CAMPOS NECESSÁRIOS
	$(".VIEW").show()
	$(".CABECALHO").show()
	$(".INFO_OS").hide()
	$(".FORMULARIO").hide()
	
	// SE ATIVIDAD É A DE EDITAR
	if(atv==0 || atv==11 || atv==4){
		
		$(".RADIO3").hide()
		
		// SE RADIO4 JÁ FOI SELECIONADO
		if(!(radio4=="" || radio4==undefined || radio4==null)){
			
			$(".RADIO4").hide()
			
		}
		
	}
	
	// SE ATIVIDADE É A DE APROVAR
	if(atv==14){
		
		$(".RADIO4").hide()
		
	}
	
	// ESCONDE/EXIBE BOTÕES NECESSÁRIOS
	$(".EXIBIRVIEW").hide()
	//$(".FECHARVIEW").show()
	
}

// ESCONDE VIEW DA ESTRUTURA
function fecharView(){
	
	// VARIÁVEL PARA ATIVIDADE
	var atv = $("#ATIVIDADE").val();
	var radio4 = $("#VALOR_RADIO4").val()
	
	// ESCONDE/EXIBE CAMPOS NECESSÁRIOS
	$(".VIEW").hide()
	$(".ABAS_GERAL").show()
	$(".CONTEUDO_ABAS").show()
	$(".BOTOES").show()
	$(".LINHAVIEW").show()
	$(".CABECALHO").show()
	
	//
	if(atv==11 || atv==4 || atv==0){
		
		$(".RADIO3").show()
		
		// SE RADIO4 JÁ FOI SELECIONADO
		if(!(radio4=="" || radio4==undefined || radio4==null)){
			
			$(".RADIO4").show()
			
		}
		
	}
	
	//
	if(atv==14){
		
		$(".RADIO4").show()
		
	}
	
	// ESCONDE/EXIBE BOTÕES NECESSÁRIOS
	$(".FECHARVIEW").hide()
	$(".EXIBIRVIEW").show()
	
	// SE OS CAMPOS ESTÃO DESABILITADOS
	if ( $('#F_OS').prop('readonly') ) {
		
		// CANCELA CONTEÚDO DO FORMULÁRIO
		cancelar()
		
	}
	
	// ATIVA A ABA DESENHO
	ativaAbaDesenho()
		
	// COLOCA O FOCO NO CAMPO OS
	$("#F_OS").focus()
	
}

// LIMPA OS CAMPOS DA ABA DESENHO
function limpar(){
	
	// LIMPA OS CAMPOS DO FORMULÁRIO
	$("#F_TITULOITEM").val("")
	$("#F_OS").val("")
	$("#F_DATAREVISAO").val("")
	$("#F_NUMDBI").val("")
	$("#F_REVISAODBI").val("")
	$("#F_NUMDESENHO").val("")
	$("#F_REVISAODESENHO").val("")
	$("#F_DESQTDE").val("")
	$("#F_TOTALQTDE").val("")
	$("#F_QUANTIDADEMATERIAL").val("")
	$("#F_OBSERVACOESDESENHO").val("")
	$("#VALOR_RADIO2").val("")
	$("#F_PRODUTO_RM").val("")
	$("#F_IDPRD").val("")
	$("#F_CODIGOPRD").val("")
	$("#F_UNDMEDIDA").val("")
	
	$("#F_CODIGOTAREFA").val("")
	$("#F_CODTRFITEM").val("")
	$("#F_IDTRFITEM").val("")
	$("#F_NOMETRFITEM").val("")
	
	// TIRA A SELEÇÃO DO CAMPO RADIO 1
	$("#RAD2_ACABADO").prop("checked",false)
	$("#RAD2_SEMI").prop("checked",false)
	//$("#RAD2_MP").prop("checked",false)
	
}

// FINALIZA FUNÇÃO DE SALVAR COM AS DEMAIS ALTERAÇÕES, ALÉM DA POSIÇÃO
function finalizarSalvar(op){
	
	var atv = $("#ATIVIDADE").val()
	var radio4 = $("#VALOR_RADIO4").val()
	
	// PERCORRE A TABELA E COLETA TODOS AS POSICOES
	/*$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var seqForm = $("#F_SEQ").val()
		//var seqForm = $("#SEQ_INFO").val()
		var seqTabela = $("#SEQ___"+seq).val()
		console.log("seqForm: "+seqForm+", seqTabela: "+seqTabela)
		console.log("estou percorrendo a tabela")
		
		// SE POSIÇÃO É IGUAL A DA TABELA
		if(seqForm==seqTabela){
			
			console.log("entrei para atualizar tabela")
			
			//var tituloitem = $("#F_TITULOITEM").val()
			//var qtdeMaterial = $("#F_QUANTIDADEMATERIAL").val()
			//var tipo = $("#VALOR_RADIO1").val()
			//var posicaoCompleta = $("#F_POSICAOCOMPLETA").val()
			//var categoria = $("#F_CATEGORIA").val()
			var posicaoIndice = $("#F_POSICAOINDICE").val()
			var posicaoDesenho = $("#F_POSICAODESENHO").val()
			var indiceAntigo = $("#F_INDICEANTIGO").val()
			var nivel = $("#F_NIVEL").val()
			var numdbi = $("#F_NUMDBI").val()
			var revisaodbi = $("#F_REVISAODBI").val()
			var numdesenho = $("#F_NUMDESENHO").val()
			var revisaodesenho = $("#F_REVISAODESENHO").val()
			var desqtde = $("#F_DESQTDE").val()
			var undMedida = $("#F_UNDMEDIDA").val()
			console.log("undMedida: "+undMedida)
			var totalqtde = $("#F_TOTALQTDE").val()
			var descricao = $("#F_DESCRICAO").val()
			var bitola = $("#F_BITOLA").val()
			var espessura = $("#F_ESPESSURA").val()
			var largura = $("#F_LARGURA").val()
			var massaLinear = $("#F_MASSALINEAR").val()
			var esprosca = $("#F_ESPROSCA").val()
			var diametroExterno = $("#F_DIAMETROEXTERNO").val()
			var diametroInterno = $("#F_DIAMETROINTERNO").val()
			var comprimento = $("#F_COMPRIMENTO").val()
			var produtoRM = $("#F_PRODUTO_RM").val()
			var idprd = $("#F_IDPRD").val()
			var codigoprd = $("#F_CODIGOPRD").val()
			var idCriacao = $("#F_IDCRIACAO").val()
			var os = $("#F_OS").val()
			var dataRevisao = $("#F_DATAREVISAO").val()
			var obsDesenho = $("#F_OBSERVACOESDESENHO").val()
			var pesoBruto = $("#F_PESOBRUTO").val()
			var pesoLiquido = $("#F_PESOLIQUIDO").val()
			var perimetroCorte = $("#F_PERIMETROCORTE").val()
			var areaPintura = $("#F_AREAPINTURA").val()
			var obsProcesso = $("#F_OBSPROCESSO").val()
			var obsGeral = $("#F_OBSGERAL").val()
			var tipoDesenho = $("#VALOR_RADIO2").val()
			var areaSecao = $("#F_AREASECAO").val()
			var altura = $("#F_ALTURA").val()
			var larguraAba = $("#F_LARGURAABA").val()
			var espAlma = $("#F_ESPALMA").val()
			var espAba = $("#F_ESPABA").val()
			var material = $("#F_MATERIAL").val()
			var indice = $("#F_INDICE").val()
			
			var codigoTarefa = $("#F_CODIGOTAREFA").val()
			var codtrf = $("#F_CODTRFITEM").val()
			var idtrf = $("#F_IDTRFITEM").val()
			var nomeTrf = $("#F_NOMETRFITEM").val()
	
			//var material = ""
			//var materialZoom = ""
			//var novoMaterial = ""
			//var idMaterial = ""
			//var codigoprd = ""
			//var checkbox1 = $("#CHECK_MATERIAL").is(':checked')
			//console.log("checkbox: "+checkbox1)
			
			//if(checkbox1){
			//	console.log("check habilitado, novo material")
			//	material = $("#F_MATERIAL").val()
			//	novoMaterial = $("#F_NOVOMATERIAL").val()
				
			//}else {
			//	console.log("check desabilitado, vou pegar dados do zoom")
			//	materialZoom = $("#F_MATERIAL_ZOOM").val()
			//	idMaterial = $("#F_IDMATERIAL").val()
			//	codigoprd = $("#F_CODIGOPRD").val()
				
			//}
			
			//var novaPosicao = $("#POSICAOCOMPLETA___"+seqTabela).val()
			
			// VERIFICA SE A POSIÇÃO FOI ALTERADA 
			///*if(alteraPosicao(posicaoCompleta, novaPosicao, seqTabela)){
				
				// ALTERA AS POSIÇÕES FILHAS
				//alteraArvore()
				
			//}
			
			//$("#TITULOITEM___"+seq).val(tituloitem)
			//$("#POSICAOCOMPLETA___"+seq).val(posicaoCompleta)
			//$("#QUANTIDADEMATERIAL___"+seq).val(qtdeMaterial)
			//$("#MATERIAL_ZOOM___"+seq).val(materialZoom)
			//$("#NOVOMATERIAL___"+seq).val(novoMaterial)
			//$("#IDMATERIAL___"+seq).val(idMaterial)
			//$("#CODIGOPRD___"+seq).val(codigoprd)
			//var categoria = $("#F_CATEGORIA").val()
			//$("#TIPO___"+seq).val(tipo)
			$("#POSICAOINDICE___"+seq).val(posicaoIndice)
			$("#POSICAODESENHO___"+seq).val(posicaoDesenho)
			$("#INDICEANTIGO___"+seq).val(indiceAntigo)
			$("#NIVEL___"+seq).val(nivel)
			$("#UNDMEDIDA___"+seq).val(undMedida)
			$("#DESCRICAO___"+seq).val(descricao)
			$("#NUMDBI___"+seq).val(numdbi)
			$("#REVISAODBI___"+seq).val(revisaodbi)
			$("#NUMDESENHO___"+seq).val(numdesenho)
			$("#REVISAODESENHO___"+seq).val(revisaodesenho)
			$("#DESQTDE___"+seq).val(desqtde)
			$("#TOTALQTDE___"+seq).val(totalqtde)
			$("#ESPESSURA___"+seq).val(espessura)
			$("#BITOLA___"+seq).val(bitola)
			$("#LARGURA___"+seq).val(largura)
			$("#MASSALINEAR___"+seq).val(massaLinear)
			$("#ESPROSCA___"+seq).val(esprosca)
			$("#DIAMETROEXTERNO___"+seq).val(diametroExterno)
			$("#DIAMETROINTERNO___"+seq).val(diametroInterno)
			$("#COMPRIMENTO___"+seq).val(comprimento)
			$("#MATERIAL___"+seq).val(material)
			$("#PRODUTORM___"+seq).val(produtoRM)
			$("#IDPRD___"+seq).val(idprd)
			$("#CODIGOPRD___"+seq).val(codigoprd)
			$("#OS___"+seq).val(os)
			$("#DATAREVISAO___"+seq).val(dataRevisao)
			$("#OBSERVACOESDESENHO___"+seq).val(obsDesenho)
			$("#PESOBRUTO___"+seq).val(pesoBruto)
			$("#PESOLIQUIDO___"+seq).val(pesoLiquido)
			$("#PERIMETROCORTE___"+seq).val(perimetroCorte)
			$("#AREAPINTURA___"+seq).val(areaPintura)
			$("#OBSPROCESSO___"+seq).val(obsProcesso)
			$("#OBSGERAL___"+seq).val(obsGeral)
			$("#TIPODESENHO___"+seq).val(tipoDesenho)
			$("#AREASECAO___"+seq).val(areaSecao)
			$("#ALTURA___"+seq).val(altura)
			$("#LARGURAABA___"+seq).val(larguraAba)
			$("#ESPALMA___"+seq).val(espAlma)
			$("#ESPABA___"+seq).val(espAba)
			$("#INDICE___"+seq).val(indice)
			
			$("#CODIGOTAREFADESC___"+seq).val(codigoTarefa)
			$("#CODTRFITEM___"+seq).val(codtrf)
			$("#IDTRFITEM___"+seq).val(idtrf)
			$("#NOMETRFITEM___"+seq).val(nomeTrf)
			
			// SE ITEM IRÁ COMPOR A LISTA
			if($("#F_COMPORLISTA").prop("checked")){
				
				$("#COMPORLISTA___"+seq).val("SIM")
				
			} else {
				// SE NÃO
				
				$("#COMPORLISTA___"+seq).val("NAO")
				
			}
			
		}
		
	})*/
	
	var idCriacao = $("#F_IDCRIACAO").val()
	
	// SALVA AS ALTERAÇÕES NO BANCO
	salvaAlteracoesBanco(idCriacao)
	
	// APAGA TODOS OS ITENS DA TABELA COMPONENTES DO IDCRIAÇÃO ANTES DE SALVAR
	apagaItensTabelaComponentes(idCriacao)
	
	// APAGA TODOS OS ITENS DA TABELA PROCESSOS DO IDCRIAÇÃO ANTES DE SALVAR
	apagaItensTabelaProcessos(idCriacao)
	
	// CARREGA TABELA DE COMPONENTES
	carregaTabelaComponentes()
	
	// CARREGA TABELA DE PROCESSOS
	carregaTabelaProcessos()
	
	// MOSTRA/ESCONDE OS BOTÕES
	/*$(".INCLUIR").show()
	$(".CANCELAR").hide()
	$(".EDITAR").hide()
	$(".SALVAR").hide()
	$(".REMOVER").hide()*/
	
	var numOS = $("#NUM_OS").val()
	var idCriacaoPai = $("#IDCRIACAOPAI").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacaoPai,idCriacaoPai,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
	var dataset = DatasetFactory.getDataset("dsBuscaEstruturaSubconjOS",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;
	
	// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
    //alteraDesQtdeGeral(row)
	
	// SE FOR CONFIRMAR E SAIR
	if(op==2){
		
		// ESCONDE/EXIBE CAMPOS NECESSÁRIOS
		//$(".F_MATERIAL_ZOOM").show()
		//$(".F_MATERIAL").hide()
		$(".CABECALHO").show()
		$(".INFO_OS").hide()
		$(".FORMULARIO").hide()
		$(".VIEW").show()
		$(".BOTOES_CAB").show()
		$(".INCLUIR_CAB").show()
		$(".SOLABERTAS").show()
		
		// ATUALIZAR A ESTRUTURA
		//atualizar()
		
		// LIMPA OS CAMPOS NECESSÁRIOS
		$("#INDICE_INFO").val("")
		$("#DESCRICAO_INFO").val("")
		$("#NUMDESENHO_INFO").val("")
		$("#POSICAO_INFO").val("")
		$("#SEQ_INFO").val("")
		
		if(atv==0 || atv==4 || atv==11){
			
			$(".RADIO3").show()
			
			// SE RADIO4 JÁ FOI SELECIONADO
			if(!(radio4=="" || radio4==undefined || radio4==null)){
				
				$(".RADIO4").show()
				
			}
			
		}
		
		if(atv==14){
			
			$(".RADIO4").show()
			
		}
		
	}
	
	// EXIBE ALERTA
	var Toast = Swal.mixin({
		  toast: true,
		  position: 'center',
		  showConfirmButton: false,
		  timer: 2000,
		  timerProgressBar: true,
	})

	Toast.fire({
		  icon: 'success',
		  title: 'Alterações salvas com sucesso'
	})
	
	// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
    //alteraDesQtdeGeral()
	
}

// SALVA AS ALTERAÇÕES NO BANCO
function salvaAlteracoesBanco(idCriacao){
	
	console.log("Entrei para salvar as alterações no banco")
	
	var posicaoIndice = $("#F_POSICAOINDICE").val()
	var posicaoDesenho = $("#F_POSICAODESENHO").val()
	var indiceAntigo = $("#F_INDICEANTIGO").val()
	var nivel = $("#F_NIVEL").val()
	var numdbi = $("#F_NUMDBI").val()
	var revisaodbi = $("#F_REVISAODBI").val()
	var numdesenho = $("#F_NUMDESENHO").val()
	var revisaodesenho = $("#F_REVISAODESENHO").val()
	var desqtde = $("#F_DESQTDE").val()
	var undMedida = $("#F_UNDMEDIDA").val()
	var totalqtde = $("#F_TOTALQTDE").val()
	var descricao = $("#F_DESCRICAO").val()
	var bitola = $("#F_BITOLA").val()
	var espessura = $("#F_ESPESSURA").val()
	var largura = $("#F_LARGURA").val()
	var massaLinear = $("#F_MASSALINEAR").val()
	var esprosca = $("#F_ESPROSCA").val()
	var diametroExterno = $("#F_DIAMETROEXTERNO").val()
	var diametroInterno = $("#F_DIAMETROINTERNO").val()
	var comprimento = $("#F_COMPRIMENTO").val()
	var produtoRM = $("#F_PRODUTO_RM").val()
	var idprd = $("#F_IDPRD").val()
	var codigoprd = $("#F_CODIGOPRD").val()
	var idCriacao = $("#F_IDCRIACAO").val()
	var os = $("#F_OS").val()
	var dataRevisao = $("#F_DATAREVISAO").val()
	var obsDesenho = $("#F_OBSERVACOESDESENHO").val()
	var pesoUnit = $("#F_PESOUNITARIO").val()
	var pesoUnitLiq = $("#F_PESOUNLIQUIDO").val()
	var pesoBruto = $("#F_PESOBRUTO").val()
	var pesoLiquido = $("#F_PESOLIQUIDO").val()
	var perimetroCorte = $("#F_PERIMETROCORTE").val()
	var areaPintura = $("#F_AREAPINTURA").val()
	var obsProcesso = $("#F_OBSPROCESSO").val()
	var obsGeral = $("#F_OBSGERAL").val()
	var tipoDesenho = $("#VALOR_RADIO2").val()
	var qtdeUnComp = $("#VALOR_RADIO4").val()
	var areaSecao = $("#F_AREASECAO").val()
	var altura = $("#F_ALTURA").val()
	var larguraAba = $("#F_LARGURAABA").val()
	var espAlma = $("#F_ESPALMA").val()
	var espAba = $("#F_ESPABA").val()
	var material = $("#F_MATERIAL").val()
	var indice = $("#F_INDICE").val()
	var numDocDelp = $("#F_NUMDOCDELP").val()
	var revisaoDocDelp = $("#F_REVISAODOCDELP").val()
	var diametroExtDisco = $("#F_DIAMETROEXTERNODISCO").val()
	var diametroIntDisco = $("#F_DIAMETROINTERNODISCO").val()
	var codTrfPai = $("#F_CODTRFPAI").val()
	var idTrfPai = $("#F_IDTRFPAI").val()
	var nomeTrfPai = $("#F_NOMETRFPAI").val()
	var comporLista = $("#F_COMPORLISTA").is(":checked")
	var opsUnitarias = $("#F_OPSUNITARIAS").is(":checked")
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
	var itemderetorno = $("#F_ITEMRETORNO").val()


	if(itemderetorno=="" || itemderetorno==null || itemderetorno=="null" || itemderetorno==undefined){

		itemderetorno = "NULL"

	}

	if(comporLista==true){
		
		comporLista = "SIM"
		
	} else {
		
		comporLista = ""
		
	}
	
	if(opsUnitarias==true){
		
		opsUnitarias = "SIM"
		
	} else {
		
		opsUnitarias = ""
		
	}

	var codigoTarefa = $("#F_CODIGOTAREFA").val()
	var codtrf = $("#F_CODTRFITEM").val()
	var idtrf = $("#F_IDTRFITEM").val()
	var nomeTrf = $("#F_NOMETRFITEM").val()
	
	// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O UPDATE DAS INFORMAÇÕES
	var c1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("POSICAOINDICE",posicaoIndice,posicaoIndice,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("POSICAODESENHO",posicaoDesenho,posicaoDesenho,ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("INDICEANTIGO",indiceAntigo,indiceAntigo,ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint("NUMDBI",numdbi,numdbi,ConstraintType.MUST);
	var c7 = DatasetFactory.createConstraint("REVISAODBI",revisaodbi,revisaodbi,ConstraintType.MUST);
	var c8 = DatasetFactory.createConstraint("NUMDESENHO",numdesenho,numdesenho,ConstraintType.MUST);
	var c9 = DatasetFactory.createConstraint("REVISAODESENHO",revisaodesenho,revisaodesenho,ConstraintType.MUST);
	var c10 = DatasetFactory.createConstraint("DESQTDE",desqtde,desqtde,ConstraintType.MUST);
	var c11 = DatasetFactory.createConstraint("UNDMEDIDA",undMedida,undMedida,ConstraintType.MUST);
	var c12 = DatasetFactory.createConstraint("TOTALQTDE",totalqtde,totalqtde,ConstraintType.MUST);
	var c13 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST);
	var c14 = DatasetFactory.createConstraint("BITOLA",bitola,bitola,ConstraintType.MUST);
	var c15 = DatasetFactory.createConstraint("ESPESSURA",espessura,espessura,ConstraintType.MUST);
	var c16 = DatasetFactory.createConstraint("LARGURA",largura,largura,ConstraintType.MUST);
	var c17 = DatasetFactory.createConstraint("MASSALINEAR",massaLinear,massaLinear,ConstraintType.MUST);
	var c18 = DatasetFactory.createConstraint("ESPROSCA",esprosca,esprosca,ConstraintType.MUST);
	var c19 = DatasetFactory.createConstraint("DIAMETROEXTERNO",diametroExterno,diametroExterno,ConstraintType.MUST);
	var c20 = DatasetFactory.createConstraint("DIAMETROINTERNO",diametroInterno,diametroInterno,ConstraintType.MUST);
	var c21 = DatasetFactory.createConstraint("COMPRIMENTO",comprimento,comprimento,ConstraintType.MUST);
	var c22 = DatasetFactory.createConstraint("PRODUTORM",produtoRM,produtoRM,ConstraintType.MUST);
	var c23 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST);
	var c24 = DatasetFactory.createConstraint("CODIGOPRD",codigoprd,codigoprd,ConstraintType.MUST);
	var c25 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	var c26 = DatasetFactory.createConstraint("DATAREVISAO",dataRevisao,dataRevisao,ConstraintType.MUST);
	var c27 = DatasetFactory.createConstraint("OBSERVACOESDESENHO",obsDesenho,obsDesenho,ConstraintType.MUST);
	var c28 = DatasetFactory.createConstraint("PESOBRUTO",pesoBruto,pesoBruto,ConstraintType.MUST);
	var c29 = DatasetFactory.createConstraint("PESOLIQUIDO",pesoLiquido,pesoLiquido,ConstraintType.MUST);
	var c30 = DatasetFactory.createConstraint("PERIMETROCORTE",perimetroCorte,perimetroCorte,ConstraintType.MUST);
	var c31 = DatasetFactory.createConstraint("AREAPINTURA",areaPintura,areaPintura,ConstraintType.MUST);
	var c32 = DatasetFactory.createConstraint("OBSPROCESSO",obsProcesso,obsProcesso,ConstraintType.MUST);
	var c33 = DatasetFactory.createConstraint("OBSGERAL",obsGeral,obsGeral,ConstraintType.MUST);
	var c34 = DatasetFactory.createConstraint("TIPODESENHO",tipoDesenho,tipoDesenho,ConstraintType.MUST);
	var c35 = DatasetFactory.createConstraint("AREASECAO",areaSecao,areaSecao,ConstraintType.MUST);
	var c36 = DatasetFactory.createConstraint("ALTURA",altura,altura,ConstraintType.MUST);
	var c37 = DatasetFactory.createConstraint("LARGURAABA",larguraAba,larguraAba,ConstraintType.MUST);
	var c38 = DatasetFactory.createConstraint("ESPALMA",espAlma,espAlma,ConstraintType.MUST);
	var c39 = DatasetFactory.createConstraint("ESPABA",espAba,espAba,ConstraintType.MUST);
	var c40 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST);
	var c41 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST);
	var c42 = DatasetFactory.createConstraint("COMPORLISTA",comporLista,comporLista,ConstraintType.MUST);
	var c43 = DatasetFactory.createConstraint("CODIGOTAREFADESC",codigoTarefa,codigoTarefa,ConstraintType.MUST);
	var c44 = DatasetFactory.createConstraint("CODTRFITEM",codtrf,codtrf,ConstraintType.MUST);
	var c45 = DatasetFactory.createConstraint("IDTRFITEM",idtrf,idtrf,ConstraintType.MUST);
	var c46 = DatasetFactory.createConstraint("NOMETRFITEM",nomeTrf,nomeTrf,ConstraintType.MUST);
	var c47 = DatasetFactory.createConstraint("NUMDOCDELP",numDocDelp,numDocDelp,ConstraintType.MUST);
	var c48 = DatasetFactory.createConstraint("REVISAODOCDELP",revisaoDocDelp,revisaoDocDelp,ConstraintType.MUST);
	var c49 = DatasetFactory.createConstraint("DIAMETROEXTERNODISCO",diametroExtDisco,diametroExtDisco,ConstraintType.MUST);
	var c50 = DatasetFactory.createConstraint("DIAMETROINTERNODISCO",diametroIntDisco,diametroIntDisco,ConstraintType.MUST);
	var c51 = DatasetFactory.createConstraint("CODTRFPAI",codTrfPai,codTrfPai,ConstraintType.MUST);
	var c52 = DatasetFactory.createConstraint("IDTRFPAI",idTrfPai,idTrfPai,ConstraintType.MUST);
	var c53 = DatasetFactory.createConstraint("NOMETRFPAI",nomeTrfPai,nomeTrfPai,ConstraintType.MUST);
	var c54 = DatasetFactory.createConstraint("PESOUNITARIO",pesoUnit,pesoUnit,ConstraintType.MUST);
	var c55 = DatasetFactory.createConstraint("OPSUNITARIAS",opsUnitarias,opsUnitarias,ConstraintType.MUST);
	var c56 = DatasetFactory.createConstraint("QTDEUNCOMP",qtdeUnComp,qtdeUnComp,ConstraintType.MUST);
	var c57 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
	var c58 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
	var c59 = DatasetFactory.createConstraint("PESOUNLIQUIDO",pesoUnitLiq,pesoUnitLiq,ConstraintType.MUST);
	var c60 = DatasetFactory.createConstraint("ITEMDERETORNO",itemderetorno,itemderetorno,ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33,c34,c35,c36,c37,c38,c39,c40,c41,c42,c43,c44,c45,c46,c47,c48,c49,c50,c51,c52,c53,c54,c55,c56,c57,c58,c59,c60);
	
	var dataset = DatasetFactory.getDataset("dsUpdateDadosItemOS",null,constraints,null);
	
	console.log("salvei as alterações no banco")	

}