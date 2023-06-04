// BUSCA TODOS OS COMPONENTES DE UMA DETERMINADA ATIVIDADE DE UMA OP
function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
	//var dataSource = "/jdbc/FluigDSRM
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("Entrei no dataset dsComponentesApontamento novo")
    
    var myQuery = ""
    
	var codcoligada = ""
    var codfilial = ""
    var codestrutura = ""
    var codatividade = ""
    var codordem = ""
    var idAtvOrdem = ""
		
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
            if (constraints[i].fieldName == "CODCOLIGADA") {
            	
            	codcoligada = constraints[i].initialValue
            	
            }
            
            if (constraints[i].fieldName == "CODFILIAL") {
            	
            	codfilial =  constraints[i].initialValue
            	
            }
            
            if (constraints[i].fieldName == "CODESTRUTURA") {
            	
            	codestrutura = "'"+constraints[i].initialValue+"'"
            	
            }
            
            if (constraints[i].fieldName == "CODATIVIDADE") {
            	
            	codatividade = "'"+constraints[i].initialValue+"'"
            	
            }
            
            if (constraints[i].fieldName == "CODORDEM") {
            	
            	codordem = "'"+constraints[i].initialValue+"'"
            	
            }
            
            if (constraints[i].fieldName == "IDATVORDEM") {
            	
            	idAtvOrdem = constraints[i].initialValue
            	
            }
            
        }
        
    }
	
	/*myQuery = 	" SELECT CONSUMO_PLANEJADO - CONSUMO_APONTADO CONSUMO_SALDO,* "+
				"	FROM "+
				"		(SELECT "+
				"			P.CONTROLADOPORLOTE, P.IDPRD, P.CODIGOPRD, P.DESCRICAO, LD.NUMLOTE, LD.IDLOTE, LD.DATAVALIDADE, C.QUANTIDADE CONSUMO_PLANEJADO, P.CODUNDCONTROLE, E.CODLOC,  "+
				"			ISNULL((SELECT "+
				"				SUM(QUANTIDADE) "+ 
				"				FROM "+
				"				KATVORDEMMP "+ 
				"				WHERE  "+
				"				IDPRODUTO = C.IDPRODUTO AND CODCOLIGADA = A.CODCOLIGADA AND CODFILIAL = A.CODFILIAL AND CODESTRUTURA = A.CODESTRUTURA AND CODORDEM = A.CODORDEM AND IDATIVIDADE = A.IDATVORDEM AND EFETIVADO = 1 "+
				"			),0) CONSUMO_APONTADO, "+
				"			E.SALDOFISICO2 ESTOQUE_ATUAL, E.SALDOFISICO3 ESTOQUE_ALOCADO, E.SALDOFISICO2 - E.SALDOFISICO3 ESTOQUE_SALDO, A.IDATVORDEM, P.CUSTOMEDIO "+
				"		FROM "+
				"			KATVORDEM A "+
				"			INNER JOIN KATVORDEMMP C ON C.CODCOLIGADA = A.CODCOLIGADA AND C.CODFILIAL = A.CODFILIAL AND C.CODORDEM = A.CODORDEM AND C.IDATIVIDADE = A.IDATVORDEM AND C.EFETIVADO = 0 "+
				"			INNER JOIN TPRD P ON C.CODCOLIGADA = P.CODCOLIGADA AND C.IDPRODUTO = P.IDPRD "+
				"			INNER JOIN KITEMORDEM KO ON A.CODCOLIGADA = KO.CODCOLIGADA AND A.CODFILIAL = KO.CODFILIAL AND A.CODESTRUTURA = KO.CODESTRUTURA AND A.CODORDEM = KO.CODORDEM "+
				"			LEFT JOIN TLOTEPRD LD ON LD.CODCOLIGADA = P.CODCOLIGADA AND LD.IDPRD = P.IDPRD AND LD.IDSTATUS=6 "+
				"			LEFT JOIN TLOTEPRDLOC E ON E.CODCOLIGADA = P.CODCOLIGADA AND E.CODFILIAL = C.CODFILIAL AND E.IDPRD = P.IDPRD AND LD.IDLOTE=E.IDLOTE AND E.CODLOC IN ('21','22','23','25','27') "+
				"		WHERE		A.CODCOLIGADA = "+codcoligada+" "+
				"			AND		A.CODFILIAL = "+codfilial+" "+
				"			AND		A.CODESTRUTURA = "+codestrutura+" "+
				"			AND		A.CODORDEM = "+codordem+" "+
				"			AND     A.IDATVORDEM = "+idAtvOrdem+" "+
				"			AND		E.SALDOFISICO2 <> 0 "+
				"		) Z " */
	
	
	myQuery = 	"SELECT CONSUMO_PLANEJADO - CONSUMO_APONTADO CONSUMO_SALDO,* "+
				"	FROM "+
				"	(SELECT "+
				"		P.CONTROLADOPORLOTE, P.IDPRD, P.IDPRD IDSUBSTITUTO, P.CODIGOPRD, P.DESCRICAO, LD.NUMLOTE, LD.IDLOTE, LD.DATAVALIDADE, C.QUANTIDADE CONSUMO_PLANEJADO, P.CODUNDCONTROLE, E.CODLOC,  "+
				"		ISNULL((SELECT "+
				"			SUM(QUANTIDADE) "+ 
				"			FROM "+
				"			KATVORDEMMP "+ 
				"			WHERE  "+
				"			IDPRODUTO = C.IDPRODUTO AND CODCOLIGADA = A.CODCOLIGADA AND CODFILIAL = A.CODFILIAL AND CODESTRUTURA = A.CODESTRUTURA AND CODORDEM = A.CODORDEM AND IDATIVIDADE = A.IDATVORDEM AND EFETIVADO = 1 "+
				"		),0) CONSUMO_APONTADO, "+
				"		E.SALDOFISICO2 ESTOQUE_ATUAL, E.SALDOFISICO3 ESTOQUE_ALOCADO, E.SALDOFISICO2 - E.SALDOFISICO3 ESTOQUE_SALDO, A.IDATVORDEM, P.CUSTOMEDIO, LD.IDSTATUS, "+
				"		(SELECT "+
				"			ISNULL(ISNULL(L.SALDOFISICO2,0) - ISNULL(SUM(T.SALDO) , 0),0) DISPONIVEL "+
				"		FROM "+
				"			TLOTEPRDLOC L "+
				"			INNER JOIN TLOTEPRD P ON L.CODCOLIGADA = P.CODCOLIGADA AND L.IDLOTE = P.IDLOTE "+
				"			LEFT JOIN TLOTETERCEIROS T ON T.CODCOLIGADA = L.CODCOLIGADA AND T.CODFILIAL = L.CODFILIAL AND T.CODLOC = L.CODLOC AND T.IDPRD = L.IDPRD AND T.IDLOTE = L.IDLOTE "+
				"		WHERE "+
				"			L.CODLOC = E.CODLOC AND L.IDPRD = P.IDPRD AND P.NUMLOTE = LD.NUMLOTE "+
				"		GROUP BY "+
				"			 L.SALDOFISICO2) DISPONIVEL,CONCAT(P.CODIGOPRD,' - ',P.NOMEFANTASIA) NOMEPRODUTO  "+
				"	FROM "+
				"		KATVORDEM A "+
				"		INNER JOIN KATVORDEMMP C ON C.CODCOLIGADA = A.CODCOLIGADA AND C.CODFILIAL = A.CODFILIAL AND C.CODORDEM = A.CODORDEM AND C.IDATIVIDADE = A.IDATVORDEM AND C.EFETIVADO = 0 "+
				"		INNER JOIN TPRD P ON C.CODCOLIGADA = P.CODCOLIGADA AND C.IDPRODUTO = P.IDPRD "+
				"		INNER JOIN KITEMORDEM KO ON A.CODCOLIGADA = KO.CODCOLIGADA AND A.CODFILIAL = KO.CODFILIAL AND A.CODESTRUTURA = KO.CODESTRUTURA AND A.CODORDEM = KO.CODORDEM "+
				"		INNER JOIN TLOTEPRD LD ON LD.CODCOLIGADA = P.CODCOLIGADA AND LD.IDPRD = P.IDPRD "+ //AND LD.IDSTATUS=6 
				"		INNER JOIN TLOTEPRDLOC E ON E.CODCOLIGADA = P.CODCOLIGADA AND E.CODFILIAL = C.CODFILIAL AND E.IDPRD = P.IDPRD AND LD.IDLOTE=E.IDLOTE AND E.CODLOC IN ('23','25','27') "+ //('20','21','22','25','27') "+
				"	WHERE		A.CODCOLIGADA = "+codcoligada+" "+ 
				"		AND		A.CODFILIAL = "+codfilial+" "+
				//"		AND		A.CODESTRUTURA = "+codestrutura+" "+
				"		AND		A.CODORDEM = "+codordem+" "+
				"		AND     A.IDATVORDEM = "+idAtvOrdem+" "+
				"		AND     P.CODIGOPRD NOT LIKE '01.053.%' AND P.CODIGOPRD NOT LIKE '01.019.%' "+
				//"		AND		E.SALDOFISICO2 <> 0 "+
				/*"		AND		( (CASE WHEN LEFT(P.CODIGOPRD, 6) <> '01.053' "+ // = '03.023'
				"			THEN (SELECT IDPRODUTO FROM KATVORDEMMP WHERE CODCOLIGADA=A.CODCOLIGADA AND CODFILIAL=A.CODFILIAL AND CODORDEM=A.CODORDEM AND IDATIVIDADE=A.IDATVORDEM AND IDPRODUTO = C.IDPRODUTO AND EFETIVADO=1) "+
				"			ELSE 0 END) = 0 OR "+
				"			(CASE WHEN LEFT(P.CODIGOPRD, 6) <> '01.053' "+
				"			THEN (SELECT IDPRODUTO FROM KATVORDEMMP WHERE CODCOLIGADA=A.CODCOLIGADA AND CODFILIAL=A.CODFILIAL AND CODORDEM=A.CODORDEM AND IDATIVIDADE=A.IDATVORDEM AND IDPRODUTO = C.IDPRODUTO AND EFETIVADO=1) "+
				"			ELSE 0 END) IS NULL) "+*/
				") Z "+
				"UNION ALL "+
				"SELECT CONSUMO_PLANEJADO - CONSUMO_APONTADO CONSUMO_SALDO,* "+
				"FROM  "+
				"	(SELECT "+
				"		P.CONTROLADOPORLOTE, S.IDPRDORIGEM IDPRD, S.IDPRD IDSUBSTITUTO, P.CODIGOPRD, P.DESCRICAO, LD.NUMLOTE, LD.IDLOTE, LD.DATAVALIDADE, C.QUANTIDADE CONSUMO_PLANEJADO, P.CODUNDCONTROLE, E.CODLOC, "+
				"		ISNULL((SELECT "+
				"			SUM(QUANTIDADE) "+ 
				"			FROM "+
				"			KATVORDEMMP "+
				"			WHERE "+ 
				"			IDPRODUTO = C.IDPRODUTO AND CODCOLIGADA = A.CODCOLIGADA AND CODFILIAL = A.CODFILIAL AND CODESTRUTURA = A.CODESTRUTURA AND CODORDEM = A.CODORDEM AND IDATIVIDADE = A.IDATVORDEM AND EFETIVADO = 1 "+
				"		),0) CONSUMO_APONTADO, "+
				"		E.SALDOFISICO2 ESTOQUE_ATUAL, E.SALDOFISICO3 ESTOQUE_ALOCADO, E.SALDOFISICO2 - E.SALDOFISICO3 ESTOQUE_SALDO, A.IDATVORDEM, P.CUSTOMEDIO, LD.IDSTATUS, "+
				"		(SELECT "+
				"			ISNULL(ISNULL(L.SALDOFISICO2,0) - ISNULL(SUM(T.SALDO) , 0),0) DISPONIVEL "+
				"		FROM "+
				"			TLOTEPRDLOC L "+
				"			INNER JOIN TLOTEPRD P ON L.CODCOLIGADA = P.CODCOLIGADA AND L.IDLOTE = P.IDLOTE "+
				"			LEFT JOIN TLOTETERCEIROS T ON T.CODCOLIGADA = L.CODCOLIGADA AND T.CODFILIAL = L.CODFILIAL AND T.CODLOC = L.CODLOC AND T.IDPRD = L.IDPRD AND T.IDLOTE = L.IDLOTE "+
				"		WHERE "+
				"			L.CODLOC = E.CODLOC AND L.IDPRD = P.IDPRD AND P.NUMLOTE = LD.NUMLOTE "+
				"		GROUP BY "+
				"			 L.SALDOFISICO2) DISPONIVEL,CONCAT(P.CODIGOPRD,' - ',P.NOMEFANTASIA) NOMEPRODUTO "+
				"	FROM "+
				"		KATVORDEM A "+
				"		INNER JOIN KATVORDEMMP C ON C.CODCOLIGADA = A.CODCOLIGADA AND C.CODFILIAL = A.CODFILIAL AND C.CODORDEM = A.CODORDEM AND C.IDATIVIDADE = A.IDATVORDEM AND A.CODESTRUTURA=C.CODESTRUTURA AND C.EFETIVADO = 0 "+
				"		INNER JOIN KCOMPSUBSTITUTO S ON A.CODCOLIGADA=S.CODCOLIGADA AND A.CODFILIAL=S.CODFILIAL AND A.CODESTRUTURA=S.CODESTRUTURA  AND C.IDPRODUTO=S.IDPRDORIGEM  "+
				"		INNER JOIN TPRD P ON C.CODCOLIGADA = P.CODCOLIGADA AND S.IDPRD = P.IDPRD "+
				"		INNER JOIN KITEMORDEM KO ON A.CODCOLIGADA = KO.CODCOLIGADA AND A.CODFILIAL = KO.CODFILIAL AND A.CODESTRUTURA = KO.CODESTRUTURA AND A.CODORDEM = KO.CODORDEM "+
				"		INNER JOIN TLOTEPRD LD ON LD.CODCOLIGADA = P.CODCOLIGADA AND LD.IDPRD = P.IDPRD "+ //AND LD.IDSTATUS=6 
				"		INNER JOIN TLOTEPRDLOC E ON E.CODCOLIGADA = P.CODCOLIGADA AND E.CODFILIAL = C.CODFILIAL AND E.IDPRD = P.IDPRD AND LD.IDLOTE=E.IDLOTE AND E.CODLOC IN ('23','25','27') "+ //('20','21','22','25','27') "+ // 20,23,25,27
				"	WHERE		A.CODCOLIGADA =  "+codcoligada+" "+ 
				"		AND		A.CODFILIAL = "+codfilial+" "+
				"		AND		A.CODESTRUTURA = "+codestrutura+" "+
				"		AND		A.CODORDEM = "+codordem+" "+
				"		AND     A.IDATVORDEM = "+idAtvOrdem+" "+
				"		AND     P.CODIGOPRD NOT LIKE '01.053.%' AND P.CODIGOPRD NOT LIKE '01.019.%' "+
				//"		AND		E.SALDOFISICO2 <> 0 "+
				/*"		AND		( (CASE WHEN LEFT(P.CODIGOPRD, 6) <> '01.053' "+
				"			THEN (SELECT IDPRODUTO FROM KATVORDEMMP WHERE CODCOLIGADA=A.CODCOLIGADA AND CODFILIAL=A.CODFILIAL AND CODORDEM=A.CODORDEM AND IDATIVIDADE=A.IDATVORDEM AND IDPRODUTO = C.IDPRODUTO AND EFETIVADO=1) "+
				"			ELSE 0 END) = 0 OR "+
				"			(CASE WHEN LEFT(P.CODIGOPRD, 6) <> '01.053' "+
				"			THEN (SELECT IDPRODUTO FROM KATVORDEMMP WHERE CODCOLIGADA=A.CODCOLIGADA AND CODFILIAL=A.CODFILIAL AND CODORDEM=A.CODORDEM AND IDATIVIDADE=A.IDATVORDEM AND IDPRODUTO = C.IDPRODUTO AND EFETIVADO=1) "+
				"			ELSE 0 END) IS NULL) "+*/
				") Z "+
				"ORDER BY IDPRD "  
	  
	
    log.info("dsComponentesApontamento MY QUERY: " + myQuery)
    
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