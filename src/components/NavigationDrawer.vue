<script lang="ts" setup="">
import { ref } from "vue";
import links from "@/routes/mainLinks";

const isDrawerOpen = defineModel<boolean>();
const allLinks = ref(links);
</script>

<template>
  <div>
    <v-navigation-drawer :model-value="isDrawerOpen">
      <v-layout>
        <div class="flex flex-col flex-grow-1">
          <v-list-item
            v-for="link in allLinks"
            :key="link.path"
            :to="link.path"
          >
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<style scoped></style>
