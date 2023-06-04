// APÓS SALVAR A TAREFA
function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	var numProcess = getValue("WKNumProces");
	var atv = getValue('WKNumState');
	
    log.info("Entrei no afterTaskSave no Processo de Lista de Materiais");
	
    log.info("atv: "+atv)
    
    // SE É ATIVIDADE DE APROVAR CADASTRO
	if(atv==0 || atv==4 || atv==11){

		// SALVA OS ITENS SALVOS NA TABELA DOS COMPONENTES
	    salvaItensLista()
		
	}
    
}

// SALVA OS ITENS SALVOS NA TABELA DOS COMPONENTES
function salvaItensLista(){
	
	log.info("salva itens da lista")
	
	// LIMPA OS ITENS DA LISTA DA TABELA COMPONENTES
	limpaItensComponentesLista()
	
	var indexes = hAPI.getChildrenIndexes("LISTA_MATERIAIS_SALVOS")
	
	// PERCORRE A TABELA DA LISTA DOS MATERIAIS
	for(var i=0; i<indexes.length; i++){
		
		// SALVA OS DADOS NA TABELA
		var numDesenho = hAPI.getCardValue("NUMDESENHOSALVOS___" + indexes[i])
		var posicao = hAPI.getCardValue("POSICAOSALVOS___" + indexes[i])
		var totalQtde = hAPI.getCardValue("QUANTIDADESALVOS___" + indexes[i])
		var descricao = hAPI.getCardValue("DESCRICAOSALVOS___" + indexes[i])
		var material = hAPI.getCardValue("MATERIALSALVOS___" + indexes[i])
		var bitola = hAPI.getCardValue("BITOLASALVOS___" + indexes[i])
		var largura = hAPI.getCardValue("LARGURASALVOS___" + indexes[i])
		var comprimento = hAPI.getCardValue("COMPRIMENTOSALVOS___"+ indexes[i])
		var espRosca = hAPI.getCardValue("ESPROSCASALVOS___"+ indexes[i])
		var pesoBruto = hAPI.getCardValue("PESOBRUTOSALVOS___"+ indexes[i])
		var idCriacao = hAPI.getCardValue("IDCRIACAOSALVOS___"+ indexes[i])
		var numOS = hAPI.getCardValue("NUMOSSALVOS___"+ indexes[i])
		var origemMP1 = hAPI.getCardValue("ORIGEMMP1SALVOS___"+ indexes[i])
		var origemMP2 = hAPI.getCardValue("ORIGEMMP2SALVOS___"+ indexes[i])
		
		var produtoRM1 = hAPI.getCardValue("PRODUTORM1SALVOS___"+ indexes[i])
		var idPrd1 = hAPI.getCardValue("IDPRD1SALVOS___"+ indexes[i])
		var codigoprd1 = hAPI.getCardValue("CODIGOPRD1SALVOS___"+ indexes[i])
		var undprd1 = hAPI.getCardValue("UNDPRD1SALVOS___"+ indexes[i])
		
		var produtoRM2 = hAPI.getCardValue("PRODUTORM2SALVOS___"+ indexes[i])
		var idPrd2 = hAPI.getCardValue("IDPRD2SALVOS___"+ indexes[i])
		var codigoprd2 = hAPI.getCardValue("CODIGOPRD2SALVOS___"+ indexes[i])
		var undprd2 = hAPI.getCardValue("UNDPRD2SALVOS___"+ indexes[i])
		
		var produtoRM3 = hAPI.getCardValue("PRODUTORM3SALVOS___"+ indexes[i])
		var idPrd3 = hAPI.getCardValue("IDPRD3SALVOS___"+ indexes[i])
		var codigoprd3 = hAPI.getCardValue("CODIGOPRD3SALVOS___"+ indexes[i])
		var undprd3 = hAPI.getCardValue("UNDPRD3SALVOS___"+ indexes[i])
	
		var produtoRM4 = hAPI.getCardValue("PRODUTORM4SALVOS___"+ indexes[i])
		var idPrd4 = hAPI.getCardValue("IDPRD4SALVOS___"+ indexes[i])
		var codigoprd4 = hAPI.getCardValue("CODIGOPRD4SALVOS___"+ indexes[i])
		var undprd4 = hAPI.getCardValue("UNDPRD4SALVOS___"+ indexes[i])
			
		var produtoRM5 = hAPI.getCardValue("PRODUTORM5SALVOS___"+ indexes[i])
		var idPrd5 = hAPI.getCardValue("IDPRD5SALVOS___"+ indexes[i])
		var codigoprd5 = hAPI.getCardValue("CODIGOPRD5SALVOS___"+ indexes[i])
		var undprd5 = hAPI.getCardValue("UNDPRD5SALVOS___"+ indexes[i])

		var produtoRM6 = hAPI.getCardValue("PRODUTORM6SALVOS___"+ indexes[i])
		var idPrd6 = hAPI.getCardValue("IDPRD6SALVOS___"+ indexes[i])
		var codigoprd6 = hAPI.getCardValue("CODIGOPRD6SALVOS___"+ indexes[i])
		var undprd6 = hAPI.getCardValue("UNDPRD6SALVOS___"+ indexes[i])
	
		var substituto = ""
		
		// SE PRODUTORM1 NÃO FOI PREENCHIDO
		if(!(produtoRM1=="" || produtoRM1==null || produtoRM1==undefined)){
			
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM1,idPrd1,codigoprd1,undprd1,0)
		
		}

		substituto = produtoRM1
		
		if(substituto.indexOf("-")!=-1){
			
			substituto = produtoRM1.toString()
			substituto = substituto.split("-")[0]
			substituto = substituto.trim()
				
		}
		
		log.info("substituto: "+substituto)
		
		// SE PRODUTORM2 NÃO FOI PREENCHIDO
		if(!(produtoRM2=="" || produtoRM2==null || produtoRM2==undefined)){
						
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM2,idPrd2,codigoprd2,undprd2,1)

		}
		
		// SE PRODUTORM3 NÃO FOI PREENCHIDO
		if(!(produtoRM3=="" || produtoRM3==null || produtoRM3==undefined)){
						
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM3,idPrd3,codigoprd3,undprd3,1)

		}
		
		// SE PRODUTORM4 NÃO FOI PREENCHIDO
		if(!(produtoRM4=="" || produtoRM4==null || produtoRM4==undefined)){
			
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM4,idPrd4,codigoprd4,undprd4,1)
					
		}
		
		// SE PRODUTORM5 NÃO FOI PREENCHIDO
		if(!(produtoRM5=="" || produtoRM5==null || produtoRM5==undefined)){
			
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM5,idPrd5,codigoprd5,undprd5,1)
					
		}
		
		// SE PRODUTORM6 NÃO FOI PREENCHIDO
		if(!(produtoRM6=="" || produtoRM6==null || produtoRM6==undefined)){
		
			// SALVA COMPONENTE
			salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM6,idPrd6,codigoprd6,undprd6,1)
					
		}
			
	}
	
	// SALVA A LISTA SALVA NA TABELA DA LISTA DE MATERIAIS
	salvaListaMateriais()
	
}

// LIMPA OS ITENS QUE VIERAM DA LISTA
function limpaItensComponentesLista(){
	
	log.info("vou excluir todos os itens da tabela dos componentes")
	
	var numOS = hAPI.getCardValue("NUM_OS")
	
	log.info("numOS: "+numOS)
	
	var c1 = DatasetFactory.createConstraint("NUMOS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(c1)
	var dataset = DatasetFactory.getDataset("dsApagaListaMateriais",null,constraints,null)
	
}

// SALVA A LISTA SALVA NA TABELA DA LISTA DE MATERIAIS
function salvaListaMateriais(){
	
	log.info("vou salvar os itens salvos na tabela da lista de materiais")
	
	var numOS = hAPI.getCardValue("NUM_OS")
	
	var a1 = DatasetFactory.createConstraint("NUMOS",numOS,numOS,ConstraintType.MUST);
	
	var constraints = new Array(a1);
	
	var dataset = DatasetFactory.getDataset("dsSalvaItensListaMateriais",null,constraints,null);
		
}

// SALVA COMPONENTE
function salvaComponente(descricao,idCriacao,numOS,substituto,produtoRM,idPrd,codigoprd,undprd,op){
	
	log.info("vou salvar o componente")
	
	log.info("descricao: "+descricao+", idCriacao: "+idCriacao+", numOS: "+numOS+
			", substituto: "+substituto+", produtoRM: "+produtoRM+", idPrd: "+idPrd+", codigoprd: "+codigoprd+", undprd: "+undprd+", op: "+op)

	var qtdes
	var qtdeUnit 
	var qtdeTotal 
		
	// SE É O ITEM PRINCIPAL
	if(op==0){
		
		substituto = ""
		
		// BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CÁLCULOS PARA SEREM SALVOS NA TABELA DE COMPONENTES
		var qtdes = buscaQtdeComponentesLista(idCriacao,numOS)
		
		qtdeUnit = qtdes[0].QTDEUNIT
		qtdeTotal = qtdes[0].QTDETOTAL
		
	} else {
		// SE NÃO
		
		qtdeUnit = ''
		qtdeTotal = ''
		
	}

	log.info("qtdeUnit: "+qtdeUnit+", qtdeTotal: "+qtdeTotal)
	
	log.info("vou construir as constraints")
	
	// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O INSERT DO COMPONENTE
	var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoRM,produtoRM,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrd,idPrd,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codigoprd,codigoprd,ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",undprd,undprd,ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST);
	var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST);
	var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",'L','L',ConstraintType.MUST);
	var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",descricao,descricao,ConstraintType.MUST);
	var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substituto,substituto,ConstraintType.MUST);
	var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
	
	var dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
	
	log.info("fiz a inserção do componente")
	
}

// BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CÁLCULOS PARA SEREM SALVOS NA TABELA DE COMPONENTES
function buscaQtdeComponentesLista(idCriacao,numOS){
	
	log.info("vou buscar as quantidades dos componentes")
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2);
	
	var dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null);
	
	var pesoBruto = dataset.getValue(0,"PESOBRUTO")
	var totalQtde = dataset.getValue(0,"TOTALQTDE")
	var pesoUnit = dataset.getValue(0,"PESOUNITARIO")
	var desQtde = dataset.getValue(0,"DESQTDE")
	
	var qtdeUn =  dataset.getValue(0,"QTDEUNCOMP")
	
	if(qtdeUn=="PESOUNITARIO"){
		
		pesoUnit = pesoUnit.toString()
		pesoBruto = pesoBruto.toString()
		
		if(pesoUnit.indexOf(",")!=-1){
			
			pesoUnit = pesoUnit.replace(",",".")
			
		}
		
		if(pesoBruto.indexOf(",")!=-1){
			
			pesoBruto = pesoBruto.replace(",",".")
			
		}
		
		pesoUnit = parseFloat(pesoUnit).toFixed(4)
		pesoBruto = parseFloat(pesoBruto).toFixed(4)
		
		pesoBruto = parseFloat(pesoBruto)
		pesoBruto = pesoBruto.toFixed(4)
		
		qtdeUnit = pesoUnit.toString()
		qtdeUnit = pesoUnit.replace(".",",")
		qtdeTotal = pesoBruto.toString()
		qtdeTotal = pesoBruto.replace(".",",")
		
	}
	
	else if(qtdeUn=="DESENHO"){
		
		qtdeUnit =  parseInt(desQtde)
		qtdeTotal = parseInt(totalQtde)
		
	} 
	
	else {
		
		pesoUnit = pesoUnit.toString()
		pesoBruto = pesoBruto.toString()
		
		if(pesoUnit.indexOf(",")!=-1){
			
			pesoUnit = pesoUnit.replace(",",".")
			
		}
		
		if(pesoBruto.indexOf(",")!=-1){
			
			pesoBruto = pesoBruto.replace(",",".")
			
		}
		
		pesoUnit = parseFloat(pesoUnit).toFixed(4)
		pesoBruto = parseFloat(pesoBruto).toFixed(4)
		
		pesoBruto = parseFloat(pesoBruto)
		pesoBruto = pesoBruto.toFixed(4)
		
		qtdeUnit = pesoUnit.toString()
		qtdeUnit = pesoUnit.replace(".",",")
		qtdeTotal = pesoBruto.toString()
		qtdeTotal = pesoBruto.replace(".",",")
		
	}
	
	var qtdes = new Array()
	 
	qtdes.push({QTDEUNIT:qtdeUnit,QTDETOTAL:qtdeTotal})
	
	log.info(qtdes)
	
	log.info("vou retornar qtdes")
	
	return qtdes

}