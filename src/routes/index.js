import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import HomeRoute from './HomeRoute';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, HomeRoute]);
}
