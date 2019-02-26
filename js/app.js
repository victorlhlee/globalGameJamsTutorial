console.log('hi')

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext ('2d');
let ctxW = canvas.width;
let ctxH = canvas.height;

let elPX = document.getElementById('playerX');
let elPY = document.getElementById('playerY');

let img = new Image(); //<image src ="car.png"></image> to access the image in html
img.src = 'assets/car.png';

let track = new Image();
track.src = 'assets/road.png';

let TO_RADIANS = Math.PI/180;

let carX = 870;
let carY = 370;
let acceleration = 1.1;
let rotationStep = 4; 
let rotation = 350;
let speed = 0;
let speedDecay = 0.98;
let maxSpeed = 4;
let backSpeed = 4;

const drawRotatedImage = (image, x, y, angle) => {
    // save the current coordinate system
    ctx.save();
    // translate
    ctx.translate(x,y);
    // rotate around the point
    // convert angles from degrees to radians
    ctx.rotate(angle * TO_RADIANS);

    // draw image with our specified coordinates

    ctx.drawImage(image, -(image.width/2), -(image.height/2));

    // and then restore the coords to how they were when we began our
    // journey together down this road.

    ctx.restore();
}

const draw = () => {
    // canvas works like this
    // clear first
    // then re-draw it

    ctx.clearRect(0, 0, ctxW, ctxH);
    ctx.drawImage(track, 0, 0);
    drawRotatedImage(img, carX, carY, rotation);
}

// window.addEventListener('keydown', (e) => {
//     console.log(e.keyCode)
// }); 
// to use a key to input something on broswer

let key = {
    W: 87,
    S:83,
    A:65,
    D:68,
};

let keys = {
    87: false,
    83: false,
    65: false,
    68: false,
};

const steerLeft = () => {
    rotation -= rotationStep * (speed/maxSpeed);
};

const steerRight = () => {
    rotation += rotationStep * (speed/maxSpeed);
};


// console.log(keys[key.DOWN])
//check if will print 40

const speedXY = (rotation, speed) => {
    return {
        x: Math.sin(rotation * TO_RADIANS) * speed,
        y: Math.cos(rotation * TO_RADIANS) * speed * -1
    };
}

const step = () => {
    //key movements
    if(keys[key.W]){ speed +=0.2 }
    if(keys[key.S]){ speed -=0.2 }
    if(keys[key.A]){ steerLeft() }
    if(keys[key.D]){ steerRight()}

    let speedAxis = speedXY(rotation, speed);
    carX += speedAxis.x;
    carY += speedAxis.y;

    //update player coords with innerHTML for elPX elPY
    elPX.innerHTML = Math.floor(carX);
    elPY.innerHTML = Math.floor(carY);
}

// in this space;
window.addEventListener('keydown', (e) => {
    if(keys[e.keyCode] !== 'undefined'){
        keys[e.keyCode] = true;
    }
});

window.addEventListener('keyup', (e) => {
    if(keys[e.keyCode] !== 'undefined'){
        keys[e.keyCode] = false;
    }
});

// window.addEventListener('keyleft', (e) => {
//     if(keys[e.keyCode] !== 'undefined'){
//         keys[e.keyCode] = true;
//     }
// });

// window.addEventListener('keydown', (e) => {
//     if(keys[e.keyCode] !== 'undefined'){
//         keys[e.keyCode] = true;
//     }
// });



const frame = () => {
    step();
    draw();

    window.requestAnimationFrame(frame);
}

frame();