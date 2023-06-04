// BUSCA TODOS OS DADOS DAS RA'S GERADAS
function createDataset(fields, constraints, sortFields) {

	var dsRelatorioRaChapas = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("dsRelatorioRaChapas")
    
    var myQuery = " "
    var codordem = " "
    var numplanocorte = " "
    var	numeromov = " "
    var	solicitante = " "
    var	numprocesso = " "
    var	idatv = " "
    var	status = " "
    var	und = " "
    var	qtd = " "
    var	criacao = " "
    var	edicao = " "
    var codccusto = " "
    var	prd = " "
    var data = " "
    	
if (constraints != null) {
	
    for (var i = 0; i < constraints.length; i++) {

    	log.info(constraints[i].fieldName)
		if (constraints[i].fieldName == "DATADE") {
		        	
        	if(!(constraints[i].initialValue=="" || constraints[i].initialValue==null || constraints[i].initialValue==undefined)
        			&& !(constraints[i+1].initialValue=="" || constraints[i+1].initialValue==null || constraints[i+1].initialValue==undefined)){
        	    data = " AND ( CAST(T.DATAEMISSAO as date) BETWEEN CAST('"+constraints[i].initialValue+"' as date) AND CAST('"+constraints[i+1].initialValue+"' as date)"
        	    data +=  " OR CAST(T.HORULTIMAALTERACAO as date) BETWEEN CAST('"+constraints[i].initialValue+"'as date) AND CAST('"+constraints[i+1].initialValue+"'as date))"
	        }
		        	
        }
        
    }
    
}
	
	myQuery =   " SELECT * FROM ( SELECT T.IDMOV,T.NUMEROMOV," +
				"ISNULL(ISNULL((select distinct USUARIOATUAL from FLUIG.DBO.ML001131 "+
                "      where DOCUMENTID = MLRA.DOCUMENTID),(select distinct USUARIOATUAL from FLUIG.DBO.ML001135 "+
                "      where DOCUMENTID = MLRA2.DOCUMENTID)),T.USUARIOCRIACAO) SOLICITANTE, "+
                " ISNULL(ISNULL((select distinct NUMPROCESSO from FLUIG.DBO.ML001131 "+
                "      where DOCUMENTID = MLRA.DOCUMENTID),(select distinct NUMPROCESSO from FLUIG.DBO.ML001135 "+
                "      where DOCUMENTID = MLRA2.DOCUMENTID)),T.NUMEROMOV) NUMPROCESSO, "+
			 	" CASE WHEN T.STATUS='A' THEN 'Pendente' ELSE "+
				" CASE WHEN T.STATUS='C' THEN 'Cancelado' ELSE "+
				" CASE WHEN T.STATUS='F' THEN 'Recebido' ELSE 'Em Faturamento' END END END AS STATUS, "+
				" T.CAMPOLIVRE1 OP,T.CODTMV,T.CAMPOLIVRE2 IDATIVIDADE,ISNULL(T.CAMPOLIVRE3,'SEM PLANO') NUMPLANOCORTE,T.CODCCUSTO, "+
				" TP.CODIGOPRD,TP.NOMEFANTASIA,TI.CODUND,TI.QUANTIDADETOTAL,CONVERT(varchar(12),T.DATAEMISSAO, 103) 'DATACRIACAO'," +
				" ISNULL(( SELECT TOP 1 T.NORDEM "+
				" FROM TMOV T "+
				" INNER JOIN TITMMOV TI ON "+
				" T.CODCOLIGADA=TI.CODCOLIGADA "+
				" AND T.IDMOV=TI.IDMOV "+
				" INNER JOIN TITMLOTEPRD TL  ON "+
				" T.CODCOLIGADA=TL.CODCOLIGADA "+
				" AND T.IDMOV=TL.IDMOV "+
				" AND TI.NSEQITMMOV=TL.NSEQITMMOV "+
				" INNER JOIN TMOV T2  ON "+
				" T.CODCOLIGADA=TL.CODCOLIGADA "+
				" AND T2.NUMEROMOV=T.NORDEM "+
				" AND T2.CODTMV IN ('1.1.02','1.1.39') "+
				" WHERE T.CHAVEACESSONFE IS NOT NULL AND IDLOTE=ISNULL(Z.IDLOTE,-10) AND T.STATUS !='N' ORDER BY T.HORARIOEMISSAO DESC),'NÃO ENCONTRADA') OC, "+
				" CONVERT(varchar(12),T.HORULTIMAALTERACAO, 103) 'DATAALTERACAO', ISNULL(Z.NUMLOTE,'NÃO PREVISTO') NUMLOTE,CASE WHEN Z.RETALHO!='0' THEN Z.RETALHO ELSE '' END AS RETALHO," +
				" CASE WHEN GED.ID_Arquivo IS NULL THEN 'ARQUIVO NÃO ENCONTRADO' ELSE CONCAT('http://delp5008/Arquivo/VisualizarPDF?idArquivo=',GED.ID_Arquivo,'&view=true') END AS GEDLINK"+
				" FROM TMOV T "+
				" INNER JOIN TITMMOV TI ON "+
				" TI.IDMOV=T.IDMOV "+
				" AND TI.CODCOLIGADA=T.CODCOLIGADA "+
				" INNER JOIN TPRD TP ON "+
				" TP.IDPRD=TI.IDPRD "+
				" AND TP.CODCOLIGADA=TI.CODCOLIGADA "+
				" LEFT JOIN FLUIG.DBO.ML001134 MLRA ON "+
				" MLRA.NUMERORA=T.NUMEROMOV COLLATE SQL_Latin1_General_CP1_CI_AI "+
				" LEFT JOIN FLUIG.DBO.ML001137 MLRA2 "+
                " ON MLRA2.NUMERORA = T.NUMEROMOV COLLATE SQL_LATIN1_GENERAL_CP1_CI_AI "+
                " LEFT JOIN ZMDPLANOAPROVEITAMENTOCORTE Z ON " +
                "	Z.CODCOLIGADA=T.CODCOLIGADA " +
                "	AND Z.CODORDEM=T.CAMPOLIVRE1 " +
                "	AND Z.IDATVORDEM=T.CAMPOLIVRE2 " +
                "	AND Z.NUMPLANOCORTE=T.CAMPOLIVRE3 "+
                " LEFT JOIN GreenDocs_HOM.dbo.Arquivos GED ON "+
                " GED.NOME LIKE CONCAT('%',Z.NUMPLANOCORTE,'%') COLLATE SQL_Latin1_General_CP1_CI_AI AND Z.NUMPLANOCORTE IS NOT NULL  "+
                " AND GED.ID_Arquivo = (SELECT MAX(ID_Arquivo) FROM GreenDocs_HOM.dbo.Arquivos WHERE NOME LIKE CONCAT('%',Z.NUMPLANOCORTE,'%') COLLATE SQL_Latin1_General_CP1_CI_AI AND Z.NUMPLANOCORTE IS NOT NULL) "+
				" WHERE ( ( T.CODTMV = '1.1.05' AND T.CAMPOLIVRE3 IS NOT NULL ) OR ( T.CODTMV = '1.1.01' AND TP.CODTB2FAT='0181' ) ) "+data+") R"+
				" WHERE  IDMOV IS NOT NULL "+ 
				" ORDER BY IDMOV DESC "
					  
				
    log.info("dsRelatorioRaChapas MY QUERY: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.executeQuery(myQuery)
        var columnCount = rs.getMetaData().getColumnCount()
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsRelatorioRaChapas.addColumn(rs.getMetaData().getColumnName(i))
                    
                }
                
                created = true
                
            }
            
            var Arr = new Array()
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i))
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString()
                    
                } else {
                	
                    Arr[i - 1] = "null"
                    	
                }
                
            }
            
            dsRelatorioRaChapas.addRow(Arr)
            
        }
        
    } catch (e) {
    	
        log.error("ERRO==============> " + e.message)
        
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close()
            
        }
        
        if (conn != null) {
        	
            conn.close()
        }
        
    }
    
    return dsRelatorioRaChapas
	
}