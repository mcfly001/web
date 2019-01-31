<template>
    <ul class="tab-list" @click="changeTab">
      <li
        v-for="item in list"
        :class="{active: value === item}"
        :key="item"
      >{{ item }}</li>
    </ul>
</template>

<script>
export default {
  name: 'SecondLevelTabList',
  props: ['list', 'value'],
  methods: {
    changeTab(e) {
      this.$emit('input', e.target.innerHTML)
    }
  }
}
</script>

<style scoped>
 .tab-list{
   margin: 10px 20px 15px;
   height: 40px;
   line-height: 40px;
   background: white;
   box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
   padding: 0 20px;
   color: #999999;
   font-size: 15px;
 }

 li{
   display: inline-block;
   padding: 0 10px;
   cursor: pointer;
 }

 li.active{
   color: rgb(64, 158, 255);
   cursor: pointer;
   font-weight: bold;
   border-bottom: 2px solid rgb(64, 158, 255);
 }
</style>
