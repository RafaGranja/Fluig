// INSERE INFORMAÇÕES DE NECESSIDADE DE PLANO DE CORTE
function createDataset(fields, constraints, sortFields) {

	var dsInsertNecessidadePAPC = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    log.info("entrei no dataset dsInsertNecessidadePAPC")
    
	var codColigada
	var codfilial
	var codOrdem
	var codEstrutura
	var idatvordem
	var codatividade
	var quantidade
	var usuario1
	var usuario2
	var prioridade
	var complemento = 'NULL'
	var datanecessidade
	var dataoriginal = 'GETDATE()'
	var papc
	var status
	var observacao = 'NULL'
	var semananecessidade
	var lognecessidade = 'NULL'
	var datareprog = 'NULL'
	var semanareprog = 'NULL'
	var prioridadereprog='NULL'
	var qtdatendida = 'NULL'
		
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
			if(constraints[i].fieldName=="QUANTIDADE"){
				
				quantidade = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="USUARIO"){
				
				usuario1 = constraints[i].initialValue
				usuario2 = constraints[i].finalValue
				        			
			}
			if(constraints[i].fieldName=="PRIORIDADE"){
				
				prioridade = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="COMPLEMENTO"){
				
				complemento = "'"+constraints[i].initialValue+"'"
				        			
			}
			if(constraints[i].fieldName=="STATUS"){
				
				status = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="NECESSIDADE"){
				
				datanecessidade = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="DATAORIGINAL"){
				
				dataoriginal = " convert(datetime,'"+constraints[i].initialValue+"') "
				        			
			}
			if(constraints[i].fieldName=="PAPC"){
				
				papc = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="OBSERVACAO"){
				
				observacao = "'"+constraints[i].initialValue+"'"
				        			
			}
			if(constraints[i].fieldName=="SEMANANECESSIDADE"){
				
				semananecessidade = "'"+constraints[i].initialValue+"'"
				        			
			}
			if(constraints[i].fieldName=="LOG"){
				
				lognecessidade = "'"+constraints[i].initialValue+"'"
				        			
			}
			if(constraints[i].fieldName=="PRIORIDADEREPROGRAMACAO"){
				
				prioridadereprog = constraints[i].initialValue
				        			
			}
			if(constraints[i].fieldName=="SEMANAREPROGRAMACAO"){
				
				semanareprog = "'"+constraints[i].initialValue+"'"
				        			
			}
			if(constraints[i].fieldName=="DATAREPROGRAMACAO"){
				
				datareprog = " convert(datetime,'"+constraints[i].initialValue+"') "
				        			
			}
			
			if(constraints[i].fieldName=="QTDATENDIDA"){
				
				qtdatendida = constraints[i].initialValue
				        			
			}

        	      	
        }
        
	}
    
    var myQuery =  "INSERT INTO Z_DELP_NECESSIDADEPAPC VALUES (ISNULL((SELECT MAX(NSEQPEDIDO) FROM Z_DELP_NECESSIDADEPAPC),0)+1,"+codColigada+","+codfilial+",'"+codOrdem+"','"+codEstrutura+"',"+
    idatvordem+",'"+codatividade+"',"+quantidade+","+qtdatendida+","+prioridade+","+status+","+complemento+",convert(datetime,'"+datanecessidade+"'),"+semananecessidade+",'"+papc+"',"+observacao+","+
    datareprog+","+semanareprog+","+prioridadereprog+","+lognecessidade+",NULL,'"+usuario1+"'"+","+dataoriginal+",'"+usuario2+"',GETDATE())"
	    
    log.info("QUERY dsInsertNecessidadePAPC: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.execute(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsInsertNecessidadePAPC.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsInsertNecessidadePAPC.addRow(Arr);
            
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
    
    return dsInsertNecessidadePAPC;
	
}