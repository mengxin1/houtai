<template>
    <div>
        <div>
            <Button type="info" style="margin-right:15px" @click="addMessage=true,handleReset('formValidate')" >添加信息</Button>
            <Modal
                v-model="addMessage"
                class-name="vertical-center-modal"
                >
                <p slot="header" style="text-align:center">
                    <span>信息操作</span>
                </p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入你的姓名" clearable></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input type="password" v-model="formValidate.password" placeholder="请输入密码" clearable></Input>
                    </FormItem>
                    <FormItem label="性别" prop="sex">
                        <RadioGroup v-model="formValidate.sex">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="年龄" prop="age">
                        <Input type="text" v-model="formValidate.age" placeholder="选择你的年龄" number clearable></Input>
                    </FormItem>
                    <FormItem label="专业" prop="subject">
                        <Select v-model="formValidate.subject" placeholder="选择你的专业">
                            <Option value="软件工程">软件工程</Option>
                            <Option value="电子信息工程">电子信息工程</Option>
                            <Option value="应用电子技术">应用电子技术</Option>
                            <Option value="电子与信息技术">电子与信息技术</Option>
                            <Option value="电子商务">电子商务</Option>
                            <Option value="计算机网络与通讯">计算机网络与通讯</Option>
                            <Option value="计算机软件技术">计算机软件技术</Option>
                            <Option value="网络工程技术">网络工程技术</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="邮箱" prop="email" required>
                        <Input v-model="formValidate.email" placeholder="请输入你的邮箱" clearable></Input>
                    </FormItem>
                    <FormItem label="手机号码" prop="telphone">
                        <Input v-model="formValidate.telphone" placeholder="请输入手机号码" clearable></Input>
                    </FormItem>
                    <FormItem label="爱好" prop="hobit">
                        <Input v-model="formValidate.hobit" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="你的爱好是？"></Input>
                    </FormItem>
                </Form>
                <div slot="footer" style="text-align:center">
                    <Button type="primary" @click="handleSubmit('formValidate')" :loading="modal_loading">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 18px">重置</Button>
                </div>
            </Modal>
            <Button type="warning" @click="deleteDates">删除数据</Button>
        </div>
        <br>
        <Table border :columns="columns" :data="list" @on-selection-change="selectdDates"></Table>
        <br>
        <div>
            <Page :total="total" show-elevator @on-change="onChangePage"/>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入一个数字'));
                    } else {
                        callback();
                    }
                }, 500);
            };
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width:100,
                        align:'center',
                        sortable: true,
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '密码',
                        width:100,
                        align:'left',
                        key: 'password'
                    },
                    {
                        title: '性别',
                        width:80,
                        align:'center',
                        key: 'sex'
                    },
                    {
                        title: '年龄',
                        width:80,
                        align:'center',
                        sortable: true,
                        key: 'age'
                    },
                    {
                        title: '专业',
                        width:120,
                        align:'center',
                        key: 'subject'
                    },
                    {
                        title: '邮箱',
                        width:150,
                        key: 'email'
                    },
                    {
                        title: '手机号码',
                        width:120,
                        align:'center',
                        key: 'telphone'
                    },
                    {
                        title: '爱好',
                        align:'center',
                        tooltip:true,
                        key: 'hobit'
                    },
                    {
                        title: '注册时间',
                        width:150,
                        align:'center',
                        sortable: true,
                        key: 'registerTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 160,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            //this.show(params.index)
                                            this.show(params.row._id);
                                            this.id=params.row._id;
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row._id);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                // 添加信息
                formValidate: {
                    name: '',
                    password:'',
                    sex: '',
                    age:'',
                    subject:'',
                    email: '',
                    telphone:'',
                    hobit:'',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    password:[
                        { required:true,message: '密码不能为空', trigger: 'blur'},
                        { type:'string',pattern:/^[A-z0-9_-]+$/,message:'密码格式错误，只能为数字、字母、下划线组合',trigger: 'blur'},
                        { min:6,max:18,message:'密码长度必须为6-18位',trigger: 'blur'}
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    age:[
                        {required: true, validator: validateAge, trigger: 'change'}
                    ],
                    subject: [
                        { required: true, message: '请选择专业', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
                    ],
                    telphone:[
                        { required: true, message: '手机号码不能为空', trigger: 'blur' },
                        { min: 11, max:11,message: '手机号码必须为11位数字', trigger: 'blur' },
                        { type: 'string',pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,message: '请输入正确的手机',trigger: 'blur'}
                    ],
                    hobit: [
                        { required: true, message: '爱好不能为空哦', trigger: 'blur' },
                        { type: 'string', min: 4, message: '爱好不能少于4个字', trigger: 'blur' }
                    ]
                },
                list:[],
                rows: 10,
                total:0,
                page:1,
                addMessage: false,
                modal_loading: false,
                id:'',
                selection:[],
            }
        },
        methods: {
            getlist(){
                this.axios({
                    url:'http://localhost:3000/users/list',
                    method:'post',
                    data:{
                        rows:this.rows,
                        page:this.page
                    }
                }).then(res=>{
                    this.list=res.data.rows;
                    this.total=res.data.total;
                });
            },
            onChangePage(page){
                this.page=page;
                this.getlist();
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        setTimeout(() => {
                            // this.modal_loading = false;
                            // this.addMessage = false;
                            // this.$Message.success('提交成功!');
                            if(this.id==''){
                                this.axios({
                                    url:"http://localhost:3000/users",
                                    method:"post",
                                    data:this.formValidate
                                }).then(()=>{
                                    this.modal_loading = false;
                                    this.addMessage = false;
                                    this.$Message.success('提交成功!');
                                    this.getlist();
                                    this.$refs[name].resetFields();
                                });
                            }else{
                                this.axios({
                                    url:`http://localhost:3000/users/${this.id}`,
                                    method:'put',
                                    data:this.formValidate
                                }).then(()=>{
                                    this.modal_loading = false;
                                    this.addMessage = false;
                                    this.$Message.success('修改成功!');
                                    this.getlist();
                                });
                            }            
                        }, 1000);
                    } else {
                        if(this.id==''){
                            this.$Message.error('提交失败，请检查后重新提交!');
                        }else{
                            this.$Message.error('修改失败，请检查后重新提交!');
                        }  
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            show (row) {
                this.addMessage=true;
                this.axios({
                    url:`http://localhost:3000/users/${row}`,
                    method:'get'
                }).then(res=>{
                    this.formValidate=res.data;
                });
            },
            remove (id) {
                this.$Modal.confirm({
                    title: '确认删除？',
                    content: '<p>你确定删除该条数据？</p>',
                    onOk: () => {
                        this.$Message.info('删除成功');
                        //this.list.splice(index,1);
                        this.deleteDate(id);
                    },
                    onCancel: () => {
                        this.$Message.info('删除取消');
                    }
                });
            },
            selectdDates(val){
                this.selection=val;
            },
            deleteDates(){
                this.$Modal.confirm({
                    title: '确认删除？',
                    content: '<p>你确定删除这些数据？</p>',
                    onOk: () => {
                        var arr=this.selection;
                        this.$Message.info('删除成功');
                        for(var i=0;i<arr.length;i++){
                            this.deleteDate(arr[i]._id);
                        } 
                    },
                    onCancel: () => {
                        this.$Message.info('删除取消');
                    }
                });
            },
            deleteDate(id){
                this.axios({
                    url:`http://localhost:3000/users/${id}`,
                    method:'delete'
                }).then(res=>{
                    this.getlist();
                });
            }
        },
        mounted() {
            this.getlist();
        }
    }
</script>
<style lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>