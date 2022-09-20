import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http : HttpClient
  ) { }

  query(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQBE1grLTAsAKfUfW_6Bhjz9_d7t8IvWVh14qFjImqK314HDcjy4nz0YDn5tGcrI-ZqvT0fjFuTquHJ5x4FRpo2J_hPxU0y9AoKJ9jh4R_NFDppceag'
    }); 

    return this.http.get(url, {headers});
  }

  getNewRelease() {

    return this.query('browse/new-releases?country=US').pipe( map((res:any) => {
      return res['albums'].items;
    }));
    // this.http.get('https://api.spotify.com/v1/browse/new-releases?country=US', {headers})
    //   .pipe( map((res:any) => {
    //     return res['albums'].items;
    //   }))
  }

  getSearch(search: string) {

    return this.query(`search?q=${search}&type=artist&market=US&limit=1`)
      .pipe( map( (res:any) => {
        return res['artists'].items;
      }));
  
  }

  getSearchTrack(search: string) {

    return this.query(`search?q=${search}&type=track&market=US&limit=4`)
      .pipe( map( (res:any) => {
        return res['tracks'].items;
    }));
  
  }

  getArtist(id: any) {
    return this.query(`artists/${id}`)
  }

  getTopTracks(id:any) {
    return this.query(`artists/${id}/top-tracks?market=US`)
      .pipe( map( (data:any) => {
        return data['tracks']
      }))
  }

  getAlbums(id:any) {
    return this.query(`artists/${id}/albums?market=US&limit=5`)
      .pipe( map( (data:any) => {
        return data.items
      }))
  }

  getRelatedArtists(id:any) {
    return this.query(`artists/${id}/related-artists`)
      .pipe( map( (data:any) => {
        return data.artists
      }))
  }

}
