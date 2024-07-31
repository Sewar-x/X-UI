<template>
  <!-- `checked` 为 true 或 false -->
  <el-checkbox v-model="checked" @change="showLabel(checked)"></el-checkbox>
</template>

<script>
export default {
  name: 'Checkbox',
  data() {
    return {
      checked: this.initChecked
    }
  },
  props: {
    initChecked: {
      type: Boolean,
      default: true,
    }
  },
  computed: {},
  created() { },
  methods: {
    showLabel(checked) {
      this.$emit('setShowLabel',checked)
    }
  }
}
</script>
