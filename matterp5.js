
let headRotation = 1;

const canvas2 = document.querySelector('#myCanvas')

 new window.Hydra({
   canvas: canvas2,
   detectAudio: false
 })
 // run some hydra code!
 setInterval(() => {
 osc(10, 0.1, 0.8).rotate(0, 0.3).kaleid().color(-1, 1)
 .modulate(
		noise(headRotation*10,10,0.5)
		)
    .out()
},1000);




// Initialize Matter.js
let Engine = Matter.Engine,
    Render = Matter.Render,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Constraint = Matter.Constraint;

let engine = Engine.create(),
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
        width: 800,
        height: 600,
        showAngleIndicator: false,
        wireframes: false,
        background: 'rgba(245, 40, 145, 0)',
    }
    });

    // Start the renderer
    Render.run(render);

// Create two circles
let c1Head = Bodies.circle(400, 0, 40, {
            render: {
                strokeStyle: '#ffffff',
                sprite: {
                    texture: 'creatures/creacher1/c1_head.png',
                    xScale: 1,
                    yScale: 1
                }
            }
        });
let c1Body = Bodies.rectangle(400, 110, 80, 120, {
            render: {
                strokeStyle: '#ffffff',
                sprite: {
                    texture: 'creatures/creacher1/c1_body.png',
                    xScale: 1,
                    yScale: 1
                }
            }
        });

        let c1ShoulderL = Bodies.circle(350, 50, 20, {
                    render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                            texture: 'creatures/creacher1/c1_shoulder_L.png',
                            xScale: 1,
                            yScale: 1
                        }
                    }
                });

          let c1ShoulderR = Bodies.circle(450, 50, 20, {
                        render: {
                          strokeStyle: '#ffffff',
                          sprite: {
                              texture: 'creatures/creacher1/c1_shoulder_R.png',
                              xScale: 1,
                              yScale: 1
                              }
                            }
                        });

        let c1HandL = Bodies.rectangle(350, 100, 50, 70, {
                      render: {
                        strokeStyle: '#ffffff',
                        sprite: {
                          texture: 'creatures/creacher1/c1_hand_L.png',
                            xScale: 1,
                            yScale: 1
                              }
                          }
                      });

      let c1HandR = Bodies.rectangle(450, 100, 50, 70, {
                    render: {
                      strokeStyle: '#ffffff',
                      sprite: {
                        texture: 'creatures/creacher1/c1_hand_R.png',
                          xScale: 1,
                          yScale: 1
                            }
                        }
                    });

    let c1ThighL = Bodies.rectangle(390, 200, 60, 80, {
                        render: {
                    strokeStyle: '#ffffff',
                    sprite: {
                      texture: 'creatures/creacher1/c1_thigh_L.png',
                        xScale: 1,
                        yScale: 1
                          }
                      }
                  });
let c1ThighR = Bodies.rectangle(410, 200, 60, 80, {
render: {
  strokeStyle: '#ffffff',
    sprite: {
      texture: 'creatures/creacher1/c1_thigh_R.png',
      xScale: 1,
      yScale: 1
      }
    }
  });


let ground = Bodies.rectangle(400, 400, 810, 60, { isStatic: true });



// Add the circles to the world
Composite.add(engine.world, [c1Head, c1Body, c1ShoulderL, c1ShoulderR, c1HandL,
c1HandR, c1ThighL, c1ThighR, ground]);

// Create a constraint between the circles
let neck = Constraint.create({
    bodyA: c1Head,
    bodyB: c1Body,
    stiffness: 0.06,
    pointA: {x: 0, y: 40},
    pointB: {x: 0, y: -70}
});

let shoulderL = Constraint.create({
    bodyA: c1ShoulderL,
    bodyB: c1Body,
    stiffness: 0.05,
    pointA: {x: 10, y: 10},
    pointB: {x: -20, y: -50}
});

let shoulderR = Constraint.create({
    bodyA: c1ShoulderR,
    bodyB: c1Body,
    stiffness: 0.05,
    pointA: {x: -10, y: 10},
    pointB: {x: 20, y: -50}
});

let elbowL = Constraint.create({
    bodyA: c1HandL,
    bodyB: c1ShoulderL,
    stiffness: 0.02,
    pointA: {x: 0, y: -20},
    pointB: {x: 0, y: 20}
});

let elbowR = Constraint.create({
    bodyA: c1HandR,
    bodyB: c1ShoulderR,
    stiffness: 0.02,
    pointA: {x: 0, y: -20},
    pointB: {x: 0, y: 20}
});

let hipL = Constraint.create({
    bodyA: c1ThighL,
    bodyB: c1Body,
    stiffness: 0.02,
    pointA: {x: 0, y: -30},
    pointB: {x: -10, y: 50}
});

let hipR = Constraint.create({
    bodyA: c1ThighR,
    bodyB: c1Body,
    stiffness: 0.02,
    pointA: {x: 0, y: -30},
    pointB: {x: 10, y: 50}
});


let constraints = [neck, shoulderL, shoulderR, elbowL, elbowR, hipL, hipR];

// Add the constraint to the world
Composite.add(engine.world, constraints);

// Enable mouse interaction
let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(engine.world, mouseConstraint);

// Start the engine
Engine.run(engine);

setInterval(() => {
      headRotation = c1Head.angle;
      console.log(c1Head.angle);
    }, 200);
