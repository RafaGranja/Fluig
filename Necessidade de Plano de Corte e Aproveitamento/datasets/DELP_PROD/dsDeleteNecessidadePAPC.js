// DELETA INFORMAÇÕES DE NECESSIDADE DE PLANO DE CORTE
function createDataset(fields, constraints, sortFields) {

	var dsDeleteNecessidadePAPC = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    log.info("entrei no dataset dsDeleteNecessidadePAPC")
    
	var codColigada
	var codfilial
	var codOrdem
	var codEstrutura
	var idatvordem
	var codatividade
	var prioridade
	var datanecessidade
	var papc
	var semanareprog = "NULL"
	var prioridadereprog = "NULL"
	var datareprogramacao = "NULL"
	var semananecessidade
	var nseqpedido = 'NULL'

			
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
            	
    		if(constraints[i].fieldName=="COLIGADA"){
    			
    			codColigada = constraints[i].initialValue
    			        			
    		}
			if(constraints[i].fieldName=="FILIAL"){
			        			
				codfilial = constraints[i].initialValue
			        			        			
			}
			if(constraints[i].fieldName=="CODORDEM"){
				
				codOrdem = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="CODESTRUTURA"){
				
				codEstrutura = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="IDATVORDEM"){
				
				idatvordem = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="CODATIVIDADE"){
			
				codatividade = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="PRIORIDADE"){
				
				prioridade = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="NECESSIDADE"){
				
				semananecessidade = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="DATANECESSIDADE"){
				
				datanecessidade = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="PAPC"){
				
				papc = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="SEMANAREPROG"){
				
				semanareprog = "'"+constraints[i].initialValue+"'"
				        			
			}
			if(constraints[i].fieldName=="PRIORIDADEREPROG"){
				
				prioridadereprog = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="DATAREPROGRAMACAO"){
				
				datareprogramacao = "convert(datetime,'"+constraints[i].initialValue+"') "
				        			
			}
			if(constraints[i].fieldName=="NSEQPEDIDO"){
				
				nseqpedido = constraints[i].initialValue
				        			
			}
        	      	
        }
        
	}
    

    var myQuery = "DELETE FROM Z_DELP_NECESSIDADEPAPC WHERE NSEQPEDIDO="+nseqpedido
	    
    log.info("QUERY dsDeleteNecessidadePAPC: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.execute(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsDeleteNecessidadePAPC.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsDeleteNecessidadePAPC.addRow(Arr);
            
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
    
    return dsDeleteNecessidadePAPC;
	
}