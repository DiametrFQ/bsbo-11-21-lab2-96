let readline= require('readline'); 

vertexes = ["A","B","C","D","E"] 

edges = [ 
        /*A,B,C,D,E*/ 
    /*A*/[0,0,1,0,0], 
    /*B*/[0,0,1,0,0], 
    /*C*/[1,1,0,1,1], 
    /*D*/[0,0,1,0,0], 
    /*E*/[0,0,1,0,0], 
] 

let vertexCount = ''
let P = 0 
let P_Array = [] 

const DFS = (j, count) => { 
    vertexCount+=vertexes[j] 
    count = 0 
    for (let i = 0; i < edges[j].length; i++) { 
        if(i == j) continue 

        if(edges[j][i] == 1 && !vertexCount.includes(vertexes[i])){ 
            count++ 
            DFS(i,count) 
        } 
    } 
    P_Array[P_Array.length] = count 
}  

const lisen = () => { 

    let rl = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout, 
        prompt: '>>>' 
    }); 
    rl.prompt(); 

    rl.on('line', (input) => { 

        if(input.includes("FIRST")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")") 

            v_i = vertexes.indexOf(input.slice(c1+1,c2).trim()) 

            findVertex_i = edges[v_i].join('').indexOf(1) 
            findVertex_i = findVertex_i == -1 ? 0 : findVertex_i 

            console.log(vertexes[findVertex_i], findVertex_i) 
        } 

        if(input.includes("NEXT")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")") 

            let string = '' 

            for (let i = c1+1; i < c2; i++) 
                if(input[i] != " ") 
                    string +=input[i] 

            let [vertex, index] = string.split(',') 

            v_i = vertexes.indexOf(vertex) 
            ways = edges[v_i].join('').substring(+index+1).indexOf(1) 

            findVertex_i = ways == -1 ? 0 : ways + +index + 1 
            findVertex_i = findVertex_i == -1 ? 0 :findVertex_i 

            console.log(vertexes[findVertex_i], findVertex_i) 
        } 

        if(input.includes("VERTEX")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")") 

            let string = '' 
            let count = 0 
            let find 

            for (let i = c1+1; i < c2; i++) 
                if(input[i] != " ") 
                    string +=input[i] 

            let [vertex, index] = string.split(',') 
            let v_i = vertexes.indexOf(vertex) 

            for (let i = 0;i < vertexes.length; i++) 
                if(edges[v_i][i] !=0 && count <= index-1){ 
                    count++ 
                    find = i 
                } 
            console.log(edges[v_i][find], vertexes[find]) 
        } 

        if(input.includes("ADD_V")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")")||input[input.length-1] 

            vertexes[vertexes.length] = input.slice(c1+1,c2).trim() 

            edges.map((edge)=> edge[edge.length] = 0) 
            edges[edges.length] = [] 

            for (let i = 0; i < vertexes.length; i++) 
                edges[edges.length-1][i] = 0 
        } 

        if(input.includes("ADD_E")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")") 

            let vertex = '' 

            for (let i = c1+1; i < c2; i++) 
                if(input[i] != " ") 
                    vertex+=input[i] 

            let [editStart, editEnd, way] = vertex.split(',') 

            editStart_i = vertexes.join('').indexOf(editStart) 
            editEnd_i   = vertexes.join('').indexOf(editEnd) 

            edges[editStart_i][editEnd_i] = Number(way) 

        } 

        if(input.includes("DEL_V")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")") 

            vertex_i = vertexes.join('').indexOf(input.slice(c1+1,c2).trim()) 
            vertexes.splice(vertex_i, 1);

            edges.map( edge => edge.splice(vertex_i, 1))          
            edges.splice(vertext_i, 1) 
        } 

        if(input.includes("DEL_E")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")") 

            let vertex = '' 

            for (let i = c1+1; i < c2; i++) 
                if(input[i] != " ") 
                    vertex+=input[i] 

            let [editStart, editEnd] = vertex.split(',') 

            editStart_i = vertexes.join('').indexOf(editStart) 
            editEnd_i   = vertexes.join('').indexOf(editEnd) 

            edges[editStart_i][editEnd_i] = 0 
        } 

        if(input.includes("EDIT_V")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")") 

            vertexes[vertexes.length] = input.slice(c1+1,c2).trim() 
            edges.map((edge)=> edge[edge.length] = 0) 

            for (let i = 0; i < vertexes.length; i++) 
                edges[edges.length-1][i] = 0 
        } 

        if(input.includes("EDIT_E")){ 

            c1 = input.indexOf("(") 
            c2 = input.indexOf(")") 

            let vertex = '' 

            for (let i = c1+1; i < c2; i++) 
                if(input[i] != " ") 
                    vertex+=input[i] 

            let [editStart, editEnd, way] = vertex.split(',') 

            editStart_i = vertexes.join('').indexOf(editStart) 
            editEnd_i   = vertexes.join('').indexOf(editEnd) 

            edges[editStart_i][editEnd_i] = Number(way) 
        } 

        if(input.includes("SH_V")) console.log(vertexes) 
        if(input.includes("SH_E")) console.log(edges) 

        if(input.includes("CYCL_COM")) { 
            vertexCount = ''

            P=0 
            P_Array = [] 

            DFS(2,0) 

            let indexes = [] 

            edges.forEach(ary => { 
                indexes = [] 
                let j = -1 
                while((j = ary.indexOf(1, j + 1)) !== -1) 
                    indexes.push(j) 
            }) 

            P+= indexes.length == 0? 1 : 0   

            console.log(vertexCount) 
            console.log(`Цикломатическую сложность: ${vertexCount.length - (vertexCount.length-1) +2*P }`)   
        } 
        rl.close(); 

        if(!input.includes("STOP")){ 
            lisen() 
        } 
      }); 

} 
lisen() 