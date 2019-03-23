<template>
    <ul class="tab-list" @click="changeTab">
        <li v-for="item in list" :class="{active: value === item}" :key="item">{{ item }}</li>
    </ul>
</template>

<script>
export default {
    name: "SecondLevelTabList",
    props: ["list", "value"],
    methods: {
        changeTab(e) {
            this.$emit("input", e.target.innerHTML);
        }
    }
};
</script>

<style scoped>
.tab-list {
    margin-left: 10px;
    border-bottom: 2px solid #0969c8;
    height: 25px;
    line-height: 25px;
    background: white;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
    color: #999999;
    font-size: 15px;
    margin-top: 10px;
}

li {
    display: inline-block;
    margin-right: 15px;
    cursor: pointer;
    color: #6f6f6f;
    font-size: 12px;
    padding: 2px 15px;
    height: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

li.active {
    color: white;
    cursor: pointer;
    font-weight: bold;
    background: #0969c8;
    border-bottom: 2px solid #0969c8;
}
</style>
