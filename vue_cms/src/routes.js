import User from './components/user';
import Cate from './components/cate';
import News from './components/news';
import News_comment from './components/news_comment';
import Product from './components/product';
import Home from './components/Home.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/user', component: User },
    { path: '/news', component: News },
    { path: '/cate', component: Cate },
    { path: '/news_comment', component: News_comment },
    { path: '/product', component: Product }
]