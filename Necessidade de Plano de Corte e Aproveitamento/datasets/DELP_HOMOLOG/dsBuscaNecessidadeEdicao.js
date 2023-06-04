// BUSCA AS INFORMAÇÕES DAS ATIVIDADES QUE PODEM SER EDITADOS EM UM PLANO DE CORTE DE UM DETERMINADO PROJETO
function createDataset(fields, constraints, sortFields) {

	var dsBuscaNecessidadeEdicao = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    //var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    log.info("entrei no dataset dsBuscaNecessidadeEdicao")
    
    var os = ""
    var status = ""
    var order = ""
    var semana = ""

		
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "OS") {
        		
        		if(!(constraints[i].initialValue=="")){
        			
        			os = constraints[i].initialValue
        			
        		}
        		
            }
        	if (constraints[i].fieldName == "STATUS") {
        		
        		if(!(constraints[i].initialValue=="")){
        			
        			status = constraints[i].initialValue
        			
        			if(status==1){
        				status = " AND Z.STATUS=0 "
        			}
        			else if(status==2){
        				//status = " AND Z.STATUS != 2 "
        				status = ""
        				semana = " AND (( SUBSTRING(ISNULL(Z.SEMANAREPROGRAMACAO,Z.SEMANANECESSIDADE),1,CHARINDEX('/',ISNULL(Z.SEMANAREPROGRAMACAO,Z.SEMANANECESSIDADE))-1) " +
        						 " >= DATEPART(WEEK,GETDATE()) AND (SUBSTRING(ISNULL(Z.SEMANAREPROGRAMACAO,Z.SEMANANECESSIDADE)," +
	        					" CHARINDEX('/',ISNULL(Z.SEMANAREPROGRAMACAO,Z.SEMANANECESSIDADE))+1,DATALENGTH(ISNULL(Z.SEMANAREPROGRAMACAO,Z.SEMANANECESSIDADE)))=YEAR(GETDATE()))) OR "+
	        					" (SUBSTRING(ISNULL(Z.SEMANAREPROGRAMACAO,Z.SEMANANECESSIDADE),CHARINDEX('/'," +
	        					"ISNULL(Z.SEMANAREPROGRAMACAO,Z.SEMANANECESSIDADE))+1,DATALENGTH(ISNULL(Z.SEMANAREPROGRAMACAO,Z.SEMANANECESSIDADE)))>YEAR(GETDATE())) OR (Z.QUANTIDADE - ISNULL(Z.QTDATENDIDA, 0)>0)) "
        			}
        			else if(status==3){
        				status = ""
        			}
        			
        		}
        		
            }
        	if (constraints[i].fieldName == "ORDER") {
            	
        		log.info("tem order preenchido")
        		
        		if(!(constraints[i].initialValue=="")){
        			
        			if(constraints[i].initialValue=="OP"){
        			
        				log.info("order é OP")
        				
        				order = " ORDER BY SEMANANECESSIDADE,OP "	
        				
        			}
        			if(constraints[i].initialValue=="NUMDESENHO"){
        			
        				log.info("order é NUMDESENHO")
        				
        				order = " ORDER BY SEMANANECESSIDADE,NUMDESENHO "
        				
        			}
        			        		
        		}
        		else{
        			
        			order = " ORDER BY SEMANANECESSIDADE "	
        			
        		}
        		
            }
			        	
        }
        
	}
    
    var myQuery = " SELECT *, "+
					"    (SELECT LOGNECESSIDADE "+
					"            FROM   FLUIG.DBO.Z_DELP_NECESSIDADEPAPC "+
					"            WHERE  NSEQPEDIDO = R.NSEQPEDIDO) LOGNECESSIDADE "+
					"    FROM   (SELECT DISTINCT Z.CODCOLIGADA, "+
                    "        Z.CODFILIAL, "+
                    "        K.CODCCUSTO  OS, "+
                    "        N.NUMDESENHO, "+
                    "        N.CODIGOPRD "+
                    "        CODESTRUTURA, "+
                    "        N.EXECUCAO, "+
                    "        K.CODORDEM OP, "+
                    "        A.DSCATIVIDADE, "+
                    "        Z.CODATIVIDADE, "+
                    "        KA.IDATVORDEM, "+
                    "        N.POSICAODESENHO POSICAO, "+
                    "        N.DESCRICAO  ITEM, "+
                    "        N.MATERIAL, "+
                    "        ( Z.QUANTIDADE ) - ISNULL(Z3.QUANTIDADE, 0) "+
                    "        QUANTIDADE, "+
                    "        Z.QTDATENDIDA, "+
                    "        KA.QTPREVISTA "+
                    "        QTDEPLANEJADA, "+
                    "        Z.QUANTIDADE "+
                    "        QTDORIGINAL, "+
                    "        Z.SEMANANECESSIDADE, "+
                    "        Z.SEMANAREPROGRAMACAO, "+
                    "        Z.PRIORIDADEREPROGRAMACAO, "+
                    "        Z.STATUS STATUSNECESSIDADE, "+
                    "        Z.RECCREATEDBY, "+
                    "        Z.RECCREATEDON, "+
                    "        ( KA.QTPREVISTA - Z.QUANTIDADE ) SALDOED, "+
                    "        Z.QUANTIDADE "+
                    "        QUANTIDADEED, "+
                    "        N.BITOLA, "+
                    "        CONVERT(VARCHAR(10), Z.DATANECESSIDADE, 103) "+
                    "        DATANECESSIDADE, "+
                    "        Z.PRIORIDADE, "+
                    "        Z.RECMODIFIEDBY, "+
                    "        Z.PAPC, "+
                    "        Z.COMPLEMENTO, "+
                    "        Z.OBS, "+
                    "        CONVERT(VARCHAR(10), Z.DATAREPROGRAMACAO, 103) "+
                    "               DATAREPROGRAMACAO, "+
                    "        ( Z.QUANTIDADE - ISNULL(Z.QTDATENDIDA, 0) )    SALDO, "+
                    "        Z.NSEQPEDIDO, "+
                    "        N.PESOBRUTO, "+
                    "        N.PESOLIQUIDO,CASE WHEN K.RESPONSAVEL LIKE '%RETRABALHO%' THEN 1 ELSE 0 END AS RETRABALHO, Z.PENDENCIA "+
					" 		FROM FLUIG.DBO.Z_DELP_NECESSIDADEPAPC Z  " +
					" 			INNER JOIN KORDEM K ON  " +
						" 			K.CODCOLIGADA=Z.CODCOLIGADA  " +
						" 			AND K.CODFILIAL=Z.CODFILIAL  " +
						" 			AND K.CODORDEM=Z.CODORDEM  " +
						" 			INNER JOIN KORDEMCOMPL KC ON  " +
						" 			K.CODCOLIGADA = KC.CODCOLIGADA  " +
						" 			AND K.CODFILIAL = KC.CODFILIAL  " +
						" 			AND K.CODORDEM = KC.CODORDEM  " +
						" 	       INNER JOIN KATVORDEM KA ON  " +
				        " 			KA.CODCOLIGADA=Z.CODCOLIGADA  " +
						" 			AND KA.CODFILIAL=Z.CODFILIAL  " +
						" 		AND KA.CODORDEM=Z.CODORDEM  " +
						" 			AND KA.CODATIVIDADE=Z.CODATIVIDADE  " +
						" 			INNER JOIN FLUIG.DBO.Z_CRM_EX001005 N ON  " +
						" 		N.OS = K.CODCCUSTO COLLATE Latin1_General_CI_AS  " +
						" 			AND N.CODIGOPRD = Z.CODESTRUTURA COLLATE Latin1_General_CI_AS  " +
						" 			AND N.EXECUCAO=KC.NUMEXEC  " +
						" 			AND N.ITEMEXCLUSIVO<>2  " +
						" 	       AND N.CODCOLIGADA=KA.CODCOLIGADA  " +
				        " 	       AND N.CODFILIAL=KA.CODFILIAL  " +
				        " 		INNER JOIN KATIVIDADE A ON  " +
						" 			A.CODCOLIGADA=Z.CODCOLIGADA  " +
						" 			AND A.CODATIVIDADE=Z.CODATIVIDADE  " +
						" 	 	    AND A.CODFILIAL=Z.CODFILIAL  " +
						" LEFT JOIN (  " +
						"		   SELECT SUM(A.QUANTIDADE) QUANTIDADE,A.CODCOLIGADA,A.CODFILIAL,A.CODORDEM,A.CODATIVIDADE  " +
						"		   FROM ZMDPLANOAPROVEITAMENTOCORTE A  " +
						"		   INNER JOIN FLUIG.DBO.Z_DELP_NECESSIDADEPAPC B  " +
						"		    ON A.CODCOLIGADA = B.CODCOLIGADA  " +
					    "                     AND A.CODFILIAL = B.CODFILIAL  " +
					    "                     AND A.CODORDEM = B.CODORDEM  " +
					    "                     AND A.CODATIVIDADE = B.CODATIVIDADE  " +
						"					 AND A.NUMPLANOCORTE LIKE CONCAT('%COM O PLANO ',B.LOGNECESSIDADE,'%')  " +
						"		   GROUP BY A.CODCOLIGADA,A.CODFILIAL,A.CODORDEM,A.CODATIVIDADE)AS  Z3  " +
					    "                  ON Z3.CODCOLIGADA = Z.CODCOLIGADA  " +
					    "                     AND Z3.CODFILIAL = Z.CODFILIAL  " +
					    "                     AND Z3.CODORDEM = Z.CODORDEM  " +
					    "                     AND Z3.CODATIVIDADE = Z.CODATIVIDADE  " +
    		" WHERE K.CODCCUSTO LIKE '"+os+"%' "+status+" "+semana+" ) R "+ order
    
	    
    log.info("QUERY dsBuscaNecessidadeEdicao: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsBuscaNecessidadeEdicao.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsBuscaNecessidadeEdicao.addRow(Arr);
            
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
    
    return dsBuscaNecessidadeEdicao;
	
}