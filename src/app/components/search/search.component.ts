import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  

  public artists: any[] = [];
  public track: any[] = [];
  public loading: boolean

  constructor(
    private serv: SpotifyService,
    private route: Router
  ) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this.searchArtist;
  }

  searchArtist(search: string) {
    console.log(search)
    this.serv.getSearch(search).subscribe(
      (res: any) => {
        this.artists = res;
        console.log('ARTIST ->', this.artists)

        this.serv.getSearchTrack(search).subscribe(
          (res: any) => {
            this.track = res;
            console.log('TRACK ->', this.track)

            this.loading = false;
          }
        )
      }
    )
  }

  goArtist(artists: any) {
    console.log('ITEM ->', artists);
    this.route.navigate(['/artist', artists.id])
  }

}
