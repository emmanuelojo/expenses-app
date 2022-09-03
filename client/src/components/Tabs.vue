<template>
  <div class="tabs-component">
    <button
      :ref="setButtonRef"
      v-for="(tab, idx) in tabs"
      :key="tab + idx"
      @click="handleClick($event, tab)"
      :class="{ active: tab === modelValue }"
    >
      {{ tab }}
    </button>

    <span class="indicator" ref="indicator"></span>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  onBeforeUpdate,
  onMounted,
  PropType,
  Ref,
  ref,
} from "vue";

interface Props {
  tabs: string[];
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
});

const emit = defineEmits(["update:modelValue"]);

const indicator = ref() as Ref<HTMLSpanElement>;
const tabButtonsRefs = ref<HTMLButtonElement[]>([]);

const setButtonRef = (button: any) => {
  tabButtonsRefs.value.push(button);
};

onBeforeUpdate(() => {
  tabButtonsRefs.value = [];
});

onMounted(() => {
  const activeButton = tabButtonsRefs.value.find((button) =>
    button.classList.contains("active")
  );

  if (activeButton) {
    moveIndicator(activeButton);
  }
});

const moveIndicator = (button: HTMLButtonElement) => {
  const left = button.offsetLeft;
  const width = button.offsetWidth;
  indicator.value.style.left = `${left}px`;
  indicator.value.style.width = `${width}px`;
};

const handleClick = (e: Event, tab: string) => {
  const target = e.target as HTMLButtonElement;

  emit("update:modelValue", tab);
  moveIndicator(target);
};
</script>

<style scoped>
.tabs-component {
  position: relative;
}
.tabs-component button {
  padding: 10px;
  font-weight: 500;
  font-size: 15px;
  border: none;
  outline: none;
  background-color: transparent;
  position: relative;
  color: #585757;
  z-index: 2;
  transition: 0.5s ease;
  margin: 0 20px;
}
.tabs-component button.active {
  color: blue;
  outline: none;
}

.tabs-component button:hover {
  cursor: pointer;
}

.tabs-component span.indicator {
  position: absolute;
  margin-top: 40px;
  z-index: 0;
  background-color: blue;
  animation-duration: 700;
  height: 3px;
}
</style>
