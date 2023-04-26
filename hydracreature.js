const canvas = document.querySelector('#myCanvas')

 new window.Hydra({
   canvas: canvas,
   detectAudio: false
 })
 // run some hydra code!
 osc(10, 0.1, 0.8).rotate(0, 0.1).kaleid().color(-1, 1).out()
