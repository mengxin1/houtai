<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-home"></Icon>
                            <router-link to="/">首页</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="md-settings"></Icon>
                            <router-link to>设置</router-link>
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="md-help-circle"></Icon>
                            <router-link to>帮助</router-link>
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="md-alert"></Icon>
                            <router-link to>关于</router-link>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content>
              <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-contact"></Icon>
                                <router-link to="/user">用户管理</router-link>
                            </template>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="md-funnel"></Icon>
                                <router-link to="/cate">分类管理</router-link>                 
                            </template>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                                <router-link to="/news">新闻管理</router-link>
                            </template>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="md-aperture"></Icon>
                                <router-link to="/product">产品管理</router-link>
                            </template>
                        </Submenu>
                        <Submenu name="5">
                            <template slot="title">
                                <Icon type="md-brush"></Icon>
                                <router-link to="/news_comment">新闻评论</router-link>
                            </template>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem to="/">首页</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
              </Layout>
            </Content>
            <Footer class="layout-footer-center">2017-2018 &copy; JLJHP</Footer>
        </Layout>
    </div>
</template>

<script>
export default {
    
}
</script>
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
    background: #515a6e;
    color: rgba(255,255,255,.7);
}
</style>
