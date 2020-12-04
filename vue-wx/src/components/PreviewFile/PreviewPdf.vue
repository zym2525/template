

<script>
  // 引入刚才下载的 pdf
  import pdf from "vue-pdf";

  export default {
    name: "PreviewPdf",
    components: {
      pdf,
    },
    data() {
      return {
        currentPage: 0,
        pageCount: [],
        src: pdf.createLoadingTask(this.fileUrl),
      };
    },
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
    mounted() {
      this.src.promise.then((pdf) => {
        let list = [];
        for (let i = 0; i < pdf.numPages; i++) {
          list.push(i + 1);
        }
        this.pageCount = list;
      });
    },
    render(h) {
      return (
        <div class="pdf-wrapper">
          {this.pageCount.map((page) => (
            <pdf src={this.fileUrl} page={page} key={page}></pdf>
          ))}
        </div>
      );
    },
    methods: {
      numPages($event) {
        this.pageCount = $event;
      },
      pageLoaded($event) {
        this.currentPage = $event;
      },
    },
  };
</script>

<style lang="scss">
  @import "@/styles/mixins";
  .preview-pdf {
    &.el-message-box {
      width: 60%;
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