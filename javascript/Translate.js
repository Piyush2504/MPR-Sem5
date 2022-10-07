// navigator.mediaDevices.getUserMedia({ audio: true })
//   .then(stream => {
//     let b=false;
//     let c=0;
//     const mediaRecorder = new MediaRecorder(stream);
//     const a = document.getElementById("action");
//     let audioChunks = [];
//     a.addEventListener("click",()=>{
//         if(b==false){
//             mediaRecorder.start();
//             mediaRecorder.addEventListener("dataavailable", event => {
//                 audioChunks.push(event.data);
//             });
//             c++;
//             console.log(c);
//             console.log(b);
//             b=true;
//         }
//         else{
            
//             let audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//             let audioUrl = URL.createObjectURL(audioBlob);
//             let audio = new Audio(audioUrl);
//             mediaRecorder.stop();
//             audio.play();
//             c++;
//             console.log(c);
//             b=false;
//             audioChunks=[];
//             audioBlob=null;
//             audioUrl=null;
//             audio=null;
//         }
//     })
// });

//webkitURL is deprecated but nevertheless
// URL = window.URL || window.webkitURL;

// var gumStream=MediaStream; 						//stream from getUserMedia()
// var recorder; 						//WebAudioRecorder object
// var input; 							//MediaStreamAudioSourceNode  we'll be recording
// var encodingType; 					//holds selected encoding for resulting audio (file)
// var encodeAfterRecord = true;       // when to encode

// // shim for AudioContext when it's not avb. 
// var AudioContext = window.AudioContext || window.webkitAudioContext;
// var audioContext; //new audio context to help us record
// let b=false;
// var encodingTypeSelect = "wav";
// var recordButton = document.getElementById("action");
// var stopButton = document.getElementById("action1");

// //add events to those 2 buttons
// recordButton.addEventListener("click", startRecording);
// b=true;
// stopButton.addEventListener("click", stopRecording);
// function startRecording() {
// 	console.log("startRecording() called");

// 	/*
// 		Simple constraints object, for more advanced features see
// 		https://addpipe.com/blog/audio-constraints-getusermedia/
// 	*/
    
//     var constraints = { audio: true, video:false }

//     /*
//     	We're using the standard promise based getUserMedia() 
//     	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// 	*/

// 	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
// 		__log("getUserMedia() success, stream created, initializing WebAudioRecorder...");

// 		/*
// 			create an audio context after getUserMedia is called
// 			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
// 			the sampleRate defaults to the one set in your OS for your playback device

// 		*/
// 		audioContext = new AudioContext();

// 		//update the format 
// 		document.getElementById("formats").innerHTML="Format: 2 channel "+encodingTypeSelect+" @ "+audioContext.sampleRate/1000+"kHz"

// 		//assign to gumStream for later use
// 		gumStream = stream;
		
// 		/* use the stream */
// 		input = audioContext.createMediaStreamSource(stream);
		
// 		//stop the input from playing back through the speakers
// 		//input.connect(audioContext.destination)

// 		//get the encoding 
// 		encodingType = encodingTypeSelect;
		
// 		// disable the encoding selector
// 		// encodingTypeSelect.disabled = true;

// 		recorder = new WebAudioRecorder(input, {
// 		  workerDir: "javascript/", // must end with slash
// 		  encoding: encodingType,
// 		  numChannels:2, //2 is the default, mp3 encoding supports only 2
// 		  onEncoderLoading: function(recorder, encoding) {
// 		    // show "loading encoder..." display
// 		    __log("Loading "+encoding+" encoder...");
// 		  },
// 		  onEncoderLoaded: function(recorder, encoding) {
// 		    // hide "loading encoder..." display
// 		    __log(encoding+" encoder loaded");
// 		  }
// 		});

// 		recorder.onComplete = function(recorder, blob) { 
// 			__log("Encoding complete");
// 			createDownloadLink(blob,recorder.encoding);
// 			encodingTypeSelect.disabled = false;
// 		}

// 		recorder.setOptions({
// 		  timeLimit:120,
// 		  encodeAfterRecord:encodeAfterRecord,
// 	      ogg: {quality: 0.5},
// 	      mp3: {bitRate: 160}
// 	    });

// 		//start the recording process
// 		recorder.startRecording();

// 		 __log("Recording started");

// 	}).catch(function(err) {
// 	  	//enable the record button if getUSerMedia() fails
//     	recordButton.disabled = false;
//     	stopButton.disabled = true;

// 	});

// 	//disable the record button
//     recordButton.disabled = true;
//     stopButton.disabled = false;
// }

// function stopRecording() {
// 	console.log("stopRecording() called");
	
//     console.log(gumStream.getAudioTracks);
// 	//stop microphone access
// 	gumStream.getAudioTracks[0].stop();

// 	//disable the stop button
// 	stopButton.disabled = true;
// 	recordButton.disabled = false;
	
// 	//tell the recorder to finish the recording (stop recording + encode the recorded audio)
// 	recorder.finishRecording();

// 	__log('Recording stopped');
// }

// function createDownloadLink(blob,encoding) {
	
// 	var url = URL.createObjectURL(blob);
// 	var au = document.createElement('audio');
// 	var li = document.createElement('li');
// 	var link = document.createElement('a');

// 	//add controls to the <audio> element
// 	au.controls = true;
// 	au.src = url;

// 	//link the a element to the blob
// 	link.href = url;
// 	link.download = new Date().toISOString() + '.'+encoding;
// 	link.innerHTML = link.download;

// 	//add the new audio and a elements to the li element
// 	li.appendChild(au);
// 	li.appendChild(link);

// 	//add the li element to the ordered list
// 	recordingsList.appendChild(li);
// }



// //helper function
// function __log(e, data) {
// 	log.innerHTML += "\n" + e + " " + (data || '');
// }






//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream=MediaStream; 						//stream from getUserMedia()
var recorder; 						//WebAudioRecorder object
var input; 							//MediaStreamAudioSourceNode  we'll be recording
var encodingType; 					//holds selected encoding for resulting audio (file)
var encodeAfterRecord = true;       // when to encode

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //new audio context to help us record

var encodingTypeSelect = "wav";
var recordButton = document.getElementById("action");
var stopButton = document.getElementById("action1");

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
function startRecording() {
	console.log("startRecording() called");

	/*
		Simple constraints object, for more advanced features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }

    /*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		__log("getUserMedia() success, stream created, initializing WebAudioRecorder...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();

		//update the format 
		document.getElementById("formats").innerHTML="Format: 2 channel "+encodingTypeSelect.options[encodingTypeSelect.selectedIndex].value+" @ "+audioContext.sampleRate/1000+"kHz"

		//assign to gumStream for later use
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);
		
		//stop the input from playing back through the speakers
		//input.connect(audioContext.destination)

		//get the encoding 
		encodingType = encodingTypeSelect;
		
		//disable the encoding selector
		encodingTypeSelect.disabled = true;

		recorder = new WebAudioRecorder(input, {
		  workerDir: "js/", // must end with slash
		  encoding: encodingType,
		  numChannels:2, //2 is the default, mp3 encoding supports only 2
		  onEncoderLoading: function(recorder, encoding) {
		    // show "loading encoder..." display
		    __log("Loading "+encoding+" encoder...");
		  },
		  onEncoderLoaded: function(recorder, encoding) {
		    // hide "loading encoder..." display
		    __log(encoding+" encoder loaded");
		  }
		});

		recorder.onComplete = function(recorder, blob) { 
			__log("Encoding complete");
			createDownloadLink(blob,recorder.encoding);
			encodingTypeSelect.disabled = false;
		}

		recorder.setOptions({
		  timeLimit:120,
		  encodeAfterRecord:encodeAfterRecord,
	      ogg: {quality: 0.5},
	      mp3: {bitRate: 160}
	    });

		//start the recording process
		recorder.startRecording();

		 __log("Recording started");

	}).catch(function(err) {
	  	//enable the record button if getUSerMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = true;

	});

	//disable the record button
    recordButton.disabled = true;
    stopButton.disabled = false;
}

function stopRecording() {
	console.log("stopRecording() called");
	
	//stop microphone access
	gumStream.getAudioTracks.stop();

	//disable the stop button
	stopButton.disabled = true;
	recordButton.disabled = false;
	
	//tell the recorder to finish the recording (stop recording + encode the recorded audio)
	recorder.finishRecording();

	__log('Recording stopped');
}

function createDownloadLink(blob,encoding) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//link the a element to the blob
	link.href = url;
	link.download = new Date().toISOString() + '.'+encoding;
	link.innerHTML = link.download;

	//add the new audio and a elements to the li element
	li.appendChild(au);
	li.appendChild(link);

	//add the li element to the ordered list
	recordingsList.appendChild(li);
}



//helper function
function __log(e, data) {
	log.innerHTML += "\n" + e + " " + (data || '');
}