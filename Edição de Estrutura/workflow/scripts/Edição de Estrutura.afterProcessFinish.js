function afterProcessFinish(processId){
	
	log.info("Entrei no afterProcessFinish do Processo de Edição de Estrutura (v2)");
	
	log.info("processo finalizado, vou integrar e limpar as tabelas auxiliares")
	
	var coligada 	= '1'
		
	// EXECUTA A FÓRMULA VISUAL
	//executaFormulaVisualEdicao(coligada)   
		
	// EXECUTA A PROCEDURE DA EDIÇÃO
	executaProcedureEdicao()
	
	// LIMPA TABELA DE EXCLUÍDOS
	//limpaTabelaExcluidos()
	
	// LIMPA TABELA DE ALTERADOS
	//limpaTabelaAlterados()
	
	// LIMPA TABELA DE PARALISADOS
	//limpaTabelaParalisados()
	
	// ATUALIZA CAMPO INTEGRADO
	//salvaIntegrado()
	
}

// EXECUTA A PROCEDURE DA EDIÇÃO
function executaProcedureEdicao(){
	
	log.info("vou executar a procedure de integração da edição")
			
	var numProcesso = hAPI.getCardValue("NUMPROCESSO")
	var tipo = "P"
	
	log.info("solicitação "+numProcesso+" e tipo "+tipo)
	
	// CONSULTA BANCO
	var a1 = DatasetFactory.createConstraint("NUMPROCESSO",numProcesso,numProcesso,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("TIPO",tipo,tipo,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsProcedureEstruturaEdicao",null,constraints,null)
	
	log.info("executei a procedure de integração da edição")
	
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
	
	var dataset = DatasetFactory.getDataset("dsFVEdicaoEstrutura",null,constraints,null)
	
	log.info("executei a fórmula visual")
	
}

// SALVA INTEGRADO NA ESTRUTURA
function salvaIntegrado(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	
	var a1 = DatasetFactory.createConstraint("OS", numOS, numOS, ConstraintType.MUST);

    var constraints = new Array(a1);

    log.info("Vou salvar o campo INTEGRADO")
    
    var dataset = DatasetFactory.getDataset("dsSalvaIntegradoOS", null, constraints, null);

}

// LIMPA TABELA DE EXCLUÍDOS
function limpaTabelaExcluidos(){
	
	var numOS = hAPI.getCardValue("NUM_OS")

	log.info("vou limpar a tabela de excluídos da OS "+numOS)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	var dataset = DatasetFactory.getDataset("dsDeleteExcluidosOS",null,constraints,null)
	
	log.info("limpei tabela excluídos")
	
}

// LIMPA TABELA DE ALTERADOS
function limpaTabelaAlterados(){
	
	var numOS = hAPI.getCardValue("NUM_OS")

	log.info("vou limpar a tabela de alterados da OS "+numOS)

	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	var dataset = DatasetFactory.getDataset("dsDeleteAlteradosOS",null,constraints,null)
	
	log.info("limpei tabela alterados")
	
}

// LIMPA TABELA DE PARALISADOS
function limpaTabelaParalisados(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	
	log.info("vou limpar a tabela de paralisados da OS "+numOS)

	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	var dataset = DatasetFactory.getDataset("dsDeleteParalisadosOS",null,constraints,null)
	
	log.info("limpei tabela paralisados")
	
}
