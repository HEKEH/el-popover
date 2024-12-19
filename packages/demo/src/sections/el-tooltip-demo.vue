<script setup lang="ts">
import { ElTooltip } from '@hekeh/el-popover';
</script>

<template>
  <div class="demo">
    <h1>El Tooltip Demo</h1>
    <div class="demos">
      <ElTooltip placement="top" effect="light">
        <template #content>
          <div class="tooltip-content">
            <span>✨</span> This is a tooltip message
          </div>
        </template>
        <button class="demo-button">Hover to see tooltip</button>
      </ElTooltip>
      <ElTooltip placement="top" effect="dark">
        <template #content>
          <div class="tooltip-content">
            <span>✨</span> This is a tooltip message
          </div>
        </template>
        <button class="demo-button">Dark Effect</button>
      </ElTooltip>
      <ElTooltip placement="top" effect="light" trigger="click">
        <template #content>
          <div class="tooltip-content">
            <span>✨</span> This is a tooltip message
          </div>
        </template>
        <button class="demo-button">Click to see tooltip</button>
      </ElTooltip>
      <ElTooltip placement="top" :show-arrow="false" effect="light">
        <template #content>
          <div class="tooltip-content">
            <span>✨</span> This is a tooltip message
          </div>
        </template>
        <button class="demo-button">Hide Arrow</button>
      </ElTooltip>
      <ElTooltip placement="right" effect="light">
        <template #content>
          <div class="tooltip-content">
            <span>✨</span> This is a tooltip message
          </div>
        </template>
        <button class="demo-button">Placement:Right</button>
      </ElTooltip>
    </div>
  </div>
</template>

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
