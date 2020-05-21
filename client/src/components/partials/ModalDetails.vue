<template>
<div class="modal fade" v-show="value">
<div id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
      <button @click.prevent="close" class="mt-3 border-b border-teal font-semibold">
        Close
      </button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "ModalDetails",
  props: {
    value: {
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("input", !this.value);
    },
  },
};
</script>
