<template>
    <div>
        <Page ref="Pagination"
              :total="total"
              :current="page"
              :page-size="pageSize"
              :show-sizer="showSizer"
              :show-elevator="showElevator"
              :show-total="showTotal"
              :page-size-opts="pageSizeOpts"
              :placement="placement"
              :size="size"
              :prev-text="prevText"
              :next-text="nextText"
              @on-change="changePage1"
              @on-page-size-change="changePageSize2">
        </Page>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            total: {
                type: Number,
                default: 0
            },
            page: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizeOpts: {
                type: Array,
                default: [
                    10,
                    20,
                    30,
                    50,
                    100
                ]
            },
            showSizer: {
                type: Boolean,
                default: false
            },
            showElevator: {
                type: Boolean,
                default: false
            },
            showTotal: {
                type: Boolean,
                default: false
            },
            simple: {
                type: Boolean,
                default: false
            },
            placement: {
                type: String,
                default: 'bottom'
            },
            size: String,
            prevText: String,
            nextText: String,
        },
        methods: {
            changePage1(value) {
                this.$emit('change-page', value)
            },
            changePageSize2(value) {
                this.$emit('change-page-size', value)
            },
        }
    }
</script>

<style scoped>

</style>