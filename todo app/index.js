window.onload = function(){
    const submitBtn = document.getElementById('submit-btn');
    const clearBtn = document.getElementById('clear-list-btn');
    const inputText = document.getElementById('to-do');
    const toDoList = document.getElementById('to-do-list');
    var ducpicate = false;

    //array to store task
    var taskList = Array();

    submitBtn.addEventListener('click', addToDoItem);
    clearBtn.addEventListener('click', clearList);



    (function loadList(){        
        var savedTasks = window.localStorage.getItem("tasks");
        //push task to array so we dont over write old tasks the next time
        if(savedTasks.length === 0){
            return;
        }

        taskList.push(savedTasks);
        // toDoList.innerHTML = savedTasks;
     
        var re = /\s*,\s*/;

        // check if splited text equals to input text
        var splittedList = taskList[0].split(re);

        console.log(splittedList);
           
        for(let i = 0; i < splittedList.length; i++){
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(splittedList[i]));

            var removeBtn = document.createElement("button");
            removeBtn.setAttribute("class", "remove-btn");
            removeBtn.innerHTML = "Remove";
            removeBtn.addEventListener('click', makeDone);
    
            var doneBtn = document.createElement("button");
            doneBtn.setAttribute("class", "done-btn");
            doneBtn.innerHTML = "Done";
            doneBtn.addEventListener('click', removeItem);

            li.appendChild(removeBtn); 
            li.appendChild(doneBtn); 
            li.setAttribute("class", "todo-item");
            // append complete li to ul
            toDoList.appendChild(li);
           

        }
    })();


    function addToDoItem(){
        // take the text from input
        var text = inputText.value;

        if(text === "" || text === null){
            alert('Cannot create an empty to-do');
            return;
        }

        //do not allow duplicates of todo's
        checkDuplicates();
        if(ducpicate) return;

        // create a li inside ul with this text
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(text));

        // create remove button
        var removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "remove-btn");
        removeBtn.innerHTML = "Remove";
        removeBtn.addEventListener('click', makeDone);

        var doneBtn = document.createElement("button");
        doneBtn.setAttribute("class", "done-btn");
        doneBtn.innerHTML = "Done";
        doneBtn.addEventListener('click', removeItem);

        li.appendChild(removeBtn); 
        li.appendChild(doneBtn); 
        li.setAttribute("class", "todo-item");

        // append complete li to ul
        toDoList.appendChild(li);

        // push task to array
        taskList.push(text);
        //store array to a local storage called tasks
        window.localStorage.setItem("tasks", taskList);
    }


    function checkDuplicates(){
        // select all li items - list of node objects
        const listItems = document.querySelectorAll(".todo-item");
        // split text and button
        var re = /\s*<\s*/;

        // check if splited text equals to input text
        listItems.forEach(item => {
            if(inputText.value === item.innerHTML.split(re)[0]){
                alert('you already have one');
                ducpicate = true;
                return;
            }
            else{
                ducpicate = false;
            }
        });
    }


    function clearList(){
        if (confirm('Are you sure you want to clear list?')) {
            // clear the list
            toDoList.innerHTML = "";
            localStorage.clear();
        } else {
            // Do nothing
            return;
        }
    }

    function removeItem(){
        if (confirm('Are you sure you want to remove this item?')) {
            // clear the list
          
        } else {
            // Do nothing
            return;
        }
    }

    function makeDone(){

    }

}