function afterProcessFinish(processId){
	
	log.info("Entrei no afterProcessFinish do Processo de Edição de Execução de Estrutura");
	
	log.info("processo finalizado, vou integrar e limpar as tabelas auxiliares")
	
	var coligada 	= '1'
		
	// EXECUTA A FÓRMULA VISUAL
	//executaFormulaVisualEdicao(coligada)    
	
	// EXECUTA A PROCEDURE DA EDIÇÃO
	executaProcedureEdicao()
	
	// LIMPA TABELA DE EXCLUÍDOS
	//limpaTabelaExcluidos()
	
	// LIMPA TABELA DE ALTERADOS
	limpaTabelaAlterados()
	
	// LIMPA TABELA DE PARALISADOS
	limpaTabelaParalisados()
	
	// ATUALIZA CAMPO INTEGRADO
	//salvaIntegrado()
	
}

// EXECUTA A PROCEDURE DA EDIÇÃO
function executaProcedureEdicao(){
	
	log.info("vou executar a procedure de integração da execução")
	
	var numProcesso = hAPI.getCardValue("NUMPROCESSO")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	var execucoes = hAPI.getCardValue("EXECUCOES_INT")
	var codTrfEx = hAPI.getCardValue("CODTRFEX")
	var numOS = hAPI.getCardValue("NUM_OS")
	var execRef = hAPI.getCardValue("EXECUCAO_INFO")
	
	log.info("solicitação "+numProcesso)
	
	log.info("numProcesso: "+numProcesso+", execucao: "+execucao+", execucoes: "+execucoes+", codTrfEx: "+codTrfEx+", numOS: "+numOS+", execRef: "+execRef)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUMPROCESSO",numProcesso,numProcesso,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODTRFPAI",codTrfEx,codTrfEx,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("TIPO",'E','E',ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3,c4)
	
	//var dataset = DatasetFactory.getDataset("dsEXProcedureEstruturaEdicao",null,constraints,null)
	var dataset = DatasetFactory.getDataset("dsEXProcedureEstruturaEdicao",null,constraints,null)
	
	log.info("executei a procedure de integração da edição da execução de referência "+execRef)
	
	/*
	log.info("execucoes: "+execucoes+", codTrfEx: "+codTrfEx+", numOS: "+numOS+", execRef: "+execRef)
	
	//execucoes = execucoes.toString().split("|")
	execucoes = execucoes.toString().split(";")
	
	log.info("execuções selecionadas: "+execucoes.length)
	
	// PERCORRE TODAS AS EXECUÇÕES SELECIONADAS
	for(var i=0; i<execucoes.length; i++){
		
		//var exec = execucoes[i].toString().split("-")
		var exec = execucoes[i].toString().trim()
		//exec = exec[0].toString().trim()
		
		log.info("execução: "+exec)
		
		// SE NÃO É A EXECUÇÃO DE REFERÊNCIA 
		if(!(exec==execRef)){
			
			// CONSULTA BANCO
			var c1 = DatasetFactory.createConstraint("NUMPROCESSO",numProcesso,numProcesso,ConstraintType.MUST)
			var c2 = DatasetFactory.createConstraint("EXECUCAO",exec,exec,ConstraintType.MUST)
			var c3 = DatasetFactory.createConstraint("CODTRFPAI",codTrfEx,codTrfEx,ConstraintType.MUST)
			
			var constraints = new Array(c1,c2,c3)
			
			var dataset = DatasetFactory.getDataset("dsEXProcedureEstruturaEdicao",null,constraints,null)
			
		}
		
	}
	*/
	
}

// EXECUTA A FÓRMULA VISUAL
function executaFormulaVisualEdicao(codcoligada){
	
	var idprj = hAPI.getCardValue("IDPRJ_OS")
	//var codcoligada = hAPI.getCardValue("CODCOLIGADA")
	
	log.info("vou executar a fórmula visual do idprj "+idprj+" e da coligada "+codcoligada)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("IDPRJ",idprj,idprj,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	
	var dataset = DatasetFactory.getDataset("dsEXFVEdicaoEstrutura",null,constraints,null)
	
	log.info("executei a fórmula visual")
	
}

// SALVA INTEGRADO NA ESTRUTURA
function salvaIntegrado(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	var indicePai = hAPI.getCardValue("INDICEPAI")
	
	log.info("numOS: "+numOS+", execucao: "+execucao+", indicePai: "+indicePai)
	
	var a1 = DatasetFactory.createConstraint("OS", numOS, numOS, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("EXECUCAO", execucao, execucao, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("INDICEPAI", indicePai, indicePai, ConstraintType.MUST);
	
    var constraints = new Array(a1,a2,a3);

    log.info("Vou salvar o campo INTEGRADO")
    
    var dataset = DatasetFactory.getDataset("dsEXSalvaIntegradoOS", null, constraints, null);

}

// LIMPA TABELA DE EXCLUÍDOS
function limpaTabelaExcluidos(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	var codTrfEx = hAPI.getCardValue("CODTRFEX")
	
	log.info("vou limpar a tabela de excluídos da OS "+numOS+", codTrfEx: "+codTrfEx+", execucao: "+execucao)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3)
	
	var dataset = DatasetFactory.getDataset("dsEXDeleteExcluidosOS",null,constraints,null)
	
	log.info("limpei tabela excluídos")
	
}

// LIMPA TABELA DE ALTERADOS
function limpaTabelaAlterados(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	var codTrfEx = hAPI.getCardValue("CODTRFEX")
	
	log.info("vou limpar a tabela de alterados da OS "+numOS+", codTrfEx: "+codTrfEx+", execucao: "+execucao)

	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3)
	
	var dataset = DatasetFactory.getDataset("dsEXDeleteAlteradosOS",null,constraints,null)
	
	log.info("limpei tabela alterados")
	
}

// LIMPA TABELA DE PARALISADOS
function limpaTabelaParalisados(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	var codTrfEx = hAPI.getCardValue("CODTRFEX")
	
	log.info("vou limpar a tabela de paralisados da OS "+numOS+", codTrfEx: "+codTrfEx+", execucao: "+execucao)

	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3)
	
	var dataset = DatasetFactory.getDataset("dsEXDeleteParalisadosOS",null,constraints,null)
	
	log.info("limpei tabela paralisados")
	
}
