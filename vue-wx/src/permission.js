import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getXSRFToken } from '@/utils/storage' // get token from cookie
import { setPageTitle } from '@/utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/', '/login', '/about'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    console.log('to: ', to);
    // start progress bar
    NProgress.start()


    // if (from.matched.length === 0) {
    //   console.log(from,to)
    //   // router.go(-1)
    // }

    // set page title
    setPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken();
    const XSRFToken = getXSRFToken()
    console.log('hasToken: ', hasToken);

    if (hasToken && XSRFToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            const modules = store.getters.permission_routes
            if (modules.length !== 0) {
                next()
            } else {
                try {
                    // generate accessible routes map based on roles
                    // const accessRoutes = await store.dispatch('permission/getModuleList')

                    // // dynamically add accessible routes
                    // router.addRoutes(accessRoutes)

                    next({ ...to, replace: true })
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    // Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/
        console.log(whiteList.indexOf(to.path), to.path);
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
