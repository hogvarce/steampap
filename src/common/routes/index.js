import App from '@/common/App';
import Home from '@/common/components/Home';
import Game from "@/common/components/Game";
import ErrorPage from '@/common/components/ErrorPage';

export default [{
    ...App,
    routes: [
        {
            path: '/',
            component: Home,
            exact: true,
        },
        {
            ...ErrorPage,
            path: '*',
        },
    ],
}];
