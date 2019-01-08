
var myItemList=[];
$(function() {
	$("#inputText").val('');
	$("#inputPriority").val('med');
	$("#clearBtn").prop('disabled' ,true);
});

checkClrBtn = () =>{
	if(myItemList.filter( item => item.find("input").is(":checked")).length>0){
		$("#clearBtn").prop('disabled',false);
	}
	else{
		$("#clearBtn").prop('disabled' ,true);
	}
}

addElement = () => {
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
	    checkClrBtn();
	    return false;
	});
	clabel.append(ctext);
	clabel.append(cbox);
	clabel.append(cmark);
	left.append(clabel);
	row.append(left);

	//middle element - priority
	let middle = $("<td align='middle'></td>");
	let priority = $("#inputPriority").val();
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
	let deleteButton = $("<button class = 'astext'>delete</button>").click(function(){
			$(this).parent().parent().parent().remove();
			myItemList.splice(myItemList.indexOf(row),1);
			checkClrBtn();
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
	myItemList.push(row);
}

addElementEnter = (e) => {
	if(e.keyCode == 13)
		addElement();
}

clearElement = () => {
	myItemList = myItemList.filter((item) => {
		if(item.find("input").is(":checked")) 
			item.css('display','none');
		return !item.find("input").is(":checked");
	});
	$("#clearBtn").prop('disabled' ,true);
}


