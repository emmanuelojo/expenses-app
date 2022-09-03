<template>
  <teleport to="#modal">
    <div class="modal">
      <div class="modal-content" :class="`max-w-${size}`">
        <div class="" :class="[title ? 'justify-between' : 'justify-end']">
          <h2 style="color: '#1c1c1c" v-if="title">
            {{ title }}
          </h2>

          <i @click="closeModal" class="fa fa-times"></i>
        </div>
        <div class="modal-content__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted, PropType } from "vue";

interface Props {
  size: string;
  title: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  title: "",
});

const emit = defineEmits(["closeModal"]);

onMounted(() => {
  document.body.style.maxHeight = "100vh";
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0c205d;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  z-index: 10;
}
.modal-content {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 400px;
  max-height: 90vh;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  display: inline-block;
  margin: 1rem;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16);
  justify-content: center;
  overflow: auto;
}

.modal-content div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-content div h2 {
  font-weight: 500;
  color: #1c1c1c;
}
.modal-content div i {
  font-size: 20px;
  color: rgb(78, 74, 74);
}
.modal-content div i:hover {
  cursor: pointer;
}

.modal-content__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin-top: 20px;
  overflow: auto;
}

@media screen and (max-width: 480px) {
  .modal-content {
    width: 90vw;
  }
}
</style>
