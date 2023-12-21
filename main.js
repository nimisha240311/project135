video = "";
status = "";
objects=[]

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != ""){ 
        objectdetector.detect(video, gotresults)
        for(i=0;i<objects.length;i++){
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected = " + objects.length
            document.getElementById("status").innerHTML = "Status : object detected"
            fill("blue")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + "" + percent, objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            myobj = document.getElementById("mytext").value
            if(myobj==objects[i].label){
                synth=window.speechSynthesis
                speak_data=myobj+" is identified "
                utterThis=new SpeechSynthesisUtterance(speak_data)
                synth.speak(utterThis)
            }
        } 
    }
}
function gotresults(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects=results 
    }
}

function start() {
    objectdetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status:detecting objects";
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}