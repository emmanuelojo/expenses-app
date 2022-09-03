<template>
  <div class="toast" :class="toast_type">
    <div class="toast-info">
      <i class="fa" :class="' ' + fontAwesomeIcon()"></i>

      <div className="toast__text">
        <p className="toast__title">{{ title }}</p>
        <p className="toast__message">{{ toast_desc }}</p>
      </div>
    </div>

    <i @click="closeModal" class="fa fa-times"></i>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, onMounted } from "vue";

interface Props {
  desc: string;
  toastType: string;
}

const props = withDefaults(defineProps<Props>(), {
  desc: "",
  toastType: "",
});

const emit = defineEmits(["closeModal"]);
onMounted(() => {
  setTimeout(() => {
    emit("closeModal");
  }, 5000);
});
// eslint-disable-next-line vue/no-setup-props-destructure
const toast_type = ref(props.toastType);
const toast_desc = ref(props.desc);

const title = computed(() => {
  let firstLetter = toast_type.value.charAt(0).toUpperCase();
  let otherLetters = toast_type.value.slice(1);

  return firstLetter + otherLetters;
});

function fontAwesomeIcon() {
  switch (toast_type.value) {
    case "success":
      return "fa-check";
    case "info":
      return "fa-info";
    case "warning":
      return "fa-exclamation";
    case "danger":
      return "fa-times";
  }
}

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
.toast {
  width: 300px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16);
}

.toast i:hover {
  cursor: pointer;
}

.toast.success {
  background: #47d764;
  color: #555555;
}
.toast.success i {
  color: #555555;
}

.toast.info {
  background: #2f86eb;
}

.toast.warning {
  background: #ffc021;
}

.toast.danger {
  background: rgb(247, 58, 58);
  color: #201616;
}
.toast.danger i {
  color: #201616;
}

.toast-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.toast-info i {
  margin: 0 8px;
  color: rgb(36, 35, 34);
  border: 1px solid rgb(36, 35, 34);
  border-radius: 50%;
  padding: 2px 3px;
  font-weight: 100;
}

.toast-info .toast__text {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}
.toast-info .toast__text p:first-child {
  font-weight: 600;
  margin: 1px 0;
}
.toast-info .toast__text p:last-child {
  font-weight: 100;
  font-size: 12px;
  margin: 1px 0;
}
</style>
