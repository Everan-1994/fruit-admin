<template>
    <Card>
        <Tables ref="tables"
                v-model="adminList"
               :loading="loading"
               :columns="columns"
               :stripe="stripe">
        </Tables>
        <div class="page">
            <div class="fl">
                <Pagination
                        ref="page"
                        :total="total"
                        :current="page"
                        :page-size="pageSize"
                        :page-size-opts="pageSizeOpts"
                        :show-sizer="showSizer"
                        :show-elevator="showElevator"
                        :show-total="showTotal"
                        @change-page="changePage"
                        @change-page-size="changePageSize"
                >
                </Pagination>
            </div>
        </div>
    </Card>
</template>

<script>
    import Tables from '_c/tables'
    import Pagination from '_c/pages'

    export default {
        name: "admins",
        components: {
            Tables,
            Pagination
        },
        data() {
            return {
                total: 5,
                page: 1,
                pageSize: 1,
                pageSizeOpts: [1, 2, 3, 4, 5],
                showTotal: true,
                showElevator: true,
                showSizer: true,
                loading: false,
                stripe: true,
                adminList: [
                    {
                        sort: 1,
                        value: 3
                    },
                    {
                        sort: 2,
                        value: 3
                    },
                    {
                        sort: 2,
                        value: 3
                    },
                    {
                        sort: 2,
                        value: 3
                    },
                    {
                        sort: 2,
                        value: 3
                    }
                ],
                columns: [
                    {
                        title: '排序',
                        key: 'sort',
                    },
                    {
                        title: '值',
                        key: 'value',
                    },
                ]
            }
        },
        methods: {
            changePage(value) {
                console.log(value)
            },
            changePageSize(value) {

            }
        }
    }
</script>

<style scoped>
    .page {
        margin: 10px;
        padding-bottom: 1px;
        overflow: hidden;
    }

    .fl {
        float: right;
    }
</style>