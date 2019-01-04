$(function() {
	$("#inputText").val('');
});

function addElement(){
	if($("#inputText").val() ==''){
		alert("Task cannot be empty");
		return true;
	}

	//get the table and create the row from the small
	//to big
	let table = $("#todoList");
	let row = $("<tr></tr>");
	let left = $("<td></td>");
	let clabel = $("<label class='container'></label>");
	let cbox = $("<input type='checkbox'></input>");
	let cmark = $("<span class='checkmark'></span>");

	//set attribute and wrap it up and get it to the left
	clabel.text($('#inputText').val());
	clabel.click(function(evt) {
	    if(clabel.attr('class')=='container'){
	    	clabel.toggleClass('checked');
		cbox.prop('checked', true);
	    }
	    else{
		clabel.attr('class','container');
		cbox.prop('checked', false);
	    }
	    //console.log(clabel.attr('class'));
	    return false;
	});

	clabel.append(cbox);
	clabel.append(cmark);
	left.append(clabel);
	row.append(left);
	
	//now the right hand side elements
	let right = $("<td></td>");
	let chunk = $("<div style='color:#91C6D9'></div>");
	let editButton = $("<button class = 'astext' id='editBtn'>edit</button>").click(function () {
			let task = prompt("New Task", clabel.text());
			if(task!=null){
				clabel.text(task);
				clabel.append(cbox);
				clabel.append(cmark);
			}
		}
	);
	let sepChar = " | ";
	let deleteButton = $("<button class = 'astext' id='delBtn'>delete</button>").click(function(){
			$("#delBtn").parent().parent().parent().css("display","none");
		}
	);
	//stack them together and wrap them up

	chunk.append(editButton);
	chunk.append(sepChar);
	chunk.append(deleteButton);
	right.append(chunk);
	//finally put them there
	row.append(right);
	table.append(row);
	
	$("#inputText").val('');
}

function addElementEnter(e){
	if(e.keyCode == 13)
		addElement();
}
