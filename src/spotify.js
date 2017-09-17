const rp = require('request-promise')

const _call = (options) => {
    return new Promise((resolve, reject) => {
        rp(options)
            .then((response) => {
                if (/^2/.test('' + response.statusCode)) {
                    if (response.statusCode === 204) {
                        resolve(true)
                    } else {
                        resolve(response.body)
                    }
                }
            })
            .catch((err) => {
                reject(new Error(err))
            })
    })
}

exports.api = class {
    constructor(bearer) {
        this._bearer = bearer
    }

    getDevices() {
        return _call({
            method: 'GET',
            uri: `https://api.spotify.com/v1/me/player/devices`,
            resolveWithFullResponse: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            json: true
        })
    }

    addTracks(user_id, playlist_id, position, uris) {
        return _call({
            method: 'POST',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks/?position=${position}&uris=${uris}`,
            resolveWithFullResponse: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            json: true
        })
    }

    removeTracks(user_id, playlist_id, tracks) {
        return _call({
            method: 'POST',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
            resolveWithFullResponse: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            body: {
                tracks: tracks
            },
            json: true
        })
    }

    getPlaylist(user_id, playlist_id, fields, limit, offset) {
        return _call({
            method: 'GET',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks?fields=${fields}&limit=${limit}&offset=${offset}`,
            resolveWithFullResponse: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            json: true
        })
    }
    reorderPlaylist(user_id, playlist_id, range_start, range_length, insert_before) {
        return _call({
            method: 'PUT',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
            resolveWithFullResponse: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            body: {
                range_start: range_start,
                range_length: range_length,
                insert_before: insert_before
            },
            json: true
        })
    }

    currentlyPlaying() {
        return _call({
            method: 'GET',
            uri: `https://api.spotify.com/v1/me/player/currently-playing`,
            resolveWithFullResponse: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            json: true
        })
    }

    currentPlayback(device_id, context_uri) {
        return _call({
            method: 'GET',
            uri: `https://api.spotify.com/v1/me/player`,
            resolveWithFullResponse: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            json: true
        })
    }

    startResume(device_id, context_uri, position) {
        return _call({
            method: 'PUT',
            uri: `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
            resolveWithFullResponse: true,
            body: {
                context_uri: context_uri,
                offset: {
                    position: position
                }
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            json: true
        })
    }

    createPlaylist(user_id, name, visible, description) {
        return _call({
            method: 'POST',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists`,
            body: {
                name: name,
                public: visible,
                description: description
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this._bearer}`
            },
            json: true
        })
    }
};