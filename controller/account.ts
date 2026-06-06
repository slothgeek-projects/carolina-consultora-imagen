import { fetchAccount, fetchAccountById, fetchAccountMetadata, fetchAccountOrderProfessional, fetchAccountOrderServices } from '@/data/account';

export async function GetAccount(slug: string) {

    const account: any = await fetchAccount(slug);

    return account.data[0];
}

export async function GetMetadateAccount(slug: string) {
    const account: any = await fetchAccountMetadata(slug);
    return account.data[0];
}

export async function GetAccountById(id: string) {

    const account: any = await fetchAccountById(id);

    return account;
}

export async function GetAccountOrderServices(id: string) {

    const account: any = await fetchAccountOrderServices(id);

    return account.data.branches;
}

export async function GetAccountOrderProfessional(id: string) {

    const account: any = await fetchAccountOrderProfessional(id);

    return account.data.branches;
}