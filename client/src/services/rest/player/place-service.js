import client from '../../client';
import IPlace from '../../interfaces/IPlace';
import implement from 'implement-js';

const place = {
    getPlaces: async (chronicleId) => {
        let response = await client.get(
            `/api/places/chronicle/${chronicleId}`
        );
        return response.data;
    },
    getRefuges: () => { },
    getPlace: () => { },
    createPlace: async (chronicleId, place) => {
        await client.post(`/api/places/${chronicleId}`, place);
    },
    updatePlace: async (placeId, place) => {
        await client.put(`/api/places/${placeId}`, place);
    },
    deletePlace: async (placeId) => {
        await client.delete(`/api/places/${placeId}`);
    }
};

implement(IPlace)(place);

export default place;