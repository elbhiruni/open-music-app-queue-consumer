const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistByPlaylistId(playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name
      FROM playlist_songs
      JOIN playlists ON playlists.id = playlist_songs.playlist_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlist_songs
      JOIN songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
