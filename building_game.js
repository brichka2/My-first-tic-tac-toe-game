let PlayerInfo = document.getElementById('PlayerInfo')
let RestartButton = document.getElementById('RestartButton')
let BoxField = Array.from(document.getElementsByClassName('fieldbox'))
let VictoryIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_Letter = "O"
const X_Letter = "X"
let ActivePlayer = X_Letter
let fields = Array(9).fill(null)

const GameStart = () => {
    BoxField.forEach(fieldbox => fieldbox.addEventListener('click', FieldClicked))
}

function FieldClicked(e) {
    const id = e.target.id

    if (!fields[id] && PlayerHasWon() === false) { // Check if the selected boxfield is empty and the game is not over
        fields[id] = ActivePlayer // Filling the boxfield with O or X
        e.target.innerText = ActivePlayer

        if (PlayerHasWon() !== false) {
            PlayerInfo.innerText = `${ActivePlayer} wins!`
            let winning_blocks = PlayerHasWon()

            winning_blocks.map(fieldbox => BoxField[fieldbox].style.backgroundColor = VictoryIndicator)
            return
        }

        ActivePlayer = ActivePlayer === X_Letter ? O_Letter : X_Letter // If X has been put in the boxfield, then O will be put in the next field
    }
}

const Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function PlayerHasWon() {
    for (const condition of Combinations) {
        let [a, b, c] = condition // [a, b, c] represents one of the defined combinations, for example a represents 0;3;6...
        // checking if field0 is X and then field1;field2 also has to be X
        if (fields[a] && (fields[a] == fields[b] && fields[a] == fields[c])) {
            return [a, b, c]
        }
    }
    return false
}

RestartButton.addEventListener('click', RestartGame)

function RestartGame() {
    fields.fill(null)

    BoxField.forEach(fieldbox => {
        fieldbox.innerText = '' //clearing the previous game X's and O's
        fieldbox.style.backgroundColor = '' //clearing the highlighted winning blocks
    })

    PlayerInfo.innerText = 'Tic Tac Toe';

    ActivePlayer = X_Letter
}

GameStart()