<template>
  <div class="demo">
    <h1>El Tooltip Demo</h1>
    <div class="demos">
      <el-tooltip placement="top" effect="light">
        <div class="tooltip-content">
          <span>✨</span> This is a tooltip message
        </div>
        <template #trigger>
          <button class="demo-button">Hover to see tooltip</button>
        </template>
      </el-tooltip>
      <el-tooltip placement="top" :show-arrow="true" effect="light">
        <div class="tooltip-content">
          <span>✨</span> This is a tooltip message
        </div>
        <template #trigger>
          <button class="demo-button">Show Arrow</button>
        </template>
      </el-tooltip>
      <el-tooltip placement="right" :show-arrow="true" effect="light">
        <div class="tooltip-content">
          <span>✨</span> This is a tooltip message
        </div>
        <template #trigger>
          <button class="demo-button">Placement:Right</button>
        </template>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTooltip } from 'el-popover';
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

.tooltip-content {
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
}

.tooltip-content span {
  margin-right: 6px;
}
</style>
