import client from '../client';
import IVampireGroups from '../interfaces/IVampireGroups';
import implement from 'implement-js';

const coteries = {
    getGroups: async (chronicleId) => {
        let response = await client.get(
            `/api/coteries/all/${chronicleId}`
          );
        return response.data;
    },
    getGroup: async () => {},
    createGroup: async (chronicleId, input) => {
        let response = await client.post(`/api/coteries/${chronicleId}`, input);
        return response.data;
    },
    updateGroup: async () => {},
    deleteGroup: async (groupId) => {
        await client.delete(`/api/coteries/${groupId}`);
        return;
    },
    getAllCharacters: async () => {
        
    },
    getGroupCharacters: async (listId) => {
        let response = await await client.get(`/api/coteries/${listId}`);
        return response.data.characters.sort((a, b) => {
            if (a.alive > b.alive) {
                return -1;
            } else if (a.alive < b.alive) {
                return 1;
            } else {
                return a.createdAt - b.createdAt;
            }
        });
    },
    openCharacter: (characterId, component) => {
        component.$router.push(
            `/story-teller/chronicle/${component.$route.params.id}/coteries/${
                component.$route.params.listid
            }/character/${characterId}`
        );
    },
    closeCharacter: (component) => {
        component.$router.push(
            `/story-teller/chronicle/${component.$route.params.id}/coteries/${
            component.$route.params.listid
            }`
        );
    },
    createCharacterInGroup: async (character, coterieId) => {
        let picture = character.picture;
        delete character.picture;
        let response = await client.post(`/api/characters/${coterieId}`, character);
        await savePictureFile(response.data._id, picture, true);
    },
    updateCharacter: async (characterId, character) => {
        delete character.picture;
        let response = await client.put(`/api/characters/${characterId}`, character);
        return response.data;
    },
    getCharacter: async (characterId) => {
        let response = await client.get(`/api/characters/${characterId}`);
        if (response.data) {
            response.data.mainInformation = response.data.mainInformation || {};
            response.data.mortal = response.data.mortal || {};
            return response.data;
        }
        return {};
    },
    killOrResumeCharacter: async (character, alive, component) => {
        let res = await component.$confirm(
            `Do you really want to ${alive ? "resume" : "kill"} ${character.name}?`,
            {
                title: "Warning"
            }
        );
        if (res) {
            await client.put(`api/characters/${character._id}`, { alive });
        }
    },
    deleteCharacterInGroup: async () => {}
};

async function savePictureFile(characterId, file, toDelete) {
    let formData = new FormData();
    formData.append('file', file);
    try {
        await client.post(`/api/characters/picture/${characterId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        if (toDelete) {
            await client.delete(`/api/characters/${characterId}`);
        }
        throw error;
    }
}

implement(IVampireGroups)(coteries);

export default coteries;