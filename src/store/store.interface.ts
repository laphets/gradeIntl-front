/*
 * @Author: Laphets 
 * @Date: 2018-07-13 14:05:10 
 * @Last Modified by:   Laphets 
 * @Last Modified time: 2018-07-13 14:05:10 
 */

import { ModuleTree, GetterTree, Module, Getter } from 'vuex';

export interface Entity<T> {
    user: T;
    [propName: string]: any;
}

export interface ModuleEntity extends Entity<Module<any, any>>, ModuleTree<any> {
}

export interface GetterEntity extends Entity<Getter<any, any>>, GetterTree<any, any> {

}

// TODO: Add comprehensive getter interface for index
export interface MyGetterTree<S, R> extends GetterTree<S, R> {
    [propName: string]: Getter<S, R>
}
