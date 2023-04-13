import { $navigateTo, $showModal } from "../../../src";
import Home from "../components/Home.vue";

export function goHome(depth = 0, modal = false) {
  if (modal) {
    return $showModal(Home, {
      props: {
        depth,
      },
    }).then((res) => {
      console.log("MODAL CLOSED", res);
    });
  }
  $navigateTo(Home, {
    // clearHistory: true,
    props: {
      depth,
    },
  });
}
