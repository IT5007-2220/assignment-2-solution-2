(function(){
    function Loop() {
        var items = JSON.parse(localStorage.getItem('items')) || [];
        var finisheditems = JSON.parse(localStorage.getItem('finisheditems')) || [];
        var indexList=[];
        var unfinisheditemsList = document.querySelector('.plates');
        var finishedList = document.querySelector('.finished');
        var addItems = document.querySelector('.add-items');
        var buttons = document.querySelector('.buttons');
        var detail = document.getElementsByClassName('float')[0];
        updateList(items, unfinisheditemsList, false);
        updateList(finisheditems, finishedList,true);
        function handleSubmit(e) {
            e.preventDefault();
            if(items.length>=10){
                alert("The List is full!");
                return;
            }
            var level;
            var priority = document.getElementsByName('priority');
            console.log(priority);
            for (var i = 0; i < priority.length; i++) { 
                console.log(priority[i].value);
                  if (priority[i].checked) {
                       level = priority[i].value;
                       break;                   
                  }
            }
            var name = this.querySelector('[name=item]').value;
            var deadline = this.querySelector('[name=deadline]').value;
            var des = this.querySelector('[name=des]').value;
            var item = {
                name: name,
                priority: level,
                des: des,
                deadline: deadline,
                done: false
            };
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            updateList(items, unfinisheditemsList, false);
            this.reset();
        }

        function updateList(plates = [], plateList, b) {
            if(!b){
                plateList.innerHTML = plates.map( function(plate, i)  {
                    return '<tr class="table-content">' + 
                        '<td>' + i + '</td>' + 
                        '<td id=' + i +'>' + plate.des + '</td>' + 
                        '<td>' + plate.deadline + '</td>' + 
                        '<td>' + plate.priority + '</td>' + 
                        '<td><input type="button" data-index="' + i + '" id="plate' + i + '" ' + ' /><label for="plate' + i + '">' + '</label></td>' + '</tr>';
                }).join('');
            }
            else{
                plateList.innerHTML = plates.map( function(plate, i)  {
                    return '<tr>' + 
                    '<td>' + i + '</td>' + 
                    '<td id=' + i +'>' + plate.des + '</td>' + 
                    '<td>' + plate.deadline + '</td>' + 
                    '<td>' + plate.priority + '</td>' + 
                    '</td>' + '<td><input type="checkbox" data-index="' + i + '" id="plate' + i + '" ' + ' /><label for="plate' + i + '">'  + '</label></td>' + '</tr>';
                }).join('');
            }
        }

        function toggleCheckeditems(e) {
            if (!e.target.matches('input')) return;
            var item = e.target.dataset.index;
            console.log(item);
            console.log(e);
            var tmpitem = items[item];
            tmpitem.done = !tmpitem.done;
            finisheditems.push(tmpitem);
            items.splice(item,1);
            localStorage.setItem('items', JSON.stringify(items));
            localStorage.setItem('finisheditems', JSON.stringify(finisheditems));
            updateList(items, unfinisheditemsList, false);
            updateList(finisheditems, finishedList,true);
        }

        function toggleCheckedfinished(e){
            if (!e.target.matches('input')) return;
            var state = e.target.checked;
            var item = e.target.dataset.index;
            var i = 0;
            console.log(e.target);
            if(state){
                indexList.push(item);
            }
            else{
                for(var i = 0; i < indexList.length; i++){
                    if(indexList[i] === item){
                        indexList.splice(i,1);
                        break;
                    }
                }
            }
        }

        function handlemouseover1(e){
            if(!e.target.matches('td')) return;
            if(e.target.id === null || e.target.id === '') return;
            var index = e.target.id;
            console.log(e.target);
            pos = e.target.getBoundingClientRect();
            var event = e||window.event;
            detail.innerHTML = items[index].des;
            detail.style.left = '160' +'px';
            detail.style.top = pos.y - 120 + 'px';
            detail.style.display = "block";
        }

        function handlemouseout1(e){
            detail.style.display = "none";
        }

        function handlemouseover2(e){
            if(!e.target.matches('td')) return;
            if(e.target.id === null || e.target.id === '') return;
            var index = e.target.id;
            console.log(e.target);
            pos = e.target.getBoundingClientRect();
            var event = e||window.event;
            detail.innerHTML = finisheditems[index].des;
            detail.style.left = '160' +'px';
            detail.style.top = pos.y - 120 + 'px';
            detail.style.display = "block";
        }

        function handlemouseout2(e){
            detail.style.display = "none";
        }

        function doButtonPress(e) {
            var action = e.target.dataset.action;
            switch (action) {
                case "clear":
                    indexList.sort();
                    indexList.reverse();
                    indexList.map( function(index) {
                        finisheditems.splice(index,1);
                    } );
                    indexList.splice(0, indexList.length);
                    break;
                case "check":
                    indexList.sort();
                    indexList.reverse();
                    if(indexList.length === 0){
                        alert("please select at least one item");
                        return;
                    }
                    indexList.map( function(index) {
                        finisheditems[index].done = !finisheditems[index].done;
                        items.push(finisheditems[index]);
                        finisheditems.splice(index,1);
                    } );
                    indexList.splice(0, indexList.length);
                    break;
                default:
                    return;
            }
            localStorage.setItem('items', JSON.stringify(items));
            localStorage.setItem('finisheditems', JSON.stringify(finisheditems));
            updateList( items, unfinisheditemsList, false);
            updateList(finisheditems, finishedList, true);
        }

        addItems.addEventListener('submit', handleSubmit);
        unfinisheditemsList.addEventListener('click', toggleCheckeditems);
        finishedList.addEventListener('click', toggleCheckedfinished)
        unfinisheditemsList.addEventListener('mouseover',handlemouseover1);
        unfinisheditemsList.addEventListener('mouseout', handlemouseout1);
        finishedList.addEventListener('mouseover',handlemouseover2);
        finishedList.addEventListener('mouseout', handlemouseout2);
        buttons.addEventListener('click', doButtonPress);
        updateList(items, unfinisheditemsList, false);
        updateList(finisheditems, finishedList,true);
    }
    document.addEventListener('DOMContentLoaded', Loop);
}());