<template>
    <div class="outer-container">
        <div class="container">
            <header>
                <div class="title">
                    <h1>{{name}}同学成绩报告单</h1>
                </div>
            </header>
            <main>
                <div v-for="(item, index) in gradeList" :key="index" class="card-container">
                    <div class="title">
                        {{item.year}}学年  {{termMap(item.term)}}学期
                    </div>
                    <div class="body-container">
                        <div>
                            <div class="gpa">
                                学期GPA: <span class="number">{{item.cur_gpa}}</span>
                            </div>
                            <div class="rank">
                                排名: <span class="number">{{item.rank}}</span>
                            </div>
                        </div>
                        <div>
                            <div class="gpa">
                                统计GPA: <span class="number">{{item.total_gpa}}</span>
                            </div>
                            <div class="rank">
                                排名: <span class="number">{{item.rank}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div>
                如有问题请及时与我们(<a style="color: #9A9A9A" href="mailto:tech@zjuqsc.com">tech@zjuqsc.com</a>)联系
                </div>
                <p>©浙江大学求是潮 All rights reserved</p>
                <p>
                <a style="color: #64ACF9" href="https://www.qsc.zju.edu.cn" target="_blank">求是潮网站</a>
                </p>
            </footer>
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getGrade } from '@/api/grade'
import { Getter } from 'vuex-class'

@Component
export default class IndexPage extends Vue {
    @Getter('ZJUid') ZJUid!: string;
    @Getter('name') name!: string;

    gradeList = []
    async created() {
        const { data } = await getGrade()
        this.gradeList = data.data
    }

    termMap(code: number) {
        switch (code) {
            case 1:
                return '大一上'
            case 2:
                return '大一下'
            case 3:
                return '大二上'
            case 4:
                return '大二下'
            case 5:
                return '大三上'
            case 6:
                return '大三下'
            case 7:
                return '大四上'
            case 8:
                return '大四下'
        }
    }
}
</script>
 
<style lang="less" scoped>
.container {
    width: 90%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    header {
        flex-grow: 1;
        display: flex;
        background-color: #FFFFFF;
        box-shadow: #9a9a9a 0 0 20px 1px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0px;
        h1 {
            font-weight: 400 !important;
        }
    }
    main {
        .card-container {
            background-color: #FFFFFF;
            box-shadow: #9a9a9a 0 0 20px 1px;
            border-radius: 5px;
            margin-top: 20px;
            padding: 20px;
            .title {
                font-size: 22px;
            }
            .body-container {
                height: 120px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                font-size: 20px;
                font-weight: 300;
                .gpa {
                    display: inline-block;
                    margin-right: 30px;
                }
                .rank {
                    display: inline-block;
                }
                .number {
                    font-weight: 400;
                    font-size: 23px;
                }
            }
        }
    }
    footer {
        p {
            margin: 0px;
        }
        text-align: center;
        width: 100%;
        color: #9A9A9A;
        margin-top: 40px;
        margin-bottom: 40px;
        font-size: 13px;
        letter-spacing: 1px;
        line-height: 22px;
    }
}
.outer-container:before {
    content: " ";
    display: block;
    background-color: #4a4a4e;
    width: 100%;
    height: 25px;
    position: relative;
    z-index: 1;
}
.outer-container {
    background-color: #c9c9c9!important;
    margin: 0;
    height: 100vh;
    overflow: auto;
}
</style>
