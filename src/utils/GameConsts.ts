
export const vhScaleFactor = (100 / 256);

export const GameConsts = {
  fps: 60,
  pipe: {
    pipeWidthVh: 26 * vhScaleFactor,
    segmentHeightVh: 160 * vhScaleFactor,
    gateHeightVh: 24,
    minTopVh: -57,
    maxTopVh: -20,
    distanceVh: 40,
    speed: 30, //vh/sec //needs to be the same as floor.speed
  },
  player: {
    diameterVh: 12 * vhScaleFactor,
    flyingMechanics: {
      gravity: 180, //vh/sec^2
      jumpVelocity: -65, //vh/sec

    },
    glidingMechanics: {
      centricGravity: 0.05, //vh/sec^2
    },
  },
  floor: {
    tileWidthVh: 12 * vhScaleFactor,
    heightVh: 56 * vhScaleFactor,
    speed: 30 //vh/sec
  },
}


Object.freeze(GameConsts);