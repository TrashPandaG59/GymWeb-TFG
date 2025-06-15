<template>
  <div class="chat-container">
    <h2>Chat con IA</h2>
    <div class="chat-messages" ref="chatMessages">
      <div
        v-for="(msg, index) in mensajes"
        :key="index"
        :class="msg.role"
      >
        <strong>{{ msg.author }}:</strong>
        <p>{{ msg.text }}</p>
      </div>
    </div>
    <div class="chat-input">
      <input
        type="text"
        v-model="mensaje"
        placeholder="Escribe tu mensaje..."
        @keyup.enter="enviarMensaje"
      />
      <button @click="enviarMensaje">Enviar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import "../assets/ComponentStyles/IA.css"
const mensaje = ref('');
const mensajes = ref([]);
const chatMessages = ref(null);

const datosBase = {
  User_Token: '355192d5442d295778034397e2c89dc17844acf3',
  Character_ID: 'I9ZgVpUO-VtwAub1uW3NK9Kekfi3LwzmPj1mPFLzhKE',
  Voz: 'Si',
  Chat_ID: 'eeafafd0-0938-49cc-9fe7-0ad52853bde5'
};

function agregarMensaje(role, author, text) {
  mensajes.value.push({ role, author, text });
  nextTick(() => {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
  });
}

onMounted(async () => {
  const url = `https://unique-sarajane-fsdgfgfdsvsfd-5e430f4b.koyeb.app/chat/${datosBase.Chat_ID}?token=${datosBase.User_Token}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const historial = await res.json();
    historial.forEach(msg => {
      const role = msg.author === 'PurpleBirds9148' ? 'user' : 'bot';
      agregarMensaje(role, msg.author, msg.message);
    });
  } catch (err) {
    console.error('Error al cargar historial:', err);
    agregarMensaje('bot', 'Sistema', '⚠️ No se pudo cargar el historial del chat.');
  }
});

async function enviarMensaje() {
  const texto = mensaje.value.trim();
  if (!texto) return;
  agregarMensaje('user', 'PurpleBirds9148', texto);
  mensaje.value = '';

  try {
    const res = await fetch('https://unique-sarajane-fsdgfgfdsvsfd-5e430f4b.koyeb.app/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...datosBase, mensaje: texto })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { text, author = 'IA', audio_base64 } = await res.json();
    agregarMensaje('bot', author, text);
    if (audio_base64) {
      const audio = new Audio(`data:audio/mp3;base64,${audio_base64}`);
      audio.play();
    }
  } catch (error) {
    console.error('Error:', error);
    agregarMensaje('bot', 'Sistema', '❌ Ocurrió un error al comunicarse con la IA.');
  }
}
</script>
