<template>
  <teleport to="#toast">
    <div class="notification-container top-right">
      <transition name="slide" appear>
        <div class="modal">
          <div class="modal-content">
            <div class="modal-content__body">
              <slot></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted, PropType } from "vue";

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
.slide-enter-from {
  opacity: 0;
  transform: translateX(600px);
}

.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter-active {
  transition: all 1s ease;
}
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(600px);
}

.slide-leave-active {
  transition: all 1s ease;
}

.modal {
  position: fixed;
  height: 100px;
  top: 0;
  right: 10px;
  display: grid;
  justify-content: center;
  align-items: center;
  opacity: 50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  z-index: 30;
}
.modal-content {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  max-height: 100px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  justify-content: center;
}
.modal-content div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-content div p {
  font-weight: 500;
  color: #1c1c1c;
}
.modal-content div p i {
  font-size: 20px;
  color: rgb(78, 74, 74);
}
.modal-content div p i:hover {
  cursor: pointer;
}

.modal-content__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 480px) {
  .modal-content {
    width: 250px;
  }
}
</style>
