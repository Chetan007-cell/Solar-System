// Set up canvas element
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

// Define constants for the solar system
const sunRadius = 100;
const planetRadius = [10, 20, 30, 40, 50, 60, 70];
const planetDistance = [100, 250, 400, 550, 700, 850, 1000];
const planetSpeed = [0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04];

// Define a Planet class
class Planet {
    constructor(radius, distance, speed, color) {
        this.radius = radius;
        this.distance = distance;
        this.speed = speed;
        this.color = color;
        this.angle = Math.random() * 2 * Math.PI;
        this.x = 0;
        this.y = 0;
    }

    update() {
        // Update the angle of the planet based on its speed
        this.angle += this.speed;

        // Calculate the new position of the planet based on its angle and distance from the sun
        this.x = canvas.width / 2 + Math.cos(this.angle) * this.distance;
        this.y = canvas.height / 2 + Math.sin(this.angle) * this.distance;

        // Draw the planet
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

// Create the sun
const sun = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: sunRadius,
    color: 'yellow'
};

// Create an array of planets
const planets = planetRadius.map((radius, index) => {
    return new Planet(radius, planetDistance[index], planetSpeed[index], `rgb(${index * 30}, ${index * 20}, ${index * 10})`);
});

// Animate the solar system
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the sun
    context.beginPath();
    context.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    context.fillStyle = sun.color;
    context.fill();

    // Draw the orbits of the planets
    planets.forEach((planet) => {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, planet.distance, 0, Math.PI * 2);
        context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        context.stroke();
    });

    // Update and draw the planets
    planets.forEach((planet) => {
        planet.update();
    });
}

// Start the animation
animate();
