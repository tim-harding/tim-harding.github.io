<script setup>
import { computed } from "vue";
const props = defineProps(["role", "institution", "location", "gpa", "when"]);
const when = computed(() =>
  typeof props.when === "number" ? props.when : props.when?.join("–"),
);
</script>

<template>
  <div :class="s.experience">
    <h3 :class="s.role">{{ props.role }}</h3>
    <dl :class="s.definitions">
      <dt class="sr">Institution</dt>
      <dd :class="s.institution">{{ props.institution }}</dd>

      <dt class="sr">When</dt>
      <dd :class="s.when">
        <address>
          {{ when }}
        </address>
      </dd>

      <dt class="sr" v-if="location">Location</dt>
      <dd :class="s.location" v-if="location">
        <address>
          {{ props.location }}
        </address>
      </dd>

      <dt class="sr" v-if="gpa">Grade point average</dt>
      <dd :class="s.gpa" v-if="gpa">{{ props.gpa }} GPA</dd>
    </dl>
  </div>
</template>

<style module="s">
.experience {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content max-content;
  grid-template-areas: "role when" "institution detail";
  line-height: 1.25;
  margin: 1rem 0rem 1rem 0rem;
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
  font-variant-numeric: tabular-nums;
}

.institution {
  grid-area: institution;
  font-variant-caps: all-small-caps;
  font-weight: 400;
}

.location,
.gpa {
  grid-area: detail;
  text-align: end;
}

.gpa {
  font-variant-numeric: tabular-nums;
}
</style>
