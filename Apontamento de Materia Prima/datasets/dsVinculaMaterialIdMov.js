// BUSCA INFORMAÇÕES DO MOVIMENTO E EXECUTA A PROCEDURE VINCULA MATERIAL
function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
	//var dataSource = "/jdbc/FluigDSRM
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("Entrei no dataset dsVinculaMaterialIdMov")
    
    var myQuery = ""

    var codColigada = ""
    var codFilial = ""
    var idMov = ""
    var retornoUpdate = "SUCESSO"

		
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++){
            
            if (constraints[i].fieldName == "CODCOLIGADA") {
            	
            	codColigada = constraints[i].initialValue
            	
            }
        
	        if (constraints[i].fieldName == "CODFILIAL") {
	        	
	        	codFilial = constraints[i].initialValue
	        	
	        }
	        
	        if (constraints[i].fieldName == "IDMOV") {
	        	
	        	idMov = constraints[i].initialValue
	        	
	        }
            
        }
        
    }
	
		

	myQuery =   " DECLARE @CODCOLIGADA INT "+
				" DECLARE @CODFILIAL INT "+
				" DECLARE @CODORDEM VARCHAR(20) "+
				" DECLARE @IDATV INT "+
				" DECLARE @IDMOV INT "+
				" DECLARE @DATAAPONTAMENTO DATETIME "+
				" SELECT @CODCOLIGADA=CODCOLIGADA,@CODFILIAL=CODFILIAL,@CODORDEM=CAMPOLIVRE1,@IDATV=CAMPOLIVRE2,@IDMOV=IDMOV,@DATAAPONTAMENTO=DATAEMISSAO "+
				" FROM TMOV WHERE CODCOLIGADA="+codColigada+" AND CODFILIAL="+codFilial+" AND IDMOV="+idMov+
				" EXEC SP_CRM_VINCULAMATERIAL @CODCOLIGADA,@CODFILIAL,@CODORDEM,@IDATV,@IDMOV,@DATAAPONTAMENTO "
				

	 
	
    log.info("dsVinculaMaterialIdMov MY QUERY: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.execute(myQuery)
        log.info(rs)
        
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message);
    	retornoUpdate =  e.message;
    
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close();
            
        }
        
        if (conn != null) {
        	
            conn.close();
            
        }
        
    }
    newDataset.addColumn('MSG')
    newDataset.addRow(new Array(retornoUpdate))
    
    return newDataset
	
}