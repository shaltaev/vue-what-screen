<template>
  <div class="first">
    {{ msg }}
    <h3 v-if="$screen.init().isL().done()">Your orientation is Landscape</h3>
    <h3 v-if="$screen.init().isP().done()">Your orientation is Portrait</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello from /first"
    };
  }
};
</script>

<style scoped>
.first {
  color: chocolate;
}
</style>
