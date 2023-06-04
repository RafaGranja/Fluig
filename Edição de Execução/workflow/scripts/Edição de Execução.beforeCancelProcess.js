// ANTES DE FINALIZAR A SOLICITAÇÃO
function beforeCancelProcess(colleagueId,processId){
	
	log.info("Entrei no beforeCancelProcess Processo Edição de Execução de Estrutura");

	// SE NÃO TEM NENHUM ITEM QUE ESTÁ SENDO DETALHADO EM OUTRA SOLICITAÇÃO
	if(!temItemDetalhado()){

		// SALVA A FLAG DO PROCESSO QUE A SOLICITAÇÃO FOI CANCELADA
		hAPI.setCardValue("EXCLUSIVO1","CANCELADA");
		
	} else {
		// SE NÃO
		
		throw "Essa solicitação não pode ser cancelada, pois existem solicitações de subconjuntos que estão abertas. Clique no link das solicitações abertas."
		
	}
	
}

// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
function temItemDetalhado(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	var indicePai = hAPI.getCardValue("INDICEPAI")
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("INDICEPAI",indicePai,indicePai,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2,c3);
	
	var dataset = DatasetFactory.getDataset("dsEXTemFilhoDetalhadoOS",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var count = dataset.rowsCount
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(count>0){
		
		return true
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
}
