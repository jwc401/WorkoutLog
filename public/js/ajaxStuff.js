	//AJAX!!!
	function addListen(evt) {
		console.log(evt);
		evt.preventDefault();
		var req = new XMLHttpRequest();
		var url = "/journals/sort";
		var mmddyy = document.getElementById("mmddyy").value;
		console.log("Searching for: " + mmddyy);
		req.open('GET', url, true);
		console.log('clicked');
		function addLoad() {
			//console.log(req.responseText);
			var entrySet = JSON.parse(req.responseText);
			//console.log(entrySet);
			var entryDate; //Holds the entry object that matches the entry date we are searching for
			Object.keys(entrySet).forEach(function(key){
				if (mmddyy === entrySet[key].date) {
					entryDate = entrySet[key];
				}
			});
			var ul = document.querySelector('ul');
			var i = 0;
			while(ul.childNodes[i]) {
				console.log(ul.childNodes[i]);
				ul.removeChild(ul.childNodes[i]);
			}
			var li = ul.appendChild(document.createElement('li'));
			var sort = li.appendChild(document.createElement('a'));
			sort.href = '/journals/' + entryDate.slug;
			sort.textContent = entryDate.date;
		}
		req.addEventListener("load", addLoad);
		req.send();
	}
	function funct() {
		var dateSort = document.getElementById('dateSort');
		dateSort.addEventListener("click", addListen);	
	}
	document.addEventListener("DOMContentLoaded", funct);