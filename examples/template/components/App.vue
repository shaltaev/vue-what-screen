<template>
  <div class="template">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello from /template"
    };
  }
};
</script>

<style scoped>
.template {
  color: chocolate;
}
</style>
