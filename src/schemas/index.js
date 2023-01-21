import * as Yup from 'yup';

export const LicenceTypeSchema = Yup.object({
    name: Yup.string().min(2).max(45).required('Please enter licence type')
});
export const CommunicationTypeSchema = Yup.object({
    name: Yup.string().min(2).max(45).required('Please enter communication type')
});
export const StateSchema = Yup.object({
    name: Yup.string().min(2).max(45).required('Please enter state name')
});

export const RoleSchema = Yup.object({
    name: Yup.string().min(2).max(45).required('Please enter role name'),
    description: Yup.string().min(2).max(50).required('Please enter description')
});
export const AccessRoleSchema = Yup.object({
    subrole: Yup.string().min(2).max(45).required('Please enter access control name')
});

export const VendorProfileSchema = Yup.object({
    vendorId: Yup.string().min(3).max(11).required('Please enter vendor id'),
    name: Yup.string().min(3).max(50).required('Please enter vendor name'),
    primery_Address: Yup.object().shape({
        address: Yup.string().required('Please enter primary address'),
        city: Yup.string().required('Please enter city'),
        state: Yup.string().required('Please select state'),
        pincode: Yup.string().min(5).max(5).required('Please enter zip')
    })
});
