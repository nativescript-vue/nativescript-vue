<template functional>
    <GridLayout rows="60, auto, 40">
        <Label row="0"
               textAlignment="center"
               :text="props.item.type"/>

        <!-- Content -->
        <ContentView row="1">
            <slot>
                <Label textWrap :text="props.item.body" class="content"/>
            </slot>
        </ContentView>

        <GridLayout columns="*, *" row="2">
            <Button @tap="() => listeners.toggleLike()"
                    :text="props.item.liked ? ' Unlike' : ' Like'"
                    :color="props.item.liked ? 'blue' : 'black'"
                    col="0" row="1"/>
            <Button text="Blah"
                    col="1" row="1"/>
        </GridLayout>
    </GridLayout>
</template>

<script>
  export default {
    functional: true,
    props: {
      item: {
        type: Object,
        required: true
      },
    }
  }
</script>
