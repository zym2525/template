

<script>
  import { ossFileUrl } from "@/constants";

  export default {
    name: "PreviewImage",
    props: {
      fileUrl: {
        type: String,
        default: "",
      },
      extension: {
        type: String,
        default: "",
      },
    },
    computed: {
      fixedFileUrl() {
        return this.fileUrl.startsWith(ossFileUrl)
          ? this.fileUrl
          : ossFileUrl + "/" + this.fileUrl;
      },
    },
    render(h) {
      return (
        <div class="image-wrapper">
          <img width="100%" src={this.fixedFileUrl} />
        </div>
      );
    },
  };
</script>

<style lang="scss">
  @import "@/styles/mixins";
  .preview-image {
    &.el-message-box {
      width: auto;
      max-width: 60%;
      min-width: 300px;
      .el-message-box__content {
        max-height: 80vh;
        overflow: auto;
        @include common-scrollbar;
      }
    }
  }
</style>