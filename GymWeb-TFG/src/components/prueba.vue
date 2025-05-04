<template>
    <div>
      <div ref="draggableBox" class="move">Arrástrame</div>
      <div ref="textAnim" class="text_animate">Texto original</div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { gsap } from 'gsap'
  import { Draggable } from 'gsap/Draggable'
  import { TextPlugin } from 'gsap/TextPlugin'
  
  // Registrar plugins
  gsap.registerPlugin(Draggable, TextPlugin)
  
  // Refs para acceder a los elementos
  const draggableBox = ref(null)
  const textAnim = ref(null)
  
  onMounted(() => {
    // Hacer el elemento arrastrable
    Draggable.create(draggableBox.value, {
      type: 'x,y',
      bounds: 'body'
    })
  
    // Animar texto
    gsap.to(textAnim.value, {
      text: 'Minecraftle',
      duration: 1.5,
      ease: 'power1.inOut'
    })
  })
  </script>
  
  <style>
  .move {
    width: 100px;
    height: 100px;
    background-color: #444;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
    position: absolute;
  }
  
  .text_animate {
    margin-top: 150px;
    font-size: 24px;
    color: lightgreen;
  }
  </style>
  