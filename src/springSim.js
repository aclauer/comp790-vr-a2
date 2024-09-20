let keyStates = {};
let maxFPS = 60;

let system = {
    bx: 50,
    by: 100,
    mx: 300,
    height: 200,
    width: 100,
    v: 0,
    k: 1,
    m: 0.5,
    initialPos: 200
}

function updateFrameRate(newFrameRate) {
    maxFPS = newFrameRate;
}

window.onload = function() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    requestAnimationFrame(mainLoop);

    let fps = 0;
    let framesThisSecond = 0;

    setInterval(function() {fps = framesThisSecond; framesThisSecond = 0;}, 1000);

    let lastFrameTimeMs = 0;


    function mainLoop(timestamp) {
        console.log(timestamp);

        if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
            requestAnimationFrame(mainLoop);
            return;
        }

        lastFrameTimeMs = timestamp;

        processInput();
        update(timestamp);
        draw();
                  
        requestAnimationFrame(mainLoop);
    }
    
    function update(timestamp) {
        // Update position of mass
        w = Math.sqrt(system.k / system.m);
        system.mx = 100 * (1 - Math.cos(w * (timestamp / 1000))) + system.initialPos;
    }
    
    function draw() {			
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPositionTest();
        drawSystemProperties();
        drawSpring();
        drawBase();
        drawMass();
    }

    function processInput() {
        if (keyStates.ArrowRight) {
            system.k *= 1.01;
        } else if (keyStates.ArrowLeft) {
            system.k *= 0.99;
            if (system.k < 0) {
                system.k = 0;
            }
        }
    }

    function drawPositionTest() {
        context.save();
        context.translate(system.bx, system.by);
        context.font = "20px TimesNewRoman";
        context.fillText("Current position: " + system.mx,0,-50);
        context.restore();
    }

    function drawSystemProperties() {
        context.save();
        context.translate(system.bx, system.by);
        context.font = "16px TimesNewRoman";
        context.fillText("System properties: m = " + system.m + ", k = " + system.k, 0, -30);
        context.restore();
    }

    function drawBase() {
        context.save();
        context.translate(system.bx, system.by);
        context.beginPath();

        context.fillStyle = "orange";
        context.rect(0, 0, system.width, system.height);
        context.fill();

        context.restore();
    }

    function drawSpring() {
        context.save();
        
        // Current length of the spring
        let length = system.mx;
        let num_coils = 10;
        context.translate(system.bx + system.width, system.by + system.height / 2);
        
        context.fillStyle = "black";

        for (let i = 0; i < num_coils; i++) {
            context.beginPath();
            context.ellipse(length / num_coils * (1 + i), 0, length / num_coils, 10 + 2000 / length, 0, 2 * Math.PI, 0, false);
            context.stroke();
        }
        context.restore();
    }

    function drawMass() {
        let massHeight = 100;

        context.save();
        context.translate(system.bx + system.width + system.mx, system.by + system.height / 2 - massHeight / 2);
        context.beginPath();

        context.fillStyle = "blue";
        context.rect(0, 0, 50, massHeight / 2);
        context.fill();

        context.beginPath();
        context.fillStyle = "red";
        context.rect(0, massHeight / 2, 50, massHeight / 2);
        context.fill();

        context.restore();
    }
}

window.addEventListener("keydown", function (event) {
    keyStates[event.key] = true;
    console.log("Key " + event.key + " pressed.");
    console.log(keyStates);
});

window.addEventListener("keyup", function (event) {
    keyStates[event.key] = false;
    console.log("Key " + event.key + " released.");
    console.log(keyStates);
});