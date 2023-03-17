import { Doctor } from "../doctor/Doctor";
export class Patient{
    pid?: number;
    pName?: string;
    pMobileNo?: number;
    pAdd?: string;
    pDob?: Date;
    doc?: Doctor = {
        doctorId: null,
        doctorName: '',
        doctorPhoneNO: null,
        doctorAddress: '',
        department: null,
        specialization: null
    };
}