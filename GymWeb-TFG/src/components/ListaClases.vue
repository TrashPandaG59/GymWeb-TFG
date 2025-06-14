<style scoped>
  .book {
    position: relative;
    border-radius: 10px;
    width: 220px;
    height: 300px;
    background-color: whitesmoke;
    -webkit-box-shadow: 1px 1px 12px #000;
    box-shadow: 1px 1px 12px #000;
    -webkit-transform: preserve-3d;
    -ms-transform: preserve-3d;
    transform: preserve-3d;
    -webkit-perspective: 2000px;
    perspective: 2000px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #000;
  }

  .cover {
    top: 0;
    position: absolute;
    background-color: lightgray;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform-origin: 0;
    -ms-transform-origin: 0;
    transform-origin: 0;
    -webkit-box-shadow: 1px 1px 12px #000;
    box-shadow: 1px 1px 12px #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .book:hover .cover {
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform: rotatey(-80deg);
    -ms-transform: rotatey(-80deg);
    transform: rotatey(-80deg);
  }

  p {
    font-size: 20px;
    font-weight: bolder;
  }
</style>

<template>
  <div class="book" v-for="cita in citas">
    <div style="text-align: center;">
      <h3 style="margin-bottom: 10px;">{{ cita.clase }}</h3>
      <p style="font-size: 16px; color: #555; margin-bottom: 0;">{{ cita.descripcion }}</p>
    </div>
    <div class="cover">
      <p><img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjQybjJtYTd3azRmNmJ0dmNxcTFkYW84dDNtNG1hY2hqZDNibDFyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5OcuJCGflytBLYyNj5/giphy.gif" alt=""></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { listarTodo } from '@/server';

const citas = ref([]);

onMounted( async() => { 
  citas.value = await listarTodo('v_clases');
  // console.log("clases: ", citas.value);
})
</script>