import { Interface, type } from 'implement-js';

const Session = Interface('Session')({
    createSession: type('function'),
    getSessions: type('function'),
    getSession: type('function'),
    getOnGoingSession: type('function'),
    updateSession: type('function'),
    deleteSession: type('function'),
    searchSessions: type('function'),
    getCharacterSessions: type('function')
}, {
    error: true,
    strict: true 
});

export default Session;