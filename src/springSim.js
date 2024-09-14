window.onload = function() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    let system = {
        bx: 50,
        by: 100,
        mx: 300,
        height: 200,
        width: 100,
        v: 0
    }

    requestAnimationFrame(mainLoop);

    let frame = 0;
    function mainLoop() {
        update();
        draw();
                  
        requestAnimationFrame(mainLoop);
    }
    
    function update() {
        // Update position of mass
        system.mx = 100 * Math.cos(frame / 20) + 200;
        frame++;
    }
    
    function draw() {			
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawText();
        drawSpring();
        drawBase();
        drawMass();
    }

    function drawText() {
        context.save();
        context.translate(system.bx, system.by);
        context.font = "20px Arial";
        context.fillText("Current position: " + system.mx,0,-30);
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