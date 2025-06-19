<template>
  <div id="flash-container" class="flash-wrapper"></div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@ruffle-rs/ruffle';
    script.onload = () => {
      const ruffle = window.RufflePlayer.newest();
      const player = ruffle.createPlayer();
      player.style.width = '100%';
      player.style.height = '100%';
      player.style.maxWidth = '960px';  // Opcional: tamaño original del juego
      player.style.maxHeight = '720px';
      player.style.display = 'block';
      player.style.margin = 'auto';
      document.getElementById('flash-container').appendChild(player);
      player.load('../src/games/demo.swf'); // asegúrate de tener este archivo en /public/games/
    };
    document.body.appendChild(script);
  }
};
</script>

<style scoped>
.flash-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: black;  */
  overflow: hidden;
}
</style>
