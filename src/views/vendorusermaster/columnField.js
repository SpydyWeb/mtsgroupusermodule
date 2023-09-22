import { LicenceTypeSchema, CommunicationTypeSchema, StateSchema, RoleSchema, AccessRoleSchema } from 'schemas';
export const HeadingName = [
    {
        label: 'Licence Type',
        id: 'licencetype',
        formfield: [
            {
                label: 'Licence Type',
                name: 'name',
                required: true
            }
        ],
        initialValue: { name: '' },
        schema: LicenceTypeSchema,
        TableColumn: [
            { id: 'id', label: 'S. No.', minWidth: 100, flex: 1, renderCell: false },
            { id: 'name', label: 'Name', minWidth: 100, flex: 1, renderCell: false },
            {
                id: 'createdDate',
                label: 'Created Date',
                minWidth: 100,
                flex: 1,
                renderCell: false
            },
            { id: 'updateDate', label: 'Updated Date', minWidth: 100, flex: 1, renderCell: false },
            {
                id: 'Action',
                label: 'Action',
                renderCell: true,
                flex: 1,
                minWidth: 100
            }
        ]
    },
    {
        label: 'Communication Type',
        id: 'communicationtype',
        formfield: [
            {
                label: 'Code',
                name: 'uniquename',
                required: true
            },
            {
                label: 'Communication Type',
                name: 'name',
                required: true
            }
        ],
        initialValue: { name: '', uniquename: '' },
        schema: CommunicationTypeSchema,
        TableColumn: [
            { id: 'id', label: 'S. No.', minWidth: 100, flex: 1, renderCell: false },
            { id: 'uniquename', label: 'Code', minWidth: 100, flex: 1, renderCell: false },
            { id: 'name', label: 'Name', minWidth: 100, flex: 1, renderCell: false },
            {
                id: 'createdDate',
                label: 'Created Date',
                minWidth: 100,
                flex: 1,
                renderCell: false
            },
            { id: 'updateDate', label: 'Updated Date', minWidth: 100, flex: 1, renderCell: false },
            {
                id: 'Action',
                label: 'Action',
                renderCell: true,
                flex: 1,
                minWidth: 100
            }
        ]
    },
    {
        label: 'State',
        id: 'state',
        formfield: [
            {
                label: 'State Name',
                name: 'name',
                required: true
            }
        ],
        initialValue: { name: '' },
        schema: StateSchema,
        TableColumn: [
            { id: 'id', label: 'S. No.', minWidth: 100, flex: 1, renderCell: false },
            { id: 'name', label: 'Name', minWidth: 100, flex: 1, renderCell: false },
            {
                id: 'createdDate',
                label: 'Created Date',
                minWidth: 100,
                flex: 1,
                renderCell: false
            },
            { id: 'updateDate', label: 'Updated Date', minWidth: 100, flex: 1, renderCell: false },
            {
                id: 'Action',
                label: 'Action',
                renderCell: true,
                flex: 1,
                minWidth: 100
            }
        ]
    },
    {
        label: 'Role Master',
        id: 'role',
        formfield: [
            {
                label: 'Role Name',
                name: 'name',
                required: true
            },
            {
                label: 'Description',
                name: 'description',
                required: true
            }
        ],
        initialValue: { name: '', description: '' },
        schema: RoleSchema,
        TableColumn: [
            { id: 'id', label: 'S No.', flex: 1, renderCell: false },
            { id: 'name', label: 'Name', flex: 1, renderCell: false },
            { id: 'description', label: 'Description', flex: 1, renderCell: false },
            {
                id: 'action',
                label: 'Action',
                renderCell: true,
                flex: 1
            }
        ]
    },
    {
        label: 'Access Control Master',
        id: 'accessrole',
        formfield: [
            {
                label: 'Access Control Name',
                name: 'subrole',
                required: true
            }
        ],
        initialValue: { subrole: '' },
        schema: AccessRoleSchema,
        TableColumn: [
            { id: 'id', label: 'S No.', flex: 1, renderCell: false },
            { id: 'subrole', label: 'Access Name', flex: 1, renderCell: false },
            {
                id: 'action',
                label: 'Action',
                renderCell: true,
                flex: 1
            }
        ]
    },
    {
        label: 'All Users',
        id: 'user',
        formfield: [],
        initialValue: {},
        schema: '',
        TableColumn: [
            { id: 'id', label: 'S No.', minWidth: 50, renderCell: false, flex: 1 },
            { id: 'name', label: 'Name', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'username', label: 'User Name', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'userType', label: 'User Type', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'emailId', label: 'Email Id', minWidth: 250, renderCell: false, flex: 1 },
            { id: 'outEmail', label: 'Out Email', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'cellPhone', label: 'Cell Phone', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'allowTextMsg', label: 'Allow Text Msg', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'manager', label: 'Manager', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'department', label: 'Department', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'workStart', label: 'Work Start', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'workEnd', label: 'Work End', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'emailSignature', label: 'Email Signature', minWidth: 150, renderCell: false, flex: 1 },
            { id: 'roles', label: 'User Role', minWidth: 250, renderCell: false, flex: 1 }
        ]
    }
];
