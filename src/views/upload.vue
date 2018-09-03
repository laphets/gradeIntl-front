<template>
    <div class="container">
        <div>
            <el-card class="box-card">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="学年">
                        <el-input v-model="form.year"></el-input>
                    </el-form-item>
                    <el-form-item label="学期">
                        <el-select v-model="form.term" placeholder="请选择学期">
                        <el-option label="大一上" value="1"></el-option>
                        <el-option label="大一下" value="2"></el-option>
                        <el-option label="大二上" value="3"></el-option>
                        <el-option label="大二下" value="4"></el-option>
                        <el-option label="大三上" value="5"></el-option>
                        <el-option label="大三下" value="6"></el-option>
                        <el-option label="大四上" value="7"></el-option>
                        <el-option label="大四下" value="8"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Excel">
                        <input type="file" @change="addFile($event)">
                    </el-form-item>
                    <el-form-item label="密钥">
                        <el-input v-model="form.key"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即导入</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UploadPage extends Vue {
    form = {
        year: '',
        term: '',
        key: ''
    }
    file = null

    rules = {
        year: [
            { required: true, message: '请输入学年名称', trigger: 'blur' },
            // { type: 'number', message: '必须为数字值'}
        ],
        term: [
            { required: true, message: '请选择学期', trigger: 'blur' },
        ],
        key: [
            { required: true, message: '请输入密钥', trigger: 'blur' },
        ]
    }

    addFile(e: Event) {
        e.preventDefault()
        const file = (e.target as any).files[0] as any
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            this.$message({
                message: '请上传以.xlsx格式结尾的excel文件',
                type: 'warning'
            })
            return
        }
        this.file = file
    }

    onSubmit() {
        // console.log(this.$refs['form']);
        (this.$refs['form'] as any).validate((valid: boolean) => {
            console.log(valid);
            if (valid) {
                // alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 90%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
