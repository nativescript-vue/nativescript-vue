    <template>
        <page ref="page">
            <action-bar :title="pageTitle"></action-bar>      
            
            <stack-layout>
             <stack-layout orientation="horizontal" horizontalAlignment="center" class="m-b-5">

                <button @tap="changeRoute('/')" class="m-10">Default</button>
                <label>  &dash;  </label>
                <button @tap="changeRoute('/tab-view')" class="m-10">TabView</button>
                <label>  &dash;  </label>
                <button @tap="changeRoute('/v-model')" class="m-10">VModel</button>
                <label>  &dash;  </label>
                <button @tap="changeRoute('/list-view')" class="m-10">ListView</button>
            </stack-layout>
            <router-view></router-view>
        </stack-layout>
    </page>
</template>
<script type="text/javascript">
    export default{

        data() { return {
            pageTitle: 'Current route: /'
        }
    },
    created(){
        this.$router.replace('/')
    },
    methods: {
        changeRoute(to) {
            this.pageTitle = 'Current route: ' + to
            this.$router.replace(to)
        }
    }

}
</script>
<style>
    @import 'nativescript-theme-core/css/core.light.css';

    /* Your CSS goes here */

</style>