let keyStates = {};
let maxFPS = 30;

let frameCount = 0;

let system = {
    bx: 50,
    by: 150,
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
        if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
            update(timestamp);
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

        if (frameCount < 20) {
            console.log("system.mx: " + system.mx);
        }
    }
    
    function draw() {			
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPositionText();
        drawSystemProperties();
        drawSpring();
        drawBase();
        drawMass();


        ++framesThisSecond;
        ++frameCount;
        
        if (frameCount < 20) {
            console.log("Frame: " + frameCount);
        }
    }

    function processInput() {
        if (keyStates.ArrowRight) {
            system.k *= 1.01;
        } else if (keyStates.ArrowLeft) {
            system.k *= 0.99;
            if (system.k < 0) {
                system.k = 0;
            }
        } else if (keyStates.ArrowUp) {
            system.m *= 1.01;
        } else if (keyStates.ArrowDown) {
            system.m *= 0.99;
            if (system.m < 0) {
                system.m = 0;
            }
        }
    }

    function drawPositionText() {
        context.save();
        context.translate(system.bx, system.by);
        context.font = "20px TimesNewRoman";
        context.fillText("Current position: " + system.mx,0,-90);
        context.restore();
    }

    function drawSystemProperties() {
        context.save();
        context.translate(system.bx, system.by);
        context.font = "16px TimesNewRoman";
        // context.fillText("System properties: m = " + system.m + ", k = " + system.k, 0, -30);
        context.fillText("System Properties:", 0, -60);
        context.fillText("m = " + system.m, 0, -40);
        context.fillText("k = " + system.k, 0, -20);
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
});

window.addEventListener("keyup", function (event) {
    keyStates[event.key] = false;
});
