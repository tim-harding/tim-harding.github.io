<script setup>
import { computed } from "vue";
const props = defineProps(["role", "institution", "location", "gpa", "when"]);
const when = computed(() =>
  typeof props.when === "number" ? props.when : props.when?.join("–"),
);
</script>

<template>
  <div class="experience">
    <h3 class="role">{{ props.role }}</h3>
    <dl class="definitions">
      <dt class="sr">Institution</dt>
      <dd class="institution">{{ props.institution }}</dd>

      <dt class="sr">When</dt>
      <dd class="when">
        <address>
          {{ when }}
        </address>
      </dd>

      <dt class="sr" v-if="location">Location</dt>
      <dd class="location" v-if="location">
        <address>
          {{ props.location }}
        </address>
      </dd>

      <dt class="sr" v-if="gpa">Grade point average</dt>
      <dd class="gpa" v-if="gpa">{{ props.gpa }}</dd>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
.experience {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content max-content;
  grid-template-areas: "role when" "institution detail";
}

.definitions {
  display: contents;
}

.role {
  grid-area: role;
  font-weight: 600;
}

.when {
  grid-area: when;
  text-align: end;
  font-family:
    Concourse Tab,
    Concourse,
    sans-serif;
}

.institution {
  grid-area: institution;
  text-transform: lowercase;
  font-family:
    Concourse Caps,
    Concourse,
    sans-serif;
}

.location,
.gpa {
  grid-area: detail;
  text-align: end;
}
</style>
