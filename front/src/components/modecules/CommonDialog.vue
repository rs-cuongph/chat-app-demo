<template>
  <el-dialog class="custom-dialog" v-model="isVisible" :title="headerTitle" :show-close="false">
    <slot name="content" />
    <template #footer>
      <div class="flex justify-end mt-2 gap-4">
        <slot name="footer" />
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'CommonDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    headerTitle: {
      type: String,
      required: true
    },
  },
  setup(props, { emit }) {
    const isVisible = computed({
      get: () => props.visible,
      set: (value: boolean) => {
        emit('update:visible', value);
      }
    });

    return {
      isVisible
    };
  }
});
</script>

<style>
.flex {
  display: flex;
}
.custom-dialog .el-dialog__header{
  padding: 0px 24px 16px 24px;
  align-items: center !important;
  justify-content: center !important;
  display: flex !important;
}
.custom-dialog .el-dialog__header .el-dialog__title {
  font-weight: 700 !important;
}
</style>
