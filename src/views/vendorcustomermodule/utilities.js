export const customersearchfield = [
    {
        name: 'Id',
        label: 'ID',
        type: 'textbox'
    },
    {
        name: 'Email',
        label: 'Email',
        type: 'textbox'
    },
    {
        name: 'Name',
        label: 'Name',
        type: 'textbox'
    },
    {
        name: 'State',
        label: 'State',
        type: 'select'
    },
    {
        name: 'Contact',
        label: 'Contact',
        type: 'textbox'
    },
    {
        name: 'Product',
        label: 'Product',
        type: 'textbox'
    },
    {
        name: 'Licence',
        label: 'Licence',
        type: 'textbox'
    }
];

export const StepperForm = {
    Profileformfield: [
        {
            label: 'Profile Details',
            name: '',
            children: [
                {
                    label: 'ID',
                    name: 'vendorId',
                    type: 'textbox',
                    required: true,
                    minWidth: 200,
                    value: 'vendorId'
                },

                {
                    label: 'Name',
                    name: 'name',
                    type: 'textbox',
                    required: true,
                    minWidth: 200,
                    value: 'name'
                }
            ]
        },
        {
            label: 'Primary Address',
            name: 'primery_Address',
            children: [
                {
                    label: 'Address',
                    name: 'address',
                    type: 'textbox',
                    required: true,
                    minWidth: 250,
                    value: 'address'
                },

                {
                    label: 'Suite',
                    name: 'suite',
                    type: 'textbox',
                    required: false,
                    minWidth: 200,
                    value: 'suite'
                },
                {
                    label: 'City',
                    name: 'city',
                    type: 'textbox',
                    required: true,
                    minWidth: 200,
                    value: 'city'
                },
                {
                    label: 'State',
                    name: 'state',
                    type: 'dropdown',
                    required: true,
                    minWidth: 200,
                    value: 'state'
                },
                {
                    label: 'Zip',
                    name: 'pincode',
                    type: 'textbox',
                    required: true,
                    minWidth: 200,
                    value: 'pincode'
                }
            ]
        },
        {
            label: 'Billing Address',
            name: 'secondary_Address',
            children: [
                {
                    label: 'Address',
                    name: 'address',
                    type: 'textbox',
                    required: true,
                    minWidth: 250,
                    value: 'address'
                },

                {
                    label: 'Suite',
                    name: 'suite',
                    type: 'textbox',
                    required: false,
                    minWidth: 200,
                    value: 'suite'
                },
                {
                    label: 'City',
                    name: 'city',
                    type: 'textbox',
                    required: true,
                    minWidth: 200,
                    value: 'city'
                },
                {
                    label: 'State',
                    name: 'state',
                    type: 'dropdown',
                    required: true,
                    minWidth: 200,
                    value: 'state'
                },
                {
                    label: 'Zip',
                    name: 'pincode',
                    type: 'textbox',
                    required: true,
                    minWidth: 200,
                    value: 'pincode'
                }
            ]
        },
        {
            label: 'Primary Contact',
            name: 'primery_Contact',
            children: [
                {
                    label: 'First Name',
                    name: 'firstname',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'firstName'
                },

                {
                    label: 'Middle Name',
                    name: 'middlename',
                    type: 'textbox',
                    required: false,
                    minWidth: 150,
                    value: 'middleName'
                },
                {
                    label: 'Last Name',
                    name: 'lastname',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'lastName'
                },
                {
                    label: 'Phone',
                    name: 'phone',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'phone'
                },
                {
                    label: 'Ext',
                    name: 'ext',
                    type: 'textbox',
                    required: false,
                    minWidth: 150,
                    value: 'ext'
                },
                {
                    label: 'Email',
                    name: 'email',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'email'
                },
                {
                    label: 'Cell Phone',
                    name: 'cellphone',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'cellPhone'
                }
            ]
        },
        {
            label: 'Secondary Contact',
            name: 'secondary_contact',
            children: [
                {
                    label: 'First Name',
                    name: 'firstname',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'firstName'
                },

                {
                    label: 'Middle Name',
                    name: 'middlename',
                    type: 'textbox',
                    required: false,
                    minWidth: 150,
                    value: 'middleName'
                },
                {
                    label: 'Last Name',
                    name: 'lastname',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'lastName'
                },
                {
                    label: 'Phone',
                    name: 'phone',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'phone'
                },
                {
                    label: 'Ext',
                    name: 'ext',
                    type: 'textbox',
                    required: false,
                    minWidth: 150,
                    value: 'ext'
                },
                {
                    label: 'Email',
                    name: 'email',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'email'
                },
                {
                    label: 'Cell Phone',
                    name: 'cellphone',
                    type: 'textbox',
                    required: true,
                    minWidth: 150,
                    value: 'cellPhone'
                }
            ]
        },
        {
            label: '',
            name: '',
            children: [
                {
                    label: 'Assignment Note',
                    name: 'firstname',
                    type: 'textbox',
                    required: true,

                    multiline: true,
                    rows: 2,
                    value: 'assignmentNote'
                }
            ]
        }
    ]
};

export const stepslabel = {
    vendor: ['Basic Vendor Details', 'Vendor License', 'Product/ Service', 'Communication/ Notification', 'User Registration'],
    customer: ['Basic Customer Details', 'Product/ Service', 'Communication/ Notification', 'User Registration']
};
export const initailCustomerStateForm = {
    customerId: '',
    name: '',
    parent: '',
    primery_Address: {
        address: '',
        city: '',
        suite: '',
        state: '',
        pincode: ''
    },
    secondary_Address: {
        address: '',
        city: '',
        suite: '',
        state: '',
        pincode: ''
    },
    primery_Contact: {
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        email: '',
        ext: '',
        cellPhone: ''
    },
    secondary_contact: {
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        email: '',
        ext: '',
        cellPhone: ''
    },
    order_Confirmation: false,
    assignment: false,
    inspection: false,
    in_QC_Review: false,
    uploadedfile: 'string',
    communication: [
        {
            vendorId: 0,
            type: '',
            detail: '',
            product_id: 0,
            customerId: 0
        }
    ],
    product: [
        {
            id: 0,
            name: 'string',
            price1: 0,
            price2: 0,
            price3: 0,
            productId: 0,
            selected: true,
            subCategory: [null]
        }
    ],
    additionalDetail: [''],
    customer_Integration_details: {
        detail: '',
        port: '',
        login: '',
        password: '',
        customerId: 0
    },
    registerId: []
};

export const initailSearchState = {
    Id: '',
    Email: '',
    Name: '',
    Status: true,
    Contact: '',
    Licence: '',
    State: '',
    Product: ''
};
