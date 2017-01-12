export const DEFAULT_MATRIX = [
  [0, 0, 0, 1,  0, 0, 0, 0,  0, 0, 0, 0,  1, 0, 0, 0,  ],
  [0, 1, 0, 0,  0, 1, 1, 0,  0, 1, 1, 0,  0, 0, 1, 0,  ],
  [0, 1, 1, 0,  1, 0, 0, 0,  0, 0, 0, 1,  0, 1, 1, 0,  ],
  [0, 0, 1, 0,  0, 0, 1, 0,  0, 1, 0, 0,  0, 1, 0, 0,  ],

  [1, 0, 1, 1,  0, 1, 0, 0,  0, 0, 1, 0,  1, 1, 0, 1,  ],
  [0, 0, 0, 0,  0, 1, 1, 1,  1, 1, 1, 0,  0, 0, 0, 0,  ],
  [1, 0, 1, 1,  0, 0, 0, 0,  0, 0, 0, 0,  1, 1, 0, 1,  ],
  [1, 0, 1, 1,  1, 1, 1, 0,  0, 1, 1, 1,  1, 1, 0, 1,  ],

  [0, 0, 0, 1,  1, 0, 0, 0,  0, 0, 0, 1,  1, 0, 0, 0,  ],
  [0, 1, 0, 0,  0, 0, 1, 1,  1, 1, 0, 0,  0, 0, 1, 0,  ],
  [0, 0, 0, 1,  1, 0, 0, 0,  0, 0, 0, 1,  1, 0, 0, 0,  ],
];

export const GHOSTS = [
  {id: 'G1' ,color: 'red', position: { x: 7, y: 4 } , path:[] },
  {id: 'G2', color: 'blue', position: { x: 8, y: 3 } , path:[] },
  {id: 'G3', color: 'white', position: { x: 7, y: 8 } , path:[] },
  {id: 'G4', color: 'pink', position: { x: 8, y: 8 } , path:[] },
];

function calTotalMarks() {
  let count = 0;
  for (let i = 0; i < DEFAULT_MATRIX.length; i++) {
    for (let x = 0; x < DEFAULT_MATRIX[i].length; x++) {
      if(DEFAULT_MATRIX[i][x]===0)
        ++count;
    }
  }
  return count-1;
}

export const WIN_MARKS = calTotalMarks();
export const PACMAN_SPEED = 200;
export const GHOST_SPEED = 300;
export const MIN_GHOST_FOLLOWING_LENGTH = 4;
export const COL_COUNT = DEFAULT_MATRIX[0].length;
export const ROW_COUNT = DEFAULT_MATRIX.length;
