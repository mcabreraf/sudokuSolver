var sudoku =   [[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]];
var solveButton = document.querySelector("#solve");
var restartButton = document.querySelector("#restart");
var inputs = document.querySelectorAll("input");

init();

function init(){
    buttonsSetting();
}

function buttonsSetting (){
    // This event adds the function to solve the sudoku to the button "solve"
    solveButton.addEventListener("click",function(){
        inputs = document.querySelectorAll("input");
        fillSudoku(true);
        solveSudoku();
        fillSudoku(false);
        this.setAttribute("disabled",""); 
    });
    
    // This event adds the function to restart the sudoku to the button "restart"
    restartButton.addEventListener("click",function(){
        inputs.forEach(input => {
            input.value = "";
            input.classList.remove("answer");
        });
        solveButton.removeAttribute("disabled");    
    });
}

// This function fills the variable sudoku, which is the variable that is keeping the number in order to be solve. It fills by square, not by rows or columns.
function fillSudoku(sw){
    var m = 1;
    var p = 0;
    while(m < 10){
        var n = 1;
        while(n < 10){
            for(var i = m - 1; i < m+2; i++){
                for(var j = n - 1; j < n+2; j++){
                    reWrite(i,j,p,sw);
                    p++;    
                }      
            }
            n = n + 3; 
        }
        m = m + 3;  
    } 
}

// This function takes the value of the input cells if sw = true, else it writes in inputs the value of the array
function reWrite(i,j,p,sw){
    if(sw){
        sudoku[i][j] = Number(inputs[p].value);
        if(Number(inputs[p].value) == 0){
            inputs[p].classList.add("answer");
        }
    }else{
        inputs[p].value = sudoku[i][j];
    }
}


//This function is going to see if the n number written is possible to be use in the (x,y) coordinates in the Sudoku
function checkPosition(y,x,n){
    //Here we check if it is possible that the "n" number can be placed into this row
    for(var i = 0; i < 9; i++){
        if(sudoku[y][i] === n){
            return false;
        }
    }
    //Here we check if it is possible that the "n" number can be placed into this column
    for(var i = 0; i < 9; i++){
        if(sudoku[i][x] === n){
            return false;
        }
    }
    //We divide by 3, get the floor and then multiply by 3, so we can be in the Square where (x,y) position is
    x_0 = Math.floor(x/3)*3;
    y_0 = Math.floor(y/3)*3;
    //Here we check if it is possible that the "n" number can placed into this 3x3 square
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(sudoku[y_0+i][x_0+j] === n){
                return false;
            }
        }
    }
    //When false is not return, it means the "n" numer can be put in this position
    return true;
}

//The algorithm uses the backtracking method. The idea is to fill the the board with digits one by ono, looking for the solution. If any digit doesn't work, it is remove so we can try the next one
function solveSudoku(){
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            // 0 Means that the cell was empty when the button was pressed. So, it is a cell where an answer is needed
            if(sudoku[i][j] === 0){
                // In every possible cell where there wasn't a number, we check all the number from 1 to 9
                for(var n = 1; n < 10; n++){
                    // If in the position (i,j) the number n is viable, we put it there
                    if(checkPosition(i,j,n)){
                        sudoku[i][j] = n;
                        // We use the recursion to go back to the beginning to check every cell again, removing all the solutions that where already implemented 
                        if(solveSudoku()){
                            return true;
                        }else{
                            // If for any reason a 0 appears, it means the original request is wrong and can't be solve
                            sudoku[i][j] = 0;
                        }
                    } 
                }
                return false;
            }      
        }
    }
    return true;
} 