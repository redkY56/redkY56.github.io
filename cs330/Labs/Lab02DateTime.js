function getDateData()
{
	const date = new Date;
	console.log("getDateData console output: " + date)
	
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	monthInt = date.getMonth()
	month = months[monthInt]

	day = date.getDate().toString();
	year = date.getFullYear().toString();

	hours12 = ( document.getElementById("timeFormatSelect").selectedIndex==0 ? true : false );
 	hour = date.getHours();
 	hour = (hours12 ? hour%12 : hour);
	minute = date.getMinutes().toString();	

	return [month, day, year, hour, minute];
}

function dateTimePopup()
{
	let dateInfo = getDateData();
	window.alert(dateInfo[0] + " " + dateInfo[1] + ", " + dateInfo[2] + "\nand the current time is: " + dateInfo[3] + ":" + dateInfo[4]);
}

function dateTimeOnPage()
{
	let dateInfo = getDateData();
	document.querySelector("#dateOutput").innerHTML=dateInfo[0] + " " + dateInfo[1] + ", " + dateInfo[2] + "<br>and the current time is: " + dateInfo[3] + ":" + dateInfo[4];
}