<template>
  <Page class="center-box"
        v-if="paginate.total > paginate.perPage"
        :total="paginate.total"
        :current="paginate.page"
        :page-size="paginate.perPage"
        @on-change="$emit('change', $event)"></Page>
</template>

<script>
  export default {
    props: ['paginate']
  }
</script>
