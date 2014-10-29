/**
* Trvsr - 0.0.01
* Menu sederhana untuk checkbox
*
*	.t-checkbox	untuk setiap checkbox
*	.t-leaf 	untuk ujung dari menu
*
* Author: Giri Prahasta Putra
* Project Page: https://github.com/igrir/Trvsr
* Copyright (c) 2014 Giri Prahasta Putra. Released under MIT License.
*/


(function ($) {

     $.fn.trvsr = function ( option ) {

     	var element = $(this);

     	var rootChildren = traverseChildren(element[0], -1); 
		var trvsrChildren = element.children();
		

		for (var i = 0; i < rootChildren.length; i++) {

			var node = rootChildren[i];
			
			if ($(node).is("ul")) {

				$(node).hide();
				
			}

		}

		$(trvsrChildren).find(":checkbox").show();
		

		//-------------------------INIT
		//dapatkan induk
		var parent = $(this);
		
		//dapatkan children dari induk 
		var children = traverseChildren($(parent)[0], -1);
		//traverse semua children		
		for (var i = 0; i < children.length; i++) {

			var currentParent = $(children[i]);

			if (children[i].type=="checkbox") {

				//cari class leaf
				var classList = $(children[i])[0].classList;
				var isLeaf = false;
				for (var j = 0; j < classList.length; j++){
					var classStr = classList[j];
					if (classStr == "t-leaf") {
						isLeaf = true;
					}
				}

				if (isLeaf) {
					if ($(children[i]).is(":checked")) {
						//parentnya jadi kebuka
						
						// currentParent.parent().show();
						console.log(currentParent.parent());

						// var childrenChild = traverseChildren($(currentParent)[0],-1);

						// for (var j = 0; j < childrenChild.length; j++) {
						// 	$(childrenChild[j]).show();
						// }
						traverseParent(currentParent);

						
					}else{

					}
				}
				
			}
		}

		$(".t-checkbox").click(function(){

			//dapatkan induk
			var parent = $(this).parent();
			
			//dapatkan children dari induk 
			var children = traverseChildren($(parent)[0], -1);
			

			//traverse semua children
			
			for (var i = 0; i < children.length; i++) {
				if (children[i].type=="checkbox") {

					//cari class leaf
					var classList = $(children[i])[0].classList;
					var isLeaf = false;
					for (var j = 0; j < classList.length; j++){
						var classStr = classList[j];
						if (classStr == "t-leaf") {
							isLeaf = true;
						}
					}

					if (isLeaf) {
						if ($(this).is(":checked")) {
							$(children[i]).prop('checked', true);
						}else{
							$(children[i]).prop('checked', false);
						}
					}
					
				}
			}


			//kalau di check
			if ($(this).is(":checked")) {
				var nodeChildren = traverseChildren($(parent)[0], 3);
				console.log(nodeChildren);
				$(nodeChildren).show();

			//kalau di uncheck
			}else{
				var nodeChildren = traverseChildren($(parent)[0], -1);
				for (var i = 0;  i< nodeChildren.length;i++) {
					var node = nodeChildren[i];
					if (node != this) {
						if ($(node).is("ul")) {
							$(node).hide();
						}

						// if ($(node).is("checkbox")) {
							$(node).prop('checked', false);
						// }
					}
				}
				
			}
			
		});
     };

	/*
		depth:
		-1 = infinite
	*/
	function traverseChildren(elem, depth){
	    var children = [];
	    var q = [];
	    
	    var currentDepth = 0;
	    q.push(elem);
	    while (q.length > 0 && ((currentDepth < depth && depth > -1) || (depth <= -1)) ) {
	    	var celem = q.pop();

	    	if (currentDepth > 0) {
	    		children.push(celem);
	    	}
			
	  		pushAll(celem.children);
	  		currentDepth++;
	      
	    }

	    function pushAll(elemArray){
	      for(var i=0; i < elemArray.length; i++) {
	        q.push(elemArray[i]);
	      }
	    }
	    return children;
	}


	function traverseParent(elem){
			var parent = [];
			var q = elem;
			var x = 0;

			var isRoot = false;
			while (q != isRoot && x < 6 ){


				//cari class leaf
				var classList = $(q)[0].classList;
				
				for (var j = 0; j < classList.length; j++){
					var classStr = classList[j];
					if (classStr == "t-root") {
						isRoot = true;
					}
				}

				// console.log(isRoot);
				q = q.parent();
				q.show();
				parent.push(q);
				x++
			}

			function pushAll(elemArray){
		      for(var i=0; i < elemArray.length; i++) {
		        q.push(elemArray[i]);
		      }
		    }
		}


}(window.jQuery));

