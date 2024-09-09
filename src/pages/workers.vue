<script setup>
import { convertDate } from "@/func/date";

import workerDialog from "@/components/dialog/worker-dialog.vue";
import workersTable from "@/components/table/workers-table.vue";
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Ishchilar ro'yxati</div>
    <div>
      <workerDialog />
    </div>
  </div>

  <workersTable />
</template>
