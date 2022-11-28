import Products from "./pages/Products";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

interface IRoute { 
    key: string,
    title: string, 
    enabled: boolean, 
    path: string;
    component: React.ElementType; 
}

export const routes: Array<IRoute> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home,
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About,
    },
    {
        key: 'productItem-route',
        title: '',
        path:'/products/:productId',
        enabled: true,
        component: Products
    },
    {
        key: 'notFound-route',
        title: '',
        path: '*',
        enabled: true,
        component: NotFound
    }
]