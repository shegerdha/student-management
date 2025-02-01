<script lang="ts" setup="">
import { ref } from "vue";
import links from "@/routes/mainLinks";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";

const isDrawerOpen = defineModel<boolean>();
const allLinks = ref(links);
</script>

<template>
  <div>
    <v-navigation-drawer v-model="isDrawerOpen" expand-on-hover rail>
      <v-layout>
        <div class="flex flex-col flex-grow-1">
          <v-list-item
            v-for="link in allLinks"
            :key="link.path"
            :to="link.path"
          >
            <template v-slot:prepend>
              <v-icon v-if="typeof link.icon === 'string'"
                >{{ link.icon }}
              </v-icon>
            </template>
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<style scoped></style>
