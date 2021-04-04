window.onload = function(){
    const submitBtn = document.getElementById('submit-btn');
    const clearBtn = document.getElementById('clear-list-btn');
    const inputText = document.getElementById('to-do');
    const toDoList = document.getElementById('to-do-list');
    const doneList = document.getElementById('done-list');
    var ducpicate = false;

    //array to store task
    var taskList = Array();
    var doneToDoList = Array();

    submitBtn.addEventListener('click', addToDoItem);
    clearBtn.addEventListener('click', clearList);

    function createRemoveButton(){
        let removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "remove-btn btn btn-outline-danger ");
        removeBtn.innerHTML = "Remove";
        removeBtn.addEventListener('click', removeItem);
        return removeBtn;
    }

    function createDoneButton(){
        let doneBtn = document.createElement("button");
        doneBtn.setAttribute("class", "done-btn btn btn-outline-success ");
        doneBtn.innerHTML = "Done";
        doneBtn.addEventListener('click', makeDone);
        return doneBtn;
    }


    (function loadList(){        
        var savedTasks = window.localStorage.getItem("tasks");
        //push task to array so we dont over write old tasks the next time
        if(savedTasks.length === 0) return;
        
        taskList.push(savedTasks);
        var re = /\s*,\s*/;
        // check if splited text equals to input text
        var splittedList = taskList[0].split(re);

        for(let i = 0; i < splittedList.length; i++){
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(splittedList[i]));

            let removebtn = createRemoveButton();
            removebtn.classList.add(`delete-${i}`);

            let donebtn = createDoneButton();
            donebtn.classList.add(`done-${i}`);

            li.appendChild(removebtn); 
            li.appendChild(donebtn); 
            li.setAttribute("class", "todo-item");
            // append complete li to ul
            toDoList.appendChild(li);
        }
    })();

    (function loadDone(){        
        var doneTasks = window.localStorage.getItem("doneTasks");
        //push task to array so we dont over write old tasks the next time
        if(doneTasks === null){
            return;
        }

        doneToDoList.push(doneTasks);

        var re = /\s*,\s*/;
        // check if splited text equals to input text
        var splittedList = doneToDoList[0].split(re);

        for(let i = 0; i < splittedList.length; i++){
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(splittedList[i]));

            li.setAttribute("class", "done-item");
            // append complete li to ul
            doneList.appendChild(li);
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
        li.appendChild(createRemoveButton()); 
        li.appendChild(createDoneButton()); 
        li.setAttribute("class", "todo-item");

        // append complete li to ul
        toDoList.appendChild(li);
        // push task to array
        taskList.push(text);
        //store array to a local storage called tasks
        window.localStorage.setItem("tasks", taskList);

        inputText.value = "";
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
            // remove
            var re = /\s*,\s*/;
            var splittedList = taskList[0].split(re);
            taskList = splittedList;

            for(var i = 0; i < taskList.length; i++){
                if(this.classList.contains(`delete-${i}`)){  
                    toDoList.removeChild(toDoList.children[i]);
                    taskList.splice(i, 1);
                    window.localStorage.setItem("tasks", taskList);
                    return;
                }
            }
        } else {
            return;
        }
    }

    function makeDone(){
        if (confirm('Mark as done?')) {
            var re = /\s*,\s*/;
            var re2 = /\s*<\s*/;
            var splittedList = taskList[0].split(re);
            // get the tasks list
            taskList = splittedList;

            for(var i = 0; i < taskList.length; i++){
                if(this.classList.contains(`done-${i}`)){  
                    var li = document.createElement("li");
                    let text = toDoList.children[i].innerHTML.split(re2)[0] + " " + new Date();
                    li.appendChild(document.createTextNode(text));
                    li.setAttribute("class", "done-item");
            
                    // append complete li to ul
                    doneList.appendChild(li);
                    // push task to array
                    doneToDoList.push(text);
                    //store array to a local storage called tasks
                    window.localStorage.setItem("doneTasks", doneToDoList);
                  
                    toDoList.removeChild(toDoList.children[i]);
                    taskList.splice(i, 1);
                    window.localStorage.setItem("tasks", taskList);

                    return;
                }
            }
            
        } 
    }

} 