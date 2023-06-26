import css from './style.css'


const kb = 'awsedftgyhuj'
const noteNames = [
    'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 
]
const notes = []
notes.push(440)

for (let i = 1; i < 12; i++) {
    notes.push(notes[i - 1] * Math.pow(2, 1 / 12))
}

console.log(notes)

const audioCtx = new AudioContext()
function createNote(freq, key) {

    const osc = audioCtx.createOscillator()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, 0)

    osc.start()
    osc.stop(audioCtx.currentTime + 0.5)
    osc.connect(audioCtx.destination)

    osc.onended = () => {
        audioCtx.close()
    }

    addClassActive(osc, key)
}

function addClassActive(osc, key) {
    key.classList.add('active')

    osc.onended = () => {
        key.classList.remove('active')
    }
}

const whiteKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
const blackKeys = ['a#', 'c#', 'd#', 'f#', 'g#']

const synth = document.querySelector('#synth')
let whiteKeyIndex = 0
let blackKeyIndex = 0

for (let i = 0; i < kb.length; i++) {
    const key = document.createElement('button')
    key.textContent = noteNames[i]

    if (blackKeys.includes(noteNames[i])) {
        key.classList.add('black')
        // key.style.left = `${whiteKeyIndex * 0 - 10}px`
        key.style.color = 'white'
        blackKeyIndex++
    } else {
        key.classList.add('white')
        // key.style.left = `${whiteKeyIndex * 30}px`
        whiteKeyIndex++
    }

    key.addEventListener('mousedown', () => {
        createNote(notes[i], key)
    })

    synth.append(key)
}
