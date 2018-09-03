import { Store, Module, Mutation, MutationTree, ActionTree } from 'vuex';
import { UserState } from '@/store/modules/interfaces/user.interface';
import db from '@/utils/db';
import { login, getUserInfo } from '@/api/user';

export default {
    state: {
        ZJUid: '',
        name: '',
        token: db.token.get()
    },
    mutations: {
        SET_ZJUID: (state, ZJUid) => {
            state.ZJUid = ZJUid
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_TOKEN: (state, token) => {
            state.token = token
            db.token.set(token)
        },
    },
    actions: {
        async Login({ commit }): Promise<any> {
            try {
                const { data } = await login()
                console.log(data)
                commit('SET_TOKEN', `Bearer ${data.data}`)
                return
            } catch (error) {
                return Promise.reject(error)
            }
        },
        Logout({ commit }) {
            commit('SET_TOKEN', '')
            db.token.remove()
        },
        async GetUserInfo({ commit, state }) {
            try {
                const { ZJUid, name } = ((await getUserInfo()).data).data
                commit('SET_ZJUID', ZJUid)
                commit('SET_NAME', name)
                return { ZJUid, name }
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
} as Module<UserState, any>
