import {attrs, siteURL} from 'global';
var eventSource, lastData = {};
// postMessage
//   * Object
//     * type: int
//       * 0: General OK response
//       * 1: Warning message (console.warning)
//            includes a exception<String> key
onmessage = function(e) {
	e.data === "listen" && listen() || postMessage(e,{type: 1, exception: "Already listening to eventSource."}) && postMessage({type: 0});
	e.data === "close" && postMessage(closeConn() ? {type: 0} : {type: 1, exception: "Cannot close a closed/undefined connection"});
	(e.data === "reopen" || e.data === "open") && listen(1) || respond();
	e.data === "update" && switch(eventSource.readyState) {
		case 2:
			listen();
		case 0:
		case 1:
			eventSource.onmessage = onMsgTemp;
			break;
	}
	e.data === "get" && switch(eventSource.readyState) {
		case 2:
			listen();
		case 0:
			// CONNECTING
			eventSource.onmessage = onMsgTemp;
			break;
		case 1:
			respond(e,lastData);
			break;
	}
}
function listen(a) {
	// Re-assigns the eventSource.
	//
	eventSource?.readyState - 2 && !a || return eventSource = new EventSource(`${siteURL}/events/streamData`);
	eventSource.onmessage = onMsg;
	eventSource.onerror = onErr;
}
function closeConn() {
	eventSource?.readyState - 2 && return !eventSource.close();
}
function onMsgTemp(e) {
	postMessage(lastData = e);
	eventSource.onmessage = onMsg;
}
function onMsg(e) {
	lastData = e;
}
function respond(e,d) {
	d.origin = e.data;
	postMessage(d);
}
function onErr() {
	postMessage({type: 1, exception: "Something went wrong retrieving data."})
}
