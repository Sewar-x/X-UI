<template>
  <Tinymce id="tinymcDemo" ref="editor" v-model="comments" height="100px" />
</template>

<script>
import Tinymce from "@/sewen-ui/element-ui/components/Tinymce";
export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      comments: null,
    };
  },
};
</script>
