const rp = require('request-promise')

exports.api = class {
    constructor(bearer) {
        this._bearer = bearer
    }

    _call(options) {
        return new Promise((resolve, reject) => {
            rp({
                method: options.method,
                uri: options.uri,
                resolveWithFullResponse: true,
                body: options.body,
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this._bearer}`
                },
                json: true
            })
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

    getDevices() {
        return this._call({
            method: 'GET',
            uri: `https://api.spotify.com/v1/me/player/devices`
        })
    }

    addTracks(user_id, playlist_id, position, uris) {
        return this._call({
            method: 'POST',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks/?position=${position}&uris=${uris}`
        })
    }

    removeTracks(user_id, playlist_id, tracks) {
        return this._call({
            method: 'POST',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
            body: {
                tracks: tracks
            }
        })
    }

    getPlaylist(user_id, playlist_id, fields, limit, offset) {
        return this._call({
            method: 'GET',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks?fields=${fields}&limit=${limit}&offset=${offset}`
        })
    }
    reorderPlaylist(user_id, playlist_id, range_start, range_length, insert_before) {
        return this._call({
            method: 'PUT',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
            body: {
                range_start: range_start,
                range_length: range_length,
                insert_before: insert_before
            },
        })
    }

    currentlyPlaying() {
        return this._call({
            method: 'GET',
            uri: `https://api.spotify.com/v1/me/player/currently-playing`
        })
    }

    currentPlayback(device_id, context_uri) {
        return this._call({
            method: 'GET',
            uri: `https://api.spotify.com/v1/me/player`
        })
    }

    startResume(device_id, context_uri, position) {
        return this._call({
            method: 'PUT',
            uri: `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
            body: {
                context_uri: context_uri,
                offset: {
                    position: position
                }
            }
        })
    }

    createPlaylist(user_id, name, visible, description) {
        return this._call({
            method: 'POST',
            uri: `https://api.spotify.com/v1/users/${user_id}/playlists`,
            body: {
                name: name,
                public: visible,
                description: description
            }
        })
    }
};