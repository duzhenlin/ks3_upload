<template>
  <div id="app">
    <ks3-upload :Signature="Signature" :module="module" @uploadsucceed="uploadsucceed"></ks3-upload>
  </div>
</template>

<script>
import ks3Upload from "./components/ks3_upload";
export default {
  name: "app",
  components: { ks3Upload },
  data() {
    return {
      module: "sucaiku",
      Signature: {
        Policy: "Policy",
        Signature: "Signature",
        KSSAccessKeyId: "KSSAccessKeyId",
        bucket: "bucket",
        domain: "domain",
        region: "BEIJING"
      }
    };
  },
  methods: {
    uploadsucceed(obj, url) {
      console.log(obj, url);
    }
  }
};
</script>

<style lang="less">
</style>
