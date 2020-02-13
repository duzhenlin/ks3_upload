<template>
  <div id="app">
    <ks3-upload :Signature="Signature"></ks3-upload>
  </div>
</template>

<script>
import ks3Upload from "./components/ks3_upload";
export default {
  name: "app",
  components: { ks3Upload },
  data() {
    return {
      Signature: {
        Policy: "",
        Signature: "",
        KSSAccessKeyId: "",
        bucket: ""
      }
    };
  },
  methods: {}
};
</script>

<style lang="less">
</style>
