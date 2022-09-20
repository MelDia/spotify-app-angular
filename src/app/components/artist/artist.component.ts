import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  public parametro: any;
  public artist: any = {};
  public topTracks: any = {};
  public topTracksTwo: any = {};
  public discography: any[] = [];
  public related: any = {};

  constructor(
    private serv: SpotifyService,
    private activated: ActivatedRoute,
    private route: Router
  ) {

    this.activated.params.subscribe(params => {
      console.log('PARAMETROS ->', params['id'])
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
      this.getAlbums(params['id']);
      this.getRelatedArtists(params['id']);
    })



  }

  ngOnInit() {

    this.getArtist;
    this.getTopTracks;
    this.getAlbums;
    this.getRelatedArtists;
  }

  getArtist(id: string) {
    this.serv.getArtist(id).subscribe(
      (data: any) => {
        console.log('DATA ->', data)
        this.artist = data;
        
      }
    )
  }

  getTopTracks(id: string) {
    this.serv.getTopTracks(id).subscribe(
      (data:any) => {
        console.log('DATA TOP TRACKS ->', data)
        this.topTracks = data.slice(0,5);
        this.topTracksTwo = data.slice(6,10);

      }
    )
  }

  getAlbums(id: string) {
    this.serv.getAlbums(id).subscribe(
      (data:any) => {
        console.log('DATA ALBUMS ->', data)
        this.discography = data;
      }
    )
  }

  getRelatedArtists(id: string) {
    this.serv.getRelatedArtists(id).subscribe(
      (data:any) => {
        console.log('RELATED ARTISTS ->', data)
        this.related = data.slice(0,5);
      }
    )
  }

  goArtist(artists: any) {
    console.log('ITEM ->', artists);
    this.route.navigate(['/artist', artists.id])
  }



}
