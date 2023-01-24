
export const vhScaleFactor = (100 / 256);

export const GameConsts = {
  fps: 60,
  playingPlayerLeftPositionVh: 30,
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
    leftVh: 30,
    flyingMechanics: {
      gravity: 180, //vh/sec^2
      jumpVelocity: -65, //vh/sec

    },
    glidingMechanics: {
      topOnStartVh: 30,
      centricGravity: 0.2, //vh/sec^2
      speed: 30,// vh/sec (todo?) //todo something weird is going with the speed and topStartVH
    },
  },
  floor: {
    tileWidthVh: 12 * vhScaleFactor,
    heightVh: 56 * vhScaleFactor,
    speed: 30 //vh/sec
  },
}


Object.freeze(GameConsts);