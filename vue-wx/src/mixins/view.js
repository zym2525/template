
export default {
    methods: {
        isActive(route) {
            return route.path === this.$route.path;
        },
        closeView(view, isBack = false) {
            this.$store.dispatch("views/delView", view).then(({ visitedViews }) => {

                if (isBack) {
                    //console.log(this.$route, this.$router.history.name)
                    this.$router.go(-1);
                    return
                }
                if (this.isActive(view)) {
                    this.toLastView(visitedViews, view);
                }

            });
        },
        toLastView(visitedViews, view) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
                this.$router.push(latestView.fullPath);
            } else {
                this.$router.push("/");
            }
        },
    }
};