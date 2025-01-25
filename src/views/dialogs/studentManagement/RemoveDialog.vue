<script lang="ts" setup=""></script>

<template>
  <div class="py-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <slot></slot>
      </template>

      <v-card prepend-icon="mdi-close-thick" title="حذف رکورد">
        <v-card-text>
          <div class="">آیا از حذف این رکورد مطمٔن هستید؟</div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.title-font {
  font-family: Vazir, sans-serif;
}
</style>
