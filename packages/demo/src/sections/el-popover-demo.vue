<template>
  <div class="demo">
    <h1>El Popover Demo</h1>
    <div class="demos">
      <el-popover placement="top" effect="light">
        <div class="popover-content">This is popover content</div>
        <template #reference>
          <button class="demo-button">Hover to see popover</button>
        </template>
      </el-popover>

      <el-popover placement="top" effect="light" trigger="click">
        <div class="popover-content">This is popover content</div>
        <template #reference>
          <button class="demo-button">Click to see popover</button>
        </template>
      </el-popover>

      <el-popover placement="top" :show-arrow="false" effect="light">
        <div class="popover-content">This is popover content</div>
        <template #reference>
          <button class="demo-button">Hide Arrow</button>
        </template>
      </el-popover>

      <el-popover placement="right" effect="light">
        <div class="popover-content">This is popover content</div>
        <template #reference>
          <button class="demo-button">Placement:Right</button>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElPopover } from '@hekeh/el-popover';
</script>

<style scoped>
.demos {
  display: flex;
  flex-direction: row;
  column-gap: 20px;
}
.demo-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background: #409eff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.demo-button:hover {
  background: #66b1ff;
}

.popover-content {
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
}

.popover-content span {
  margin-right: 6px;
}
</style>
