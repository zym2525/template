let userSync = {
    async storageTest(params) {
        if (params == null) return;
        let { id, syncParams } = params;
        try {
            let r = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(4);
                }, 2000)
            })
            await storage.save({
                key: "storageTest",
                id: `1`,
                data: r,
            });
            return r;
        } catch (error) {
            throw new Error(`error syncing storage_test`);
        }
    }
}

export default userSync;