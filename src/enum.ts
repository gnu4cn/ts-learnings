enum Days {周日 = 7, 周一 = 1, 周二, 周三, 周四, 周五, 周六 = "周六".length}

console.log(Days[2], Days["周二"])

const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

console.log(directions)
