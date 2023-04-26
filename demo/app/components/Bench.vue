<script lang="ts">
export default {
  data() {
    return {
      startTime: -1,
      show: false,
      iter: 0,

      times: [] as number[],
    };
  },
  methods: {
    start() {
      this.iter++;
      this.show = true;
      this.startTime = new Date().getTime();
      console.log(`start ${this.iter}...`);
    },
    end() {
      const end = new Date().getTime();
      const diff = end - this.startTime;
      console.log(`Iter ${this.iter}: time: ${diff}ms`);
      this.times.push(diff);

      if (this.iter < 5) {
        setTimeout(() => {
          console.log("hide now");
          this.show = false;

          setTimeout(() => {
            console.log("and. start.");
            this.start();
          }, 5000);
        }, 2000);
      } else {
        const avg =
          this.times.reduce((total, current) => {
            total += current;
            return total;
          }, 0) / this.times.length;

        console.log(`Done. Iterations: ${this.iter} avg: ${avg}ms`);

        this.startTime = -1;
        this.show = false;
        this.iter = 0;
        this.times = [];
      }
    },
  },
};
</script>

<template>
  <Page>
    <GridLayout rows="auto, auto">
      <Button
        row="1"
        class="text-xl align-middle text-center text-gray-500"
        text="Toggle"
        @tap="start"
      />

      <template v-if="show">
        <Label
          v-for="i in 2000"
          :key="iter + 'item' + i"
          text="Hello World"
        />
        <Label @loaded="end" :key="iter + 'end'" text="End" />
      </template>
    </GridLayout>
  </Page>
</template>
