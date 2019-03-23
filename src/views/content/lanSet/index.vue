<template>
    <div class="config-wrapper">
        <second-level-tab-list
            class="tab"
            v-model="SecondLevelTabActive"
            :list="SecondLevelTabList"
        ></second-level-tab-list>
        <div class="content">
            <vlan-config></vlan-config>
        </div>
    </div>
</template>

<script>
import innerConfig from "./children/innerConfig.vue";
import vlanConfig from "./children/vlanConfig.vue";

export default {
    data() {
        return {
            SecondLevelTabList: ["LAN口配置"],
            SecondLevelTabActive: "LAN口配置"
        };
    },

    components: {
        innerConfig,
        vlanConfig
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.config-wrapper {
    display: flex;
    flex-flow: nowrap column;
    height: 100%;
}

.content {
    flex: 1;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
    background: white;
    padding: 10px 10px;
}
</style>
