import router from '@/router';
import db from '@/utils/db';
import store from '@/store';

const whiteList = ['/login', '/upload', '/404']

const HOST = process.env.VUE_APP_HOST as string

router.beforeEach(async (to, from, next) => {
    console.log('111')
    if (store.getters.ZJUid) {
        next()
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
            return
        }
        if (db.token.get()) {
            try {
                await store.dispatch('GetUserInfo')
                next()
            } catch (error) {
                store.dispatch('Logout')
                window.location.href = `https://passport.zjuqsc.com/login?type=new&redirect=${HOST}${to.fullPath}`
            }
        } else {
            try {
                await store.dispatch('Login')
                const res = await store.dispatch('GetUserInfo')
                // alert(res.ZJUid)
                next()
            } catch (error) {
                // alert(error)
                // if (error.data.code === 10006) {
                // window.location.href = `https://passport.zjuqsc.com/logout`
                // } else {
                window.location.href = `https://passport.zjuqsc.com/login?type=new&redirect=${HOST}${to.fullPath}`
                // }
            }
        }
    }
})
