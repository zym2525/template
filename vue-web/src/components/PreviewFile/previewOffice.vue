

<script>
  import { OfficeUrl } from "@/constants";
  export default {
    name: "PreviewOffice",
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
    render(h) {
      return (
        <div class="office-wrapper">
          <embed src={`${OfficeUrl}${this.fileUrl}`} class="previewBody"></embed>
        </div>
      );
    },
  };
</script>


<style lang="scss">
  @import "@/styles/mixins";
  .preview-office {
    &.el-message-box {
      width: 100%;
      max-width: 60%;
      min-width: 630px;
      padding-bottom: 0;

      .el-message-box__content {
        padding: 0;
        overflow: auto;
        @include common-scrollbar;
        .office-wrapper {
          height: 80vh;
          .previewBody {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>