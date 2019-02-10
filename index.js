const audioContext = new AudioContext()
const bufferSize = 2 * audioContext.sampleRate
const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
const output = noiseBuffer.getChannelData(0);
const whiteNoise = audioContext.createBufferSource();
const container = document.querySelector('.container')

const play = '&#x25b6;'
const pause = '&#10074;&#10074;'
let playing = false

for (let i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1
}

whiteNoise.buffer = noiseBuffer
whiteNoise.loop = true
whiteNoise.start(0)
whiteNoise.connect(audioContext.destination)
audioContext.suspend()

document.querySelector('button').addEventListener('click', event => {
  if (playing) {
    audioContext.suspend()
    event.target.innerHTML = play
    container.classList.add('hide')
  } else {
    audioContext.resume()
    event.target.innerHTML = pause
    container.classList.remove('hide')
  }

  playing = !playing
})

