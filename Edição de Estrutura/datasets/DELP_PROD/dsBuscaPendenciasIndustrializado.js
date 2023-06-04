// VERIFICA SE UM DETERMINADO ITEM DA ESTRUTURA QUE É NÃO MANUFATURADO TEM FILHOS
function createDataset(fields, constraints, sortFields) {

	var dsBuscaPendenciasIndustrializado = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
   
    var numOS = ""
    var exec = ""
    var codtrfpai = ""
	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	} 
                    	
        	if(constraints[i].fieldName == "EXEC"){
        		
        		exec = constraints[i].initialValue;
        	
        	} 

            if(constraints[i].fieldName == "CODTRFPAI"){
        		
        		codtrfpai = constraints[i].initialValue;
        	
        	} 
        	
        }
        
    }  

    log.info("VOU MONTAR A QUERY")

    var myQuery =  " "

    if (exec=="") {
        
        /* myQuery =  " SELECT DISTINCT Z.INDICE FROM Z_CRM_ML001005 Z "+
                    " LEFT JOIN Z_CRM_ML001019 Z1 ON Z.OS=Z1.OSCOMPONENTES AND Z.IDCRIACAO=Z1.IDCRIACAOCOMPONENTES "+
                    // Industrializado não pode ter mais de um componente nem componente diferente de 01.018 ou 01.052 ou 01.051;
                    " WHERE TIPODESENHO='INDUSTRIALIZACAO' AND ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) NOT IN ('01.018','01.051','01.052') "+ 
                    " OR ( SELECT COUNT(*) FROM Z_CRM_ML001019 Z2 WHERE Z.OS=Z2.OSCOMPONENTES AND Z.IDCRIACAOCOMPONENTES=Z2.IDCRIACAOCOMPONENTES) != 1 "+ // Industrializado deve ter 1 componente
                    //Industrializado com componente 01.052 deve ter irmao industrializado com 01.018 e outro irmao não 
		            //manufaturado com componente 01.052;
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) = '01.052' AND ( (SELECT COUNT(*) FROM Z_CRM_ML001005 WHERE OS=Z.OS AND NIVEL=Z.NIVEL AND IDCRIACAO!=Z.IDCRIACAO "+ 
                    "  AND TIPODESENHO='INDUSTRIALIZACAO' ) < 1 OR (SELECT COUNT(*) FROM Z_CRM_ML001005 ZAUX INNER JOIN Z_CRM_ML001019 Z2AUX  ON "+
                    "   ZAUX.OS=Z2AUX.OSCOMPONENTES AND ZAUX.IDCRIACAO=Z2AUX.IDCRIACAOCOMPONENTES "+
                    "    WHERE ZAUX.OS=Z.OS AND ZAUX.NIVEL=Z.NIVEL AND ZAUX.IDCRIACAO!=Z.IDCRIACAO AND LEFT(Z2AUX.CODIGOPRDCOMPONENTES,6) = '01.052' "+ 
                    "  AND TIPODESENHO='NAOMANUFATURADO' ) < 1 ) "+  
                    //Industrializado com componente 01.051 deve ser item de retorno de um semiacabado irmão e 
                    //deve ter outro irmao não manufaturado com componente 01.051;
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) = '01.051' AND ( (SELECT COUNT(*) FROM Z_CRM_ML001005 WHERE OS=Z.OS AND NIVEL=Z.NIVEL AND IDCRIACAO!=Z.IDCRIACAO "+ 
                    "  AND ITEMDERETORNO=Z.IDCRIACAO ) < 1 OR (SELECT COUNT(*) FROM Z_CRM_ML001005 ZAUX2 INNER JOIN Z_CRM_ML001019 Z2AUX2  ON "+
                    "   ZAUX2.OS=Z2AUX2.OSCOMPONENTES AND ZAUX2.IDCRIACAO=Z2AUX2.IDCRIACAOCOMPONENTES "+
                    "    WHERE ZAUX2.OS=Z.OS AND ZAUX2.NIVEL=Z.NIVEL AND ZAUX2.IDCRIACAO!=Z.IDCRIACAO AND LEFT(Z2AUX2.CODIGOPRDCOMPONENTES,6) = '01.051' "+ 
                    "  AND TIPODESENHO='NAOMANUFATURADO' ) < 1 )   "+
                    //Industrializado com componente 01.018 deve ter irmão não manufaturado com componente 01.052;
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) = '01.018' AND ( SELECT COUNT(*) FROM Z_CRM_ML001005 ZAUX3 INNER JOIN Z_CRM_ML001019 Z2AUX3  ON  "+
                    "   ZAUX3.OS=Z2AUX3.OSCOMPONENTES AND ZAUX3.IDCRIACAO=Z2AUX3.IDCRIACAOCOMPONENTES "+
                    "    WHERE ZAUX3.OS=Z.OS AND ZAUX3.NIVEL=Z.NIVEL AND ZAUX3.IDCRIACAO!=Z.IDCRIACAO AND LEFT(Z2AUX3.CODIGOPRDCOMPONENTES,6) = '01.052' "+ 
                    "  AND TIPODESENHO='NAOMANUFATURADO' ) < 1 ) ) "+ 
                    " AND (SELECT COUNT(*) FROM Z_CRM_ML001005 K INNER JOIN Z_CRM_ML001021 KA ON K.OS=KA.OSPROCESSO AND K.IDCRIACAO=KA.IDCRIACAOPROCESSO "+
                    " WHERE K.OS=Z.OS AND K.INDICE=Z.NIVEL ) > 0 "+ //Pai tem processo
                    " AND Z.OS ='"+numOS+"' "+
                    " ORDER BY CAST('/' + REPLACE(Z.INDICE, '.', '/') + '/' AS HIERARCHYID)" */
                    
        myQuery = " SELECT * FROM Z_DELP_PENDINDUSTRIALIZADO_OS WHERE OS ='"+numOS+"' "

    }
    else{

        /* myQuery =  " SELECT DISTINCT Z.INDICE FROM Z_CRM_EX001005 Z "+
                    " LEFT JOIN Z_CRM_EX001019 Z1 ON Z.OS=Z1.OSCOMPONENTES AND Z.IDCRIACAO=Z1.IDCRIACAOCOMPONENTES AND Z.EXECUCAO=Z1.EXECUCAO "+
                    //Industrializado não pode ter mais de um componente nem componente diferente de 01.018 ou 01.052 ou 01.051;
                    " WHERE TIPODESENHO='INDUSTRIALIZACAO' AND ITEMEXCLUSIVO!=2 AND ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) NOT IN ('01.018','01.051','01.052') "+                     
                    " OR ( SELECT COUNT(*) FROM Z_CRM_EX001019 Z3 WHERE Z.OS=Z3.OSCOMPONENTES AND Z.IDCRIACAOCOMPONENTES=Z3.IDCRIACAOCOMPONENTES AND Z.EXECUCAO=Z3.EXECUCAO) != 1  "+ // Industrializado deve ter 1 componente
                    //Industrializado com componente 01.052 deve ter irmao industrializado com 01.018 e outro irmao não 
		            //manufaturado com componente 01.052;
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) = '01.052' AND ( (SELECT COUNT(*) FROM Z_CRM_EX001005 WHERE OS=Z.OS AND NIVEL=Z.NIVEL AND IDCRIACAO!=Z.IDCRIACAO "+ 
                    "  AND TIPODESENHO='INDUSTRIALIZACAO' AND Z.EXECUCAO=EXECUCAO) < 1 OR (SELECT COUNT(*) FROM Z_CRM_EX001005 ZAUX INNER JOIN Z_CRM_EX001019 Z2AUX  ON  "+
                    "   ZAUX.OS=Z2AUX.OSCOMPONENTES AND ZAUX.IDCRIACAO=Z2AUX.IDCRIACAOCOMPONENTES AND  ZAUX.EXECUCAO=Z2AUX.EXECUCAO "+
                    "    WHERE ZAUX.OS=Z.OS AND ZAUX.NIVEL=Z.NIVEL AND ZAUX.IDCRIACAO!=Z.IDCRIACAO AND LEFT(Z2AUX.CODIGOPRDCOMPONENTES,6) = '01.052' "+ 
                    "  AND TIPODESENHO='NAOMANUFATURADO' AND ZAUX.EXECUCAO=Z.EXECUCAO) < 1 ) "+ 
                    //Industrializado com componente 01.051 deve ser item de retorno de um semiacabado irmão e 
                    //deve ter outro irmao não manufaturado com componente 01.051;
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) = '01.051' AND ( (SELECT COUNT(*) FROM Z_CRM_EX001005 WHERE OS=Z.OS AND NIVEL=Z.NIVEL AND IDCRIACAO!=Z.IDCRIACAO "+ 
                    "  AND ITEMDERETORNO=Z.IDCRIACAO AND Z.EXECUCAO=EXECUCAO) < 1 OR (SELECT COUNT(*) FROM Z_CRM_EX001005 ZAUX2 INNER JOIN Z_CRM_EX001019 Z2AUX2  ON  "+
                    "   ZAUX2.OS=Z2AUX2.OSCOMPONENTES AND ZAUX2.IDCRIACAO=Z2AUX2.IDCRIACAOCOMPONENTES AND ZAUX2.EXECUCAO=Z2AUX2.EXECUCAO "+
                    "    WHERE ZAUX2.OS=Z.OS AND ZAUX2.NIVEL=Z.NIVEL AND ZAUX2.IDCRIACAO!=Z.IDCRIACAO AND LEFT(Z2AUX2.CODIGOPRDCOMPONENTES,6) = '01.051' "+ 
                    "  AND TIPODESENHO='NAOMANUFATURADO' AND ZAUX.EXECUCAO=Z.EXECUCAO) < 1 )    "+
                    //Industrializado com componente 01.018 deve ter irmão não manufaturado com componente 01.052;
                    " OR ( LEFT(Z1.CODIGOPRDCOMPONENTES,6) = '01.018' AND ( SELECT COUNT(*) FROM Z_CRM_EX001005 ZAUX3 INNER JOIN Z_CRM_EX001019 Z2AUX3 ON  "+
                    "   ZAUX3.OS=Z2AUX3.OSCOMPONENTES AND ZAUX3.IDCRIACAO=Z2AUX3.IDCRIACAOCOMPONENTES AND AND ZAUX3.EXECUCAO=Z2AUX3.EXECUCAO "+
                    "    WHERE ZAUX3.OS=Z.OS AND ZAUX3.NIVEL=Z.NIVEL AND ZAUX3.IDCRIACAO!=Z.IDCRIACAO AND LEFT(Z2AUX3.CODIGOPRDCOMPONENTES,6) = '01.052' "+ 
                    "  AND TIPODESENHO='NAOMANUFATURADO' ) < 1 ) ) "+ 
                    " AND (SELECT COUNT(*) FROM Z_CRM_EX001005 K INNER JOIN Z_CRM_EX001021 KA ON K.OS=KA.OSPROCESSO AND K.IDCRIACAO=KA.IDCRIACAOPROCESSO AND K.EXECUCAO=KA.EXECUCAO "+
                    " WHERE K.OS=Z.OS AND K.EXECUCAO=Z.EXECUCAO AND K.INDICE=Z.NIVEL ) > 0 "+ //Pai tem processo
                    " AND Z.OS ='"+numOS+"' AND Z.EXECUCAO ="+exec+" AND Z.CODTRFPAI='"+codtrfpai+"' "+
                    " ORDER BY CAST('/' + REPLACE(Z.INDICE, '.', '/') + '/' AS HIERARCHYID)" */
    	
    
    	myQuery = " SELECT REGRA FROM Z_DELP_PENDINDUSTRIALIZADO_EX WHERE OS ='"+numOS+"' AND EXECUCAO ="+exec+" AND CODTRFPAI='"+codtrfpai+"'"

    }

    
    log.info("QUERY dsBuscaPendenciasIndustrializado: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsBuscaPendenciasIndustrializado.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsBuscaPendenciasIndustrializado.addRow(Arr);
            
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
    
    return dsBuscaPendenciasIndustrializado;
	
}