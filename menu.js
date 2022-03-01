
//getting html element
let form = document.querySelector("#settings");
let size = document.querySelector("#size");
let rowsCols = document.querySelector("#rowscols");
let complete = document.querySelector(".complete");
let reload = document.querySelector(".reload");

complete.style.display="none";//do not display complete div
reload.style.display ="none";//do not display reload class element 

let newMaze; //object of maze class
let path = [];

form.addEventListener("submit",mazeGen);//calls mazegen on submit

document.addEventListener("keydown", play);//calls play on keydown

reload.addEventListener("click", () => {
    location.reload();//refreshes page 
  }); // reloads on clicking replay




function mazeGen(event){

    event.preventDefault();

    if(size.value < 300 || size.value > 800){
        alert("Please enter size between 400 and 800");
    }

    else if(rowsCols.value < 10 || rowsCols.value > 60){
        alert("Please enter number of rows/columns between 20 and 60");
    }

    else if (rowsCols.value == "" || size.value == ""){
        return alert("Please enter all fields");
    }

    else{

    form.style.display = "none";
    newMaze = new maze(size.value, rowsCols.value , rowsCols.value); //creating maze object
    //sets and displays maze
    newMaze.set();
    newMaze.draw();
    //displays replay
    reload.style.display="block";
    
    }
}

function play(event){

    if(!mazeComplete) return;
    key = event.key; //retunds which key is pressed 
    row = current.rowNum;
    col = current.colNum;

    switch (key){
        case "w":
            if(!current.walls.topWall){
                let next = newMaze.grid[row-1][col];//next becomes the top neightbouring cell
                path.push(next);
                current = next;
                newMaze.draw();
                displaypath(); //highlights the solution
                current.highlightcurrent(newMaze.rows, newMaze.columns);
                if (current.final){
                    
                    complete.style.display="block";//display maze complete on reaching final cell
                }
             }
            break;
        case "d":
            if(!current.walls.rightWall){
                let next = newMaze.grid[row][col+1];//next as right cell
                path.push(next);
                current = next;
                newMaze.draw();
                displaypath();
                
                current.highlightcurrent(newMaze.rows, newMaze.columns);
                if (current.final){
                    
                    complete.style.display="block";
                }
                
            }
            break;
        case "s":
            if(!current.walls.bottomWall){
                let next = newMaze.grid[row+1][col];//next as bottom cell
                path.push(next);
                current = next;
                newMaze.draw();
                displaypath();
                current.highlightcurrent(newMaze.rows, newMaze.columns);
                if (current.final){
                    
                    complete.style.display="block";
                }
                
            }
            break;
        case "a":
            if(!current.walls.leftWall){
                let next = newMaze.grid[row][col-1]; //next as left cell
                path.push(next);
                current = next;
                newMaze.draw();
                displaypath();
                current.highlightcurrent(newMaze.rows, newMaze.columns);
                if (current.final){
                    
                    complete.style.display="block";
                }
                
            }
            break;
        

    }
   
        

}

function displaypath(){
    for (let i = 0; i < path.length; i++){
        path[i].highlight(newMaze.rows, newMaze.columns);
    }
}

