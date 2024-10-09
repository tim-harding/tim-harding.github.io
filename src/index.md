<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<button @click="count++">Count is {{ count }}</button>
