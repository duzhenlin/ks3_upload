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
        Policy:
          "eyJleHBpcmF0aW9uIjoiMjAyMC0wMi0xMlQyMTozMjoyOS4yODhaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0Ijoic2R5LXNkdHYifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdLFsic3RhcnRzLXdpdGgiLCIkYWNsIiwiIl0sWyJzdGFydHMtd2l0aCIsIiRuYW1lIiwiIl0sWyJzdGFydHMtd2l0aCIsIiR4LWtzcy1tZXRhLWN1c3RvbS1wYXJhbTEiLCIiXSxbInN0YXJ0cy13aXRoIiwiJHgta3NzLW5ld2ZpbGVuYW1lLWluLWJvZHkiLCIiXSxbInN0YXJ0cy13aXRoIiwiJENhY2hlLUNvbnRyb2wiLCIiXSxbInN0YXJ0cy13aXRoIiwiJEV4cGlyZXMiLCIiXSxbInN0YXJ0cy13aXRoIiwiJENvbnRlbnQtRGlzcG9zaXRpb24iLCIiXSxbInN0YXJ0cy13aXRoIiwiJENvbnRlbnQtVHlwZSIsIiJdLFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1FbmNvZGluZyIsIiJdXX0=",
        Signature: "cWJB2unUYe1Ip2tA7f8RdrNBEY0=",
        KSSAccessKeyId: "AKLTcXGKGnyaSPSJ2qBryYGUvg",
        bucket: "sdy-sdtv"
      }
    };
  },
  methods: {}
};
</script>

<style lang="less">
</style>
