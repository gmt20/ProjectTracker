document.getElementById('projectForm').addEventListener('submit', addProject);
let targetRow = null;

function getProjects(){
    const projects = localStorage.getItem('projectArr')?JSON.parse(localStorage.getItem('projectArr')):[];

	const projTable = document.getElementById('projectTable');
    let projTableHtml = '<thead> <tr> <th>Id</th> <th>Project Name</th> <th>StartDate</th> <th>Updated Date</th> <th>Members</th>  <th>Progress</th> <th>Status</th></tr> </thead> <tbody>';

    if (projects.length>0) {
        projects.forEach(element => projTableHtml += '<tr> <td onClick="highlightRow(this);">' + element.id+'</td> <td onClick="highlightRow(this);">'+ element.name +'</td> <td onClick="highlightRow(this);">'+ element.startDate + '</td> <td onClick="highlightRow(this);">'+ element.updateDate + '</td> <td onClick="highlightRow(this);">'+ element.members +'</td>  <td contenteditable="true" onClick="highlightRow(this);">'+ element.progress + '</td> <td contenteditable="true" onClick="highlightRow(this);">' + element.status + '</td></tr>');
		projTableHtml += '</tbody>';
		projTable.innerHTML = projTableHtml;
		
		
	}
	const button1 = document.getElementById('updateButton');
	if (button1.style.display == 'block') {
		button1.style.display = 'none';
	} 
	const button2 = document.getElementById('deleteButton');
	if (button2.style.display == 'block') {
		button2.style.display = 'none';
	}

        
}


function addProject(e) {
    const id = chance.guid();
	const name = document.getElementById('projectName').value || 'No Name Provided';
    const startDate = (new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+(new Date()).getDate();
    const members = document.getElementById('projectMembers').value || 'No Members Specified';
    const status = 'Open';
    const updateDate = startDate;
    const progress = 'Started';
    const projects =  JSON.parse(localStorage.getItem('projectArr')) || [];

    projects.push({
        id,
		name,
		startDate,
		updateDate,
		members,
		status,
		progress
        
      });

    localStorage.setItem('projectArr', JSON.stringify(projects))
    document.getElementById('projectForm').reset();
   
    getProjects();
    
    e.preventDefault(); 
  }



 function highlightRow(element){
	 
	const rowId = element.parentNode.rowIndex;
	targetRow = rowId;
	const table = document.getElementById("projectTable");
	const rowtobetoggled = (Array.from(table.rows)).find(row => row.style.backgroundColor == 'darkgray'); 
	if(rowtobetoggled) rowtobetoggled.style.backgroundColor = 'transparent';
	table.rows[rowId].style.backgroundColor = 'darkgray';
               
	const button1 = document.getElementById('updateButton');
	if (button1.style.display == 'none') {
		button1.style.display = 'block';
	} 
	const button2 = document.getElementById('deleteButton');
	if (button2.style.display == 'none') {
		button2.style.display = 'block';
	} 	 
	 
	
 }
 
 
 function updateProject(){
	 
	 const projects = localStorage.getItem('projectArr')?JSON.parse(localStorage.getItem('projectArr')):[];
	 
	 const row = document.getElementById("projectTable").rows[targetRow];
	 const id = row.cells.item(0).innerHTML;
	 const status = row.cells.item(6).innerHTML;
	 const progress = row.cells.item(5).innerHTML;
	 const updateDate = (new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+(new Date()).getDate();
	
	 if(projects.length)
	 {
		const updateProject = projects.find(proj => proj.id == id);

        const index = projects.indexOf(updateProject);
        projects.splice(index, 1)
        projects.push({
			id,
			name:updateProject.name,
			startDate:updateProject.startDate,
			updateDate,
			members:updateProject.members,
			status,
			progress
            
        })

        localStorage.setItem('projectArr', JSON.stringify(projects));
		row.style.backgroundColor = 'transparent';

        getProjects();
 }
 }
 
 
 
 
 
 function deleteProject(){
	 const projects = localStorage.getItem('projectArr')?JSON.parse(localStorage.getItem('projectArr')):[];
	 const row = document.getElementById("projectTable").rows[targetRow];
	 const id = row.cells.item(0).innerHTML;
	
	
	 if(projects.length)
	 {
		const deleteProject = projects.find(proj => proj.id == id);

        const index = projects.indexOf(deleteProject);
        projects.splice(index, 1)
       
        localStorage.setItem('projectArr', JSON.stringify(projects));

		row.style.backgroundColor = 'transparent';
        getProjects();
 }
 }