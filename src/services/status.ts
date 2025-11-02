import { api } from "./api";

export const updateStatus = async (device: string, novoEstado: string) => {
    try {
        await api().get(`/status.php?device=${device}&novoEstado=${novoEstado}`);
    } catch (error: any) {
        throw error;
    }
};

export const getStatus = async (devices: string[]) => {
    try {
        const newStates: { [key: string]: boolean } = {};
        for (let device of devices) {
            const response = await api().get(`/status.php?device=${device}`);

            const data = await response.data();
            newStates[device] = JSON.parse(data).estado === 'ligar';
        }
        return newStates;
    } catch (error: any) {
        throw error;
    }
};