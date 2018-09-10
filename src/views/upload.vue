<template>
    <div class="container">
        <div>
            <el-card class="box-card">
                <el-form ref="form" :model="fileform" :rules="rules" label-width="80px">
                    <el-form-item label="学年" prop="year">
                        <el-input v-model.number="fileform.year" placeholder="例如: 2017"></el-input>
                    </el-form-item>
                    <el-form-item label="学期" prop="term">
                        <el-select v-model="fileform.term" placeholder="请选择学期">
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
                    <el-form-item label="专业" prop="subject">
                        <el-select v-model="fileform.subject" placeholder="请选择专业">
                        <el-option label="ECE" value="ECE"></el-option>
                        <el-option label="EE" value="EE"></el-option>
                        <el-option label="ME" value="ME"></el-option>
                        <el-option label="CE" value="CE"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Excel">
                        <input type="file" @change="addFile($event)">
                    </el-form-item>
                    <el-form-item label="密钥" prop="key">
                        <el-input v-model="fileform.key"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()">立即导入</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import queryString from 'query-string'
import axios from 'axios'

@Component
export default class UploadPage extends Vue {
    fileform = {
        year: '',
        term: '',
        key: '',
        subject: ''
    }
    file = ''

    rules = {
        year: [
            { required: true, message: '请输入学年名称', trigger: 'blur' },
            { type: 'number', message: '必须为数字值'}
        ],
        term: [
            { required: true, message: '请选择学期', trigger: 'blur' },
        ],
        subject: [
            { required: true, message: '请选择专业', trigger: 'blur' },
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
            this.file = ''
            return
        }
        this.file = file
    }

    onSubmit() {
        // console.log((this.$refs['form'] as any).validate);
        (this.$refs['form'] as any).validate(async (valid: boolean) => {
            console.log(valid);
            if (valid) {
                if (this.file) {
                    const formData = new FormData()
                    formData.append('file', this.file)
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    const st = queryString.stringify(this.fileform)
                    try {
                        const { data } = await axios.post(`/api/v1/grade/excel?${st}`, formData, config)
                        if (data.code !== 0) {
                            throw data.data
                        }
                        this.$message({
                            message: '上传成功~',
                            type: 'success',
                        })
                    } catch (error) {
                        this.$message({
                            message: error,
                            type: 'error'
                        })
                    }
                } else {
                    this.$message({
                        message: '请选择有效的上传文件',
                        type: 'warning'
                    })
                    return false
                }
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
