import App from '@/common/App';
import Home from '@/common/components/Home';
import Userlist from "@/common/components/Userlist";

export default [{
    ...App,
    routes: [
        {
            path: '/',
            component: Home,
            exact: true,
        },
        {
            ...Userlist,
            path: '/users',
        },
    ],
}];
