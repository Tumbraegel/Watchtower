 <template>
  <div>
    <label for="myRange1" style="margin-right:30px; color:#4d4d4d;">{{ reviewCriterion }}</label>
    <div>
      <span class="slider-color" style="margin-right: 7px;">1</span>
      <input
        @change="setConfirmButton"
        type="range"
        class="custom-range"
        min="1"
        max="10"
        step="0.5"
        style="width: 60%;"
        v-model="reviewResult"
      />
      <span class="slider-color" style="margin-left: 7px; margin-right: 25px;">10</span>
      <button
        v-if="showConfirmButton"
        @click="confirmSelection"
        class="btn btn-outline-dark btn-criteria-selection"
        style="margin-right: 10px;"
      >&#x2713;</button>
      <p>
        Result:
        <span class="slider-color">{{ reviewResult }}</span>
      </p>
    </div>
    <small>Take optional {{ reviewTest }}</small>
  </div>
</template>

<script>
export default {
name: "ModalReviewCriteria",
props: ['reviewCriterion'],
data() {
    return {
      reviewResult: 0,
      reviewTest: "",
      value: "",
      result: [],
      showConfirmButton: false,
    };
  },

  created() {
    this.setReviewTest(this.reviewCriterion);
  },

  methods: {
    setConfirmButton() {
        this.showConfirmButton = true;
    },

    confirmSelection() {
      const selectedCriterion = [];
      const criterion = {
        name: this.reviewCriterion,
        result: this.reviewResult,
      };

      this.result.push(this.reviewCriterion, this.reviewResult);
      this.showConfirmButton = false;

      selectedCriterion.push(criterion);
      this.$emit("addCriterion", selectedCriterion);
    },

    setReviewTest(value) {
      if (value == "Diversity") this.reviewTest = "Duvernay Test";
      if (value == "Queer Friendliness") this.reviewTest = "Russo Test";
      if (value == "Gender Equality") this.reviewTest = "Bechdel Test";
    },
  }
}
</script>

<style scoped>

</style>