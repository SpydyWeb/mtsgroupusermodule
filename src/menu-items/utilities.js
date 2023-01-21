// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

export const customermodule = {
    id: 'customermodule',
    title: 'Customer Module',
    type: 'group',
    children: [
        {
            id: 'customer',
            title: 'Customers',
            type: 'item',
            url: '/admin/customer',
            // icon: icons.IconTypography,
            breadcrumbs: false
        }
    ]
};
export const vendormodule = {
    id: 'vendormodule',
    title: 'Vendor Module',
    type: 'group',
    children: [
        {
            id: 'vendormaster',
            title: 'Vendor Master',
            type: 'collapse',
            icon: icons.IconKey,
            breadcrumbs: true,
            children: [
                {
                    id: 'licencetype',
                    title: 'Licence Type',
                    type: 'item',
                    url: '/admin/licencetype'
                },
                {
                    id: 'communicationtype',
                    title: 'Communication Type',
                    type: 'item',
                    url: '/admin/communicationtype'
                },
                {
                    id: 'state',
                    title: 'State',
                    type: 'item',
                    url: '/admin/state'
                },
                {
                    id: 'viewvendorproduct',
                    title: 'Vendor Product',
                    type: 'item',
                    url: '/admin/viewvendorproduct'
                }
            ]
        },
        {
            id: 'vendor',
            title: 'Vendor',
            type: 'item',
            url: '/admin/viewvendor',
            breadcrumbs: false
        }
    ]
};
export const usermodule = {
    id: 'usermodule',
    title: 'User Module',
    type: 'group',
    children: [
        {
            id: 'role',
            title: 'Role Master',
            icon: icons.IconKey,
            url: '/admin/role',
            type: 'item',
            breadcrumbs: false
        },
        {
            id: 'accessrole',
            title: 'Access Control Master',
            type: 'item',
            url: '/admin/accessrole',
            breadcrumbs: false
        },
        {
            id: 'roledefinationmaster',
            title: 'Role Defination',
            type: 'item',
            url: '/admin/accessroledefinition',
            breadcrumbs: false
        },
        {
            id: 'userregistration',
            title: 'User Registration',
            type: 'item',
            url: '/admin/user',
            breadcrumbs: false
        }
    ]
};
