
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
import "../assets/ComponentStyles/ListaClases.css"
const citas = ref([]);

onMounted( async() => {
  citas.value = await listarTodo('v_clases');
  // console.log("clases: ", citas.value);
})
</script>
