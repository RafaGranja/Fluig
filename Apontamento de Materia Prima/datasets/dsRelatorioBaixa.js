// BUSCA INFORMAÇÕES DAs BAIXAS DE MATERIAL
function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
	//var dataSource = "/jdbc/FluigDSRM
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("Entrei no dataset dsRelatorioBaixa")
    
    var myQuery = ""
    
	var codcoligada = ""
    var codfilial = ""
    var numplano = ""
    var codatividade = ""
    var codordem = ""
    var idAtvOrdem = ""
    var tipo = ""
    var idprd = ""
		
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
            if (constraints[i].fieldName == "CODCOLIGADA") {
            	
            	codcoligada = constraints[i].initialValue
            	
            }
            
            if (constraints[i].fieldName == "CODFILIAL") {
            	
            	codfilial =  constraints[i].initialValue
            	
            }
            
            if (constraints[i].fieldName == "NUMPLANOCORTE") {
            	
            	numplano = "'"+constraints[i].initialValue+"'"
            	
            }
            
            if (constraints[i].fieldName == "TIPO") {
            	
            	tipo = constraints[i].initialValue
            	
            }
            
            if (constraints[i].fieldName == "CODORDEM") {
            	
            	codordem = "'"+constraints[i].initialValue+"'"
            	
            }
            
            if (constraints[i].fieldName == "IDATVORDEM") {
            	
            	idAtvOrdem = constraints[i].initialValue
            	
            }
            if (constraints[i].fieldName == "IDPRD") {
            	
            	idprd = constraints[i].initialValue
            	
            }
            
        }
        
    }
	
	if(tipo=="PAPC"){
		
		myQuery = 	" SELECT ROW_NUMBER()OVER(ORDER BY K.CODCCUSTO) ID,K.CODCCUSTO,Z.CODORDEM,KL.NUMEXEC,Z.QUANTIDADE,Z.CODESTRUTURA,P.NOMEFANTASIA NOMEFANTASIA1,Z.CODIGOMP, "+
			" P2.NOMEFANTASIA NOMEFANTASIA2,QTDEMP,QTDMPFINAL,CODSUCATA,QTDESUCATA,P3.NOMEFANTASIA NOMEFANTASIA3,ISNULL(QTDEAPONTADA,0) QTDEAPONTADA,CASE WHEN QTDEAPONTADA = QUANTIDADE THEN 0 ELSE 1 END AS PENDENTE "+
			" FROM ZMDPLANOAPROVEITAMENTOCORTE Z "+
			" INNER JOIN TPRD P ON "+
			" P.CODCOLIGADA=Z.CODCOLIGADA "+
			" AND P.CODIGOPRD=Z.CODESTRUTURA "+
			" INNER JOIN TPRD P2 ON "+
			" P2.CODCOLIGADA=Z.CODCOLIGADA "+
			" AND P2.CODIGOPRD=Z.CODIGOMP "+
			" INNER JOIN TPRD P3 ON "+
			" P3.CODCOLIGADA=Z.CODCOLIGADA "+
			" AND P3.CODIGOPRD=Z.CODSUCATA "+
			" INNER JOIN KORDEM K ON "+
			" K.CODCOLIGADA=Z.CODCOLIGADA "+
			" AND K.CODFILIAL=Z.CODFILIAL "+
			" AND K.CODORDEM=Z.CODORDEM "+
			" INNER JOIN KORDEMCOMPL KL ON "+
			" KL.CODCOLIGADA=Z.CODCOLIGADA "+
			" AND KL.CODFILIAL=Z.CODFILIAL "+
			" AND KL.CODORDEM=Z.CODORDEM "+
			" WHERE NUMPLANOCORTE="+numplano
		
	}
	else{
		
		myQuery =  
			" SELECT ROW_NUMBER()OVER( ORDER BY R3.CODCOLIGADA )ID,R3.CODCOLIGADA,R3.CODFILIAL,IDPRODUTO,SUM(R3.PREVISTO) PREVISTO,SUM(R3.APONTADO) APONTADO "+
			" ,R3.GRUPO,R3.MASKPRD,R3.SUBSTITUTO,L.NUMLOTE,L.IDLOTE,SUM(LC.SALDOFISICO2) SALDOFISICO2,L.IDSTATUS,LS.DESCRICAO,LC.CODLOC,T2.CODIGOPRD,T2.CUSTOMEDIO,T2.CODUNDCONTROLE FROM (  "+
					" SELECT '"+idprd+"' IDPRODUTO,R2.PREVISTO,R2.APONTADO,R2.CODFILIAL  "+
			" ,R2.GRUPO,R2.MASKPRD,R2.CODCOLIGADA,  "+
			" CASE WHEN PREVISTO = 0 THEN (SELECT IDPRDORIGEM FROM KCOMPSUBSTITUTO KC  "+ 
					" INNER JOIN KESTRUTURA KE ON KC.CODESTRUTURA=KE.CODESTRUTURA AND KC.CODCOLIGADA=KE.CODCOLIGADA AND KC.CODFILIAL=KE.CODFILIAL  "+ 
											" WHERE KE.CODESTRUTURA=R2.CODESTRUTURA AND KC.IDPRD=R2.IDPRODUTO AND KE.CODCCUSTO=R2.CODCCUSTO AND KC.CODCOLIGADA=R2.CODCOLIGADA  "+ 
											" AND KC.CODFILIAL=R2.CODFILIAL AND KC.CODATIVIDADE=CODATIVIDADE) ELSE R2.IDPRODUTO END AS SUBSTITUTO  "+
											" FROM (  "+
					 " SELECT EXECUCAO,CODCCUSTO,CODCOLIGADA,CODFILIAL,CODESTRUTURA,CODORDEM,IDATVORDEM,CODATIVIDADE,SALDOPAPC,PAPC,IDPRODUTO,SUM(PREVISTO) PREVISTO,SUM(APONTADO) APONTADO,CODTB2FAT GRUPO,MASKPRD,CODIGOPRD FROM (  "+
						" SELECT KL.NUMEXEC EXECUCAO,K.CODCCUSTO,KA.CODCOLIGADA,KA.CODFILIAL,KA.CODESTRUTURA,K.CODORDEM,KA.IDATVORDEM,KA.CODATIVIDADE,CASE WHEN PAPC.NUMPLANOCORTE IS NULL  "+ 
					" THEN 0   "+
						" ELSE  "+ 
						" CASE WHEN PAPC.QTDEAPONTADA IS NULL  "+ 
							" THEN  CASE WHEN PAPC.QUANTIDADE-KA.QUANTIDADE < 0  "+  
								" THEN 0  "+
											" ELSE PAPC.QUANTIDADE-KA.QUANTIDADE  "+
											" END  "+
											" ELSE PAPC.QUANTIDADE-PAPC.QTDEAPONTADA  "+
								" END  "+			
								" END AS SALDOPAPC,  "+
						" CASE WHEN PAPC.NUMPLANOCORTE IS NULL THEN '0' ELSE PAPC.NUMPLANOCORTE END AS PAPC,  "+
					" KMA.IDPRODUTO,  "+
					" CASE WHEN KMA.EFETIVADO=0 THEN KMA.QUANTIDADE ELSE 0 END AS PREVISTO,  "+
					" CASE WHEN KMA.EFETIVADO=1 THEN KMA.QUANTIDADE ELSE 0 END AS APONTADO,  "+
					" (SELECT CODTB2FAT FROM TPRODUTODEF WHERE CODCOLIGADA=KA.CODCOLIGADA AND IDPRD=KMA.IDPRODUTO) CODTB2FAT,  "+
					" LEFT(P.CODIGOPRD,6) MASKPRD,P.CODIGOPRD  "+
					" FROM KORDEM (NOLOCK) K  "+ 
					" INNER JOIN KATVORDEM (NOLOCK) KA ON  "+
						" KA.CODCOLIGADA=K.CODCOLIGADA  "+
						" AND KA.CODFILIAL=K.CODFILIAL  "+
						" AND KA.CODORDEM=K.CODORDEM  "+
						" INNER JOIN KORDEMCOMPL (NOLOCK) KL ON  "+
						" KL.CODCOLIGADA=KA.CODCOLIGADA  "+
						" AND KL.CODFILIAL=KA.CODFILIAL  "+
						" AND KL.CODORDEM=KA.CODORDEM  "+
						" INNER JOIN KATVORDEMMP (NOLOCK) KMA ON  "+
						" KMA.CODCOLIGADA=KA.CODCOLIGADA  "+
						" AND KMA.CODFILIAL=KA.CODFILIAL  "+
						" AND KMA.CODORDEM=KA.CODORDEM  "+
						" AND KMA.IDATIVIDADE=KA.IDATVORDEM  "+
						" INNER JOIN TPRD (NOLOCK) P ON  "+         
						" KMA.CODCOLIGADA = P.CODCOLIGADA  "+ 
						" AND KMA.IDPRODUTO = P.IDPRD  "+
						" LEFT JOIN ZMDPLANOAPROVEITAMENTOCORTE (NOLOCK) PAPC ON  "+
						" PAPC.CODCOLIGADA=KA.CODCOLIGADA  "+
						" 			AND PAPC.CODFILIAL=KA.CODFILIAL  "+
						" 			AND PAPC.CODORDEM=KA.CODORDEM  "+
						" 			AND PAPC.CODATIVIDADE=KA.CODATIVIDADE  "+
			" 		WHERE K.STATUS NOT IN (5,6) AND KA.STATUS NOT IN (6) AND K.CODCOLIGADA="+codcoligada+" AND K.CODFILIAL="+codfilial+" AND K.CODORDEM="+codordem+" AND KA.IDATVORDEM="+idAtvOrdem+" AND PAPC.NSEQPLANOCORTE IS NULL "+
			" 			AND ( P.IDPRD="+idprd+" OR P.IDPRD = (	SELECT IDPRDORIGEM FROM KCOMPSUBSTITUTO KC "+ 
			" 								INNER JOIN KESTRUTURA KE ON KC.CODESTRUTURA=KE.CODESTRUTURA AND KC.CODCOLIGADA=KE.CODCOLIGADA AND KC.CODFILIAL=KE.CODFILIAL "+ 
			" 								WHERE KE.CODESTRUTURA=KA.CODESTRUTURA AND KC.IDPRD="+idprd+" AND KE.CODCCUSTO=K.CODCCUSTO AND KC.CODCOLIGADA=K.CODCOLIGADA "+ 
			" 								AND KC.CODFILIAL=K.CODFILIAL AND KC.CODATIVIDADE=KA.CODATIVIDADE ) OR P.IDPRD IN (SELECT IDPRD FROM KCOMPSUBSTITUTO KC "+
			"							INNER JOIN KESTRUTURA KE ON KC.CODESTRUTURA=KE.CODESTRUTURA AND KC.CODCOLIGADA=KE.CODCOLIGADA AND KC.CODFILIAL=KE.CODFILIAL "+ 
			"							WHERE KE.CODESTRUTURA=KA.CODESTRUTURA AND KC.IDPRDORIGEM="+idprd+" AND KE.CODCCUSTO=K.CODCCUSTO AND KC.CODCOLIGADA=K.CODCOLIGADA  "+
			"							AND KC.CODFILIAL=K.CODFILIAL AND KC.CODATIVIDADE=KA.CODATIVIDADE)) "+
			" 		) R "+ 
			" WHERE (CODTB2FAT = 0184 OR MASKPRD NOT IN ('01.053','01.019','01.020'))  "+
			" GROUP BY EXECUCAO,CODCCUSTO,CODCOLIGADA,CODFILIAL,CODORDEM,IDATVORDEM,SALDOPAPC,PAPC,IDPRODUTO,CODTB2FAT,MASKPRD,CODATIVIDADE,CODESTRUTURA,CODIGOPRD  "+
			" ) R2 ) R3  "+
			" INNER JOIN TLOTEPRD L ON  "+
			" L.CODCOLIGADA=R3.CODCOLIGADA  "+
			" AND L.IDPRD=R3.IDPRODUTO  "+
			" INNER JOIN TSTATUSLOTEPRD LS ON  "+
			" LS.IDSTATUS=L.IDSTATUS  "+
			" INNER JOIN TLOTEPRDLOC LC ON  "+
			" LC.CODCOLIGADA=L.CODCOLIGADA  "+
			" AND LC.IDLOTE=L.IDLOTE    "+
			" INNER JOIN TPRD T2 ON  "+
			" T2.CODCOLIGADA=R3.CODCOLIGADA  "+
			" AND T2.IDPRD=R3.IDPRODUTO    "+
			" LEFT JOIN KORDEM K2 ON  "+
			" K2.CODCOLIGADA=L.CODCOLIGADA  "+
			" AND K2.CODFILIAL=R3.CODFILIAL    "+
			" AND K2.CODORDEM=L.NUMLOTE    "+
			" LEFT JOIN KORDEMCOMPL K2L ON  "+
			" K2L.CODCOLIGADA=K2.CODCOLIGADA  "+
			" AND K2L.CODFILIAL=K2.CODFILIAL    "+
			" AND K2L.CODORDEM=K2.CODORDEM    "+
			" LEFT JOIN FLUIG.DBO.Z_CRM_EXPROJETOS ZE ON  "+
			" ZE.CODCOLIGADA=K2.CODCOLIGADA  "+
			" AND ZE.CODFILIAL=K2.CODFILIAL    "+
			" AND ZE.OS=K2.CODORDEM collate SQL_Latin1_General_CP1_CI_AI   "+
			" AND ZE.EXECUCAO=K2L.CODFILIAL    "+
			" AND ZE.CODTRFPAI=RIGHT(K2.RESPONSAVEL,LEN(K2.RESPONSAVEL)-CHARINDEX('/',K2.RESPONSAVEL)) collate SQL_Latin1_General_CP1_CI_AI    "+
			" WHERE ( LC.CODLOC IN (23,25,27) OR LC.CODLOC IS NULL ) AND L.IDSTATUS=6 AND ZE.CODCOLIGADA IS NULL "+
			" GROUP BY R3.CODCOLIGADA,R3.CODFILIAL,R3.IDPRODUTO,R3.GRUPO,R3.MASKPRD,L.NUMLOTE,L.IDLOTE,L.IDSTATUS,LS.DESCRICAO,R3.SUBSTITUTO,LC.CODLOC,T2.CODIGOPRD,T2.CUSTOMEDIO,T2.CODUNDCONTROLE "+
			" ORDER BY NUMLOTE  "

			

			
	}
			
	 
	
    log.info("dsRelatorioBaixa MY QUERY: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.executeQuery(myQuery)
        var columnCount = rs.getMetaData().getColumnCount()
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                    newDataset.addColumn(rs.getMetaData().getColumnName(i))
                    
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
            
            newDataset.addRow(Arr)
            
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
    
    return newDataset
	
}