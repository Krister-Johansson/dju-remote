const remote = require('./src/spotify')

const spotify = new remote.api('BQAxeg4CFJem9lMS78BYMtneZpjjQTmh5JhHXJi2dLOf1GOjix0oSJNnxP-OdYXiGLsjgnFB_HOlWJqXzeGzYe5oG90mqXSwnG_PwyKgiIWS3mvb0whEAPJpv-3xVhZAZ9e25MNwCqc8AfbrCiFbd8G5NF3wOcK193NlWTOwv4-7CzugZWYeGkIWctM4oq-LZjtlEhvVzjFrDett_3Z--Rns5SIpaapa6SZ35jFCIBKqLgklogf_jTXV8_1F2tEg4H7rytgV9Da3I0TAhWvjfwKOmmEzy3Eoix6UV0fi2XbNOu7JZKrDgfmEg1c1yCOgdYs')

// Add a new Playlist
spotify.createPlaylist('sweLogan', 'DJ123123U', true, 'DJU playlist')
    .then(x => console.log(x))
    .catch(x => console.log(x))

// Start playing a playlist
spotify.startResume('5feb4962d6eefe580a888e85ac00d5d6be8243fc', 'spotify:user:spotify:playlist:37i9dQZEVXcJ5iRnBZ0a3j', 1)
    .then(x => console.log(x))
    .catch(x => console.log(x))

spotify.removeTracks([
    {
        uri: "spotify:track:4iV5W9uYEdYUVa79Axb7Rh"
    }, {
        uri: "spotify:track:1301WleyT98MSxVHPZCA6M"
    }
])
    .then(x => console.log(x))
    .catch(x => console.log(x))

// Function to add a new song to the current playing playlist
const addToQueue = (uri) => {
    return new Promise((resolve, reject) => {
        spotify.currentlyPlaying()
            .then(x => {
                const id = x.item.id
                const user = x.context.uri.split(':')[2]
                const playlist = x.context.uri.split(':')[4]

                spotify.getPlaylist(user, playlist, 'items(track.id)', 100, 0)
                    .then(playlist => playlist.items.map((x) => {
                        return x.track.id
                    }))
                    .then(items => items.findIndex((x) => {
                        return x == id
                    }))
                    .then(position => {
                        spotify.addTracks(user, playlist, position + 1, uri)
                            .then(x => { return resolve(x.snapshot_id) })
                            .catch(x => { return reject(x) })
                    })
                    .catch(x => { return reject(x) })

            })
            .catch(x => { return reject(x) })
    })
}

addToQueue('spotify:track:4XgUGpQXuLCSDxybYyrnyP')
    .then(x => console.log(x))
    .then(x => { throw new Error(x) })
