import { defineComponent, h, } from "vue";
import { useRoute } from "vitepress";

export default defineComponent({
  name: "PageContent",
  setup() {
    const route = useRoute();
    return () => h(route.component, {});
  },
});
