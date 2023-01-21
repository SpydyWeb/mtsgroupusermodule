import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const ViewTableCombine = Loadable(lazy(() => import('views/vendorcustomermodule/ViewTableCombine')));
const ViewTableMaster = Loadable(lazy(() => import('views/vendorusermaster/ViewTable')));
const UserRegView = Loadable(lazy(() => import('views/vendorusermaster/UserRegView')));
const ViewTabs = Loadable(lazy(() => import('views/Vendor/ViewTabs')));
const Vendorproduct = Loadable(lazy(() => import('views/vendorusermaster/VendorProduct/ViewVendorProduct')));
const AddVendorproduct = Loadable(lazy(() => import('views/vendorusermaster/VendorProduct/AddVendorProduct')));
const Accessrole = Loadable(lazy(() => import('views/vendorusermaster/AccessRole')));
const Viewaccessrole = Loadable(lazy(() => import('views/vendorusermaster/ViewAccessRole')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: 'admin',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'customer',
            element: <ViewTabs />
        },
        {
            path: 'viewvendor',
            element: <ViewTabs />
        },
        {
            path: 'licencetype',
            element: <ViewTableMaster />
        },
        {
            path: 'communicationtype',
            element: <ViewTableMaster />
        },
        {
            path: 'state',
            element: <ViewTableMaster />
        },
        {
            path: 'role',
            element: <ViewTableMaster />
        },
        {
            path: 'viewvendorproduct',
            element: <Vendorproduct />
        },
        {
            path: 'addvendorproduct',
            element: <AddVendorproduct />
        },
        {
            path: 'accessrole',
            element: <ViewTableMaster />
        },
        {
            path: 'user',
            element: <UserRegView />
        },
        {
            path: 'viewaccessrole',
            element: <Viewaccessrole />
        },
        {
            path: 'accessroledefinition',
            element: <Accessrole />
        }
    ]
};

export default MainRoutes;
