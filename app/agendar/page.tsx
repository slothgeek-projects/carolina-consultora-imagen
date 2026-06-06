import { GetMetadateAccount } from '@/controller/account';
import AgendaPage from '@/features/agenda/agendaPage';

export default async function Agendar() {

    const account = await GetMetadateAccount('piel-pantera')

    return (
        <div>
            <AgendaPage account={account} />
        </div>
    );
}