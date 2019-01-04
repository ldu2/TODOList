var myCheckList=[];
var myItemList=[];
$(function() {
	$("#inputText").val('');
	$("#inputNum").val('med');
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
	let ctext = $("<span class=''></span>");
	let cbox = $("<input type='checkbox'></input>");
	let cmark = $("<span class='checkmark'></span>");

	//set attribute and wrap it up and get it to the left
	ctext.text($('#inputText').val());
	clabel.click(function(evt) {
	    if(ctext.attr('class')==''){
		ctext.attr('class','strikethrough');
		cbox.prop('checked', true);
	    }
	    else{
		ctext.attr('class','');
		cbox.prop('checked', false);
	    }
	    //console.log(clabel.attr('class'));
	    return false;
	});
	clabel.append(ctext);
	clabel.append(cbox);
	clabel.append(cmark);
	left.append(clabel);
	row.append(left);

	//middle element - priority
	let middle = $("<td align='middle'></td>");
	let priority = $("#inputNum").val();
	middle.append(priority);
	row.append(middle);

	//now the right hand side elements
	let right = $("<td></td>");
	let chunk = $("<div style='color:#91C6D9'></div>");
	let editButton = $("<button class = 'astext' id='editBtn'>edit</button>").click(function () {
			let task = prompt("New Task", ctext.text());
			if(task!=null){
				ctext.text(task);
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
	$("#inputText").focus();
	$("#inputNum").val('med');
	myCheckList.push(cbox);
	myItemList.push(row);
}

function addElementEnter(e){
	if(e.keyCode == 13)
		addElement();
}
function clearElement(){
	let i = 0;
	for(i=0;i<myCheckList.length;i++){
		if(myCheckList[i].is(":checked"))
			myItemList[i].css('display','none');
	}
}
