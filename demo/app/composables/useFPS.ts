import {
  addCallback,
  removeCallback,
  start,
  stop,
} from "@nativescript/core/fps-meter";
import { ref } from "nativescript-vue";

export function useFPS() {
  const fps = ref(60);

  const cid = addCallback((value) => {
    fps.value = Number(value.toFixed(0));
  });

  start();

  return {
    fps,
    stop() {
      removeCallback(cid);
      stop();
    },
  };
}
