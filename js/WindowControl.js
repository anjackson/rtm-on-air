
	var maxButton;
	var restoreButton;

	function onClose(){
		var closing = new air.Event(air.Event.CLOSING, true, true);
		window.nativeWindow.dispatchEvent(closing);
		if(!closing.isDefaultPrevented()){
			window.close();
		}
	}
	
	function onMinimize(){
		var minimizing = 
			new air.NativeWindowDisplayStateEvent(air.NativeWindowDisplayStateEvent.DISPLAY_STATE_CHANGING,
         									  true, true,
           									  window.nativeWindow.displayState,
           									  air.NativeWindowDisplayState.MINIMIZED);
		window.nativeWindow.dispatchEvent(minimizing);
		if(!minimizing.isDefaultPrevented()){		
			nativeWindow.minimize();
		}
	}
	
	function onMaximize(){
		var maximizing =  
			new air.NativeWindowDisplayStateEvent(air.NativeWindowDisplayStateEvent.DISPLAY_STATE_CHANGING,
         									  true, true,
           									  window.nativeWindow.displayState,
           									  air.NativeWindowDisplayState.MAXIMIZED);
		window.nativeWindow.dispatchEvent(maximizing);
		if(!maximizing.isDefaultPrevented()){
			nativeWindow.maximize();
		}
	}

	function onRestore(){
		var restoring =  
			new air.NativeWindowDisplayStateEvent(air.NativeWindowDisplayStateEvent.DISPLAY_STATE_CHANGING,
         									  true, true,
           									  window.nativeWindow.displayState,
           									  air.NativeWindowDisplayState.NORMAL);
		window.nativeWindow.dispatchEvent(restoring);
		if(!restoring.isDefaultPrevented()){
			nativeWindow.restore();
		}
	}	
	
	function onDisplayStateChange(event){
		if(event.afterDisplayState == air.NativeWindowDisplayState.MAXIMIZED){
			restoreButton.style.visibility = "visible";
			maxButton.style.visibility = "hidden";
		} else {
			restoreButton.style.visibility = "hidden";
			maxButton.style.visibility = "visible";		
		}
	}
	
	var onMove = function(event){
		nativeWindow.startMove();
	}

	var onResize = function(event){
		nativeWindow.startResize(air.NativeWindowResize.BOTTOM_RIGHT);
	}
	
	var Bridge = {};
	Bridge.viewSource = function(){
		SourceViewer.getDefault().viewSource();	
	}
	
	Bridge.trace = function(string){
		air.trace(string);
	}
	
	function setBridge(){
		var childApp = document.getElementById("application").contentWindow;
		childApp.parentSandboxBridge = Bridge;
	}