// BUSCA OPS DE UM ITEM DA ESTRUTURA
function createDataset(fields, constraints, sortFields) {

	var dsNewDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var numOS = ""
	var execucao = ""
	var idCriacao = ""
	var codTrfPai = ""
		
	if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "OS") {
            	
        		numOS = constraints[i].initialValue
            	
            }
        	if (constraints[i].fieldName == "EXECUCAO") {
            	
        		execucao = constraints[i].initialValue
            	
            }
        	if (constraints[i].fieldName == "IDCRIACAO") {
            	    
        		idCriacao = constraints[i].initialValue
            	
            }
        	if (constraints[i].fieldName == "CODTRFPAI") {
        	    
        		codTrfPai = constraints[i].initialValue
            	
            }
        	
        }
        
	}
    
    var myQuery = 	"SELECT "+
					"	EX.CODCOLIGADA, EX.CODFILIAL, EX.IDCRIACAO, EX.INDICE, EX.OPSUNITARIAS, EX.TOTALQTDE, EX.CODIGOPRD, EX.OS, EX.EXECUCAO, KC.NUMEXEC, KI.CODESTRUTURA, KI.CODORDEM, KO.REPROCESSAMENTO, KI.QTDEPLANEJADA, KI.QTDEPLANEJADA - ISNULL(KI.QTDEEFETIVADA,0) SALDO, "+
					"	(SELECT "+
					"		KA.IDATVORDEM "+
					"	FROM "+
					"		KATVORDEMCOMPL KL INNER JOIN KATVORDEM KA ON KL.CODCOLIGADA=KA.CODCOLIGADA AND KL.CODFILIAL=KA.CODFILIAL AND KL.CODORDEM=KA.CODORDEM AND KL.IDATVORDEM=KA.IDATVORDEM "+
					"	WHERE "+
					"		KA.CODCOLIGADA = EX.CODCOLIGADA AND KA.CODFILIAL = EX.CODFILIAL  AND KA.CODORDEM = KI.CODORDEM AND KA.STATUS!=6 AND CAST(KL.PRIORIDADE AS INT) = (SELECT MAX(KL2.PRIORIDADE) FROM KATVORDEMCOMPL KL2 INNER JOIN KATVORDEM KA2 ON KL2.CODCOLIGADA=KA2.CODCOLIGADA AND KL2.CODFILIAL=KA2.CODFILIAL AND KL2.CODORDEM=KA2.CODORDEM AND KL2.IDATVORDEM=KA2.IDATVORDEM WHERE KA2.CODORDEM = KI.CODORDEM AND KA2.STATUS!=6) "+
					"	) IDATVORDEM, "+
					"	(SELECT MAX(PRIORIDADE) FROM KATVORDEMCOMPL KL INNER JOIN KATVORDEM KA ON KL.CODCOLIGADA=KA.CODCOLIGADA AND KL.CODFILIAL=KA.CODFILIAL AND KL.CODORDEM=KA.CODORDEM AND KL.IDATVORDEM=KA.IDATVORDEM WHERE KA.CODORDEM = KI.CODORDEM AND KA.STATUS!=6) PRIORIDADE, "+
					"	CASE WHEN ISNULL((SELECT TOP 1 NUMPLANOCORTE FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE CODCOLIGADA = EX.CODCOLIGADA AND CODFILIAL = EX.CODFILIAL AND CODORDEM = KI.CODORDEM COLLATE SQL_Latin1_General_CP1_CI_AI ),NULL) IS NULL THEN 'NAO' ELSE 'SIM' END PLANOCORTE, "+
					"	ISNULL((SELECT TOP 1 NUMPLANOCORTE FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE CODCOLIGADA = EX.CODCOLIGADA AND CODFILIAL = EX.CODFILIAL AND CODORDEM = KI.CODORDEM COLLATE SQL_Latin1_General_CP1_CI_AI ),NULL) NUMPLANOCORTE, "+
					"	ISNULL((SELECT  "+
					"		CUSTO   "+
					"	 FROM   "+
					"		KCUSTOPOSTO (NOLOCK) X  "+
					"	 WHERE  "+
					"		X.CODCOLIGADA = EX.CODCOLIGADA AND X.CODFILIAL = EX.CODFILIAL  "+
					"		AND X.CODPOSTO = (SELECT  "+
					"							CODPOSTO "+
					"						FROM "+
					"							KATVORDEM KA "+
					"							INNER JOIN KATVORDEMCOMPL KC ON KA.CODCOLIGADA = KC.CODCOLIGADA AND KA.CODFILIAL = KC.CODFILIAL AND KA.CODORDEM = KC.CODORDEM AND KA.IDATVORDEM = KC.IDATVORDEM "+
					"						WHERE  "+
					"							KA.CODCOLIGADA = EX.CODCOLIGADA AND KA.CODFILIAL = EX.CODFILIAL  AND KA.CODORDEM = KI.CODORDEM AND CAST(KC.PRIORIDADE AS INT) = (SELECT MAX(PRIORIDADE) FROM KATVORDEMCOMPL WHERE CODORDEM = KI.CODORDEM) "+
					"						) AND X.DTINICIAL <= CAST(GETDATE() AS DATE) AND X.DTFINAL >= CAST(GETDATE() AS DATE) "+
					"	),0) CUSTO_POSTO "+
					"FROM "+
					"	FLUIG.DBO.Z_CRM_EX001005 EX "+
					"	INNER JOIN KITEMORDEM KI ON EX.CODCOLIGADA = KI.CODCOLIGADA AND EX.CODFILIAL = KI.CODFILIAL AND EX.CODIGOPRD = KI.CODESTRUTURA COLLATE SQL_Latin1_General_CP1_CI_AI AND EX.OS = KI.CODCCUSTO COLLATE SQL_Latin1_General_CP1_CI_AI "+
					"	INNER JOIN KORDEM KO ON KI.CODCOLIGADA = KO.CODCOLIGADA AND KI.CODFILIAL = KO.CODFILIAL AND KI.CODORDEM = KO.CODORDEM  "+
					"	INNER JOIN KORDEMCOMPL KC ON KI.CODCOLIGADA = KC.CODCOLIGADA AND KI.CODFILIAL = KC.CODFILIAL AND KI.CODORDEM = KC.CODORDEM AND EX.EXECUCAO = KC.NUMEXEC "+
					"WHERE "+
					"	EX.OS = '"+numOS+"' "+
					"	AND EX.EXECUCAO = '"+execucao+"' AND EX.ITEMEXCLUSIVO<>2 AND KI.STATUS IN (0,2,3) AND ISNULL(KO.REPROCESSAMENTO,0)<>1 "+
					"	AND EX.IDCRIACAO = '"+idCriacao+"' "+
					"	AND EX.CODTRFPAI='"+codTrfPai+"' "+
					"ORDER BY  "+
					"	CAST('/' + REPLACE(EX.INDICE, '.', '/') + '/' AS HIERARCHYID) "
    
    log.info("QUERY dsBuscaOpsItemEstrutura: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsNewDataset.addColumn(rs.getMetaData().getColumnName(i));
                	
                }
                
                created = true;
                
            }
            
            var Arr = new Array();
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                    
                } else {
                	
                    Arr[i - 1] = "null";
                    
                }
                
            }
            
            dsNewDataset.addRow(Arr);
            
        }
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message);
    
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close();
            
        }
        
        if (conn != null) {
        	
            conn.close();
            
        }
        
    }
    
    return dsNewDataset;
	
}