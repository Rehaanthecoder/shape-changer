nosex = 0;
nosey = 0;
difference = 0;
rightwrist = 0;
leftwrist = 0;
function setup() {
  video = createCapture(VIDEO);
  video.size(550, 500);
  canvas = createCanvas(550, 550);
  canvas.position(560, 150);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotposes);
}
function modelLoaded() {
  console.log("poseNet is initialized");
}
function gotposes(results) {
  if (results.length > 0) {
    console.log(results);
    nosex = results[0].pose.nose.x;
    nosey = results[0].pose.nose.y;
    console.log("nosex= " + nosex + "nosey= " + nosey);
    leftwrist = results[0].pose.leftWrist.x;
    rightwrist = results[0].pose.rightWrist.x;
    difference = floor(leftwrist - rightwrist);
    console.log(
      "rightwristx= " +
        rightwrist +
        "leftwristx= " +
        leftwrist +
        "difference= " +
        difference
    );
  }
}
function draw() {
  background("grey");
  document.getElementById("square_side").innerHTML =
    "width and height will be = " + difference + " px";
  fill("cyan");
  stroke("black");
  square(nosex, nosey, difference);
}
