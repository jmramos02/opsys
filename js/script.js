var job1;
var job2;
var job3;

var output 
window.onload = function(e){
	job1 = document.getElementById("job1");
	job2 = document.getElementById("job2");
	job3 = document.getElementById("job3");
	output = document.getElementById("output");
	var myButton = document.getElementById("submit-button");
	myButton.onclick = function(){
		clearChild(output);
		if(validateInput()){
			//create an array for easy iteration
			var partitions = [30,30,40];
			var contents = [null,null,null];
			var status = [false, false, false];
			var jobs = [parseInt(job1.value),parseInt(job2.value),parseInt(job3.value)];
			var waitList = [];
			if((jobs[0] + jobs[1] + jobs[2]) <= 100){
				for(index = 0; index < 3; index++){
					if(jobs[index] <= partitions[0] && status[0] == false){
						contents[0] = '<tr><td>Partition 1 - 30k</td>';
						contents[0] += '<td>' + (index + 1) + '</td>';
						contents[0] += '<td>Busy</td>';
						contents[0] += '<td>' + (partitions[0] - jobs[index]) + 'K </td> </tr>';
						status[0] = true;
						continue;
					}else if(jobs[index] <= partitions[1] && status[1] == false){
						contents[1] = '<tr><td>Partition 2 - 30k</td>';
						contents[1] += '<td>' + (index + 1) + '</td>';
						contents[1] += '<td>Busy</td>';
						contents[1] += '<td>' + (partitions[1] - jobs[index]) + 'K </td> </tr>';
						status[1] = true;
						continue;
					}else if(jobs[index] <= partitions[2] && status[2] == false){
						contents[2] = '<tr><td>Partition 3 - 40k</td>';
						contents[2] += '<td>' + (index + 1) + '</td>';
						contents[2] += '<td>Busy</td>';
						contents[2] += '<td>' + (partitions[2] - jobs[index]) + 'K </td></tr>';
						status[2] = true;
						continue;
					}else{
						waitList.push(index + 1);
					}
				}
				//checking for partitions not occupied.
				for(index = 0; index < 3; ++index){
					if(status[index] == false){
						contents[index] = '<tr> <td> Partition' + (index + 1)  +' - Free</td>';
						contents[index] += '<td> - </td>';
						contents[index] += '<td>Free</td>';
						contents[index] += '<td>None</td> </tr>';
					}
				}
				clearChild(output);
				var table = '<table class = "pure-table pure-table-bordered">';
				table += '<thead><tr>';
				table += '<th>Partition No and Size</th>';
				table += '<th>Accesses</th>';
				table += '<th>Status</th>';
				table += '<th>Internal Fragmentation</th>';
				table += '</tr> </thead>';
				for(index = 0; index < 3; ++index){
					table += contents[index];					
				}
				table += '</table>';
				output.insertAdjacentHTML('afterbegin',table);
				for(index = 0; index < waitList.length; ++index){
					output.appendChild(createOutput('Job ' + (waitList[index]) + " is waiting",'error'));
				}
			}else{
				output.appendChild(createOutput('Input Error! The size of the jobs exceed the total memory size.','error'));
			}
		}
	};
}
function clearChild(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
}
function validateInput(){
	if(isNaN(job1.value)){
		alert(job1);
		output.appendChild(createOutput("Job 1 must be a number",'error'));
		return false;
	}else if(isNaN(job2.value)){
		output.appendChild(createOutput("Job 2 must be a number",'error'));
		return false;
	}else if(isNaN(job3.value)){
		output.appendChild(createOutput("Job 2 must be a number",'error'));
		return false;
	}

	return true;
}
function createOutput(content, value){
	var newNode = document.createElement('p');
	newNode.setAttribute("class",value);
	newNode.innerHTML = content;
	return newNode;
}