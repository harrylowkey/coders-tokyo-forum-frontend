<template>
  <v-alert
    id="alert"
    type="warning"
    border="left"
    transition="slide-x-reverse-transition"
    dismissible
  >
    {{ alertMessage }}
  </v-alert>
</template>

<script>
export default {
  props: ['alertMessage'],
};
</script>

<style>
#alert {
  position: fixed;
  top: 65px;
  right: 0;
  z-index: 1;
}
</style>
